import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateReceiptPDF } from "@/lib/pdf";
import { uploadBuffer, BUCKET_ASSETS } from "@/lib/r2";
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from "@/lib/resend";
import { DonationReceiptEmail } from "@/lib/email-templates/DonationReceipt";

/**
 * Called by the client after Razorpay checkout succeeds.
 * Verifies the payment signature and updates the donation status.
 *
 * IMPORTANT: DB status is updated immediately after signature verification.
 * PDF generation and email sending are secondary — their failure will NOT
 * block the success response shown to the donor.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_subscription_id, razorpay_payment_id, razorpay_signature } = body;

    if ((!razorpay_order_id && !razorpay_subscription_id) || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification parameters" },
        { status: 400 }
      );
    }

    // 1. Verify the payment signature
    // Orders: HMAC(orderId + "|" + paymentId)
    // Subscriptions: HMAC(paymentId + "|" + subscriptionId)
    const idToVerify = razorpay_order_id || razorpay_subscription_id;
    const isValid = verifyPaymentSignature({
      orderId: idToVerify,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      console.error("Invalid payment signature for:", idToVerify);
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2. Look up the donation/subscription record
    const supabase = createAdminClient() as any;
    const isSubscription = !!razorpay_subscription_id;

    let donationData: any = null;
    let findError: any = null;

    if (isSubscription) {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("id, status, donor_id, plan_amount, campaign_id, receipt_url, receipt_number, donor:donors(*), campaign:campaigns(id, title)")
        .eq("razorpay_subscription_id", razorpay_subscription_id)
        .single();
      donationData = data;
      findError = error;
    } else {
      const { data, error } = await supabase
        .from("donations")
        .select("id, status, donor_id, amount, campaign_id, receipt_url, receipt_number, donor:donors(*), campaign:campaigns(id, title)")
        .eq("razorpay_order_id", razorpay_order_id)
        .single();
      donationData = data;
      findError = error;
    }

    if (findError || !donationData) {
      console.error("Record not found:", { razorpay_order_id, razorpay_subscription_id, findError });
      return NextResponse.json(
        { error: "Donation record not found" },
        { status: 404 }
      );
    }

    const d = donationData as any;
    const donationAmount = isSubscription ? d.plan_amount : d.amount;
    let receiptUrl = d.receipt_url;
    const alreadyProcessed = (d.status === "captured" || d.status === "active") && receiptUrl;

    // 3. IMMEDIATELY update the DB status (before anything else can fail)
    if (!alreadyProcessed) {
      if (isSubscription) {
        await supabase
          .from("subscriptions")
          .update({ status: "active", razorpay_payment_id })
          .eq("id", d.id);
      } else {
        await supabase
          .from("donations")
          .update({ status: "captured", razorpay_payment_id })
          .eq("id", d.id);

        // Increment campaign raised amount
        if (d.campaign_id) {
          await supabase.rpc("increment_campaign_amount", {
            p_campaign_id: d.campaign_id,
            p_amount: Number(donationAmount),
          });
        }
      }
    }

    // 4. Generate receipt PDF + upload to R2 + send email
    // We must await this block so Vercel doesn't kill the serverless function,
    // but the try/catch ensures it won't break the client response if it fails.
    if (!alreadyProcessed) {
      try {
        const { data: rpcData } = await supabase.rpc("generate_receipt_number");
        const receiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;

        receiptUrl = d.receipt_url || null;
        let pdfSuccess = false;

        try {
          console.log("Attempting to generate PDF for", receiptNumber);
          const pdfBuffer = await generateReceiptPDF({
            receiptNumber,
            date: new Date().toISOString(),
            donorName: d.donor?.name || "Donor",
            donorEmail: d.donor?.email || "",
            donorPhone: d.donor?.phone || "",
            amount: donationAmount,
            paymentId: razorpay_payment_id,
            campaignName: d.campaign?.title,
          });

          console.log("PDF generated, attempting to upload to R2...");
          const r2Key = `receipts/${receiptNumber}.pdf`;
          receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, "application/pdf");
          pdfSuccess = true;
          console.log("PDF uploaded to R2 successfully at", receiptUrl);

          // Save receipt URL & number back to DB
          const table = isSubscription ? "subscriptions" : "donations";
          await supabase
            .from(table)
            .update({ receipt_url: receiptUrl, receipt_number: receiptNumber })
            .eq("id", d.id);
            
        } catch (pdfErr) {
          console.error("PDF Generation or R2 Upload FAILED:", pdfErr);
          // We continue to send the email anyway!
        }

        try {
          console.log("Attempting to send email via Resend to", d.donor.email);
          const resend = getResend();
          await resend.emails.send({
            from: `Yuva Ekta <${EMAIL_FROM}>`,
            replyTo: EMAIL_REPLY_TO,
            to: [d.donor.email],
            subject: `Thank you for your donation! (Receipt ${receiptNumber})`,
            react: (
              <DonationReceiptEmail
                donorName={d.donor?.name || "Donor"}
                amount={Number(donationAmount)}
                date={new Date().toISOString()}
                receiptNumber={receiptNumber}
                receiptUrl={receiptUrl || ""}
                campaignName={d.campaign?.title}
              />
            ),
          });
          console.log(`Receipt emailed successfully: ${receiptNumber} → ${d.donor.email}`);
        } catch (emailErr) {
          console.error("Resend Email FAILED:", emailErr);
        }
      } catch (outerErr) {
        console.error("Failed in background processing step:", outerErr);
      }
    }

    // 5. Return success immediately
    return NextResponse.json({
      success: true,
      donation: {
        id: d.id,
        amount: donationAmount,
        donorName: d.donor?.name || "Supporter",
        donorEmail: d.donor?.email || "",
        receiptUrl: receiptUrl ?? null,
      },
    });
  } catch (error: any) {
    console.error("Verify Payment Error:", error);
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}

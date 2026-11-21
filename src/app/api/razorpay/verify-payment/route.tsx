import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";
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
    const supabase = createAdminClient();
    const isSubscription = !!razorpay_subscription_id;

    interface VerificationRecord {
      id: string;
      status: string;
      donor_id: string | null;
      amount?: number;
      plan_amount?: number;
      campaign_id: string | null;
      receipt_url: string | null;
      receipt_number: string | null;
      donor: { name: string; email: string; phone?: string } | null;
      campaign: { id: string; title: string } | null;
    }

    let donationData: VerificationRecord | null = null;
    let findError: unknown = null;

    if (isSubscription) {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("id, status, donor_id, plan_amount, campaign_id, donor:donors(*), campaign:campaigns(id, title)")
        .eq("razorpay_subscription_id", razorpay_subscription_id)
        .single();
      donationData = data as unknown as VerificationRecord | null;
      findError = error;
    } else {
      const { data, error } = await supabase
        .from("donations")
        .select("id, status, donor_id, amount, campaign_id, receipt_url, receipt_number, donor:donors(*), campaign:campaigns(id, title)")
        .eq("razorpay_order_id", razorpay_order_id)
        .single();
      donationData = data as unknown as VerificationRecord | null;
      findError = error;
    }

    if (findError || !donationData) {
      console.error("Record not found:", { razorpay_order_id, razorpay_subscription_id, findError });
      return NextResponse.json(
        { error: "Donation record not found" },
        { status: 404 }
      );
    }

    const d = donationData;
    const donationAmount = Number((isSubscription ? d.plan_amount : d.amount) || 0);
    let receiptNumber = d.receipt_number;
    const isAlreadyCaptured = d.status === "captured" || d.status === "active";
    // Old donations have receipt_url only; new ones have receipt_number (PDF is built on the donor's device).
    const hasReceipt = Boolean(receiptNumber || d.receipt_url);

    // 3. Update DB status and increment campaign amount ONLY IF not already captured
    if (!isAlreadyCaptured) {
      if (isSubscription) {
        await supabase
          .from("subscriptions")
          .update({ status: "active" })
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

    // 4. Assign receipt number + send email IF not already done.
    // The try/catch ensures it won't break the client response if it fails.
    if (!hasReceipt) {
      try {
        const { data: rpcData } = await supabase.rpc("generate_receipt_number");
        const newReceiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;
        receiptNumber = newReceiptNumber;

        if (!isSubscription) {
          await supabase
            .from("donations")
            .update({ receipt_number: newReceiptNumber })
            .eq("id", d.id);
        }

        const recipientEmail = d.donor?.email;
        if (recipientEmail) {
          try {
            console.log("Attempting to send email via Resend to", recipientEmail);
            const resend = getResend();
            await resend.emails.send({
              from: `Yuva Ekta <${EMAIL_FROM}>`,
              replyTo: EMAIL_REPLY_TO,
              to: [recipientEmail],
              subject: `Thank you for your donation! (Receipt ${newReceiptNumber})`,
              react: (
                <DonationReceiptEmail
                  donorName={d.donor?.name || "Donor"}
                  amount={Number(donationAmount)}
                  date={new Date().toISOString()}
                  receiptNumber={newReceiptNumber}
                  campaignName={d.campaign?.title}
                />
              ),
            });
            console.log(`Receipt emailed successfully: ${newReceiptNumber} → ${recipientEmail}`);
          } catch (emailErr) {
            console.error("Resend Email FAILED:", emailErr);
          }
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
        // Data for the on-device receipt PDF (null if numbering failed)
        receipt: receiptNumber
          ? {
              receiptNumber,
              date: new Date().toISOString(),
              donorName: d.donor?.name || "Donor",
              donorEmail: d.donor?.email || "",
              donorPhone: d.donor?.phone || "",
              amount: donationAmount,
              paymentId: razorpay_payment_id,
              campaignName: d.campaign?.title ?? null,
            }
          : null,
      },
    });
  } catch (error: unknown) {
    console.error("Verify Payment Error:", error);
    const message = error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

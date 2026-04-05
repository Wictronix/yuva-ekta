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
 * This is the primary status update mechanism (webhooks are the backup/production fallback).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification parameters" },
        { status: 400 }
      );
    }

    // 1. Verify the payment signature
    const isValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2. Update the donation status in the database
    const supabase = createAdminClient() as any;

    const { data: donation, error: findError } = await supabase
      .from("donations")
      .select("id, status, donor_id, amount, campaign_id, receipt_url, receipt_number, donor:donors(*), campaign:campaigns(id, title)")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (findError || !donation) {
      console.error("Donation not found for order:", razorpay_order_id);
      return NextResponse.json(
        { error: "Donation record not found" },
        { status: 404 }
      );
    }

    let receiptUrl = donation.receipt_url;
    const d = donation as any;

    // Only process if still pending (avoid double-updating from webhook + verify)
    if (d.status === "pending" || !receiptUrl) {
      // Generate receipt number
      const { data: rpcData } = await supabase.rpc("generate_receipt_number");
      const receiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;

      // Generate PDF
      const pdfBuffer = await generateReceiptPDF({
        receiptNumber,
        date: new Date().toISOString(),
        donorName: d.donor.name,
        donorEmail: d.donor.email,
        donorPhone: d.donor.phone,
        amount: d.amount,
        paymentId: razorpay_payment_id,
        campaignName: d.campaign?.title,
      });

      // Upload PDF to R2
      const r2Key = `receipts/${receiptNumber}.pdf`;
      receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, "application/pdf");

      // Send Email
      const resend = getResend();
      await resend.emails.send({
        from: `Yuva Ekta <${EMAIL_FROM}>`,
        replyTo: EMAIL_REPLY_TO,
        to: [d.donor.email],
        subject: `Thank you for your donation! (Receipt ${receiptNumber})`,
        react: (
          <DonationReceiptEmail
            donorName={d.donor.name}
            amount={Number(d.amount)}
            date={new Date().toISOString()}
            receiptNumber={receiptNumber}
            receiptUrl={receiptUrl}
            campaignName={d.campaign?.title}
          />
        ),
      });

      const { error: updateError } = await supabase
        .from("donations")
        .update({
          status: "captured",
          razorpay_payment_id,
          receipt_url: receiptUrl,
          receipt_number: receiptNumber,
        })
        .eq("id", d.id);

      if (updateError) {
        console.error("Failed to update donation status:", updateError);
        // Continue, as the payment is still verified
      }

      // Increment campaign amount if applicable ONLY if it was previously pending
      if (d.status === "pending" && d.campaign_id) {
        await supabase.rpc("increment_campaign_amount", {
          p_campaign_id: d.campaign_id,
          p_amount: Number(d.amount),
        });
      }
    }

    return NextResponse.json({
      success: true,
      donation: {
        id: d.id,
        amount: d.amount,
        donorName: d.donor?.name || "Supporter",
        donorEmail: d.donor?.email || "",
        receiptUrl,
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

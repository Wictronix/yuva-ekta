import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReceiptPDF } from '@/lib/pdf';
import { uploadBuffer, BUCKET_ASSETS } from '@/lib/r2';
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { DonationReceiptEmail } from '@/lib/email-templates/DonationReceipt';

/**
 * Webhook handler for Razorpay.
 * Primarily used as a production backup for marking payments as captured.
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid Razorpay Webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    
    const supabase = createAdminClient() as any;

    if (event === 'payment.captured' || event === 'order.paid') {
        const paymentEntity = event === 'payment.captured' ? payload.payload.payment.entity : payload.payload.order.entity;
        const orderId = paymentEntity.order_id || (event === 'order.paid' ? paymentEntity.id : null);
        const paymentId = event === 'payment.captured' ? paymentEntity.id : null;
        
        // Skip if not a one-time donation order
        if (!orderId || !orderId.startsWith('order_')) {
          return NextResponse.json({ received: true, message: 'Skipped non-order event' });
        }

        // 1. Find donation record
        const { data: donation, error: donationError } = await supabase
            .from('donations')
            .select('*, donor:donors(*), campaign:campaigns(id, title)')
            .eq('razorpay_order_id', orderId)
            .single();
            
        if (donationError || !donation) {
            console.error(`Webhook: Donation record not found for order: ${orderId}`);
            return NextResponse.json({ received: true }); // Acknowledge anyway to stop retries if record doesn't exist
        }
        
        const d = donation as any;
        
        // 2. IMMEDIATELY update status if not already captured
        if (d.status !== 'captured') {
            await supabase.from('donations').update({
                status: 'captured',
                razorpay_payment_id: paymentId || d.razorpay_payment_id
            }).eq('id', d.id);
            
            // Increment campaign amount
            if (d.campaign_id) {
                await supabase.rpc('increment_campaign_amount', {
                    p_campaign_id: d.campaign_id,
                    p_amount: Number(d.amount)
                });
            }
            console.log(`Webhook: Marked donation ${d.id} as captured`);
        }

        // 3. Generate receipt and send email if not already done
        if (!d.receipt_url) {
            try {
                // Generate receipt number
                const { data: rpcData } = await supabase.rpc('generate_receipt_number');
                const receiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;
                
                let receiptUrl = null;
                
                // PDF Block
                try {
                  console.log(`Webhook: Generating PDF for ${receiptNumber}`);
                  const pdfBuffer = await generateReceiptPDF({
                      receiptNumber,
                      date: new Date().toISOString(),
                      donorName: d.donor.name,
                      donorEmail: d.donor.email,
                      donorPhone: d.donor.phone,
                      amount: d.amount,
                      paymentId: paymentId || 'N/A',
                      campaignName: d.campaign?.title
                  });
                  
                  const r2Key = `receipts/${receiptNumber}.pdf`;
                  receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, 'application/pdf');
                  
                  // Update DB with receipt info
                  await supabase.from('donations').update({
                      receipt_url: receiptUrl,
                      receipt_number: receiptNumber
                  }).eq('id', d.id);
                  console.log(`Webhook: PDF uploaded to ${receiptUrl}`);
                } catch (pdfErr) {
                  console.error('Webhook: PDF/R2 failure (non-critical):', pdfErr);
                }

                // Email Block
                try {
                  console.log(`Webhook: Sending email to ${d.donor.email}`);
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
                              receiptUrl={receiptUrl || ''}
                              campaignName={d.campaign?.title}
                          />
                      )
                  });
                  console.log(`Webhook: Email sent to ${d.donor.email}`);
                } catch (emailErr) {
                  console.error('Webhook: Email failure (non-critical):', emailErr);
                }
            } catch (innerErr) {
                console.error('Webhook: Background processing failed:', innerErr);
            }
        }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ received: true }); // Always return success to stop Razorpay retries if processing fails
  }
}

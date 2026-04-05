import { NextResponse } from 'next/server';
import { verifyWebhookSignature, getRazorpay } from '@/lib/razorpay';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReceiptPDF } from '@/lib/pdf';
import { uploadBuffer, BUCKET_ASSETS } from '@/lib/r2';
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { DonationReceiptEmail } from '@/lib/email-templates/DonationReceipt';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    
    const supabase = createAdminClient();

    if (event === 'payment.captured') {
        const paymentDetails = payload.payload.payment.entity;
        const orderId = paymentDetails.order_id;
        const paymentId = paymentDetails.id;
        
        const notes = paymentDetails.notes || {};
        const donorId = notes.donorId;
        const type = notes.type || 'one_time';
        
        // Handle ONLY One-time donations here
        if (type === 'one_time' && orderId) {
            // Find donation
            const { data: donation, error: donationError } = await supabase
                .from('donations')
                .select('*, donor:donors(*), campaign:campaigns(id, title)')
                .eq('razorpay_order_id', orderId)
                .single();
                
            if (donationError || !donation) {
                console.error(`Donation record not found for order: ${orderId}. Error: ${donationError?.message}`);
                return NextResponse.json({ error: 'Record not found' }, { status: 404 });
            }
            
            // Cast to any to access joined fields safely in TS
            const d = donation as any; 
            
            // Generate receipt number
            const { data: rpcData } = await supabase.rpc('generate_receipt_number');
            const receiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;
            
            // Generate PDF
            const pdfBuffer = await generateReceiptPDF({
                receiptNumber,
                date: new Date().toISOString(),
                donorName: d.donor.name,
                donorEmail: d.donor.email,
                donorPhone: d.donor.phone,
                amount: d.amount,
                paymentId,
                campaignName: d.campaign?.title
            });
            
            // Upload PDF to R2
            const r2Key = `receipts/${receiptNumber}.pdf`;
            const receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, 'application/pdf');
            
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
                )
            });
            
            // Update donation record
            await supabase.from('donations').update({
                status: 'captured',
                razorpay_payment_id: paymentId,
                receipt_url: receiptUrl,
                receipt_number: receiptNumber
            }).eq('id', d.id);
            
            // Increment campaign amount if applicable
            if (d.campaign_id) {
                await supabase.rpc('increment_campaign_amount', {
                    p_campaign_id: d.campaign_id,
                    p_amount: Number(d.amount)
                });
            }
        }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateReceiptPDF } from '@/lib/pdf';
import { uploadBuffer, BUCKET_ASSETS } from '@/lib/r2';
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { DonationReceiptEmail } from '@/lib/email-templates/DonationReceipt';

/**
 * SEPARATE WEBHOOK FOR SUBSCRIPTIONS
 * Handles: subscription.charged, subscription.activated, subscription.cancelled
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    
    const supabase = createAdminClient() as any;

    // 1. Handle Subscription Payment (recurring charges)
    if (event === 'subscription.charged') {
        const paymentDetails = payload.payload.payment.entity;
        const subscriptionId = paymentDetails.subscription_id;
        const paymentId = paymentDetails.id;
        const notes = paymentDetails.notes || {};

        if (subscriptionId) {
            const { data: subscription, error: subError } = await supabase
                .from('subscriptions')
                .select('*, donor:donors(*), campaign:campaigns(id, title)')
                .eq('razorpay_subscription_id', subscriptionId)
                .single();
                
           if (subscription && !subError) {
                const s = subscription as any;
                
                // Generate receipt number
                const { data: rpcData } = await supabase.rpc('generate_receipt_number');
                const receiptNumber = (rpcData as unknown as string) || `SUB-RCV-${Date.now()}`;
               
                const amount = Number(notes.baseAmount) || s.plan_amount;
                const feeAmount = Number(notes.feeAmount) || 0;
                const totalCharged = s.plan_amount;

                // A. Record the specific donation instance for this month
                const { data: donation, error: donationError } = await supabase.from('donations').insert({
                    donor_id: s.donor.id,
                    campaign_id: s.campaign_id,
                    razorpay_payment_id: paymentId,
                    amount,
                    fee_covered: feeAmount > 0,
                    fee_amount: feeAmount,
                    total_charged: totalCharged,
                    type: 'recurring',
                    status: 'captured',
                    receipt_number: receiptNumber,
                }).select().single();
                
                if (!donationError && donation) {
                    // B. Generate PDF
                    const pdfBuffer = await generateReceiptPDF({
                        receiptNumber,
                        date: new Date().toISOString(),
                        donorName: s.donor.name,
                        donorEmail: s.donor.email,
                        donorPhone: s.donor.phone,
                        amount,
                        paymentId,
                        campaignName: s.campaign?.title
                    });

                    // C. Upload PDF to R2
                    const r2Key = `receipts/${receiptNumber}.pdf`;
                    const receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, 'application/pdf');

                    // D. Send Email
                    const resend = getResend();
                    await resend.emails.send({
                        from: `Yuva Ekta <${EMAIL_FROM}>`,
                        replyTo: EMAIL_REPLY_TO,
                        to: [s.donor.email],
                        subject: `Thank you for your recurring donation! (Receipt ${receiptNumber})`,
                        react: (
                            <DonationReceiptEmail 
                                donorName={s.donor.name}
                                amount={amount}
                                date={new Date().toISOString()}
                                receiptNumber={receiptNumber}
                                receiptUrl={receiptUrl}
                                campaignName={s.campaign?.title}
                            />
                        )
                    });

                    // E. Update donation with receipt URL
                    await supabase.from('donations').update({ receipt_url: receiptUrl }).eq('id', donation.id);
                }
                
                // F. Update subscription state
                if (s.status !== 'active') {
                    await supabase.from('subscriptions').update({ 
                        status: 'active', 
                        started_at: new Date().toISOString() 
                    }).eq('id', s.id);
                }
                
                // G. Update campaign totals
                if (s.campaign_id) {
                    await supabase.rpc('increment_campaign_amount', {
                        p_campaign_id: s.campaign_id,
                        p_amount: amount
                    });
                }
           }
        }
    }

    // 2. Handle Subscription Cancellation
    if (event === 'subscription.cancelled') {
        const subDetails = payload.payload.subscription.entity;
        await supabase
            .from('subscriptions')
            .update({ 
                status: 'cancelled', 
                cancelled_at: new Date().toISOString() 
            })
            .eq('razorpay_subscription_id', subDetails.id);
    }

    // 3. Handle Subscription Activation
    if (event === 'subscription.activated') {
        const subDetails = payload.payload.subscription.entity;
        await supabase
            .from('subscriptions')
            .update({ 
                status: 'active',
                started_at: new Date().toISOString()
            })
            .eq('razorpay_subscription_id', subDetails.id);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Subscription Webhook error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

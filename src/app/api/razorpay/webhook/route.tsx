import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SubscriptionStatus } from '@/lib/supabase/types';
import { generateReceiptPDF } from '@/lib/pdf';
import { uploadBuffer, BUCKET_ASSETS } from '@/lib/r2';
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { DonationReceiptEmail } from '@/lib/email-templates/DonationReceipt';

interface SubscriptionWithDonorRow {
  id: string;
  donor_id: string | null;
  campaign_id: string | null;
  plan_amount: number;
  status: SubscriptionStatus;
  donor: { id: string; name: string; email: string; phone?: string } | null;
  campaign: { id: string; title: string } | null;
}

/**
 * Unified Webhook handler for Razorpay.
 * Handles both one-time orders (payment.captured, order.paid)
 * and recurring subscriptions (subscription.charged, subscription.activated, subscription.paused, subscription.cancelled).
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
    
    const supabase = createAdminClient();

    // 1. One-time Payment Captured
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = event === 'payment.captured' ? payload.payload.payment.entity : payload.payload.order.entity;
      const orderId = paymentEntity.order_id || (event === 'order.paid' ? paymentEntity.id : null);
      const paymentId = event === 'payment.captured' ? paymentEntity.id : null;
      
      // Skip if recurring charge (handled under subscription.charged)
      if (orderId && orderId.startsWith('order_')) {
        // Find donation record
        const { data: donation, error: donationError } = await supabase
          .from('donations')
          .select('*, donor:donors(*), campaign:campaigns(id, title)')
          .eq('razorpay_order_id', orderId)
          .single();
            
        if (donationError || !donation) {
          console.error(`Webhook: Donation record not found for order: ${orderId}`);
          return NextResponse.json({ received: true });
        }
        
        const d = donation;
        
        if (d.status !== 'captured') {
          await supabase.from('donations').update({
            status: 'captured',
            razorpay_payment_id: paymentId || d.razorpay_payment_id
          }).eq('id', d.id);
          
          if (d.campaign_id) {
            await supabase.rpc('increment_campaign_amount', {
              p_campaign_id: d.campaign_id,
              p_amount: Number(d.amount)
            });
          }
          console.log(`Webhook: Marked donation ${d.id} as captured`);
        }

        if (!d.receipt_url) {
          try {
            const { data: rpcData } = await supabase.rpc('generate_receipt_number');
            const receiptNumber = (rpcData as unknown as string) || `RCVD-${Date.now()}`;
            let receiptUrl = null;
            
            try {
              const pdfBuffer = await generateReceiptPDF({
                receiptNumber,
                date: new Date().toISOString(),
                donorName: d.donor?.name || "Supporter",
                donorEmail: d.donor?.email || "",
                donorPhone: d.donor?.phone || "",
                amount: d.amount,
                paymentId: paymentId || 'N/A',
                campaignName: d.campaign?.title
              });
              
              const r2Key = `receipts/${receiptNumber}.pdf`;
              receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, 'application/pdf');
              
              await supabase.from('donations').update({
                receipt_url: receiptUrl,
                receipt_number: receiptNumber
              }).eq('id', d.id);
            } catch (pdfErr) {
              console.error('Webhook: PDF/R2 failure (non-critical):', pdfErr);
            }

            if (d.donor?.email) {
              try {
                const resend = getResend();
                await resend.emails.send({
                  from: `Yuva Ekta <${EMAIL_FROM}>`,
                  replyTo: EMAIL_REPLY_TO,
                  to: [d.donor.email],
                  subject: `Thank you for your donation! (Receipt ${receiptNumber})`,
                  react: (
                    <DonationReceiptEmail 
                      donorName={d.donor?.name || "Supporter"}
                      amount={Number(d.amount)}
                      date={new Date().toISOString()}
                      receiptNumber={receiptNumber}
                      receiptUrl={receiptUrl || ''}
                      campaignName={d.campaign?.title}
                    />
                  )
                });
              } catch (emailErr) {
                console.error('Webhook: Email failure (non-critical):', emailErr);
              }
            }
          } catch (innerErr) {
            console.error('Webhook: Background processing failed:', innerErr);
          }
        }
      }
    }

    // 2. Subscription Charged (Recurring monthly payments)
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
          const s = subscription as unknown as SubscriptionWithDonorRow;
          
          const { data: rpcData } = await supabase.rpc('generate_receipt_number');
          const receiptNumber = (rpcData as unknown as string) || `SUB-RCV-${Date.now()}`;
         
          const amount = Number(notes.baseAmount) || s.plan_amount;
          const feeAmount = Number(notes.feeAmount) || 0;
          const totalCharged = s.plan_amount;

          const { data: donation, error: donationError } = await supabase.from('donations').insert({
            donor_id: s.donor?.id || s.donor_id,
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
            let receiptUrl = null;
            try {
              const pdfBuffer = await generateReceiptPDF({
                receiptNumber,
                date: new Date().toISOString(),
                donorName: s.donor?.name || "Supporter",
                donorEmail: s.donor?.email || "",
                donorPhone: s.donor?.phone || "",
                amount,
                paymentId,
                campaignName: s.campaign?.title
              });

              const r2Key = `receipts/${receiptNumber}.pdf`;
              receiptUrl = await uploadBuffer(BUCKET_ASSETS, r2Key, pdfBuffer, 'application/pdf');
              await supabase.from('donations').update({ receipt_url: receiptUrl }).eq('id', donation.id);
            } catch (pdfErr) {
              console.error('Subscription Webhook: PDF upload failed', pdfErr);
            }

            if (s.donor?.email) {
              try {
                const resend = getResend();
                await resend.emails.send({
                  from: `Yuva Ekta <${EMAIL_FROM}>`,
                  replyTo: EMAIL_REPLY_TO,
                  to: [s.donor.email],
                  subject: `Thank you for your recurring donation! (Receipt ${receiptNumber})`,
                  react: (
                    <DonationReceiptEmail 
                      donorName={s.donor?.name || "Supporter"}
                      amount={amount}
                      date={new Date().toISOString()}
                      receiptNumber={receiptNumber}
                      receiptUrl={receiptUrl || ''}
                      campaignName={s.campaign?.title}
                    />
                  )
                });
              } catch (emailErr) {
                console.error('Subscription Webhook: Email failed', emailErr);
              }
            }
          }
          
          if (s.status !== 'active') {
            await supabase.from('subscriptions').update({ 
              status: 'active', 
              started_at: new Date().toISOString() 
            }).eq('id', s.id);
          }
          
          if (s.campaign_id) {
            await supabase.rpc('increment_campaign_amount', {
              p_campaign_id: s.campaign_id,
              p_amount: amount
            });
          }
        }
      }
    }

    // 3. Subscription Cancelled
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

    // 4. Subscription Activated
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

    // 5. Subscription Paused
    if (event === 'subscription.paused') {
      const subDetails = payload.payload.subscription.entity;
      await supabase
        .from('subscriptions')
        .update({ 
          status: 'paused',
          paused_at: new Date().toISOString()
        })
        .eq('razorpay_subscription_id', subDetails.id);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error('Webhook error:', err);
    return NextResponse.json({ received: true });
  }
}

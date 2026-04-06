import Razorpay from 'razorpay';

// Server-side Razorpay SDK instance
// Only import this in API routes — NEVER in client components
let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error(
        'Missing NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables'
      );
    }

    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayInstance;
}

// Transaction fee calculation
const DEFAULT_FEE_PERCENT = 2.5;

export function getFeePercent(): number {
  return parseFloat(process.env.TRANSACTION_FEE_PERCENT ?? String(DEFAULT_FEE_PERCENT));
}

export function calculateTotal(
  baseAmount: number,
  coverFee: boolean
): {
  base: number;
  fee: number;
  total: number;
} {
  const feePercent = getFeePercent();
  const fee = coverFee
    ? Math.round(baseAmount * (feePercent / 100) * 100) / 100
    : 0;

  return {
    base: baseAmount,
    fee,
    total: baseAmount + fee,
  };
}

// Razorpay signature verification
import crypto from 'crypto';

export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return false;

  // Subscriptions use the format: paymentId + '|' + subscriptionId
  // Orders use the format: orderId + '|' + paymentId
  const isSubscription = orderId.startsWith('sub_');
  const body = isSubscription ? paymentId + '|' + orderId : orderId + '|' + paymentId;

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) return false;

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

// Amount conversion: Razorpay uses paise (smallest currency unit)
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export function toRupees(paise: number): number {
  return paise / 100;
}

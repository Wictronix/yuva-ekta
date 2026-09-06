import { POST as unifiedWebhookHandler } from '@/app/api/razorpay/webhook/route';

/**
 * Backward compatibility route for subscription webhooks.
 * Directs traffic to the unified webhook handler.
 */
export async function POST(req: Request) {
  return unifiedWebhookHandler(req);
}

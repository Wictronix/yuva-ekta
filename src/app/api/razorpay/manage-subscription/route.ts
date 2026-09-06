import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    const cookieStore = await cookies();
    const supabaseUserClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { user } } = await supabaseUserClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { subscriptionId, action, reason } = body;

    if (!subscriptionId || !["pause", "resume", "cancel"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid parameters. 'subscriptionId' and valid 'action' are required." },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();
    const supabaseAdmin = createAdminClient();

    // 2. Perform action on Razorpay
    if (action === "pause") {
      await razorpay.subscriptions.pause(subscriptionId, { pause_at: "now" });
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "paused",
          paused_at: new Date().toISOString(),
          admin_note: reason || "Paused by admin",
        })
        .eq("razorpay_subscription_id", subscriptionId);
    } else if (action === "resume") {
      await razorpay.subscriptions.resume(subscriptionId, { resume_at: "now" });
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "active",
          admin_note: reason || "Resumed by admin",
        })
        .eq("razorpay_subscription_id", subscriptionId);
    } else if (action === "cancel") {
      await razorpay.subscriptions.cancel(subscriptionId, false);
      await supabaseAdmin
        .from("subscriptions")
        .update({
          status: "cancelled",
          cancelled_at: new Date().toISOString(),
          admin_note: reason || "Cancelled by admin",
        })
        .eq("razorpay_subscription_id", subscriptionId);
    }

    return NextResponse.json({
      success: true,
      message: `Subscription ${action}d successfully.`,
      action,
    });
  } catch (err: unknown) {
    console.error("Subscription management error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update subscription" },
      { status: 500 }
    );
  }
}

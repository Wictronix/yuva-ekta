import { NextResponse } from "next/server";
import { getRazorpay, calculateTotal, toPaise } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, coverFee, campaignId, donorDetails } = body;

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!donorDetails || !donorDetails.name || !donorDetails.email || !donorDetails.phone) {
      return NextResponse.json({ error: "Missing donor details" }, { status: 400 });
    }

    const { base, fee, total } = calculateTotal(amount, coverFee);
    const amountInPaise = toPaise(total);

    const razorpay = getRazorpay();
    const supabase = createAdminClient() as any;

    // 1. Ensure Donor exists
    let donorId: string;
    const { data: existingDonor } = await supabase
      .from("donors")
      .select("id")
      .eq("email", donorDetails.email)
      .single();

    if (existingDonor) {
      donorId = existingDonor.id;
    } else {
      const { data: newDonor, error: donorInsertError } = await supabase
        .from("donors")
        .insert({
          name: donorDetails.name,
          email: donorDetails.email,
          phone: donorDetails.phone,
        })
        .select()
        .single();
        
      if (donorInsertError || !newDonor) throw new Error("Failed to create donor record");
      donorId = newDonor.id;
    }

    // 2. Create a Razorpay Plan first. 
    // Razorpay requires a Plan for subscriptions. To support dynamic amounts via API, 
    // we create a plan on the fly. In production, consider predefined plans or creating them in the dashboard.
    // However, creating a plan per subscription is common for dynamic amounts.
    const planOptions = {
        period: "monthly",
        interval: 1,
        item: {
            name: `Monthly Donation - ${total} INR`,
            amount: amountInPaise,
            currency: "INR",
            description: "Monthly Recurring Donation"
        }
    };
    
    // Using any type because Razorpay typings might not fully cover plans
    const plan = await (razorpay.plans as any).create(planOptions);

    // 3. Create Subscription
    const subscriptionOptions = {
      plan_id: plan.id,
      total_count: 120, // max 10 years
      customer_notify: true,
      notes: {
        donorId,
        campaignId: campaignId || 'general',
        type: 'monthly',
        baseAmount: base.toString(),
        feeAmount: fee.toString(),
      },
    };

    const subscription = await razorpay.subscriptions.create(subscriptionOptions) as any;

    // 4. Create Subscription record in pending/created state
    const { error: subscriptionError } = await supabase.from("subscriptions").insert({
      donor_id: donorId,
      campaign_id: campaignId || null,
      razorpay_subscription_id: subscription.id,
      razorpay_plan_id: plan.id,
      plan_amount: total,
      status: "created",
    });

    if (subscriptionError) {
      console.error("Subscription creation error:", subscriptionError);
      throw new Error("Failed to record subscription attempt");
    }

    return NextResponse.json({
      subscription,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Create Subscription Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create subscription" },
      { status: 500 }
    );
  }
}

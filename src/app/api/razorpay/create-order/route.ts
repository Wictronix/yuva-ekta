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
    const supabase = createAdminClient();

    // 1. Ensure Donor exists
    let donorId: string;
    const { data: existingDonor, error: donorSelectError } = await supabase
      .from("donors")
      .select("id")
      .eq("email", donorDetails.email)
      .single();

    if (existingDonor) {
      donorId = existingDonor.id;
      // Update phone if different
      await supabase.from("donors").update({ phone: donorDetails.phone, name: donorDetails.name }).eq("id", donorId);
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

    // 2. Create Razorpay Order
    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        donorId,
        campaignId: campaignId || 'general',
        type: 'one_time',
        baseAmount: base.toString(),
        feeAmount: fee.toString(),
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // 3. Create Donation record in pending state
    const { error: donationError } = await supabase.from("donations").insert({
      donor_id: donorId,
      campaign_id: campaignId || null,
      razorpay_order_id: order.id,
      amount: base,
      fee_covered: coverFee,
      fee_amount: fee,
      total_charged: total,
      type: "one_time",
      status: "pending",
    });

    if (donationError) {
      console.error("Donation creation error:", donationError);
      throw new Error("Failed to record donation attempt");
    }

    return NextResponse.json({
      order,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

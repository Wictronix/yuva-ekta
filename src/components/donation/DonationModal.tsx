"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId?: string;
  campaignName?: string;
  defaultAmount?: number;
}

const PRESET_AMOUNTS = {
  one_time: [500, 1500, 3000, 5000],
  monthly: [500, 1000, 2500, 5000],
};

export default function DonationModal({ isOpen, onClose, campaignId, campaignName, defaultAmount }: DonationModalProps) {
  const [type, setType] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState<number | "">(defaultAmount || PRESET_AMOUNTS.one_time[1]);
  const [coverFee, setCoverFee] = useState(true);
  const [donorDetails, setDonorDetails] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update amount if type changes
  useEffect(() => {
    if (defaultAmount) {
      setAmount(defaultAmount);
    } else {
      setAmount(PRESET_AMOUNTS[type][1]);
    }
  }, [type, defaultAmount]);

  // Fee calculation (estimated 2.5%)
  const feePercent = 2.5;
  const baseAmount = Number(amount) || 0;
  const fee = coverFee ? Math.round(baseAmount * (feePercent / 100)) : 0;
  const totalAmount = baseAmount + fee;

  // Check if current amount matches a preset
  const isPreset = PRESET_AMOUNTS[type].includes(baseAmount);
  const isCartAmount = defaultAmount && defaultAmount > 0 && baseAmount === defaultAmount && !isPreset;

  const validateForm = () => {
    if (!amount || amount < 1) return "Minimum donation amount is ₹1";
    if (!donorDetails.name.trim()) return "Please enter your name";
    if (!donorDetails.email.includes("@")) return "Please enter a valid email address";
    if (donorDetails.phone.length < 10) return "Please enter a valid 10-digit phone number";
    return null;
  };

  const handleDonate = async () => {
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsProcessing(true);

    try {
      const endpoint = type === "one_time" ? "/api/razorpay/create-order" : "/api/razorpay/create-subscription";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: baseAmount,
          coverFee,
          campaignId,
          donorDetails,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to initialize payment");
      }

      const { order, subscription, razorpayKeyId } = await res.json();

      const options: any = {
        key: razorpayKeyId,
        amount: order ? order.amount : undefined,
        currency: "INR",
        name: "Yuva Ekta India Foundation",
        description: campaignName ? `Donation for ${campaignName}` : "General Donation",
        image: "/images/logo.png",
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        theme: {
          color: "#BF3475",
        },
        handler: function (response: any) {
          const params = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (response.razorpay_order_id) {
            params.append('razorpay_order_id', response.razorpay_order_id);
          }
          if (response.razorpay_subscription_id) {
            params.append('razorpay_subscription_id', response.razorpay_subscription_id);
          }
          window.location.href = `/donate/thank-you?${params.toString()}`;
        },
      };

      if (order?.id) {
        options.order_id = order.id;
      }
      if (subscription?.id) {
        options.subscription_id = subscription.id;
      }

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        setError(response.error.description);
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full p-0 rounded-2xl bg-white border-0 shadow-2xl">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-brand-brown/5">
            <DialogHeader className="mb-0 text-left">
              <DialogTitle className="text-xl font-black font-playfair text-brand-brown">
                Make a Donation
              </DialogTitle>
              <DialogDescription className="text-brand-brown/60 text-sm mt-1">
                {campaignName ? `Supporting: ${campaignName}` : "Your donation will be used where it is needed most."}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <Tabs defaultValue="one_time" onValueChange={(v) => setType(v as "one_time" | "monthly")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-brand-offwhite p-1 rounded-xl h-auto">
                <TabsTrigger value="one_time" className="rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm font-bold text-sm">
                  One-time
                </TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-lg py-2 data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm font-bold text-sm">
                  Monthly
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {/* Amount Selection */}
                <div>
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/60 mb-2 block">
                    Select Amount
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* Cart total as a preset option (if available and not already a preset) */}
                    {defaultAmount && defaultAmount > 0 && !PRESET_AMOUNTS[type].includes(defaultAmount) && (
                      <button
                        onClick={() => setAmount(defaultAmount)}
                        className={`py-2.5 rounded-xl font-bold text-sm border transition-all col-span-2 flex items-center justify-center gap-2 ${
                          amount === defaultAmount
                            ? "border-brand-pink bg-brand-pink/5 text-brand-pink"
                            : "border-brand-brown/10 text-brand-brown hover:border-brand-pink/30 hover:bg-brand-pink/5"
                        }`}
                      >
                        🛒 Cart Total: {formatCurrency(defaultAmount)}
                      </button>
                    )}
                    {PRESET_AMOUNTS[type].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
                          amount === preset
                            ? "border-brand-pink bg-brand-pink/5 text-brand-pink"
                            : "border-brand-brown/10 text-brand-brown hover:border-brand-pink/30 hover:bg-brand-pink/5"
                        }`}
                      >
                        {formatCurrency(preset)}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-brand-brown/60 text-sm">₹</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                      placeholder="Custom Amount"
                      className="pl-7 py-5 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink font-bold text-brand-brown text-base h-auto"
                    />
                  </div>
                </div>

                {/* Donor Details */}
                <div>
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/60 mb-2 block">
                    Your Details (For 80G Receipt)
                  </Label>
                  <div className="space-y-2.5">
                    <Input
                      placeholder="Full Name *"
                      value={donorDetails.name}
                      onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                      className="py-4 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/30 text-sm"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={donorDetails.email}
                      onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                      className="py-4 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/30 text-sm"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={donorDetails.phone}
                      onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                      className="py-4 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/30 text-sm"
                    />
                  </div>
                </div>

                {/* Cover Fee */}
                <div className="p-3 bg-brand-offwhite/60 rounded-xl border border-brand-brown/5 flex items-start gap-2.5">
                  <Checkbox
                    id="cover-fee"
                    checked={coverFee}
                    onCheckedChange={(checked) => setCoverFee(checked as boolean)}
                    className="mt-0.5 data-[state=checked]:bg-brand-pink data-[state=checked]:border-brand-pink"
                  />
                  <label htmlFor="cover-fee" className="text-xs text-brand-brown/70 leading-snug cursor-pointer">
                    <span className="font-bold text-brand-brown block">Add {formatCurrency(Math.max(fee, 0))} to cover fees</span>
                    So 100% goes directly to the cause.
                  </label>
                </div>
              </div>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-3 bg-brand-offwhite/40 border-t border-brand-brown/5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-brand-brown/65 uppercase tracking-wider">Total</span>
              <span className="text-2xl font-black font-playfair text-brand-pink">{formatCurrency(totalAmount)}</span>
            </div>

            {error && (
              <div className="bg-red-50 text-brand-terra p-3 rounded-xl text-xs font-bold border border-brand-terra/20 mb-3 flex items-start gap-2">
                <span className="text-sm leading-none mt-0.5">⚠️</span>
                {error}
              </div>
            )}

            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-lg ${
                isProcessing
                  ? "bg-brand-brown/20 text-brand-brown/60 cursor-not-allowed shadow-none"
                  : "bg-brand-pink text-white hover:bg-brand-pink-dark active:scale-[0.98] shadow-brand-pink/30 hover:-translate-y-0.5"
              }`}
            >
              {isProcessing ? "Processing..." : `Donate ${formatCurrency(totalAmount)}`}
            </button>
            <p className="text-center text-[10px] text-brand-brown/60 mt-3 font-bold tracking-wide">
              🔒 SECURE PAYMENTS BY RAZORPAY
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

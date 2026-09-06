"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Check, ShieldCheck, AlertCircle } from "lucide-react";

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  razorpay_subscription_id?: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
  };
}

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id?: string;
  subscription_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId?: string;
  campaignName?: string;
  defaultAmount?: number;
}

interface PresetTier {
  amount: number;
  label: string;
  impact: string;
}

const PRESET_TIERS: Record<"one_time" | "monthly", PresetTier[]> = {
  one_time: [
    { amount: 500, label: "₹500", impact: "Learning Materials" },
    { amount: 1500, label: "₹1,500", impact: "1 Mo. Nutritious Meals" },
    { amount: 3000, label: "₹3,000", impact: "Digital Literacy Kit" },
    { amount: 5000, label: "₹5,000", impact: "Women's Micro-Grant" },
  ],
  monthly: [
    { amount: 500, label: "₹500/mo", impact: "Sponsor 1 Child's Class" },
    { amount: 1000, label: "₹1,000/mo", impact: "Daily Meals for 2" },
    { amount: 2500, label: "₹2,500/mo", impact: "Vocational Training" },
    { amount: 5000, label: "₹5,000/mo", impact: "Classroom Sponsorship" },
  ],
};

export default function DonationModal({ isOpen, onClose, campaignId, campaignName, defaultAmount }: DonationModalProps) {
  const [type, setType] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState<number | "">(defaultAmount || PRESET_TIERS.one_time[1].amount);
  const [coverFee, setCoverFee] = useState(true);
  const [donorDetails, setDonorDetails] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update amount if type changes
  useEffect(() => {
    if (defaultAmount) {
      setAmount(defaultAmount);
    } else {
      setAmount(PRESET_TIERS[type][1].amount);
    }
  }, [type, defaultAmount]);

  // Fee calculation (estimated 2.5%)
  const feePercent = 2.5;
  const baseAmount = Number(amount) || 0;
  const fee = coverFee ? Math.round(baseAmount * (feePercent / 100)) : 0;
  const totalAmount = baseAmount + fee;

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

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: order ? order.amount : undefined,
        currency: "INR",
        name: "Yuva Ekta India Foundation",
        description: campaignName ? `Donation for ${campaignName}` : "General Donation",
        image: "/yuva-ekta-logo.jpg",
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        theme: {
          color: "#BF3475",
        },
        handler: function (response: RazorpaySuccessResponse) {
          const params = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
          });
          if (response.razorpay_signature) {
            params.append('razorpay_signature', response.razorpay_signature);
          }
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

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded yet. Please try again in a few moments.");
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: RazorpayFailureResponse) {
        setError(response.error.description);
      });

      rzp.open();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full p-0 rounded-2xl bg-white border-0 shadow-2xl max-h-[95vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-brand-brown/5 shrink-0">
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
          <div className="px-5 py-4 overflow-y-auto flex-1 custom-scrollbar">
            <Tabs defaultValue="one_time" onValueChange={(v) => setType(v as "one_time" | "monthly")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#F2EDE8] border border-brand-brown/10 p-1.5 rounded-2xl !h-12 group-data-horizontal/tabs:!h-12 gap-1.5 shadow-inner">
                <TabsTrigger
                  value="one_time"
                  className="rounded-xl !h-full py-2 font-bold text-sm text-brand-brown/80 bg-brand-brown/[0.03] hover:bg-brand-brown/[0.07] hover:text-brand-brown transition-all data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brand-brown/10 data-active:bg-white data-active:text-brand-pink data-active:shadow-sm data-active:border data-active:border-brand-brown/10"
                >
                  One-time
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="rounded-xl !h-full py-2 font-bold text-sm text-brand-brown/80 bg-brand-brown/[0.03] hover:bg-brand-brown/[0.07] hover:text-brand-brown transition-all data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-brand-brown/10 data-active:bg-white data-active:text-brand-pink data-active:shadow-sm data-active:border data-active:border-brand-brown/10"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {/* Amount Selection */}
                <div>
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown/60 mb-2.5 block">
                    Select Amount
                  </Label>

                  {/* Cart total as a prominent banner (if cart has items) */}
                  {defaultAmount && defaultAmount > 0 && (
                    <button
                      type="button"
                      onClick={() => setAmount(defaultAmount)}
                      className={`w-full p-3 rounded-2xl border mb-3 flex items-center justify-between text-xs font-bold transition-all ${
                        amount === defaultAmount
                          ? "border-brand-pink bg-brand-pink/5 text-brand-pink ring-2 ring-brand-pink/20 shadow-sm"
                          : "border-brand-brown/10 bg-brand-offwhite/50 text-brand-brown hover:border-brand-pink/30 hover:bg-brand-pink/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={15} className="text-brand-pink" />
                        <span>Selected Cart Total</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(defaultAmount)}</span>
                    </button>
                  )}

                  {/* 2x2 Structured Tier Cards */}
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    {PRESET_TIERS[type].map((tier) => {
                      const isSelected = amount === tier.amount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => setAmount(tier.amount)}
                          className={`relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[72px] ${
                            isSelected
                              ? "border-brand-pink bg-brand-pink/5 ring-2 ring-brand-pink/20 shadow-sm"
                              : "border-brand-brown/10 bg-white hover:border-brand-pink/30 hover:bg-brand-pink/[0.02]"
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-1">
                            <span className={`text-base font-black ${isSelected ? "text-brand-pink" : "text-brand-brown"}`}>
                              {tier.label}
                            </span>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-brand-pink text-white flex items-center justify-center">
                                <Check size={10} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-brand-brown/65 leading-tight font-medium">
                            {tier.impact}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-brand-brown/50 text-sm">₹</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                      placeholder="Or enter custom amount"
                      className="pl-8 pr-4 py-3.5 rounded-xl border-brand-brown/15 focus-visible:ring-brand-pink font-bold text-brand-brown text-sm h-auto bg-white"
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
                      placeholder="Full Name"
                      value={donorDetails.name}
                      onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                      className="py-4 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/30 text-sm"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={donorDetails.email}
                      onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                      className="py-4 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/30 text-sm"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
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
          <div className="px-5 pb-5 pt-4 bg-brand-offwhite/40 border-t border-brand-brown/5 shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-brand-brown/65 uppercase tracking-wider">Total</span>
              <span className="text-2xl font-black font-playfair text-brand-pink">{formatCurrency(totalAmount)}</span>
            </div>

            {error && (
              <div className="bg-red-50 text-brand-terra p-3 rounded-xl text-xs font-bold border border-brand-terra/20 mb-3 flex items-start gap-2">
                <AlertCircle size={15} className="text-brand-terra shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-lg ${isProcessing
                ? "bg-brand-brown/20 text-brand-brown/60 cursor-not-allowed shadow-none"
                : "bg-brand-pink text-white hover:bg-brand-pink-dark active:scale-[0.98] shadow-brand-pink/30 hover:-translate-y-0.5"
                }`}
            >
              {isProcessing ? "Processing..." : `Donate ${formatCurrency(totalAmount)}`}
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-brown/60 mt-3 font-bold tracking-wider uppercase">
              <ShieldCheck size={13} className="text-brand-green" />
              <span>100% Secure Payments via Razorpay</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

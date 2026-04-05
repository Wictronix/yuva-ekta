"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
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
  const [donorDetails, setDonorDetails] = useState({ name: "", email: "", phone: "", pan: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update amount if type changes and current amount is not a preset
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

  const validateForm = () => {
    if (!amount || amount < 100) return "Minimum donation amount is ₹100";
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
      // 1. Create order or subscription on the backend
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

      // 2. Open Razorpay Checkout
      const options = {
        key: razorpayKeyId,
        amount: order ? order.amount : undefined, // For subscriptions, amount is handled by the plan
        currency: "INR",
        name: "Yuva Ekta India Foundation",
        description: campaignName ? `Donation for ${campaignName}` : "General Donation",
        image: "/images/logo.png", // Verify this path matches your logo
        order_id: order ? order.id : undefined,
        subscription_id: subscription ? subscription.id : undefined,
        prefill: {
          name: donorDetails.name,
          email: donorDetails.email,
          contact: donorDetails.phone,
        },
        theme: {
          color: "#BF3475", // Brand Pink
        },
        handler: function (response: any) {
          // Payment is successful, webhook will handle the rest
          // Redirect to a success page
          window.location.href = `/donate/success?payment_id=${response.razorpay_payment_id}`;
        },
      };

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
        <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto p-0 rounded-2xl bg-brand-offwhite">
          <div className="p-6 md:p-8 bg-white pb-6 border-b border-brand-brown/5">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl font-black font-playfair text-brand-brown">
                Make a Donation
              </DialogTitle>
              <DialogDescription className="text-brand-brown/70 mt-2">
                {campaignName ? `Supporting: ${campaignName}` : "Your donation will be used where it is needed most."}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="one_time" onValueChange={(v) => setType(v as "one_time" | "monthly")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-brand-offwhite p-1 rounded-xl">
                <TabsTrigger value="one_time" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm font-bold">
                  One-time
                </TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm font-bold">
                  Monthly
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wider text-brand-brown/50 mb-3 block">
                    Select Amount
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {PRESET_AMOUNTS[type].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className={`py-3 rounded-xl font-bold border transition-all ${
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
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-brand-brown/50">₹</span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                      placeholder="Custom Amount"
                      className="pl-8 py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink font-bold text-brand-brown text-lg h-auto"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-brand-brown/50 mb-3 block">
                    Your Details (For 80G Receipt)
                  </Label>
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name *"
                      value={donorDetails.name}
                      onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                      className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={donorDetails.email}
                      onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                      className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50"
                    />
                    <div className="flex gap-3">
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={donorDetails.phone}
                        onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                        className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50 w-full"
                      />
                      <Input
                        placeholder="PAN (Optional)"
                        value={donorDetails.pan}
                        onChange={(e) => setDonorDetails({ ...donorDetails, pan: e.target.value })}
                        className="py-6 rounded-xl border-brand-brown/10 focus-visible:ring-brand-pink bg-brand-offwhite/50 w-full uppercase"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-brand-offwhite rounded-xl border border-brand-brown/5 flex items-start gap-3">
                  <Checkbox 
                    id="cover-fee" 
                    checked={coverFee} 
                    onCheckedChange={(checked) => setCoverFee(checked as boolean)}
                    className="mt-1 data-[state=checked]:bg-brand-pink data-[state=checked]:border-brand-pink"
                  />
                  <label htmlFor="cover-fee" className="text-sm text-brand-brown/80 leading-snug cursor-pointer">
                    <span className="font-bold block text-brand-brown">Add {formatCurrency(Math.max(fee, 0))} to cover transaction fees</span>
                    So 100% of your donation goes directly to the cause.
                  </label>
                </div>
              </div>
            </Tabs>
          </div>

          <div className="p-6 md:p-8 pt-6 bg-brand-offwhite border-t border-white shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-brand-brown/60 uppercase tracking-wider">Total</span>
              <span className="text-3xl font-black font-playfair text-brand-pink">{formatCurrency(totalAmount)}</span>
            </div>

            {error && (
              <div className="bg-red-50 text-brand-terra p-4 rounded-xl text-sm font-bold border border-brand-terra/20 mb-6 flex items-start gap-3">
                <span className="text-lg leading-none mt-0.5">⚠️</span>
                {error}
              </div>
            )}

            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className={`w-full py-5 rounded-xl font-black text-lg transition-all shadow-xl ${
                isProcessing 
                  ? "bg-brand-brown/20 text-brand-brown/60 cursor-not-allowed shadow-none" 
                  : "bg-brand-pink text-white hover:bg-brand-pink-dark active:scale-[0.98] shadow-brand-pink/30 hover:-translate-y-1"
              }`}
            >
              {isProcessing ? "Processing..." : `Donate ${formatCurrency(totalAmount)}`}
            </button>
            <p className="text-center text-xs text-brand-brown/40 mt-6 font-bold tracking-wide">
              🔒 SECURE PAYMENTS BY RAZORPAY
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

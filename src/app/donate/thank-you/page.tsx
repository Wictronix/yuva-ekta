"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, ArrowRight, Share2, Copy, Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface DonationInfo {
  id: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  receiptUrl?: string;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [donationInfo, setDonationInfo] = useState<DonationInfo | null>(null);
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentId = searchParams.get("razorpay_payment_id");
      const orderId = searchParams.get("razorpay_order_id");
      const subscriptionId = searchParams.get("razorpay_subscription_id");
      const signature = searchParams.get("razorpay_signature");

      if (!paymentId || (!orderId && !subscriptionId) || !signature) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId || undefined,
            razorpay_subscription_id: subscriptionId || undefined,
            razorpay_signature: signature,
          }),
        });

        if (!res.ok) throw new Error("Verification failed");

        const data = await res.json();
        setDonationInfo(data.donation);
        setStatus("success");
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SITE.url + "/campaigns");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "verifying") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-offwhite">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6 p-8"
        >
          <div className="w-16 h-16 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin mx-auto" />
          <p className="text-brand-brown/70 font-bold text-lg">Verifying your payment...</p>
        </motion.div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-offwhite px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-black font-playfair text-brand-brown">
            Payment Verification Issue
          </h1>
          <p className="text-brand-brown/70">
            We couldn&apos;t verify your payment right now. Don&apos;t worry, if your payment was
            successful, it will be reflected shortly. Please check your email for confirmation.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-pink text-white rounded-full font-bold hover:bg-brand-pink-dark transition-all"
          >
            Return Home <ArrowRight size={18} />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-offwhite flex items-center justify-center px-4 py-16">
      {/* Confetti-like background dots */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 400 + Math.random() * 600],
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10px",
              backgroundColor: ["#BF3475", "#F4A261", "#4A2C2A", "#E76F51"][
                Math.floor(Math.random() * 4)
              ],
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10"
      >
        {/* Header gradient stripe */}
        <div className="h-2 bg-gradient-to-r from-brand-pink via-brand-terra to-brand-pink" />

        <div className="p-8 md:p-12 text-center space-y-8">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto"
          >
            <CheckCircle2 size={48} className="text-green-500" />
          </motion.div>

          {/* Thank you message */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-black font-playfair text-brand-brown"
            >
              Thank You{donationInfo?.donorName ? `, ${donationInfo.donorName.split(" ")[0]}` : ""}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-brand-brown/70 text-lg"
            >
              Your generosity is making a real difference.
            </motion.p>
          </div>

          {/* Donation amount card */}
          {donationInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-brand-offwhite rounded-2xl p-6 border border-brand-brown/5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-brand-brown/40 mb-2">
                Your Donation
              </p>
              <p className="text-4xl font-black font-playfair text-brand-pink">
                {formatCurrency(donationInfo.amount)}
              </p>
              <p className="text-sm text-brand-brown/50 mt-2">
                A receipt will be sent to {donationInfo.donorEmail}
              </p>

              {donationInfo.receiptUrl && (
                <a
                  href={donationInfo.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-brown border border-brand-brown text-white rounded-xl font-bold text-sm hover:!bg-brand-pink hover:!border-brand-pink transition-all w-full md:w-auto"
                >
                  <Copy size={16} /> Download PDF Receipt
                </a>
              )}
            </motion.div>
          )}

          {/* Impact message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 text-left bg-brand-pink/5 rounded-2xl p-5 border border-brand-pink/10"
          >
            <Heart size={24} className="text-brand-pink shrink-0" fill="currentColor" />
            <p className="text-sm text-brand-brown/80">
              Every contribution, big or small, helps us empower communities through education,
              healthcare, and sustainable development across India.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 pt-2"
          >
            <Link
              href="/campaigns"
              className="flex items-center justify-center gap-2 w-full py-4 bg-brand-pink text-white rounded-xl font-bold text-lg hover:bg-brand-pink-dark transition-all shadow-lg shadow-brand-pink/20 hover:-translate-y-0.5"
            >
              Explore More Campaigns <ArrowRight size={20} />
            </Link>

            <div className="flex gap-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-offwhite border border-brand-brown/10 rounded-xl font-bold text-sm text-brand-brown hover:border-brand-pink/30 transition-all"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy Link
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Support Yuva Ekta India Foundation",
                      text: "I just donated to Yuva Ekta India Foundation. Join me in making a difference!",
                      url: SITE.url + "/campaigns",
                    });
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-offwhite border border-brand-brown/10 rounded-xl font-bold text-sm text-brand-brown hover:border-brand-pink/30 transition-all"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/"
              className="text-sm font-bold text-brand-brown/40 hover:text-brand-pink transition-colors"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-brand-offwhite">
          <div className="text-center space-y-6 p-8">
            <div className="w-16 h-16 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin mx-auto" />
            <p className="text-brand-brown/70 font-bold text-lg">Loading...</p>
          </div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}

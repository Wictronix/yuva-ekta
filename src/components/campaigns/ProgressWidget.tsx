"use client";

import { type Campaign } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";

interface ProgressWidgetProps {
  campaign: Campaign;
  onDonateClick: (amount?: number) => void;
}

export default function ProgressWidget({ campaign, onDonateClick }: ProgressWidgetProps) {
  const progress = campaign.campaign_goal 
    ? Math.min(100, Math.round((campaign.amount_raised / campaign.campaign_goal) * 100))
    : 0;

  return (
    <div className="desi-card sticky top-24 bg-white border border-brand-pink/20 shadow-xl shadow-brand-pink/5 p-6 md:p-8">
      {campaign.campaign_goal && (
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-brown/40 mb-2">Campaign Goal</p>
          <p className="text-3xl font-black font-playfair text-brand-brown">{formatCurrency(campaign.campaign_goal)}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <div className="w-full bg-brand-offwhite rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-brand-pink rounded-full transition-all duration-1000 relative"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="font-bold text-brand-brown">{formatCurrency(campaign.amount_raised)}</span>
            <span className="text-brand-brown/60"> raised</span>
          </div>
          <span className="font-bold text-brand-pink">{progress}%</span>
        </div>
      </div>

      {campaign.target_people && (
        <div className="mb-8 p-4 bg-brand-green-tint/50 rounded-xl flex items-center gap-3 border border-brand-green/20">
          <div className="w-8 h-8 rounded-full bg-brand-green flex flex-shrink-0 items-center justify-center text-white text-lg">
            👥
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-brand-green-dark tracking-wider mb-0.5">Target Impact</p>
            <p className="font-bold text-brand-brown">{campaign.target_people} people</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => onDonateClick()}
        className="w-full py-4 bg-brand-pink text-white rounded-xl font-black text-lg hover:bg-brand-pink-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-pink/30 mb-4"
      >
        Donate to This Campaign
      </button>

      <p className="text-xs text-center text-brand-brown/50 leading-relaxed px-2">
        🔒 Secure payment via Razorpay. 80G tax receipt sent to your email immediately after payment.
      </p>
    </div>
  );
}

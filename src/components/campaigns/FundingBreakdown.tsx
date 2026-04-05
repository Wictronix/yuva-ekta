import { type FundingBreakdownItem } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";

export default function FundingBreakdown({ breakdown }: { breakdown: FundingBreakdownItem[] }) {
  if (!breakdown || breakdown.length === 0) return null;

  return (
    <div className="desi-card bg-white border border-brand-brown/5">
      <div className="mb-8">
        <h3 className="text-2xl font-black font-playfair text-brand-brown mb-2">How Your Donation Is Used</h3>
        <p className="text-brand-brown/60 text-sm">
          Every rupee is accounted for. Here is exactly how funds raised for this campaign are deployed.
        </p>
      </div>

      <div className="space-y-6">
        {breakdown.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="font-bold text-brand-brown">{item.label}</span>
              <div className="text-right">
                <span className="font-bold text-brand-pink mr-3">{formatCurrency(item.amount)}</span>
                <span className="text-xs font-bold text-brand-brown/40">{item.percentage}%</span>
              </div>
            </div>
            <div className="w-full bg-brand-offwhite rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-brand-green rounded-full opacity-80"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-brand-brown/5">
        <p className="text-xs text-brand-brown/40 italic">
          * Amounts shown are based on monthly or per-unit costs. Total impact scales as the campaign reaches its goal.
        </p>
      </div>
    </div>
  );
}

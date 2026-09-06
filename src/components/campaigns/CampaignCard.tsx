"use client";

import Link from "next/link";
import Image from "next/image";
import { type Campaign } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Pick<Campaign, "id" | "slug" | "title" | "short_desc" | "cover_image_url" | "category" | "campaign_goal" | "amount_raised" | "target_people">;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = campaign.campaign_goal 
    ? Math.min(100, Math.round((campaign.amount_raised / campaign.campaign_goal) * 100))
    : 0;

  return (
    <div className="flex flex-col h-full overflow-hidden group p-0 pb-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-brown/5 hover:-translate-y-1 transition-all duration-300">
      {/* Cover Image */}
      <Link href={`/campaigns/${campaign.slug}`} className="relative h-56 w-full overflow-hidden block">
        {campaign.cover_image_url ? (
          <Image
            src={campaign.cover_image_url}
            alt={campaign.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-pink/10 flex items-center justify-center">
            <span className="text-brand-pink/40 font-playfair italic">No Image</span>
          </div>
        )}
        
        {campaign.category && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-brand-brown px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-black/5">
            {campaign.category}
          </div>
        )}
      </Link>

      <div className="px-6 pt-6 flex flex-col flex-grow">
        {/* Title & Desc */}
        <div className="mb-6 flex-grow">
          <Link href={`/campaigns/${campaign.slug}`} className="hover:text-brand-pink transition-colors">
            <h3 className="text-2xl font-black font-playfair text-brand-brown mb-2 line-clamp-1">
              {campaign.title}
            </h3>
          </Link>
          <p className="text-brand-brown/70 text-sm leading-relaxed line-clamp-2 font-inter">
            {campaign.short_desc}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-3 mb-6">
          <div className="w-full bg-brand-offwhite rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-brand-pink rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/60 mb-1">Raised</p>
              <p className="font-bold text-brand-brown text-base">{formatCurrency(campaign.amount_raised)}</p>
            </div>
            {campaign.campaign_goal && (
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-brown/60 mb-1">Goal</p>
                <p className="font-bold text-brand-brown/80 text-base">{formatCurrency(campaign.campaign_goal)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Target People Note */}
        {campaign.target_people && (
          <div className="mb-6 pb-6 border-b border-brand-brown/5 text-xs text-brand-brown/70 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Reaching {campaign.target_people} people
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link 
            href={`/campaigns/${campaign.slug}`}
            className="block w-full py-4 bg-brand-pink !text-white rounded-2xl font-black text-sm tracking-wide hover:bg-brand-pink-dark transition-all duration-200 shadow-md shadow-brand-pink/25 hover:shadow-lg hover:shadow-brand-pink/35 text-center active:scale-[0.98]"
          >
            <span className="text-white font-black">Donate Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

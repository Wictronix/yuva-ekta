import { createClient } from "@/lib/supabase/server";
import CampaignCard from "@/components/campaigns/CampaignCard";
import Link from "next/link";

export default async function FeaturedCampaigns() {
  const supabase = (await createClient()) as any;
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, slug, title, short_desc, cover_image_url, category, campaign_goal, amount_raised, target_people")
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (!campaigns || campaigns.length === 0) return null;

  return (
    <section className="py-24 bg-brand-offwhite/50">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-pink font-bold text-[10px] uppercase tracking-[0.4em] block">
            Make an Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-brown font-playfair">
            Featured Campaigns
          </h2>
          <p className="text-brand-brown/70 max-w-2xl mx-auto text-lg">
            Choose a cause that speaks to you. Every campaign is a verified need,
            funded directly by donors like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.slice(0, 3).map((campaign: any) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center px-8 py-4 bg-white border border-brand-brown/10 text-brand-brown rounded-full font-bold text-sm hover:border-brand-pink hover:text-brand-pink transition-all shadow-sm group"
          >
            View All Campaigns
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

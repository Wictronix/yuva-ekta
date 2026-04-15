import { createClient } from "@/lib/supabase/server";
import CampaignsHero from "@/components/sections/CampaignsHero";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { constructMetadata } from "@/lib/seo";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = constructMetadata({
  title: "NGO Campaigns in Gurugram | Support Education & Health",
  description: "Join Yuva Ekta foundation campaigns in Gurugram. Support education, healthcare, and women empowerment. All donations are 80G tax-exempt.",
});

export const revalidate = 60;

export default async function CampaignsList(props: {
  searchParams?: Promise<{ category?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryParam = searchParams?.category;
  const sortParam = searchParams?.sort;

  const supabase = (await createClient()) as any;

  let query = supabase
    .from("campaigns")
    .select("id, slug, title, short_desc, cover_image_url, category, campaign_goal, amount_raised, target_people")
    .neq("status", "archived");

  if (categoryParam && categoryParam !== "all") {
    query = query.eq("category", categoryParam);
  }

  if (sortParam === "urgent") {
    // Sort by lowest percentage funded (assuming goal > 0)
    query = query.order("amount_raised", { ascending: true });
  } else if (sortParam === "most_funded") {
    query = query.order("amount_raised", { ascending: false });
  } else {
    // Default: newest first
    query = query.order("created_at", { ascending: false });
  }

  const { data: campaigns, error } = await query;

  return (
    <main className="min-h-screen bg-brand-offwhite/30">
      <CampaignsHero
        title="Verified Campaigns"
        subtitle="Directly support grassroot initiatives that transform lives in Gurugram. 100% Transparency. 100% Impact."
        imageUrl="/campaign/yuva_ekta_02.jpeg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Campaigns" }
        ]}
      />


      <section className="py-20 md:py-32">
        <div className="container">

          {/* Filters Bar */}
          <div id="campaigns-grid" className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-brand-brown/5 mb-16 flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              {[
                { label: "All Campaigns", val: "all" },
                { label: "Education", val: "education" },
                { label: "Health", val: "health" },
                { label: "Livelihood", val: "livelihood" },
              ].map((cat) => (
                <Link
                  key={cat.val}
                  href={`/campaigns${cat.val === 'all' ? '' : `?category=${cat.val}`}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${(categoryParam === cat.val) || (!categoryParam && cat.val === 'all')
                      ? "bg-brand-pink text-white shadow-md shadow-brand-pink/20"
                      : "bg-brand-offwhite text-brand-brown hover:bg-brand-pink/10"
                    }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-brown/40">Sort by</span>
              <select className="bg-brand-offwhite border-none rounded-xl px-4 py-2.5 font-bold text-sm text-brand-brown focus:ring-2 focus:ring-brand-pink/20 outline-none">
                <option value="newest">Newest</option>
                <option value="urgent">Most Urgent</option>
                <option value="funded">Most Funded</option>
              </select>
            </div>
          </div>

          {/* Campaign Grid */}
          {!campaigns || campaigns.length === 0 ? (
            <div className="desi-card p-16 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🌱</div>
              <h3 className="text-2xl font-black font-playfair text-brand-brown mb-4">No Campaigns Found</h3>
              <p className="text-brand-brown/70 leading-relaxed mb-8">
                We couldn't find any campaigns matching this filter. Browse all campaigns or check back soon - new campaigns are added regularly.
              </p>
              <Link href="/campaigns" className="text-brand-pink font-bold hover:underline decoration-2 underline-offset-4">
                View All Campaigns
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign: any) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Missing bottom CTA */}
      <div className="mb-24">
        <CTABanner />
      </div>

    </main>
  );
}

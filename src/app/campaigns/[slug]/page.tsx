import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CampaignDetail from "@/components/campaigns/CampaignDetail";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const { data: campaign } = await supabase
    .from("campaigns")
    .select("title, short_desc")
    .eq("slug", params.slug)
    .single();

  if (!campaign) return constructMetadata({ title: 'Campaign Not Found' });

  return constructMetadata({
    title: `${campaign.title}`,
    description: campaign.short_desc,
  });
}

export const revalidate = 60; // ISR revalidate every 60s

export default async function CampaignPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: campaign, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !campaign) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <CampaignDetail campaign={campaign} />
    </main>
  );
}

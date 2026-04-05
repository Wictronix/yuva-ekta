import { createClient } from "@/lib/supabase/server";
import CampaignsClient from "./CampaignsClient";

export const revalidate = 0;

export default async function CampaignsPage() {
  const supabase = (await createClient()) as any;
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  return <CampaignsClient campaigns={campaigns || []} />;
}

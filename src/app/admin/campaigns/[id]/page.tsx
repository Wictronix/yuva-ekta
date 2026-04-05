import { createClient } from "@/lib/supabase/server";
import CampaignForm from "@/components/admin/CampaignForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  const supabase = (await createClient()) as any;
  const { id } = await params;

  const { data: campaign, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !campaign) {
    notFound();
  }

  return <CampaignForm initialData={campaign} />;
}

import { createClient } from "@/lib/supabase/server";
import DonationsClient from "./DonationsClient";

export const revalidate = 0;

export default async function DonationsPage() {
  const supabase = (await createClient()) as any;
  const { data: donations } = await supabase
    .from("donations")
    .select("*, donor:donors(*), campaign:campaigns(id, title)")
    .order("created_at", { ascending: false });

  return <DonationsClient donations={donations || []} />;
}

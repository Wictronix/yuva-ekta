import { createClient } from "@/lib/supabase/server";
import type { DonationWithDonor } from "@/lib/supabase/types";
import DonationsClient from "./DonationsClient";

export const revalidate = 0;

export default async function DonationsPage() {
  const supabase = await createClient();
  const { data: donations } = await supabase
    .from("donations")
    .select("*, donor:donors(*), campaign:campaigns(id, title)")
    .order("created_at", { ascending: false });

  return <DonationsClient donations={(donations as unknown as DonationWithDonor[]) || []} />;
}

import { createClient } from "@/lib/supabase/server";
import DonorsClient from "./DonorsClient";

export const revalidate = 0;

export default async function DonorsPage() {
  const supabase = (await createClient()) as any;
  const { data: donors } = await supabase.from("donors").select("*").order("created_at", { ascending: false });

  return <DonorsClient donors={donors || []} />;
}

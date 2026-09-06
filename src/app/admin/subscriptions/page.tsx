import { createClient } from "@/lib/supabase/server";
import type { SubscriptionWithDonor } from "@/lib/supabase/types";
import SubscriptionsClient from "./SubscriptionsClient";

export const revalidate = 0;

export default async function SubscriptionsPage() {
  const supabase = await createClient();
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*, donor:donors(*), campaign:campaigns(id, title)")
    .order("created_at", { ascending: false });

  return <SubscriptionsClient subscriptions={(subscriptions as unknown as SubscriptionWithDonor[]) || []} />;
}

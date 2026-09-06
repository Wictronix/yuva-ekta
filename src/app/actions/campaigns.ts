"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CampaignInsert, CampaignUpdate } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

export async function createCampaignAction(formData: CampaignInsert) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // Validate admin user
  if (authError || !user) {
    return { error: "Unauthorized. Admin authentication required." };
  }

  const adminClient = createAdminClient();

  try {
    const { data, error } = await adminClient
      .from("campaigns")
      .insert([formData])
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin");
    revalidatePath("/admin/campaigns");
    revalidatePath("/campaigns");
    revalidatePath("/");

    return { data };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function updateCampaignAction(id: string, formData: CampaignUpdate) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized. Admin authentication required." };
  }

  const adminClient = createAdminClient();

  try {
    const { data, error } = await adminClient
      .from("campaigns")
      .update(formData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin");
    revalidatePath("/admin/campaigns");
    revalidatePath("/campaigns");
    revalidatePath(`/campaigns/${data.slug}`);
    revalidatePath("/");

    return { data };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

export async function deleteCampaignAction(id: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized. Admin authentication required." };
  }

  const adminClient = createAdminClient();

  try {
    const { error } = await adminClient
      .from("campaigns")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin");
    revalidatePath("/admin/campaigns");
    revalidatePath("/campaigns");
    revalidatePath("/");

    return { success: true };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
}

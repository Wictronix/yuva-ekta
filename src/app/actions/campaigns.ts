"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function createCampaignAction(formData: any) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Validate admin session
  if (!session) {
    return { error: "Unauthorized. Admin session required." };
  }

  const adminClient = createAdminClient();

  try {
    const { data, error } = await (adminClient as any)
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
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateCampaignAction(id: string, formData: any) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { error: "Unauthorized. Admin session required." };
  }

  const adminClient = createAdminClient();

  try {
    const { data, error } = await (adminClient as any)
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
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteCampaignAction(id: string) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { error: "Unauthorized. Admin session required." };
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
  } catch (error: any) {
    return { error: error.message };
  }
}

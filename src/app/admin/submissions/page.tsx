import { createClient } from "@/lib/supabase/server";
import type { FormSubmission } from "@/lib/supabase/types";
import SubmissionsClient from "@/app/admin/submissions/SubmissionsClient";

export const revalidate = 0;

export default async function SubmissionsPage() {
  let initialSubmissions: FormSubmission[] = [];
  let tableConfigured = true;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not query form_submissions:", error.message);
      tableConfigured = false;
    } else if (data) {
      initialSubmissions = data;
    }
  } catch (err) {
    console.warn("form_submissions connection failed:", err);
    tableConfigured = false;
  }

  return (
    <SubmissionsClient 
      initialSubmissions={initialSubmissions} 
      tableConfigured={tableConfigured} 
    />
  );
}

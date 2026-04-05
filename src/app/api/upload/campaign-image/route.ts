import { NextResponse } from "next/server";
import { getPresignedUploadUrl, BUCKET_ASSETS } from "@/lib/r2";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: "Missing filename or content type" }, { status: 400 });
    }

    // 2. Generate unique key in 'campaigns' folder within 'yuva-ekta-assets' bucket
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const key = `campaigns/${uniqueId}-${safeFilename}`;

    // 3. Generate presigned URL
    const { uploadUrl, publicUrl } = await getPresignedUploadUrl(BUCKET_ASSETS, key, contentType);

    return NextResponse.json({ uploadUrl, publicUrl });
  } catch (error: any) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}

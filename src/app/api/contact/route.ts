import { NextResponse } from "next/server";
import { getResend, EMAIL_FROM, EMAIL_REPLY_TO } from "@/lib/resend";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubmissionType } from "@/lib/supabase/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      type = "contact", 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      skills, 
      availability,
      company_name,
      thematic_focus,
      budget_range
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const submissionType: SubmissionType = ["volunteer", "csr"].includes(type) ? type : "contact";

    // 1. Save to Supabase form_submissions table
    try {
      const supabaseAdmin = createAdminClient();
      const { error: dbError } = await supabaseAdmin.from("form_submissions").insert({
        type: submissionType,
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        company_name: company_name?.trim() || null,
        thematic_focus: thematic_focus?.trim() || null,
        budget_range: budget_range?.trim() || null,
        subject: subject?.trim() || null,
        message: message?.trim() || null,
        skills: skills?.trim() || null,
        availability: availability?.trim() || null,
        status: "unread",
      });

      if (dbError) {
        console.error("Supabase insert form_submissions error:", dbError);
      }
    } catch (dbErr) {
      console.error("Failed to connect or save to form_submissions in Supabase:", dbErr);
    }

    // 2. Format email notification
    const isVolunteer = submissionType === "volunteer";
    const isCSR = submissionType === "csr";

    let emailSubject = `Website Inquiry: ${subject || "General"} from ${name.trim()}`;
    if (isVolunteer) {
      emailSubject = `New Volunteer Registration from ${name.trim()}`;
    } else if (isCSR) {
      emailSubject = `CSR Proposal Request: ${company_name || name.trim()} (${thematic_focus || "General"})`;
    }

    const submissionTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #BF3475; padding: 24px; color: #fff; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">Yuva Ekta India Foundation</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">${isVolunteer ? "New Volunteer Application" : "New Website Enquiry"}</p>
        </div>
        <div style="padding: 24px; background: #faf8f5;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%;">Submission Type:</td>
              <td style="padding: 8px 0;">${isVolunteer ? "Volunteer Application" : "General / CSR / Media Enquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #BF3475;">${email.trim()}</a></td>
            </tr>
            ${company_name ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px 0;">${company_name}</td>
            </tr>` : ""}
            ${thematic_focus ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Thematic Focus:</td>
              <td style="padding: 8px 0;">${thematic_focus}</td>
            </tr>` : ""}
            ${budget_range ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Budget Range:</td>
              <td style="padding: 8px 0;">${budget_range}</td>
            </tr>` : ""}
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>` : ""}
            ${subject ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Subject / Category:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>` : ""}
            ${availability ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Availability:</td>
              <td style="padding: 8px 0;">${availability}</td>
            </tr>` : ""}
            ${skills ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Skills / Background:</td>
              <td style="padding: 8px 0;">${skills}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Time:</td>
              <td style="padding: 8px 0;">${submissionTime} (IST)</td>
            </tr>
          </table>

          ${message ? `
          <div style="margin-top: 20px; padding: 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e0d8;">
            <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 13px; color: #593414;">Message:</p>
            <p style="margin: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ""}
        </div>
        <div style="padding: 16px; font-size: 11px; text-align: center; color: #888; background: #fff; border-top: 1px solid #eee;">
          Sent via Yuva Ekta Official Website Portal
        </div>
      </div>
    `;

    try {
      const resend = getResend();
      await resend.emails.send({
        from: `Yuva Ekta Portal <${EMAIL_FROM}>`,
        replyTo: email,
        to: [EMAIL_REPLY_TO, "yuvaekta2018@gmail.com"],
        subject: emailSubject,
        html: htmlContent,
      });
    } catch (emailErr) {
      console.error("Failed to send contact notification email:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your submission has been received.",
    });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

# PROJECT OVERVIEW
## Yuva Ekta India Foundation — Official Website

---

## What Is This?

A **static, no-backend public website** for Yuva Ekta India Foundation (YEIF) — a registered NGO based in Gurugram, Haryana, working on grassroot community development across Education, Livelihood, Health & Nutrition, and Environment.

The website will serve as the NGO's **primary digital presence** — communicating impact, describing programs, and enabling donations through a third-party payment gateway redirect (no backend required).

---

## Who Is It For?

### Primary Audiences

| Audience | Goal |
|---|---|
| **Individual donors** | Understand the cause, feel connected to the mission, donate easily |
| **Corporate CSR teams** | Evaluate YEIF for CSR partnership, review credentials and compliance |
| **Volunteers** | Learn how to contribute time and skills |
| **Grant organisations / foundations** | Review legal standing, projects, and impact before funding |
| **Community members & beneficiaries** | Find program info and contact details |
| **Media & journalists** | Access background, photos, and contact for coverage |

---

## Core Purpose

1. **Build trust** — Show legal registrations, tax certifications (80G, 12A, CSR-1, NITI Aayog), and transparent fund utilization
2. **Tell the story** — Use real numbers, real communities, and real programs to inspire giving
3. **Enable donations** — Redirect to Razorpay / UPI payment page; show a thank-you page after successful payment
4. **Drive engagement** — Volunteer sign-ups, social media links, newsletter opt-in (via third-party form embed e.g. Google Forms / Mailchimp)

---

## What This Website Is NOT

- Not an admin dashboard
- Not a donor login portal
- Not a CMS with editable content (static HTML/CSS/JS only)
- Not dependent on any database or server-side code
- Not a campaign fundraising platform (no recurring billing logic on our side)

---

## Key Constraints

- **No backend / no database** — all pages are static HTML, CSS, JavaScript
- **Donation flow** — handled entirely by third-party gateway (Razorpay Payment Page, Instamojo, or UPI deep link); our site only redirects and shows a thank-you page on return
- **Hosting** — can be deployed to GitHub Pages, Netlify, or Vercel free tier
- **Maintenance** — non-technical team members must be able to update content; use simple HTML or a no-code-friendly structure

---

## Donation Flow (No Backend)

```
User clicks "Donate Now"
        ↓
Chooses amount + project (optional)
        ↓
Redirects to Razorpay Payment Page (pre-configured hosted page)
or opens UPI deep link (Q64836034@ybl)
        ↓
Payment completed on Razorpay side
        ↓
Razorpay redirects user back to /thank-you.html
        ↓
Thank You page shows confirmation message + social share buttons
```

> **Note:** No webhook or server needed. Razorpay's hosted payment page handles everything. The thank-you page is shown after redirect — it does not verify the transaction (that's handled by Razorpay's email receipt).

---

## Success Metrics

- Visitor can understand YEIF's mission within 10 seconds of landing
- Donor can complete a donation in under 3 clicks
- CSR partner can find legal compliance info without contacting anyone
- Mobile experience is seamless (70%+ Indian users are mobile-first)

---

## Project Details

| Field | Detail |
|---|---|
| **Organisation** | Yuva Ekta India Foundation |
| **Reg. Number** | 03485 (Haryana Societies Act 2012) |
| **PAN** | AAATY6815D |
| **80G / 12A / CSR-1** | Yes — all active |
| **NITI Aayog** | Registered |
| **Founded** | 21 November 2018 |
| **Founder** | Mr. Balram Kumar |
| **Website domain (proposed)** | yuvaektaindiafoundation.org |
| **Bank** | Union Bank of India |
| **UPI** | Q64836034@ybl |

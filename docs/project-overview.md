# project-overview.md
## Yuva Ekta India Foundation — Version 2 Website

---

## What This Is

A **full-stack NGO donation platform** built on top of the existing static frontend at
`www.yuvaektaindiafoundation.com`. Version 2 upgrades the site from a brochure with a
Razorpay redirect into a complete donation infrastructure — with a campaign management
system, Razorpay-powered one-time and recurring payments, automated donor emails with
downloadable 80G receipts, and a private admin portal to manage everything.

The site has **no donor login**. A donor visits, donates, gets an email with their receipt,
and leaves. All data management happens in the admin portal behind a protected route.

---

## What Already Exists (v1)

The live frontend at `www.yuvaektaindiafoundation.com` already has:
- Home, About, Projects, Impact, Contact pages (Next.js, fully built)
- Brand design system (Playfair Display + Inter, brand-pink `#BF3475`, brand-green `#6FA656`)
- Static content for all four projects and seven community programmes
- A `/donate` page that currently redirects to Razorpay hosted page (no backend)

**v2 builds on top of this — it does not replace the existing pages.**

---

## What v2 Adds

| Feature | Description |
|---|---|
| **Donation System** | Razorpay integration for one-time payments (Orders API) and recurring subscriptions (Subscriptions API). Single modal handles both modes. |
| **Donor Data Storage** | Supabase stores every donor's Name, Email, Phone, and full donation details on payment success |
| **Automated Donor Emails** | Custom HTML email sent to donor on payment success with transaction summary and a downloadable PDF receipt (80G-ready) |
| **Campaign Backend** | Campaigns created and managed from admin portal; fetched by the frontend from Supabase. Replaces hardcoded project data. |
| **Donation Modal** | Single modal component — two tabs (One-time / Recurring), preset + custom amounts, transaction fee toggle, donor form |
| **Admin Portal** | Protected `/admin` route. Full CRUD on campaigns, donors, donations. Filters, exports, image upload to Cloudflare R2. |

---

## Who Uses This System

| User | What they do | Auth |
|---|---|---|
| **Visitor / Donor** | Browses campaigns, donates via modal, receives email receipt | None — no login required |
| **Admin** | Manages campaigns, views donor data, downloads reports | Username + password (Supabase Auth, single admin user) |

---

## Donation Flow (v2)

```
Visitor lands on any page with "Donate Now" button
          ↓
Donation modal opens (one-time or recurring tab)
          ↓
Donor selects/enters amount → optional: selects campaign
Optional: adds transaction fee on top
          ↓
Donor fills form: Name, Email, Phone
          ↓
"Proceed to Pay" clicked
          ↓
[One-time]  → Next.js API Route creates Razorpay Order
                → Razorpay Checkout opens (in-page, not redirect)
                → Payment success webhook fires
                → API route saves donor + donation to Supabase
                → API route sends email (custom HTML + PDF receipt)

[Recurring] → Next.js API Route creates Razorpay Subscription
                → Razorpay Checkout opens
                → First charge webhook fires
                → API route saves donor + subscription to Supabase
                → API route sends email
                → Subsequent charge webhooks update Supabase
          ↓
Donor sees success state in modal (no page redirect needed)
          ↓
Donor receives email with HTML receipt + PDF download link
```

---

## Campaign Data Model (Overview)

Each campaign in Supabase holds:
- `title` — display name
- `short_description` — 1–2 lines for cards
- `long_description` — full rich text for campaign detail page
- `target_people` — number of beneficiaries aimed for
- `campaign_goal` — total ₹ fundraising target
- `amount_raised` — live running total (updated by webhook)
- `funding_breakdown` — JSON array of budget line items
- `products` — JSON array of donatable items (name, impact statement, price)
- `updates` — JSON array of field updates / impact reports
- `cover_image_url` — Cloudflare R2 URL (set from admin)
- `category`, `status`, `is_featured`, `ends_at`

---

## Admin Portal (Overview)

Three main sections:
1. **Campaigns** — create, edit, delete, archive campaigns; upload images to R2
2. **Donors** — view all donor records, search by name/email/phone, export CSV
3. **Donations** — view all transactions, filter by date/campaign/status, download individual receipts, export CSV

---

## Key Technical Decisions

| Decision | Choice | Reason |
|---|---|---|
| Payment in-page vs redirect | In-page (Razorpay Checkout JS) | Better UX; no loss of modal state; works with recurring too |
| Email service | Resend | Best HTML email API for Next.js; reliable deliverability in India; free tier 3,000/month |
| PDF generation | `@react-pdf/renderer` | Server-side React → PDF; no Puppeteer overhead |
| Image storage | Cloudflare R2 | S3-compatible; free egress; admin uploads via signed URL |
| Admin auth | Supabase Auth (single user) | No need for multi-user roles; simple email+password |
| Webhook verification | Razorpay HMAC signature | Prevents fake payment confirmations |
| Recurring payments | Razorpay Subscriptions API | Native Indian recurring payment support; no Stripe needed |

---

## What This Is NOT

- Not a donor login portal (donors never create accounts)
- Not a multi-NGO marketplace (single NGO only)
- Not a CMS (campaigns managed in admin portal only)
- Not dependent on any external CMS (Contentful, Sanity, etc.)
- Not using Supabase Realtime for live donation feeds (static counts are fine)

---

## Organisation Details

| Field | Value |
|---|---|
| Organisation | Yuva Ekta India Foundation |
| Live URL | www.yuvaektaindiafoundation.com |
| Registration | Haryana Societies Act 2012, Reg. No. 03485 |
| PAN | AAATY6815D |
| 80G / 12A / CSR-1 | All active |
| NITI Aayog | Registered |
| Founded | 21 November 2018 |
| Founder | Mr. Balram Kumar |
| Contact | yuvaekta2018@gmail.com |
| UPI | Q64836034@ybl |
| Bank | Union Bank of India, A/C 220711100001158, IFSC UBIN0565091 |

---

## Success Criteria

- A visitor can go from landing page to completed donation in under 3 minutes
- A donor receives their email receipt within 60 seconds of payment success
- The admin can create a new campaign (with image) in under 5 minutes
- Zero server code runs during a page visit — only on payment initiation and webhook
- The site passes Google PageSpeed score ≥ 85 on mobile

# tech-stack.md
## Yuva Ekta India Foundation — v2 Full Stack

---

## Core Stack

| Layer | Technology | Version | Role |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14+ | Frontend pages + API Routes (server actions for payment, email, webhook) |
| **Language** | TypeScript | 5+ | End-to-end type safety — frontend, API routes, Supabase types |
| **Styling** | Tailwind CSS | 3.4+ | All styling — extends existing v1 brand config |
| **UI Components** | shadcn/ui | Latest | Accessible Radix primitives — Dialog, Tabs, Select, Toast, Table used for modal + admin |
| **Icons** | Lucide React | Latest | Consistent with existing v1 icons |
| **Fonts** | next/font | — | Playfair Display + Inter (unchanged from v1) |
| **Database** | Supabase (PostgreSQL) | Latest | Campaigns, donors, donations, subscriptions, admin auth |
| **Auth** | Supabase Auth | — | Single admin user — email + password; JWT stored in cookie |
| **Storage** | Cloudflare R2 | — | Campaign cover images + any media; accessed via pre-signed S3-compatible URLs |
| **Payments** | Razorpay | Latest SDK | One-time Orders API + Subscriptions API |
| **Email** | Resend | Latest | Transactional HTML emails to donors; 3,000 free/month |
| **PDF** | @react-pdf/renderer | Latest | Server-side PDF receipt generation; streamed as attachment |
| **Code Editor** | Antigravity | — | AI-assisted development environment |
| **Deployment** | Vercel | — | Native Next.js host; environment variables for all secrets |

---

## Project Structure

```
yuva-ekta-foundation/          ← existing v1 repo, extended
│
├── app/
│   ├── layout.tsx             ← unchanged from v1
│   ├── page.tsx               ← HOME — updated: campaigns fetched from Supabase
│   ├── about/page.tsx         ← unchanged from v1
│   ├── projects/page.tsx      ← unchanged from v1 (static projects stay)
│   ├── impact/page.tsx        ← unchanged from v1
│   ├── contact/page.tsx       ← unchanged from v1
│   ├── donate/page.tsx        ← updated: now opens DonationModal
│   ├── thank-you/page.tsx     ← updated: shown after modal success
│   ├── campaigns/
│   │   ├── page.tsx           ← NEW: /campaigns listing page
│   │   └── [slug]/page.tsx    ← NEW: /campaigns/[slug] detail page
│   ├── admin/                 ← NEW: entire admin portal
│   │   ├── layout.tsx         ← Admin layout with sidebar nav; auth guard
│   │   ├── page.tsx           ← /admin dashboard overview
│   │   ├── campaigns/
│   │   │   ├── page.tsx       ← campaign list + add/edit/delete
│   │   │   └── [id]/page.tsx  ← campaign edit form
│   │   ├── donors/
│   │   │   └── page.tsx       ← donor table with search/filter/export
│   │   ├── donations/
│   │   │   └── page.tsx       ← donation table with filter/download/export
│   │   └── subscriptions/
│   │       └── page.tsx       ← active subscriptions table; pause/cancel controls
│   ├── auth/
│   │   └── login/page.tsx     ← NEW: admin login page (not public)
│   └── not-found.tsx
│
├── app/api/                   ← NEW: all server-side logic lives here
│   ├── razorpay/
│   │   ├── create-order/route.ts        ← creates Razorpay Order for one-time
│   │   ├── create-subscription/route.ts ← creates Razorpay Subscription
│   │   ├── manage-subscription/route.ts ← pause or cancel an active subscription (admin only)
│   │   └── webhook/route.ts             ← receives Razorpay payment events
│   ├── email/
│   │   └── send-receipt/route.ts        ← sends HTML email via Resend
│   ├── pdf/
│   │   └── receipt/route.ts             ← generates PDF receipt, returns as stream
│   └── upload/
│       └── campaign-image/route.ts      ← generates R2 pre-signed upload URL
│
├── components/
│   ├── layout/                ← Navbar.tsx, Footer.tsx (unchanged)
│   ├── ui/                    ← shadcn/ui components (unchanged)
│   ├── donation/              ← NEW
│   │   ├── DonationModal.tsx         ← master modal (Dialog wrapper)
│   │   ├── DonationTabs.tsx          ← One-time / Recurring tab switcher
│   │   ├── AmountSelector.tsx        ← preset buttons + custom input
│   │   ├── TransactionFeeToggle.tsx  ← "Cover transaction fee" checkbox
│   │   ├── DonorForm.tsx             ← Name, Email, Phone fields
│   │   ├── PaymentButton.tsx         ← "Proceed to Pay" → Razorpay SDK call
│   │   └── DonationSuccess.tsx       ← post-payment success state in modal
│   ├── campaigns/             ← NEW
│   │   ├── CampaignCard.tsx          ← used on /campaigns and home
│   │   ├── CampaignDetail.tsx        ← full campaign page content
│   │   ├── FundingBreakdown.tsx      ← breakdown table / visual
│   │   ├── ProductGrid.tsx           ← "donate a product" cards
│   │   └── CampaignUpdates.tsx       ← impact/update feed
│   ├── admin/                 ← NEW
│   │   ├── AdminSidebar.tsx
│   │   ├── CampaignForm.tsx          ← create + edit campaign form
│   │   ├── ImageUploader.tsx         ← R2 upload via pre-signed URL
│   │   ├── DonorTable.tsx
│   │   ├── DonationTable.tsx
│   │   └── ExportButton.tsx          ← CSV export
│   └── shared/
│       ├── PageHero.tsx              ← unchanged
│       ├── SectionHeading.tsx        ← unchanged
│       └── StatCounter.tsx           ← unchanged
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts          ← browser Supabase client (for admin portal)
│   │   ├── server.ts          ← server Supabase client (for API routes)
│   │   └── types.ts           ← generated Supabase TypeScript types
│   ├── razorpay.ts            ← Razorpay SDK init + helper functions
│   ├── resend.ts              ← Resend client init
│   ├── r2.ts                  ← Cloudflare R2 S3-compatible client
│   ├── pdf.ts                 ← PDF receipt generation logic
│   ├── email-templates/
│   │   └── DonationReceipt.tsx ← React Email HTML template
│   ├── constants.ts           ← org details, nav links (unchanged from v1)
│   └── utils.ts               ← cn() + formatCurrency + formatDate helpers
│
├── public/                    ← existing images + new campaign images (before R2)
├── styles/globals.css         ← unchanged from v1
├── tailwind.config.ts         ← unchanged from v1
├── components.json            ← unchanged from v1
├── next.config.ts             ← updated: R2 domain added to images.domains
├── middleware.ts              ← NEW: protects /admin routes; redirects unauthenticated
└── .env.local
```

---

## Supabase Schema

### Table: `campaigns`

```sql
create table campaigns (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  short_desc      text not null,
  long_desc       text not null,             -- rich text / markdown
  cover_image_url text,                      -- Cloudflare R2 URL
  category        text,                      -- 'education', 'health', 'livelihood', 'environment'
  target_people   integer,
  campaign_goal   numeric(12,2),
  amount_raised   numeric(12,2) default 0,
  funding_breakdown jsonb,                   -- [{label, amount, percentage}]
  products        jsonb,                     -- [{name, impact, price, image_url}]
  updates         jsonb,                     -- [{date, title, body, image_url}]
  status          text default 'active',     -- 'active' | 'completed' | 'archived'
  is_featured     boolean default false,
  ends_at         timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
```

### Table: `donors`

```sql
create table donors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text not null,
  created_at  timestamptz default now()
);
-- No unique constraint on email — same person can donate without account
-- Deduplication logic optional in admin
```

### Table: `donations`

```sql
create table donations (
  id                  uuid primary key default gen_random_uuid(),
  donor_id            uuid references donors(id),
  campaign_id         uuid references campaigns(id),   -- nullable (general fund)
  razorpay_order_id   text,
  razorpay_payment_id text,
  razorpay_signature  text,
  amount              numeric(10,2) not null,           -- base amount in ₹
  fee_covered         boolean default false,
  fee_amount          numeric(10,2) default 0,
  total_charged       numeric(10,2) not null,           -- amount + fee if covered
  type                text not null,                    -- 'one_time' | 'recurring'
  status              text default 'pending',           -- 'pending' | 'captured' | 'failed' | 'refunded'
  receipt_url         text,                             -- R2 URL of generated PDF
  created_at          timestamptz default now()
);
```

### Table: `subscriptions`

```sql
create table subscriptions (
  id                       uuid primary key default gen_random_uuid(),
  donor_id                 uuid references donors(id),
  campaign_id              uuid references campaigns(id),
  razorpay_subscription_id text unique not null,
  plan_amount              numeric(10,2) not null,       -- ₹/month
  status                   text default 'created',      -- 'created' | 'active' | 'paused' | 'cancelled'
  started_at               timestamptz,
  paused_at                timestamptz,                  -- set when admin pauses via portal
  cancelled_at             timestamptz,                  -- set when admin cancels via portal
  admin_note               text,                         -- internal note on why paused/cancelled
  created_at               timestamptz default now()
);
```

### Table: `admin_settings`

```sql
create table admin_settings (
  key   text primary key,
  value text not null
);
-- Example rows:
-- key: 'transaction_fee_percent', value: '2.5'
-- key: 'razorpay_key_id', value: 'rzp_live_...' (or use env var — env var preferred)
```

### Row Level Security

```sql
-- All tables: no public read/write
-- Donations/donors/subscriptions: only accessible via service_role key (API routes)
-- Campaigns: public SELECT (so frontend can fetch); insert/update/delete = admin only

alter table campaigns  enable row level security;
alter table donors     enable row level security;
alter table donations  enable row level security;
alter table subscriptions enable row level security;

-- Campaigns: public can read active
create policy "public_read_campaigns"
  on campaigns for select
  using (status != 'archived');

-- Everything else: service_role only (API routes use service role key)
```

---

## Razorpay Integration

### One-time Payment Flow

```
1. Client calls POST /api/razorpay/create-order
   Body: { amount, currency: 'INR', campaignId?, donorName, donorEmail, donorPhone }

2. Server creates Razorpay Order via Razorpay Node SDK
   Returns: { orderId, amount, currency, keyId }

3. Client opens Razorpay Checkout (script loaded in _document or via useEffect)
   Options: { key, order_id, name, description, prefill: {name, email, contact} }

4. Donor completes payment on Razorpay modal

5. On success, Razorpay returns: { razorpay_payment_id, razorpay_order_id, razorpay_signature }

6. Client calls POST /api/razorpay/webhook (or a verify endpoint) with the three IDs

7. Server verifies HMAC signature:
   crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
     .update(order_id + '|' + payment_id)
     .digest('hex') === signature

8. On valid signature:
   - Insert donor into Supabase (donors table)
   - Insert donation into Supabase (donations table, status: 'captured')
   - Update campaign.amount_raised
   - Call email route to send receipt
   - Return { success: true }

9. Client shows DonationSuccess component
```

### Recurring Payment Flow

```
1. Client calls POST /api/razorpay/create-subscription
   Body: { planAmount, campaignId?, donorName, donorEmail, donorPhone }

2. Server creates Razorpay Plan (if not cached) then creates Subscription
   Returns: { subscriptionId, keyId }

3. Client opens Razorpay Checkout with subscription_id instead of order_id

4. Razorpay charges immediately and sets up mandate

5. Webhook fires for each charge:
   event: 'subscription.charged' or 'payment.captured'

6. Server webhook handler:
   - Verify signature
   - First charge: insert donor + subscription record + first donation record
   - Subsequent charges: insert new donation record, update subscription status
   - Send email receipt on each charge

7. Pause / Cancellation flow:
   - Donor replies to their receipt email requesting pause or cancellation
   - Admin receives the email reply (Resend reply-to is yuvaekta2018@gmail.com)
   - Admin goes to /admin/subscriptions → finds the donor → clicks Pause or Cancel
   - Admin portal calls POST /api/razorpay/manage-subscription
     Body: { subscriptionId, action: 'pause' | 'cancel', adminNote }
   - API calls Razorpay Subscriptions API to pause or cancel the plan
   - API updates Supabase subscriptions table:
       status → 'paused' or 'cancelled'
       paused_at / cancelled_at → now()
       admin_note → reason entered by admin
   - Razorpay webhook fires 'subscription.paused' or 'subscription.cancelled'
     confirming the state change (double-write safety)
```

### Transaction Fee Logic

```typescript
// lib/razorpay.ts
const FEE_PERCENT = parseFloat(process.env.TRANSACTION_FEE_PERCENT ?? '2.5')

export function calculateTotal(baseAmount: number, coverFee: boolean): {
  base: number
  fee: number
  total: number
} {
  const fee = coverFee ? Math.round(baseAmount * (FEE_PERCENT / 100) * 100) / 100 : 0
  return { base: baseAmount, fee, total: baseAmount + fee }
}
```

---

## Email (Resend)

### Trigger
API route `/api/razorpay/webhook` calls `/api/email/send-receipt` internally after saving to DB.

### Email content
- Custom HTML template (`lib/email-templates/DonationReceipt.tsx`) using React Email
- Donor name, amount, campaign name, transaction ID, date
- YEIF branding (brand-pink, logo, footer with 80G info)
- PDF receipt attached OR a download link to `/api/pdf/receipt?donationId=xxx`

### PDF Receipt
- Generated by `@react-pdf/renderer` on the server
- Contains: YEIF logo, donor details, amount, campaign, date, 80G declaration text, reg. number, PAN
- Stored in Cloudflare R2 at `receipts/{donationId}.pdf`
- Link in email expires never (public bucket for receipts) OR signed URL (7 days)

---

## Cloudflare R2

### Buckets
| Bucket | Contents | Access |
|---|---|---|
| `yeif-campaigns` | Campaign cover images, product images, update photos | Public read |
| `yeif-receipts` | Generated PDF receipts | Public read (via obscure UUID path) |

### Upload flow (admin image upload)
```
1. Admin selects image in CampaignForm
2. Client calls POST /api/upload/campaign-image
   Body: { filename, contentType }
3. Server generates pre-signed PUT URL via AWS SDK (R2 is S3-compatible)
4. Client uploads directly to R2 using the pre-signed URL (no server bandwidth used)
5. Client saves the public R2 URL to the campaign form field
6. Campaign saved to Supabase with cover_image_url = R2 public URL
```

### next.config.ts update
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',   // R2 public URL pattern
      }
    ]
  }
}
```

---

## Admin Auth (Supabase)

### Middleware (`middleware.ts`)
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (req.nextUrl.pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### Login
- Single admin user created manually in Supabase Auth dashboard
- Email + password login at `/auth/login`
- Session managed by Supabase Auth Helpers cookie
- Logout button in admin sidebar

---

## Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...       # server-only; never exposed to client

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx

# Resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=receipts@yuvaektaindiafoundation.com
EMAIL_REPLY_TO=yuvaekta2018@gmail.com

# Cloudflare R2
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_CAMPAIGNS=yeif-campaigns
R2_BUCKET_RECEIPTS=yeif-receipts
R2_PUBLIC_URL=https://pub-xxx.r2.dev   # public bucket URL

# App
NEXT_PUBLIC_SITE_URL=https://yuvaektaindiafoundation.com
TRANSACTION_FEE_PERCENT=2.5
```

---

## Key npm Packages

```bash
# Core (already in v1)
next, react, react-dom, typescript
tailwindcss, @tailwindcss/typography
shadcn/ui (via CLI)
lucide-react
framer-motion

# New in v2
@supabase/supabase-js               # Supabase client
@supabase/auth-helpers-nextjs       # Supabase auth + middleware
razorpay                            # Razorpay Node SDK (server-side)
resend                              # Email API
react-email @react-email/components # HTML email templates
@react-pdf/renderer                 # PDF generation
@aws-sdk/client-s3                  # Cloudflare R2 via S3-compatible API
@aws-sdk/s3-request-presigner       # Pre-signed upload URLs
zod                                 # Input validation on API routes
```

---

## Deployment

| Service | What it hosts |
|---|---|
| **Vercel** | Next.js app (frontend + API routes + webhooks) |
| **Supabase** | PostgreSQL database + Auth + (no storage — using R2 instead) |
| **Cloudflare R2** | Images and PDF receipts |

### Vercel webhook consideration
Razorpay webhooks POST to `/api/razorpay/webhook`. Vercel serverless functions time out at 10s (hobby) or 60s (pro). Receipt generation (PDF + email) should be done synchronously within the webhook handler. If this becomes slow, move to a queue (Supabase Edge Function or Upstash QStash) — but start synchronous.

---

## What We Are NOT Using

- ❌ Supabase Storage — using Cloudflare R2 instead (better CDN, free egress)
- ❌ Stripe — Razorpay is better for Indian NGOs (UPI, RuPay, net banking native)
- ❌ Puppeteer / headless Chrome — `@react-pdf/renderer` generates PDF serverlessly
- ❌ Donor login / dashboard — no auth for donors, keeps friction zero
- ❌ CMS (Sanity, Contentful) — admin portal handles all campaign content
- ❌ Separate backend server — all logic lives in Next.js API Routes
- ❌ Redis / queue — start synchronous; add queue only if needed

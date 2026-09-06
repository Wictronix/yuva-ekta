# pages.md
## Yuva Ekta India Foundation — v2 Page & Component Structure

---

## Site Map

```
PUBLIC ROUTES
├── /                        HOME — updated: live campaigns from Supabase
├── /about                   ABOUT — unchanged from v1
├── /projects                PROJECTS — unchanged from v1 (static)
├── /campaigns               CAMPAIGNS LISTING — NEW
├── /campaigns/[slug]        CAMPAIGN DETAIL — NEW
├── /impact                  IMPACT — unchanged from v1
├── /contact                 CONTACT — unchanged from v1
├── /donate                  DONATE PAGE — updated: opens DonationModal
├── /thank-you               THANK YOU — updated: shown after modal success
└── /not-found               404

ADMIN ROUTES (auth-protected via middleware)
├── /auth/login              ADMIN LOGIN
├── /admin                   ADMIN DASHBOARD
├── /admin/campaigns         CAMPAIGN MANAGER
├── /admin/campaigns/new     NEW CAMPAIGN FORM
├── /admin/campaigns/[id]    EDIT CAMPAIGN FORM
├── /admin/donors            DONOR DATABASE
└── /admin/donations         DONATION LEDGER
└── /admin/subscriptions     SUBSCRIPTION MANAGER (pause / cancel)

API ROUTES (internal — not visited by users)
├── /api/razorpay/create-order
├── /api/razorpay/create-subscription
├── /api/razorpay/manage-subscription
├── /api/razorpay/webhook
├── /api/email/send-receipt
├── /api/pdf/receipt
└── /api/upload/campaign-image
```

---

## SHARED COMPONENTS

### DonationModal
The most important new component. Opens as a `Dialog` from shadcn/ui, triggered by any "Donate Now" button anywhere on the site. Passes optional `campaignId` and `campaignName` as props.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  [×]  Donate to Yuva Ekta India Foundation  │
│       "Sakshar Sohna" ← if campaign passed  │
├─────────────────────────────────────────────┤
│  [ One-time ]  [ Monthly ]   ← Tabs         │
├─────────────────────────────────────────────┤
│  ₹500  ₹1,000  ₹2,500  ₹5,000  [Custom]   │
│  [ Enter custom amount: ₹ ________ ]        │
├─────────────────────────────────────────────┤
│  ☐ Cover transaction fee (2.5%)             │
│    Your donation: ₹1,000                    │
│    Transaction fee: ₹25                     │
│    Total charged: ₹1,025                    │
├─────────────────────────────────────────────┤
│  Full Name *      [__________________]      │
│  Email Address *  [__________________]      │
│  Phone Number *   [__________________]      │
│                                             │
│  🔒  80G tax receipt will be sent to email │
│                                             │
│  [     Proceed to Pay ₹1,025    ]          │
│  Powered by Razorpay · UPI · Cards · NB    │
└─────────────────────────────────────────────┘
```

**States:**
1. `amount-selection` — amount buttons + custom input
2. `donor-form` — name, email, phone (single step, no pagination)
3. `processing` — loading spinner after "Proceed to Pay" clicked
4. `success` — green checkmark, transaction ID, "receipt sent to email"
5. `error` — error message + retry option

**Props:**
```typescript
interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  campaignId?: string
  campaignName?: string
  defaultAmount?: number       // for "donate a product" with pre-filled price
}
```

**One-time tab behaviour:**
- Amount selected → donor form visible → click "Proceed to Pay" → API creates Razorpay Order → Razorpay Checkout opens → on success, verify + save + email → show success state

**Monthly tab behaviour:**
- Amount selected (preset: ₹500 / ₹1,500 / ₹5,000 / custom) → donor form → "Start Monthly Giving" → API creates Razorpay Subscription → Checkout → success state shows "First payment processed. You're now a monthly donor."

---

### Navbar (updated)
Same as v1 but:
- "Donate Now" button triggers `DonationModal` (client component)
- Add "Campaigns" link between "About" and "Projects"

### Footer (unchanged from v1)

---

---

## PUBLIC PAGES

---

### 1. HOME  `/`

**Changes from v1:** Featured campaigns section now fetches from Supabase. All other sections unchanged.

#### 1.1 Hero — unchanged
#### 1.2 Impact Strip — unchanged
#### 1.3 About Teaser — unchanged
#### 1.4 Focus Areas — unchanged

#### 1.5 Featured Campaigns (replaces static "Featured Projects")

```typescript
// Server Component — fetches at build time or on demand
const campaigns = await supabase
  .from('campaigns')
  .select('id, slug, title, short_desc, cover_image_url, category, campaign_goal, amount_raised, is_featured')
  .eq('status', 'active')
  .eq('is_featured', true)
  .order('created_at', { ascending: false })
  .limit(4)
```

**Card layout (each campaign):**
```
┌─────────────────────────┐
│  [cover image 16:9]     │
│  [Education badge]      │
├─────────────────────────┤
│  Sakshar Sohna          │
│  Remedial education...  │
│  ████████░░░  68%       │
│  ₹68,000 of ₹1,00,000  │
│  [Donate] [Learn More]  │
└─────────────────────────┘
```

"Donate" opens `DonationModal` with campaign pre-selected.
"Learn More" → `/campaigns/sakshar-sohna`

#### 1.6 How to Help — unchanged
#### 1.7 Founder Quote — unchanged
#### 1.8 Partners Strip — unchanged
#### 1.9 CTA Banner — unchanged

---

### 2. CAMPAIGNS LISTING  `/campaigns`

**New page.** Server component.

#### 2.1 Page Hero
- Title: "Our Campaigns"
- Subtitle: "Every campaign is a real need, verified by our team on the ground."

#### 2.2 Filter Bar
```
[All]  [Education]  [Health]  [Livelihood]  [Environment]
Sort: [Most Urgent ▾]   [Active only ✓]
```
Filter state managed in URL params (`?category=education&sort=urgent`).
On change, server re-fetches filtered campaigns.

#### 2.3 Campaign Grid

3 columns (desktop) / 2 (tablet) / 1 (mobile).

Each `CampaignCard` shows:
- Cover image
- Category badge
- Title
- Short description (2 lines, truncated)
- Progress bar: amount raised / campaign goal
- `₹X raised of ₹Y goal`
- Target people: "Reaching N people"
- Two CTAs: "Donate Now" (modal) + "View Campaign" (→ detail page)

Empty state (no campaigns): "No campaigns found. Check back soon — new campaigns are added regularly."

---

### 3. CAMPAIGN DETAIL  `/campaigns/[slug]`

**New page.** Server component, fetches single campaign by slug.

#### 3.1 Campaign Hero
- Full-width cover image with dark overlay
- Category badge
- Title (H1)
- Short description (subtitle)
- Trust badges: 80G | NITI Aayog | Reg. No. 03485

#### 3.2 Progress + Donate (sticky right sidebar on desktop, top on mobile)

```
┌──────────────────────────────┐
│  Campaign Goal: ₹1,00,000   │
│  ████████████░░░  72%        │
│  ₹72,000 raised              │
│  Target: 200 people          │
│                              │
│  [  Donate to This Campaign ]│
│                              │
│  80G tax receipt via email   │
└──────────────────────────────┘
```

"Donate to This Campaign" opens `DonationModal` with `campaignId` pre-set.

#### 3.3 Long Description
Full markdown-rendered description of the campaign. Includes problem statement, what the campaign does, who benefits.

#### 3.4 Funding Breakdown
```
┌─────────────────────────────────────────────┐
│  How Your Donation is Used                  │
├─────────────────┬──────────┬────────────────┤
│  Educator Salaries   │ ₹18,000  │  60%  ████ │
│  Centre Rent         │ ₹6,000   │  20%  ██   │
│  Travel              │ ₹3,000   │  10%  █    │
│  Books & Materials   │ ₹3,000   │  10%  █    │
└─────────────────┴──────────┴────────────────┘
```

Visual horizontal bar chart + table. Data from `campaigns.funding_breakdown` JSON.

#### 3.5 Products to Donate

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  📚  1 Month     │  │  🖊️  School Kit  │  │  💡  Library Set │
│  of Classes      │  │                  │  │                  │
│  Funds 4 weeks   │  │  Equips 1 child  │  │  Stocks a school │
│  of education    │  │  for a semester  │  │  library corner  │
│  ₹2,500          │  │  ₹500            │  │  ₹5,000          │
│  [Donate This]   │  │  [Donate This]   │  │  [Donate This]   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

"Donate This" opens `DonationModal` with `defaultAmount` set to product price and campaign pre-selected.
Data from `campaigns.products` JSON.

#### 3.6 Campaign Updates / Impact Feed

```
┌──────────────────────────────────────────────┐
│  Impact Updates                              │
├──────────────────────────────────────────────┤
│  📅  March 2025                              │
│  "50 children completed their first month   │
│   of remedial classes. Reading scores up..." │
│  [image if available]                        │
├──────────────────────────────────────────────┤
│  📅  February 2025                           │
│  "Village library opened at Sehjawas..."    │
└──────────────────────────────────────────────┘
```

Data from `campaigns.updates` JSON array, ordered by date descending.

---

### 4. DONATE PAGE  `/donate`

Updated from v1. Instead of redirect to Razorpay, this page auto-opens the `DonationModal`.

#### 4.1 Page Hero (same as v1)
- "Make a Difference Today"
- "Your gift is 100% tax-exempt under Section 80G"

#### 4.2 Trust Signals Strip (same as v1)

#### 4.3 Donation Widget
On page load, `DonationModal` opens automatically (`isOpen: true`).
Behind the modal: the page shows the same trust signals and bank transfer details (for users who prefer offline).

#### 4.4 Bank / UPI Details (same as v1 — always visible behind modal)
#### 4.5 80G Tax Note (same as v1)

---

### 5. THANK YOU  `/thank-you`

Same structure as v1 but triggered by modal success state, not page redirect.
This page is now secondary — the modal's success state is the primary confirmation.
`/thank-you` is used as Razorpay's fallback redirect URL for cases where the modal closes unexpectedly.

---

---

## ADMIN PORTAL

All admin routes are protected by `middleware.ts`. Unauthenticated users are redirected to `/auth/login`.

**Admin layout (`app/admin/layout.tsx`):**
- Left sidebar (desktop) / bottom nav (mobile)
- Sidebar links: Dashboard | Campaigns | Donors | Donations | Settings
- Top bar: "Yuva Ekta Admin" + logged-in email + Logout button
- Content area to the right / below

---

### A1. ADMIN LOGIN  `/auth/login`

Simple centred form:
- YEIF logo
- "Admin Portal" heading
- Email field
- Password field
- "Sign In" button
- Error: "Invalid credentials. Please try again."
- No "Forgot password" link (single admin; reset via Supabase dashboard)

---

### A2. ADMIN DASHBOARD  `/admin`

Overview cards:

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Total Raised    │  │  Active Campaigns│  │  Total Donors    │  │  This Month      │
│  ₹4,85,000       │  │  6               │  │  312             │  │  ₹38,500         │
│  ↑ ₹12,500 today │  │  2 ending soon   │  │  +18 this month  │  │  28 donations    │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

Recent Donations table (last 10):
Donor Name | Amount | Campaign | Date | Status | Receipt

Quick links: "Add Campaign" | "View All Donors" | "Export This Month"

---

### A3. CAMPAIGN MANAGER  `/admin/campaigns`

#### Campaign List Table
Columns: Cover Image (thumbnail) | Title | Category | Goal | Raised | Status | Featured | Actions

**Actions per row:**
- Edit (→ `/admin/campaigns/[id]`)
- Toggle Featured (on/off)
- Archive / Unarchive
- Delete (with confirmation dialog: "This will permanently delete the campaign and cannot be undone.")

**Top bar:**
- "Add New Campaign" button (→ `/admin/campaigns/new`)
- Search input: filter by title
- Status filter: All | Active | Completed | Archived

---

### A4. CAMPAIGN FORM  `/admin/campaigns/new` and `/admin/campaigns/[id]`

Single long form, tabbed into sections for clarity:

**Tab 1 — Basic Info**
```
Title *                [________________________________]
Slug *                 [________________________________]  ← auto-generated from title, editable
Category *             [Education ▾]
Status *               [Active ▾]
Short Description *    [________________________________]
                       [________________________________]  (max 160 chars)
Long Description *     [Rich text editor — markdown supported]
Cover Image *          [Upload Image] → pre-signed R2 upload
                       Preview: [image thumbnail]
Is Featured            [☐] Show on homepage
Campaign Goal (₹) *    [________________________________]
Target People *        [________________________________]
Ends At                [date picker]
```

**Tab 2 — Funding Breakdown**

Dynamic list — "Add Row" button adds a new row:
```
[Label: __________] [Amount: ₹ ______] [%: __] [×]
[Label: __________] [Amount: ₹ ______] [%: __] [×]
[+ Add Funding Head]
```
Percentage auto-calculates from amounts if left blank.

**Tab 3 — Products to Donate**

Dynamic list:
```
┌────────────────────────────────────────┐
│  Product Name: [__________________]    │
│  Impact Statement: [______________]    │
│  Price (₹): [_____]                    │
│  Image: [Upload] [preview]             │
│  [Remove Product]                      │
└────────────────────────────────────────┘
[+ Add Product]
```

**Tab 4 — Updates / Impact**

Dynamic list:
```
┌────────────────────────────────────────┐
│  Date: [date picker]                   │
│  Title: [__________________________]   │
│  Body: [textarea]                      │
│  Image: [Upload] [preview]             │
│  [Remove Update]                       │
└────────────────────────────────────────┘
[+ Add Update]
```

**Bottom:** "Save Campaign" button | "Cancel" link

---

### A5. DONOR DATABASE  `/admin/donors`

#### Donor Table
Columns: Name | Email | Phone | Total Donated | No. of Donations | First Donation | Last Donation | Actions

**Actions per row:**
- View Donations (expands inline or links to `/admin/donations?donorId=xxx`)
- Export this donor's history (CSV)

**Top bar:**
- Search: by name, email, or phone
- Export All (CSV) — downloads all donor records with totals

**No delete button on donors** — donation records must remain for accounting. Admin can "anonymise" if needed (separate action).

---

### A6. DONATION LEDGER  `/admin/donations`

#### Donation Table
Columns: Date | Donor Name | Email | Campaign | Amount | Fee Covered | Total | Type | Status | Receipt | Actions

**Actions per row:**
- Download Receipt (generates/fetches PDF from R2)
- Mark as Refunded (updates status, does NOT process actual refund — that's in Razorpay dashboard)

**Filters:**
- Date range picker (From — To)
- Campaign selector dropdown
- Type: All | One-time | Recurring
- Status: All | Captured | Pending | Failed | Refunded

**Top bar:**
- Export Filtered (CSV) — downloads current filtered view
- Total shown: "Showing ₹X from N donations (filtered)"

---

### A7. SUBSCRIPTION MANAGER  `/admin/subscriptions`

#### Subscription Table
Columns: Donor Name | Email | Campaign | Amount/month | Status | Started | Last Charged | Admin Note | Actions

**Status badges:**
- `active` — green
- `paused` — amber
- `cancelled` — red/muted

**Actions per row:**
- **Pause** — shown only when status is `active`
  Opens a small Dialog:
  ```
  Pause Subscription
  Donor: {name} · ₹{amount}/month
  Internal Note (optional): [____________]
  [Confirm Pause]  [Cancel]
  ```
  On confirm: calls POST /api/razorpay/manage-subscription with action: 'pause'

- **Resume** — shown only when status is `paused`
  Opens confirmation Dialog:
  ```
  Resume Subscription
  This will reactivate {name}'s monthly donation of ₹{amount}.
  [Confirm Resume]  [Cancel]
  ```
  On confirm: calls POST /api/razorpay/manage-subscription with action: 'resume'

- **Cancel** — shown when status is `active` or `paused`
  Opens confirmation Dialog:
  ```
  Cancel Subscription
  This will permanently stop {name}'s monthly donation of ₹{amount}.
  This cannot be undone.
  Internal Note (optional): [____________]
  [Confirm Cancel]  [Cancel]
  ```
  On confirm: calls POST /api/razorpay/manage-subscription with action: 'cancel'

**Filters:**
- Status: All | Active | Paused | Cancelled
- Campaign: All Campaigns dropdown

**Top bar:**
- Search: by donor name or email
- Export CSV — all subscriptions with current status

**Note to developer:** All pause/resume/cancel actions call the Razorpay Subscriptions API server-side and update Supabase immediately. The Razorpay webhook then fires as a secondary confirmation (double-write safety — ignore if status already matches).

---

---

## API ROUTES (Developer Reference)

### POST `/api/razorpay/create-order`
```typescript
// Request body
{ amount: number, currency: 'INR', campaignId?: string, donorName: string, donorEmail: string, donorPhone: string, coverFee: boolean }

// Response
{ orderId: string, amount: number, currency: string, keyId: string }
```

### POST `/api/razorpay/create-subscription`
```typescript
// Request body
{ planAmount: number, campaignId?: string, donorName: string, donorEmail: string, donorPhone: string }

// Response
{ subscriptionId: string, keyId: string }
```

### POST `/api/razorpay/manage-subscription`
```typescript
// Auth: admin session required (middleware validates)
// Request body
{
  subscriptionId: string,           // Razorpay subscription ID
  action: 'pause' | 'resume' | 'cancel',
  adminNote?: string                // stored in Supabase admin_note column
}

// Server actions:
// 1. Verify admin session (reject 401 if not authenticated)
// 2. Call Razorpay API:
//      pause  → razorpay.subscriptions.pause(subscriptionId)
//      resume → razorpay.subscriptions.resume(subscriptionId)
//      cancel → razorpay.subscriptions.cancel(subscriptionId)
// 3. Update Supabase subscriptions table:
//      action=pause   → status='paused',    paused_at=now(),    admin_note
//      action=resume  → status='active',    paused_at=null
//      action=cancel  → status='cancelled', cancelled_at=now(), admin_note
// 4. Return success

// Response
{ success: true, status: 'paused' | 'active' | 'cancelled' }

// Error response
{ success: false, error: string }
```

### POST `/api/razorpay/webhook`
```
Headers: x-razorpay-signature
Body: Razorpay event payload

Actions:
- Verify HMAC signature (reject if invalid — return 400)
- On 'payment.captured':       save donor + donation, send email receipt
- On 'subscription.charged':   save/update subscription + donation record, send email receipt
- On 'subscription.paused':    update subscriptions.status = 'paused' (if not already set)
- On 'subscription.resumed':   update subscriptions.status = 'active'
- On 'subscription.cancelled': update subscriptions.status = 'cancelled' (if not already set)
- Return 200 always (after validation) to prevent Razorpay retry storms
```

### GET `/api/pdf/receipt?donationId=xxx`
```
Returns: application/pdf stream
Content-Disposition: attachment; filename="receipt-{donationId}.pdf"
Auth: none (UUID is hard to guess — acceptable for receipt download)
```

### POST `/api/upload/campaign-image`
```typescript
// Request body (admin only — verify admin session server-side)
{ filename: string, contentType: string, bucket: 'campaigns' | 'receipts' }

// Response
{ uploadUrl: string, publicUrl: string }
// Client uses uploadUrl to PUT the file directly to R2
```

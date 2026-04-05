# content.md
## Yuva Ekta India Foundation — v2 Complete Page Copy

> All v1 page copy (Home, About, Projects, Impact, Contact) from CONTENT_FINAL.md
> remains unchanged. This document covers only the NEW content introduced in v2:
> Campaigns pages, Donation Modal, Thank You (updated), Admin Portal, emails, and
> the PDF receipt.

---

## GLOBAL ADDITIONS

### Navbar — new link
Between "About" and "Projects":
- **Label:** "Campaigns"
- **href:** `/campaigns`

### Meta description additions (SEO)

```typescript
// /campaigns
title: 'Our Campaigns | Yuva Ekta India Foundation'
description: 'Support verified grassroot campaigns in Gurugram — education, health, women\'s livelihood, and nutrition. Donate online. 80G tax receipt by email.'

// /campaigns/[slug] — generated dynamically
title: `${campaign.title} | Yuva Ekta India Foundation`
description: campaign.short_desc
```

---

---

## PAGE: CAMPAIGNS LISTING  `/campaigns`

### Page Hero
**Title:** "Our Campaigns"
**Subtitle:** "Every campaign is a verified need, funded directly by donors like you."
**Trust strip (pill badges):**
80G Certified · NITI Aayog Registered · Reg. No. 03485 · Est. 2018

---

### Filter Bar Labels
- All Campaigns
- Education
- Health & Nutrition
- Women's Livelihood
- Environment
- Sort: Most Urgent | Newest | Most Funded | Ending Soon

---

### Campaign Card Copy Patterns

Each card surfaces these values dynamically from Supabase. These are the label/format strings:

```
[cover image]
[Category badge]
[Campaign Title]
[short_desc — 2 lines max]
[Progress bar]
"₹{amount_raised} raised of ₹{campaign_goal}"
"Reaching {target_people} people"

Button 1: "Donate Now"
Button 2: "View Campaign"
```

**Empty state:**
"No campaigns found for this filter. Browse all campaigns or check back soon — new campaigns are added regularly."
CTA: "View All Campaigns"

---

### Section below grid (CTA banner — same as v1 home)
**Heading:** "Don't see the right campaign? Your donation still matters."
**Body:** "A general donation goes to wherever it's needed most — across education, health, and livelihood programmes."
**Button:** "Make a General Donation" → opens DonationModal with no campaign pre-selected

---

---

## PAGE: CAMPAIGN DETAIL  `/campaigns/[slug]`

> All text fields below come from the database. This section defines the UI labels,
> surrounding copy, and static strings that frame the dynamic content.

---

### Campaign Hero
```
[cover image — full width, dark overlay]
[Category badge]
[campaign.title — H1]
[campaign.short_desc — subtitle]
```

**Trust badges row (always shown):**
- ✅ 80G Tax Receipt via Email
- 🏛️ Reg. No. 03485
- 🔒 Secure Payment via Razorpay

---

### Progress Widget (sidebar / top on mobile)

**Labels:**
- "Campaign Goal" → `₹{campaign_goal}`
- Progress bar: `{(amount_raised / campaign_goal * 100).toFixed(0)}% funded`
- `₹{amount_raised}` raised
- "Target: {target_people} people"

**Button:** "Donate to This Campaign" → opens DonationModal

**Below button (muted small text):**
"🔒 Secure payment via Razorpay. 80G tax receipt sent to your email immediately after payment."

---

### Long Description
Rendered as markdown. Content comes from `campaign.long_desc`.
No surrounding static copy — the campaign's own text carries this section.

---

### Funding Breakdown Section

**Heading:** "How Your Donation Is Used"
**Subtext:** "Every rupee is accounted for. Here is exactly how funds raised for this campaign are deployed."

Table/chart is dynamic from `campaign.funding_breakdown`.
**Table headers:** Expense Head | Amount | Share

**Footer note (muted):**
"Amounts shown are based on monthly programme costs. Total may vary as the campaign reaches its goal."

---

### Products to Donate Section

**Heading:** "Choose What You Want to Fund"
**Subtext:** "Each item below represents a specific, tangible contribution. Select one and your donation goes directly to it."

Each product card:
```
[product image — optional]
[product.name — H4]
[product.impact — body, 2 lines]
[₹{product.price}]
[Donate ₹{product.price}] → DonationModal(defaultAmount=product.price)
```

**Below grid (muted small):**
"Or donate any amount — every rupee helps."
CTA: "Donate a Custom Amount" → opens DonationModal

---

### Campaign Updates Section

**Heading:** "Impact Updates"
**Subtext:** "Our team posts regular updates from the ground so you can see exactly what your donation is doing."

Each update card:
```
📅 {update.date — formatted as "15 March 2025"}
[update.title — H4]
[update.body — paragraph]
[update.image — if available]
```

**Empty state (no updates yet):**
"Updates will be posted here as the campaign progresses. Check back soon."

---

### Bottom CTA (after all sections)

**Text:** "Ready to make an impact?"
**Button (brand-pink, large):** "Donate to {campaign.title}" → DonationModal

---

---

## DONATION MODAL

### Modal Header
```
[×]
Donate to Yuva Ekta India Foundation
[campaign.title — muted, if campaign passed]   OR
"General Fund" if no campaign
```

---

### Tab Labels
- "One-time" (default active)
- "Monthly"

---

### One-time Tab

**Amount selector heading:** "Choose an amount"

```
Preset buttons: ₹500 | ₹1,000 | ₹2,500 | ₹5,000
Custom input placeholder: "Enter amount in ₹"
Minimum: ₹100
```

**Transaction fee toggle:**
```
☐ Cover the transaction fee (2.5%)
    Helps us receive your full donation amount.

    Your donation:      ₹1,000
    Transaction fee:    ₹25
    Total charged:      ₹1,025
```
(Fee toggle only shows when amount > 0. Fee % is configurable in `admin_settings`.)

**Donor form labels:**
```
Full Name *         [__________]
Email Address *     [__________]   ← receipt sent here
Phone Number *      [__________]
```

**Below form (small, muted):**
"🔒 Your information is never shared. You will receive your 80G tax receipt at this email."

**Primary CTA button:**
- Default: "Proceed to Pay" (disabled if form invalid)
- With amount: "Proceed to Pay ₹{total}"

**Below button:**
"Powered by Razorpay · UPI · Cards · Net Banking · Wallets"

---

### Monthly Tab

**Heading:** "Join as a Monthly Donor"
**Subtext:** "Your monthly gift creates predictable hope. Cancel anytime."

```
Preset amounts: ₹500 | ₹1,500 | ₹5,000 | Custom
```

**What your gift does (dynamic based on selected amount):**
```
₹500/month  → "Funds 1 week of remedial classes for 5 children"
₹1,500/month → "Covers 1 month of digital trainer salary"
₹5,000/month → "Fully sponsors 1 project for 1 month"
```
(These strings are configured per campaign or use defaults above.)

**Donor form:** Same as one-time tab.

**Primary CTA:** "Start Monthly Giving — ₹{amount}/month"

**Below button:**
"🔒 First payment today. Subsequent payments auto-deducted monthly. To pause or cancel, simply reply to your receipt email."

---

### Processing State
```
[loading spinner — brand-pink]
"Processing your payment..."
"Please do not close this window."
```

---

### Success State
```
[large ✅ icon — animated, brand-green]

"Thank You, {donorName}! 🙏"

"Your donation of ₹{total} has been received."
"Transaction ID: {razorpay_payment_id}"

[Email icon] "A receipt has been sent to {donorEmail}"
[PDF icon] "Download your 80G receipt" → /api/pdf/receipt?donationId=xxx

---

"Spread the word:"
[WhatsApp] [Copy Link]

[Close]  [Explore More Campaigns]
```

---

### Error State
```
[⚠️ icon]
"Payment could not be completed."
"{error message from Razorpay}"

Possible reasons:
• Payment was declined by your bank
• Session timed out
• Network issue

[Try Again]  [Pay via Bank Transfer instead]
```

Bank transfer details shown if "Pay via Bank Transfer instead" clicked.

---

---

## PAGE: THANK YOU  `/thank-you`

Updated subtext only — structure unchanged from v1.

**Headline:** "Thank You for Your Generosity! 🙏"

**Subtext:**
"Your donation has been received and your 80G receipt is on its way to your inbox. If you don't see it within a few minutes, please check your spam folder or contact us at yuvaekta2018@gmail.com."

**What Happens Next (3 steps):**
1. **Payment Confirmed** — "Your Razorpay receipt has been generated."
2. **80G Receipt by Email** — "Your tax exemption receipt will arrive within a few minutes."
3. **Funds Deployed** — "Your donation goes to active programmes immediately."

**Share message:**
"I just donated to Yuva Ekta India Foundation — a registered NGO empowering grassroot communities in Gurugram through education, livelihood, and health. Donations are 80G tax-exempt. Join me: https://yuvaektaindiafoundation.com/donate"

---

---

## EMAIL: DONATION RECEIPT

Sent via Resend immediately after payment success.

### Subject line
**One-time:** "Your donation to Yuva Ekta India Foundation — Receipt #{{receipt_number}}"
**Recurring (first):** "Welcome, Monthly Donor! Your first gift to Yuva Ekta — Receipt #{{receipt_number}}"
**Recurring (subsequent):** "Your monthly donation receipt — {{month}} {{year}} — Yuva Ekta India Foundation"

---

### Email HTML Template

**Header:**
- YEIF logo (white background)
- Thin brand-pink top border (4px)

**Body:**

```
Dear {donor.name},

Thank you for your generous donation to Yuva Ekta India Foundation.
Your contribution is already making a difference in the lives of
children and families in Gurugram.

─────────────────────────────────────────────
  DONATION RECEIPT
─────────────────────────────────────────────
  Donor Name:        {donor.name}
  Email:             {donor.email}
  Phone:             {donor.phone}
  Donation Amount:   ₹{donation.amount}
  Transaction Fee:   ₹{donation.fee_amount}   ← shown only if covered
  Total Charged:     ₹{donation.total_charged}
  Campaign:          {campaign.title}          ← or "General Fund"
  Type:              {One-time / Monthly}
  Date:              {formatted date}
  Razorpay Order ID: {razorpay_order_id}
  Payment ID:        {razorpay_payment_id}
─────────────────────────────────────────────

Your donation is eligible for a 50% tax deduction under Section 80G
of the Income Tax Act, 1961. Your official 80G receipt is attached
to this email as a PDF.

[  Download 80G Receipt (PDF)  ]   ← button linking to /api/pdf/receipt?donationId=xxx

─────────────────────────────────────────────
  ABOUT THIS ORGANISATION
─────────────────────────────────────────────
  Yuva Ekta India Foundation
  Village Sehjawas, Panchayat Sohna, Block Gurgaon, Haryana – 122102
  Registration No.:  03485 (Haryana Societies Act, 2012)
  PAN:               AAATY6815D
  80G Certificate:   [certificate number — add when known]
  NITI Aayog:        Registered
─────────────────────────────────────────────

If you have any questions about your donation, please contact us:
📧 yuvaekta2018@gmail.com
📞 (+91) 8569923173

With gratitude,
Balram Kumar & the Yuva Ekta Team

─────────────────────────────────────────────
You are receiving this email because you made a donation to
Yuva Ekta India Foundation. This is not a marketing email.
```

**Footer:**
- Thin brand-green bottom border
- "© 2024 Yuva Ekta India Foundation. Education. Livelihood. Environment."
- Unsubscribe link (legally required for transactional emails — even if just "contact us to opt out")

---

### Monthly Donor Welcome Email (additional section)

Inserted between the receipt table and the 80G note:

```
─────────────────────────────────────────────
  WELCOME TO THE YUVA EKTA FAMILY
─────────────────────────────────────────────
You are now a monthly donor. Here's what to expect:

• Your donation of ₹{amount} will be auto-deducted on the
  {date} of every month.
• You will receive a receipt email after each payment.
• A consolidated 80G certificate will be sent at the end
  of every financial year.
• To cancel your monthly donation, email us at
  yuvaekta2018@gmail.com — we will cancel within 2 working days.
─────────────────────────────────────────────
```

---

---

## PDF: 80G DONATION RECEIPT

Generated by `@react-pdf/renderer`. Downloaded via `/api/pdf/receipt?donationId=xxx`.

### Layout (A4 portrait)

**Header block:**
- YEIF logo (left)
- "DONATION RECEIPT" (right, uppercase, brand-pink)
- Receipt No.: YEIF-{year}-{sequential_number}
- Date: {dd MMM yyyy}

**To / From block:**
```
Received from:                        Issued by:
{donor.name}                          Yuva Ekta India Foundation
{donor.email}                         Village Sehjawas, Sohna, Gurugram
{donor.phone}                         Haryana – 122102
                                      Reg. No.: 03485
                                      PAN: AAATY6815D
```

**Receipt details table:**
| | |
|---|---|
| Campaign / Purpose | {campaign.title or "General Fund"} |
| Donation Amount | ₹{donation.amount} |
| Transaction Fee (if covered) | ₹{donation.fee_amount} |
| Total Paid | ₹{donation.total_charged} |
| Payment Mode | Razorpay (UPI / Card / Net Banking) |
| Razorpay Order ID | {razorpay_order_id} |
| Razorpay Payment ID | {razorpay_payment_id} |
| Date of Payment | {dd MMM yyyy} |

**80G declaration block (grey background):**
```
This receipt is issued under Section 80G of the Income Tax Act, 1961.
Donations to Yuva Ekta India Foundation are eligible for 50% tax
deduction subject to qualifying limits as per applicable tax laws.

80G Certificate No.: [certificate number]
Financial Year:      2024–25
```

**Signature block:**
```
Authorised Signatory
Yuva Ekta India Foundation
```
(Placeholder line — admin prints and signs physical copy if needed.)

**Footer:**
"This is a computer-generated receipt and does not require a physical signature for digital tax filing."

---

---

## ADMIN PORTAL — UI Labels & Copy

### Dashboard

**Page title:** "Admin Dashboard"

**Stat card labels:**
- "Total Raised (All Time)"
- "Active Campaigns"
- "Total Donors"
- "Raised This Month"

**Recent donations table heading:** "Recent Donations"
**Column headers:** Donor | Campaign | Amount | Type | Date | Status | Receipt

**Empty recent donations:** "No donations yet. Share your campaign links to start receiving donations."

---

### Campaign Manager

**Page title:** "Campaigns"
**Add button:** "+ New Campaign"
**Search placeholder:** "Search campaigns by title..."
**Table column headers:** Image | Title | Category | Goal | Raised | Status | Featured | Actions

**Delete confirmation dialog:**
Title: "Delete Campaign"
Body: "Are you sure you want to permanently delete **{campaign.title}**? This action cannot be undone. Existing donation records linked to this campaign will be preserved."
Confirm: "Delete Campaign" (red/destructive)
Cancel: "Keep Campaign"

**Archive confirmation:**
"Archiving this campaign will hide it from the public site but preserve all records. Continue?"

---

### Campaign Form

**Page title (new):** "Create New Campaign"
**Page title (edit):** "Edit — {campaign.title}"

**Tab labels:** Basic Info | Funding Breakdown | Products to Donate | Updates & Impact

**Field labels:**

*Basic Info tab:*
- "Campaign Title *"
- "URL Slug * (auto-generated, editable)"
- "Category *"
- "Status *"
- "Short Description * (max 160 characters)" — shown on cards
- "Long Description * (markdown supported)" — shown on campaign detail page
- "Cover Image *"
- "Show on Homepage (Featured)"
- "Fundraising Goal (₹) *"
- "Target Number of People *"
- "Campaign End Date (optional)"

*Funding Breakdown tab:*
- "Add Budget Line" button
- Column headers: Expense Head | Amount (₹) | Percentage | Remove
- "Percentages will auto-calculate if left blank."

*Products to Donate tab:*
- "Add Donatable Item" button
- Field labels: Item Name | Impact Statement (what this item does) | Price (₹) | Photo (optional)

*Updates & Impact tab:*
- "Add Update" button
- Field labels: Date | Update Title | What Happened (textarea) | Photo (optional)

**Save button:** "Save Campaign"
**Cancel link:** "← Back to Campaigns"

**Success toast:** "Campaign saved successfully."
**Error toast:** "Failed to save campaign. Please check all required fields."

---

### Image Uploader (inside Campaign Form)

**Default state:**
"Click to upload or drag and drop"
"PNG, JPG, WebP · Max 5MB"

**Uploading state:**
"Uploading... {progress}%"

**Uploaded state:**
"[image preview]"
"Image uploaded successfully."
"[Change Image]"

**Error state:**
"Upload failed. File must be under 5MB and in PNG, JPG, or WebP format."

---

### Donor Database

**Page title:** "Donors"
**Search placeholder:** "Search by name, email, or phone..."
**Export button:** "Export CSV"
**Column headers:** Name | Email | Phone | Total Donated | Donations | First Donation | Last Donation

**No results state:**
"No donors found matching your search."

---

### Donation Ledger

**Page title:** "Donations"
**Export button:** "Export Filtered CSV"
**Column headers:** Date | Donor | Email | Campaign | Amount | Fee | Total | Type | Status | Receipt

**Filter labels:**
- "From Date"
- "To Date"
- "Campaign: All Campaigns ▾"
- "Type: All ▾ / One-time / Monthly"
- "Status: All ▾ / Captured / Pending / Failed / Refunded"

**Filter summary line:**
"Showing {N} donations · ₹{total} total {for current filter}"

**Receipt action:** "↓ PDF"
**Mark refunded:** "Mark Refunded" (with confirmation: "This will update the status to 'Refunded' in your records but does not process the actual refund on Razorpay. Have you already issued the refund on the Razorpay dashboard?")

---

### Admin Sidebar Navigation

```
[YEIF logo]
Admin Portal

[Dashboard]
[Campaigns]
[Donors]
[Donations]
──────────
[Settings]    ← transaction fee %, org details
[Logout]
```

**Settings page labels:**
- "Transaction Fee Percentage" — "This percentage is added to the donation amount when the donor opts to cover the fee."
- "Save Settings"

---

### Admin Login Page

**Heading:** "Yuva Ekta Admin"
**Subheading:** "Sign in to manage campaigns, donors, and donations."
**Email label:** "Email Address"
**Password label:** "Password"
**Button:** "Sign In"
**Error:** "Invalid email or password. Please try again."
**Footer note (small, muted):** "This portal is for authorised YEIF administrators only."

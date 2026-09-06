# CONTENT_FINAL
## Yuva Ekta India Foundation — Complete Page Copy

> **How to use this file:** Every string in this document maps directly to a component prop or
> a `lib/` data file in the Next.js project. Variable names in `code blocks` show where each
> piece of content lives in the codebase. Sections marked `[IMAGE]` require a real photo from
> the foundation's archive.

---

## GLOBAL / SHARED

### Site Metadata

```typescript
// lib/constants.ts
export const SITE = {
  name:        'Yuva Ekta India Foundation',
  tagline:     'Education. Livelihood. Environment.',
  description: 'A registered NGO in Gurugram empowering grassroot communities through remedial education, digital literacy, women\'s livelihood, and daily nutrition. Donate today — 80G certified.',
  url:         'https://yuvaektaindiafoundation.org',
  email:       'yuvaekta2018@gmail.com',
  phone1:      '+918569923173',
  phone2:      '+919990911405',
  whatsapp:    '9990911405',
  address:     'Village Sehjawas, Panchayat Sohna, Block Gurgaon, Haryana – 122102',
  addressAlt:  'Damdama Lake Road, Vill. Bahelpa, Gurugram, Haryana – 122102',
  regNo:       '03485',
  pan:         'AAATY6815D',
  founded:     '21 November 2018',
  upi:         'Q64836034@ybl',
  bank: {
    name:    'Union Bank of India',
    account: '220711100001158',
    ifsc:    'UBIN0565091',
    holder:  'Yuva Ekta India Foundation',
  },
  social: {
    facebook:  'https://facebook.com/yuvaektaindiafoundation',
    youtube:   'https://youtube.com/@YuvaEktaIndiaFoundation',
    instagram: 'https://instagram.com/yuvaektaindiafoundation',
  },
}
```

---

### Navigation

```typescript
// lib/constants.ts
export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Impact',   href: '/impact' },
  { label: 'Contact',  href: '/contact' },
]
export const NAV_CTA = { label: 'Donate Now', href: '/donate' }
```

**Mobile nav drawer header:** "Yuva Ekta India Foundation"
**Mobile nav drawer subline:** "Education. Livelihood. Environment."

---

### Footer

**Column 1 — Brand**
- Logo (white variant)
- "A registered NGO in Gurugram working for grassroot community upliftment since 2018."
- Social icons: Facebook | Instagram | YouTube

**Column 2 — Quick Links**
- Home | About Us | Our Projects | Our Impact | Donate | Contact Us

**Column 3 — Contact**
- 📍 Village Sehjawas, Panchayat Sohna, Block Gurgaon, Haryana – 122102
- 📞 (+91) 8569923173
- 📞 (+91) 99909 11405
- 📧 yuvaekta2018@gmail.com
- 🌐 www.yuvaektaindiafoundation.org

**Column 4 — Legal & Certifications**
- Reg. No.: 03485
- PAN: AAATY6815D
- 80G Certified
- 12A Certified
- CSR-1 Registered
- NITI Aayog Registered

**Bottom bar:**
"© 2024 Yuva Ekta India Foundation. All rights reserved."
"All donations eligible for tax exemption under Section 80G of the Income Tax Act, 1961."

---

---

## PAGE: HOME  `/`

### SEO

```typescript
export const metadata = {
  title: 'Yuva Ekta India Foundation — Empowering Grassroot Communities in Gurugram',
  description: 'A registered NGO in Gurugram delivering free education, digital literacy, women\'s livelihood, and daily nutrition to over 1,000 children and families. Donate today — 80G certified.',
  openGraph: { images: [{ url: '/images/og-home.webp' }] },
}
```

---

### Section 1 — Hero

**[IMAGE]** Full-width community photo: children in a classroom, women at work, or a field activity. Warm, candid, faces visible.

**Overline badge (small pill above headline):**
"Recognised by Haryana Government · Reg. No. 03485"

**Headline (H1, Playfair Display 700):**
"Empowering Communities,
One Life at a Time"

**Subheadline:**
"A grassroot NGO in Gurugram delivering free education, digital skills, and daily nutrition to the children and families formal systems leave behind."

**CTA 1 (Primary — brand-pink):** "Donate Now" → `/donate`
**CTA 2 (Ghost — white outline):** "See Our Work" → `/projects`

**Scroll indicator:** Animated chevron-down icon below CTAs

---

### Section 2 — Impact Strip

**Background:** `brand-brown` (#593414), full-width band

**Overline (small, uppercase, muted white):** "Our Impact at a Glance"

```typescript
// lib/impact.ts
export const heroStats = [
  { value: 1000, suffix: '+', label: 'Children Educated' },
  { value: 100,  suffix: '+', label: 'Women Empowered' },
  { value: 100,  suffix: '',  label: 'Children Fed Daily' },
  { value: 7,    suffix: '+', label: 'Years of Service' },
]
```

Each stat: animated count-up on scroll (Framer Motion), number in white Inter 800, label in muted white Inter 500.

---

### Section 3 — About Teaser

**Layout:** Two columns — text left, photo right (`lg:grid-cols-2`)

**[IMAGE]** Right column: candid photo of Balram Kumar with community members or children, warm tones.

**Overline:** "Who We Are"
**Heading (H2):** "A Community That Believes in Every Child"
**Body paragraph 1:**
"Yuva Ekta India Foundation is a youth-led, community-focused organisation registered under the Haryana Registration and Regulation of Societies Act, 2012. We work in the villages and urban pockets of Gurugram — reaching the children, women, and families that formal systems leave behind."

**Body paragraph 2:**
"Founded on 21 November 2018 by Mr. Balram Kumar — a social worker mentored and trained by Dr. Kiran Bedi, India's first female IPS officer — our foundation has grown from a handful of children in a single room to a multi-project NGO serving over 1,000 lives."

**Callout badge (green tint):**
🏅 "Mentored by Dr. Kiran Bedi · Recognised by Haryana Government"

**CTA link:** "Read Our Full Story →" → `/about`

---

### Section 4 — Key Focus Areas

**Background:** `brand-offwhite`
**Overline:** "What We Work On"
**Heading (H2):** "Four Areas. One Mission."
**Subtitle:** "Everything we do is designed to create lasting change at the grassroot level."

```typescript
// lib/constants.ts
export const focusAreas = [
  {
    icon: 'BookOpen',
    title: 'Remedial Education',
    description: 'Free classes, village libraries, and learning workshops that bring dropout and at-risk children back into education — and help them thrive.',
    color: 'brand-pink',
    link: '/projects#sakshar-sohna',
  },
  {
    icon: 'Monitor',
    title: 'Digital Literacy',
    description: 'A 30-computer Digital Learning Centre giving rural children aged 6–16 free access to computer education and weekend employability training.',
    color: 'brand-green',
    link: '/projects#digital-saksharta',
  },
  {
    icon: 'Scissors',
    title: "Women's Livelihood",
    description: 'Stitching, tailoring, and entrepreneurship training that turns existing skills into real income — adding ₹5,000/month per household.',
    color: 'brand-terra',
    link: '/projects#mahila-ajeevika',
  },
  {
    icon: 'Heart',
    title: 'Health & Nutrition',
    description: 'Daily food packets for 100 malnourished children and children with critical illness — every single day, no exceptions.',
    color: 'brand-brown',
    link: '/projects#swastha-sohna',
  },
]
```

---

### Section 5 — Featured Projects

**Background:** White
**Overline:** "Our Active Projects"
**Heading (H2):** "Projects That Change Lives"
**Subtitle:** "Each project targets a specific gap — together they address education, livelihoods, and survival."

```typescript
// lib/projects.ts — short card versions
export const projectCards = [
  {
    id:        'sakshar-sohna',
    name:      'Sakshar Sohna',
    supporter: 'Expert Solutions for Non Profit',
    summary:   'Remedial education for 200+ children — from learning to read to running school libraries.',
    image:     '/images/projects/sakshar-sohna.webp',
    href:      '/projects#sakshar-sohna',
    badge:     'Education',
    badgeColor:'brand-pink',
  },
  {
    id:        'digital-saksharta',
    name:      'Digital Saksharta',
    supporter: 'Morning Star Foundation',
    summary:   'A 30-computer learning centre in Sehjawas Village — free digital education for 50 children and youth.',
    image:     '/images/projects/digital-saksharta.webp',
    href:      '/projects#digital-saksharta',
    badge:     'Digital Literacy',
    badgeColor:'brand-green',
  },
  {
    id:        'mahila-ajeevika',
    name:      'Mahila Ajeevika',
    supporter: 'Srujna Charitable Trust',
    summary:   'Sewing machines, raw materials, and business training for 50 rural women building their own income.',
    image:     '/images/projects/mahila-ajeevika.webp',
    href:      '/projects#mahila-ajeevika',
    badge:     'Livelihood',
    badgeColor:'brand-terra',
  },
  {
    id:        'swastha-sohna',
    name:      'Swastha Sohna',
    supporter: 'Taj Gateway Resort',
    summary:   'Free nutritious food packets distributed every day to 100 malnourished and critically ill children.',
    image:     '/images/projects/swastha-sohna.webp',
    href:      '/projects#swastha-sohna',
    badge:     'Health & Nutrition',
    badgeColor:'brand-brown',
  },
]
```

Each card: image thumbnail, Badge, title, supporter line (small, muted), summary, "Learn More →" link.

---

### Section 6 — How to Help

**Background:** `brand-pink` (full-width coloured band)
**Overline (white muted):** "Get Involved"
**Heading (H2, white):** "Three Ways to Make a Difference"

```typescript
export const waysToHelp = [
  {
    icon: 'HandHeart',
    title: 'Donate',
    description: 'Make a one-time or monthly contribution. Your donation is 100% tax-exempt under Section 80G. Every rupee reaches a real family.',
    cta: { label: 'Donate Now', href: '/donate' },
  },
  {
    icon: 'ShoppingBag',
    title: 'Buy Products',
    description: 'Purchase handmade goods crafted by our beneficiaries. Every purchase creates livelihood — not charity. Coming soon.',
    cta: { label: 'Learn More', href: '/contact' },
  },
  {
    icon: 'Users',
    title: 'Volunteer',
    description: 'Bring your skills in teaching, technology, health, or communications and give a few hours a month to communities that need them.',
    cta: { label: 'Volunteer With Us', href: '/contact#volunteer' },
  },
]
```

---

### Section 7 — Founder Quote

**Background:** `brand-offwhite`
**Layout:** Centred, max-width 800px

**Large decorative quote mark:** Brand-pink, Playfair, 120px

**Quote:**
> *"Every child deserves to learn. Every woman deserves to earn. Every family deserves dignity. That is why we do this work — every single day."*

**Attribution:** — **Balram Kumar**, Founder, Yuva Ekta India Foundation
**Subline (muted):** Social Worker · Mentored by Dr. Kiran Bedi

**[IMAGE]** Optional: small circular photo of Balram Kumar beside attribution

---

### Section 8 — Partners & Supporters

**Background:** White
**Overline:** "Our Generous Supporters"
**Heading (H3, muted):** "Projects made possible by"

```typescript
export const partners = [
  { name: 'Morning Star Foundation',          logo: null }, // text fallback if no logo
  { name: 'Srujna Charitable Trust',          logo: null },
  { name: 'Taj Gateway Resort',               logo: null },
  { name: 'Expert Solutions for Non Profit',  logo: null },
]
```

Displayed as pill badges or name tiles in a horizontal row. On mobile, scrollable horizontally. Grey tint background for each tile.

---

### Section 9 — CTA Banner

**Background:** `brand-green`
**Heading (H2, white):** "Together, We Can Reach More Families."
**Subtext (white, opacity 0.85):** "Every rupee you give goes directly to children, women, and families in Gurugram's villages. Donations are tax-deductible under Section 80G."
**Button (white-outline):** "Make a Donation Today" → `/donate`

---

---

## PAGE: ABOUT  `/about`

### SEO

```typescript
export const metadata = {
  title: 'About Us | Yuva Ekta India Foundation',
  description: 'Learn about Yuva Ekta India Foundation — founded by Balram Kumar, mentored by Dr. Kiran Bedi, registered since 2018, and serving over 1,000 lives in Gurugram.',
}
```

---

### Section 1 — Page Hero

**[IMAGE]** Group photo: community activity, classroom, or volunteer event.
**Title (H1):** "About Us"
**Subtitle:** "A story rooted in community, driven by purpose."
**Breadcrumb:** Home › About

---

### Section 2 — Our Story

**Overline:** "How It Began"
**Heading (H2):** "From One Room to a Thousand Lives"

**Paragraph 1:**
"Yuva Ekta India Foundation was born out of a simple conviction: that the children and families at the margins of society deserve the same opportunities as everyone else — and that real change happens closest to the ground."

**Paragraph 2:**
"On 21 November 2018, Mr. Balram Kumar — a social worker inspired and trained by Dr. Kiran Bedi, India's first female IPS officer — registered the foundation in the villages of Sohna Block, Gurugram. What began with a handful of children attending remedial classes in a borrowed room has grown into a multi-project NGO serving over 1,000 children, 100 women, and hundreds of families."

**Paragraph 3:**
"We hold 80G, 12A, and CSR-1 certifications, are registered with NITI Aayog's Darpan portal, and are recognised by the Haryana Government. We have been featured across local and regional media for our work in education, health, and environment — and in 2022, we received a formal commendation from the Gurugram Police Commissioner."

**Paragraph 4:**
"We believe trust is earned, not assumed. That is why we publish our projects, our numbers, and our funding needs openly — so every donor, partner, and volunteer can see exactly where their contribution goes."

---

### Section 3 — Vision & Mission

**Background:** `brand-offwhite`
**Heading (H2):** "What Drives Us"

**Vision Card (brand-pink-tint, pink left border):**
- Label: "Our Vision"
- Icon: `Eye`
- Body: "To empower grassroot communities of Gurugram through direct interventions in Remedial Education, Life Skills Education, Livelihood, and Community Health and Nutrition."

**Mission Card (brand-green-tint, green left border):**
- Label: "Our Mission"
- Icon: `Target`
- Body: "To be a leader in Community Development Initiatives through Projects and Campaigns aligned with achieving the Sustainable Development Goals — building communities that no longer need us."

---

### Section 4 — Founder

**Layout:** Image left (`rounded-2xl`), text right

**[IMAGE]** Portrait or candid photo of Balram Kumar — warm, community setting preferred.

**Overline:** "Meet the Founder"
**Name (H2):** "Balram Kumar"
**Title:** "Founder & Social Worker"

**Badge row:**
- `BadgeCheck` icon + "Mentored by Dr. Kiran Bedi"
- `BadgeCheck` icon + "Recognised by Haryana Government"
- `BadgeCheck` icon + "Commended by Gurugram Police Commissioner"

**Bio paragraph 1:**
"Balram Kumar has dedicated his life to community service in the villages around Sohna Block, Gurugram. A social worker by calling — not by career choice — he was mentored and trained by Dr. Kiran Bedi, whose lifelong commitment to grassroot change shaped how he approaches every challenge."

**Bio paragraph 2:**
"Under Balram Kumar's leadership, YEIF has grown from a single remedial class to four active projects, seven community programmes, and a network of partnerships with corporations, charitable trusts, and civic bodies. His work has been covered extensively in Hindi and English press across the Gurugram–Sohna belt."

**Pull quote (brand-pink, italic):**
*"I don't see myself as running an NGO. I see myself as belonging to this community — and doing what any responsible member of a community should do."*
— Balram Kumar

---

### Section 5 — Focus Areas (Detailed)

**Overline:** "Our Work in Detail"
**Heading (H2):** "Four Focus Areas, Real Results"

*Same four cards as the home page but with expanded body text:*

**Remedial Education:**
"We run hourly classes across multiple centres in Sohna Block, using a structured curriculum that builds reading, writing, arithmetic, and comprehension skills. Our educators are trained community members — not outsiders. We also run village libraries inside government schools and train student librarians who maintain them independently."

**Digital Literacy:**
"Our Digital Learning Centre in Sehjawas Village runs Monday to Friday for children aged 6–16 and opens on weekends for employability workshops for rural youth. 30 computers, one printer, and a dedicated trainer make this the only free digital education facility in the area."

**Women's Livelihood:**
"Mahila Ajeevika is not a charity. It is a business training programme. Women learn stitching and tailoring, receive machines and raw materials, and are then helped to set up stalls, procure orders, and build micro-enterprises. The target is not just skill — it is income, independence, and standing in the household."

**Health & Nutrition:**
"Every day, 100 malnourished children and children with critical illnesses receive free food packets through Swastha Sohna. We partner with Dil se Mehek (heart disease and cancer) and One Each One Feed (severe malnourishment) to identify and serve the most vulnerable children."

---

### Section 6 — Credentials

**Background:** `brand-offwhite`
**Overline:** "Legal & Compliance"
**Heading (H2):** "Built on Accountability"
**Subtitle:** "All certifications relevant for individual donations, CSR funding, and grant applications."

```typescript
export const credentials = [
  { label: 'Society Registration',  detail: 'Haryana Registration and Regulation of Societies Act, 2012 · Reg. No. 03485',         icon: 'FileCheck' },
  { label: 'PAN',                   detail: 'AAATY6815D',                                                                             icon: 'CreditCard' },
  { label: 'Date of Incorporation', detail: '21 November 2018',                                                                       icon: 'Calendar' },
  { label: '80G Certificate',       detail: 'Donations made to YEIF are eligible for 50% tax deduction under the Income Tax Act',     icon: 'BadgeCheck' },
  { label: '12A Certificate',       detail: "YEIF's income is exempt from Income Tax — ensuring every rupee serves the mission",       icon: 'BadgeCheck' },
  { label: 'CSR-1 Registration',    detail: 'YEIF is eligible to receive Corporate Social Responsibility funds from Indian companies', icon: 'Building2' },
  { label: 'NITI Aayog Darpan',     detail: 'Registered on NITI Aayog\'s national NGO portal — verifiable by any donor or partner',   icon: 'Globe' },
]
```

---

### Section 7 — Media Mentions

**Overline:** "In the News"
**Heading (H2):** "Recognised Across Haryana"
**Subtitle:** "Our work has been covered by regional and national publications in Hindi and English."

Grid of newspaper clipping thumbnails from the uploaded PDF (pages 15–16).
Each card: publication name (if legible), headline excerpt, date (if visible).
Click opens Dialog lightbox with full image.

**Note to developer:** Source images from pages 15–16 of `A4_Spirall_Bok.pdf`. Crop each article clipping and save as `/public/images/media/media-01.webp` through `media-12.webp`.

---

---

## PAGE: PROJECTS  `/projects`

### SEO

```typescript
export const metadata = {
  title: 'Our Projects & Programmes | Yuva Ekta India Foundation',
  description: 'Four active projects and seven community programmes delivering education, digital literacy, women\'s livelihood, and nutrition across Sohna Block, Gurugram.',
}
```

---

### Page Hero

**[IMAGE]** Children at a Shiksha Aur Kaushal Mela event or classroom activity.
**Title (H1):** "Our Projects & Programmes"
**Subtitle:** "Four active projects. Seven community initiatives. One shared mission."

---

### Project Navigation (Tabs or anchor links)

Quick-jump tabs at top of projects section:
"Sakshar Sohna" | "Digital Saksharta" | "Mahila Ajeevika" | "Swastha Sohna"
On click: smooth scroll to anchor section.

---

### Project 1 — Sakshar Sohna  `#sakshar-sohna`

**Badge:** "Supported by Expert Solutions for Non Profit" (green Badge component)
**Heading (H2):** "Sakshar Sohna"
**Tagline (H3, muted):** "Remedial Education for Dropout and At-Risk Children"

**[IMAGE]** Children sitting in a class, writing in notebooks, showing artwork.

**Paragraph 1:**
"In the villages around Sohna Block, hundreds of children have slipped through the cracks of the formal education system — children whose families cannot afford private tuition, whose schools are overcrowded, and who fall behind until they stop coming at all. Sakshar Sohna exists to bring them back."

**Paragraph 2:**
"Through a team of trained educators, we run structured hourly classes that build the core skills every child needs: reading, writing, arithmetic, and the ability to understand and use information. But we go far beyond academics. Our sessions include leadership workshops, art and craft, poetry, music, and drama — because a child's development is never just about grades. It is about confidence, expression, and the belief that they belong."

**Paragraph 3:**
"One of our proudest achievements is the network of village libraries we have established inside government schools across the Sohna Block. We don't just set them up — we train the school students themselves to run and maintain them. These are libraries built by the community, for the community."

**Stats box (Card, green-tint background):**
| | |
|---|---|
| 🎯 Target (2022–23) | 200 children enrolled |
| 📋 Long-term Objective | 1,000 dropout children mainstreamed into government schools |
| 💰 Monthly Funding Requirement | ₹30,000 |

**Funding Heads:**
- Salaries to Educators
- Rent for Remedial Education Centre
- Travel for Community Mobilisation
- Books and Learning Resources

**CTA Button (brand-pink):** "Adopt This Project — ₹30,000/month" → `/donate?project=sakshar-sohna`

---

### Project 2 — Digital Saksharta  `#digital-saksharta`

**Badge:** "Supported by Morning Star Foundation" (green Badge)
**Heading (H2):** "Digital Saksharta"
**Tagline (H3, muted):** "Free Computer Education for Rural Children and Youth"

**[IMAGE]** Children at computers in the Digital Learning Centre.

**Paragraph 1:**
"In a world that runs on digital skills, the rural children of Sehjawas Village had no access to computer education. The nearest private computer centre charges fees that most village families cannot afford. Digital Saksharta changes that — completely free, completely accessible."

**Paragraph 2:**
"With the generous support of Morning Star Foundation, we have established a Digital Learning Centre in Sehjawas Village equipped with 30 computers and a printer. The centre runs Monday to Friday, providing free computer education to 50 children and adolescents between the ages of 6 and 16. Every child who walks in leaves with skills they can actually use."

**Paragraph 3:**
"On weekends, the centre opens its doors to rural youth seeking employment. Free workshops teach the practical skills that entry-level jobs demand — computer operation, data entry, digital communication. These are not theoretical lessons. They are directly linked to real jobs in Gurugram's growing economy, just a few kilometres away."

**Stats box:**
| | |
|---|---|
| 🎯 Target (2022–23) | 240 children and youth |
| 🖥️ Computers Available | 30 computers + 1 printer |
| 💰 Monthly Funding Requirement | ₹35,000 |

**Funding Heads:**
- Salary to Computer Trainer
- Rent for Digital Literacy Centre
- Travel for Community Mobilisation
- Learning Materials and Curriculum

**CTA Button:** "Adopt This Project — ₹35,000/month" → `/donate?project=digital-saksharta`

---

### Project 3 — Mahila Ajeevika  `#mahila-ajeevika`

**Badge:** "Supported by Srujna Charitable Trust" (green Badge)
**Heading (H2):** "Mahila Ajeevika"
**Tagline (H3, muted):** "Building Women's Livelihoods Through Real Skills and Real Income"

**[IMAGE]** Women at sewing machines, in a training session, or at a market stall.

**Paragraph 1:**
"For many women in rural Gurugram, the ability to stitch and tailor has been part of their lives for as long as they can remember. But skill alone has never been enough. Without the right tools, the right training in running a small business, and the right market connections, that skill earns nothing. Mahila Ajeevika changes that."

**Paragraph 2:**
"With support from Srujna Charitable Trust, the foundation provides sewing machines, raw materials, and structured business training to 50 rural women. We don't just teach skills — we help participants set up income-generating stalls, procure orders from local markets, and build their own micro-enterprises from the ground up."

**Paragraph 3:**
"Each woman who completes the programme is expected to add ₹5,000 to her household's monthly income. That is not a gift. That is her own work, her own business, and her own financial independence — built on skills she already had and the tools and knowledge we provided."

**Stats box:**
| | |
|---|---|
| 🎯 Target (2022–23) | 50 women |
| 📈 Expected Income Increase | ₹5,000 per household per month |
| 💰 Monthly Funding Requirement | ₹45,000 |

**Funding Heads:**
- Salary to Skill Trainers
- Setting Up Market Stalls for Income Generation
- Travel for Procuring and Completing Orders
- Exposure Visits to Established Enterprises

**CTA Button:** "Adopt This Project — ₹45,000/month" → `/donate?project=mahila-ajeevika`

---

### Project 4 — Swastha Sohna  `#swastha-sohna`

**Badge:** "Supported by Taj Gateway Resort" (green Badge)
**Heading (H2):** "Swastha Sohna"
**Tagline (H3, muted):** "Daily Nutrition for Malnourished and Critically Ill Children"

**[IMAGE]** Children receiving food packets, or a health camp in progress.

**Paragraph 1:**
"Hunger is not a statistic. It is a child who cannot concentrate in class because their stomach is empty. It is a body fighting a serious illness on a diet of nothing. It is a future dimmed by something as basic — and as preventable — as food. Swastha Sohna exists because we refuse to accept that."

**Paragraph 2:**
"Every day, without exception, the foundation distributes free food packets to 100 children who would otherwise go without. These include malnourished children identified in the villages around Sohna Block and children with critical illnesses — congenital heart disease, cancer, severe malnourishment — identified through our partnerships with Dil se Mehek and One Each One Feed."

**Paragraph 3:**
"The initiative is made possible through the generous and sustained support of Taj Gateway Resort, whose commitment to the community goes far beyond a single donation. This is an ongoing, daily operation — 365 days a year, no holidays."

**Stats box:**
| | |
|---|---|
| 🎯 Daily Beneficiaries | 100 children |
| 🤝 Partners | Dil se Mehek · One Each One Feed |
| 💰 Monthly Funding Requirement | ₹50,000 |

**Funding Heads:**
- Food Packets (daily procurement and preparation)
- Travel to Community and Hospital Sites
- Stipend to Volunteers

**CTA Button:** "Adopt This Project — ₹50,000/month" → `/donate?project=swastha-sohna`

---

### Community Programmes Section

**Background:** `brand-offwhite`
**Overline:** "Beyond the Four Projects"
**Heading (H2):** "Community Initiatives That Build the Foundation"
**Subtitle:** "Seven ongoing programmes that mobilise communities, build awareness, and connect villages to education and employment."

```typescript
// lib/projects.ts
export const programmes = [
  {
    id:    'khalbali',
    name:  'Khalbali',
    icon:  'Megaphone',
    color: 'brand-pink',
    summary: 'Monthly community mobilisation event where educators and volunteers visit villages to share programme updates and connect with local leaders.',
    bullets: [
      'Conducted monthly or quarterly across multiple bastis and hamlets',
      'Volunteer educators + community volunteers visit each village directly',
      'Elected representatives, anganwadi workers, and self-help groups participate',
      'Awareness materials on all YEIF programmes distributed at each event',
    ],
  },
  {
    id:    'shiksha-ka-saath',
    name:  'Shiksha Ka Saath',
    icon:  'BookOpen',
    color: 'brand-green',
    summary: 'Volunteer-run education sessions in villages that build children\'s literacy and numeracy, alongside library setup in government schools.',
    bullets: [
      'Hourly reading, writing, and arithmetic sessions by volunteer educators',
      'Village libraries established inside government school buildings',
      'Students trained to run and maintain their school library independently',
      'Supplements the Sakshar Sohna project in additional villages',
    ],
  },
  {
    id:    'nukkad-sabha',
    name:  'Nukkad Sabha',
    icon:  'MessageCircle',
    color: 'brand-terra',
    summary: 'Street-level community forum where young people\'s issues — education, employment, girls\' futures — are discussed and solved together.',
    bullets: [
      'Community-level discussions on education, employment, and girls\' rights',
      "Questions asked by community members are answered by community members — peer-driven",
      'Facilitated by volunteers in partnership with local government schools',
      'Sarpanch and Panch members actively participate as community connectors',
    ],
  },
  {
    id:    'paramarsh',
    name:  'Paramarsh',
    icon:  'GraduationCap',
    color: 'brand-brown',
    summary: 'Free career counselling for students in Class VIII–XII and their families at the end of every academic year.',
    bullets: [
      'End-of-year career sessions for students from Class VIII through Class XII',
      'Families attend alongside students — because educational decisions are family decisions',
      'Government school teachers involved in planning and facilitation',
      'Sarpanch and Panch members mobilise community attendance',
    ],
  },
  {
    id:    'shiksha-aur-kaushal-mela',
    name:  'Shiksha Aur Kaushal Mela',
    icon:  'Star',
    color: 'brand-pink',
    summary: 'Annual education and skill fair bringing schools, colleges, and skill institutes from Gurugram directly into Sohna Block villages.',
    bullets: [
      'Once-a-year event held in a village of the Sohna Block',
      'Schools, colleges, and skill institutes from Gurugram present opportunities',
      'Students and youth meet potential institutes in their own community',
      'Sarpanchs, teachers, and village leaders share their stories and commitment',
    ],
  },
  {
    id:    'yuva-kaushal-centre',
    name:  'Yuva Kaushal Centre',
    icon:  'Laptop',
    color: 'brand-green',
    summary: 'Vocational training in computers and languages for adolescents and youth of all genders, with entrepreneurship pathways for women.',
    bullets: [
      'Computer and language training for boys, girls, men, and women',
      'Women also receive employability and entrepreneurship training',
      'Mentoring through corporate employee engagement and CSR HR programmes',
      'Participants encouraged to pursue self-employment and micro-enterprise',
    ],
  },
  {
    id:    'swachta-aur-sanrakshan',
    name:  'Swachta Aur Sanrakshan',
    icon:  'Droplets',
    color: 'brand-terra',
    summary: 'Community-driven water conservation, cleanliness, and plantation drives across urban and rural Gurugram.',
    bullets: [
      'Water conservation drives at grassroot level across villages and urban areas',
      'Cleanliness campaigns and plantation interventions in both settings',
      'Planned in collaboration with Panchayats, Women\'s Groups, Self Help Groups',
      'Village Level Committees and other NGOs co-implement activities',
    ],
  },
]
```

---

---

## PAGE: IMPACT  `/impact`

### SEO

```typescript
export const metadata = {
  title: 'Our Impact | Yuva Ekta India Foundation',
  description: 'Real numbers from real communities. See how YEIF has served over 1,000 children, 100 women, and 100 malnourished children daily across Gurugram.',
}
```

---

### Page Hero

**[IMAGE]** Social activities collage or children with drawings held up (from PDF page 15).
**Title (H1):** "Our Impact"
**Subtitle:** "Real numbers. Real families. Real change."

---

### Section 1 — Impact Numbers

**Overline:** "What We've Achieved"
**Heading (H2):** "Numbers That Matter"

```typescript
// lib/impact.ts
export const impactStats = [
  { value: 1000, suffix: '+', label: 'Rural children receiving free Remedial Education and Digital Literacy',         icon: 'BookOpen' },
  { value: 100,  suffix: '+', label: 'Women involved in self-employment through Mahila Ajeevika',                    icon: 'Scissors' },
  { value: 100,  suffix: '',  label: 'Malnourished children served with daily nutritious food — every single day',   icon: 'Heart' },
  { value: 50,   suffix: '',  label: 'Computers in our Digital Learning Centre, free for rural children',            icon: 'Monitor' },
  { value: 7,    suffix: '',  label: 'Community programmes running across Sohna Block',                              icon: 'Users' },
  { value: 5000, prefix: '₹', suffix: '', label: 'Average monthly income increase per Mahila Ajeevika household',   icon: 'TrendingUp' },
]
```

---

### Section 2 — Where Every Rupee Goes

**Background:** `brand-offwhite`
**Overline:** "Transparency"
**Heading (H2):** "Where Every Rupee Goes"
**Subtitle:** "We believe you have the right to know exactly how your donation is used. Here are the heads under which all donations are deployed."

```typescript
// lib/impact.ts
export const donationUtilisation = [
  { no: 1,  head: 'Laptops and Computers for the Digital Centre' },
  { no: 2,  head: 'Reading and Learning Materials for Children' },
  { no: 3,  head: 'Chairs and Benches at the Remedial Education Centre' },
  { no: 4,  head: 'Sewing Machines for Skill Training Programs for Girls and Women' },
  { no: 5,  head: 'Professional Training Materials for Skill Development Program Beneficiaries' },
  { no: 6,  head: 'Dry Ration, Gas Cylinders, and Utensils for Daily Nutrition Distribution' },
  { no: 7,  head: 'Stationery for the Children and Youth Centre' },
  { no: 8,  head: 'Travel Expenses for Children Travelling from Remote Villages to the Centre' },
  { no: 9,  head: 'Bags and Uniforms for Children Attending Our Programmes' },
  { no: 10, head: 'Yoga Mats and Dari for Students Attending Yoga and Meditation Sessions' },
]
```

Table: alternating row colours, row number in brand-pink circle, head text in body font.

---

### Section 3 — Wish List

**Background:** `brand-pink` full-width band
**Overline (white muted):** "2022–23 Goals"
**Heading (H2, white):** "Your Contribution Can Make This Happen"
**Subtitle (white, 0.85 opacity):** "Become a one-time, monthly, or quarterly donor and help us hit our targets for the year."

```typescript
export const wishList = [
  { icon: 'BookOpen',      goal: 'Free Remedial Classes',      detail: 'For 100 rural children' },
  { icon: 'UtensilsCrossed',goal: 'Meals for Children & Youth', detail: '1,500 underprivileged children and youth' },
  { icon: 'GraduationCap', goal: 'Educational Fees',           detail: 'Sponsor schooling for 500 rural children' },
  { icon: 'Briefcase',     goal: 'Skill Training',             detail: 'Vocational training for 300 rural youth' },
]
```

Four cards on white rounded background: icon, goal title (bold), detail (muted).
CTA below grid: "Help Us Achieve These Goals" → `/donate`

---

### Section 4 — Social Activities Gallery

**Overline:** "On the Ground"
**Heading (H2):** "A Glimpse of Our Work"
**Subtitle:** "Every photo is a real moment from a real community."

**[IMAGES]** Photo grid from PDF pages 15–16 (Social Activities collage).
Save individual photos as `/public/images/gallery/gallery-01.webp` through `gallery-20.webp` (approximately).
Uniform grid: 3 columns desktop, 2 columns tablet, 1 column mobile.
Click opens Dialog lightbox. No captions needed unless the moment is identifiable (e.g. "Shiksha Aur Kaushal Mela 2022").

---

---

## PAGE: DONATE  `/donate`

### SEO

```typescript
export const metadata = {
  title: 'Donate | Yuva Ekta India Foundation',
  description: 'Support grassroot communities in Gurugram. Donate to YEIF — 80G tax-exempt, CSR-1 registered, NITI Aayog certified. Every rupee reaches a real family.',
}
```

---

### Page Hero

**Background:** Brand-pink gradient → brand-brown
**Title (H1, white):** "Make a Difference Today"
**Subtitle (white):** "Your gift is 100% tax-exempt under Section 80G of the Income Tax Act."

---

### Section 1 — Trust Signals Strip

**Background:** `brand-offwhite`

```typescript
export const trustSignals = [
  { icon: 'BadgeCheck', label: '80G Certified',          detail: 'Your donation is tax-deductible' },
  { icon: 'BadgeCheck', label: '12A Certified',          detail: 'We are income-tax exempt' },
  { icon: 'Building2',  label: 'CSR-1 Registered',       detail: 'Eligible for corporate CSR funds' },
  { icon: 'Globe',      label: 'NITI Aayog Registered',  detail: 'On Darpan portal' },
  { icon: 'Calendar',   label: 'Active since 2018',       detail: 'Reg. No. 03485' },
]
```

Horizontal pill row — icon + label + detail. On mobile: 2 columns.

---

### Section 2 — Donation Widget

**Heading (H2):** "Choose Your Contribution"
**Subtext:** "Select an amount and optionally dedicate your donation to a specific project."

**Amount presets (Button group — toggle active with brand-pink):**
`₹500` | `₹1,000` | `₹2,500` | `₹5,000` | `Other Amount`

When "Other Amount" is selected: text input appears with placeholder "Enter amount in ₹"

**Project selector (Select component, optional):**
Label: "Dedicate to a project (optional)"
Options:
- "General Fund — Where it's needed most"
- "Sakshar Sohna — Remedial Education"
- "Digital Saksharta — Digital Literacy"
- "Mahila Ajeevika — Women's Livelihood"
- "Swastha Sohna — Health & Nutrition"

**CTA Button (brand-pink, full-width, large):**
"Proceed to Donate Securely →"
*On click: `router.push(buildDonationUrl(amount, project))`*

**Below button (muted, small, centered):**
🔒 "You will be redirected to our secure payment page. Powered by Razorpay. Supports UPI, cards, net banking, and wallets."

---

### Section 3 — Adopt a Project

**Background:** `brand-offwhite`
**Heading (H2):** "Adopt an Entire Project"
**Subtitle:** "Make a monthly contribution and become the primary sponsor of one of our active projects. Issue a cheque in favour of Yuva Ekta India Foundation, or use the bank transfer details below."

```typescript
export const adoptableProjects = [
  {
    name:    'Sakshar Sohna',
    focus:   'Remedial Education',
    budget:  '₹30,000 / month',
    target:  '200 children',
    slug:    'sakshar-sohna',
  },
  {
    name:    'Digital Saksharta',
    focus:   'Digital Literacy',
    budget:  '₹35,000 / month',
    target:  '240 children',
    slug:    'digital-saksharta',
  },
  {
    name:    'Mahila Ajeevika',
    focus:   "Women's Livelihood",
    budget:  '₹45,000 / month',
    target:  '50 women',
    slug:    'mahila-ajeevika',
  },
  {
    name:    'Swastha Sohna',
    focus:   'Health & Nutrition',
    budget:  '₹50,000 / month',
    target:  '100 children daily',
    slug:    'swastha-sohna',
  },
]
```

Table (responsive: stacked on mobile): Project | Focus | Monthly Budget | Target | "Adopt" Button

---

### Section 4 — Bank / UPI Details

**Heading (H3):** "Prefer Bank Transfer or UPI?"
**Subtext:** "Use the details below to transfer directly. Please WhatsApp us your name and UTR number at 9990911405 after transferring so we can send your 80G receipt."

**Card (white, border, rounded):**
```
Account Name:   Yuva Ekta India Foundation
Bank:           Union Bank of India
Account Number: 220711100001158
IFSC Code:      UBIN0565091
UPI ID:         Q64836034@ybl
```

**[IMAGE]** QR code PNG beside the bank details: `/public/images/qr-code.png`
Caption under QR: "Scan with any UPI app — GPay, PhonePe, Paytm, BHIM"

---

### Section 5 — 80G Tax Benefit

**Background:** `brand-green-tint`
**Icon:** `Receipt` (brand-green, large)
**Heading (H3):** "Your Donation is Tax-Deductible"
**Body:**
"All donations to Yuva Ekta India Foundation qualify for a 50% deduction under Section 80G of the Income Tax Act, 1961 (subject to the qualifying limit). You will receive an official receipt by email. Please keep it for your tax filing."

"For CSR contributions by companies under Section 135 of the Companies Act, 2013: YEIF is CSR-1 registered. Please contact us at yuvaekta2018@gmail.com for the CSR proposal and Form 10BD."

---

---

## PAGE: THANK YOU  `/thank-you`

### SEO

```typescript
export const metadata = {
  title: 'Thank You | Yuva Ekta India Foundation',
  description: 'Your donation to Yuva Ekta India Foundation has been received. Thank you for supporting grassroot communities in Gurugram.',
  robots: 'noindex', // don't index this page
}
```

---

### Section 1 — Success

**Background:** White, centred, max-width 640px

**Animated icon:** `CheckCircle2` — scale-in + colour pulse animation (brand-green)
**Heading (H1, Playfair):** "Thank You for Your Generosity! 🙏"
**Subtext (body large):**
"Your contribution is already making a difference in the lives of children and families in Gurugram. We are grateful — and so are they."

---

### Section 2 — What Happens Next

**Heading (H3):** "What Happens Next"

```typescript
export const nextSteps = [
  {
    step: 1,
    icon: 'Mail',
    title: 'Payment Receipt',
    detail: 'You will receive a Razorpay payment receipt on your registered email within the next few minutes.',
  },
  {
    step: 2,
    icon: 'FileText',
    title: '80G Tax Certificate',
    detail: 'Our team will send your official 80G tax exemption certificate within 7 working days. Keep it for your income tax filing.',
  },
  {
    step: 3,
    icon: 'Rocket',
    title: 'Your Money at Work',
    detail: 'Funds are deployed to active projects immediately. Every week, your contribution is keeping a child in class, a woman earning, and a family fed.',
  },
]
```

3-step vertical or horizontal list: step number circle (brand-pink) → icon → title → detail.

---

### Section 3 — Share

**Heading (H3):** "Spread the Word"
**Subtext:** "Help us reach more donors by sharing with your network."

**WhatsApp share:**
Pre-filled message: `"I just supported Yuva Ekta India Foundation — a registered NGO in Gurugram empowering grassroot communities through education, livelihood, and health. Donations are 80G tax-exempt. Join me: https://yuvaektaindiafoundation.org/donate"`
Button: "Share on WhatsApp" (green)

**Facebook share:**
Share page URL with OG preview.
Button: "Share on Facebook" (blue)

**Copy link:**
Button: "Copy Donation Link" → copies `https://yuvaektaindiafoundation.org/donate` to clipboard → shows "Copied!" toast.

---

### Section 4 — Back to Site

**Button 1 (brand-pink):** "Explore Our Projects" → `/projects`
**Button 2 (outline):** "Back to Home" → `/`

---

---

## PAGE: CONTACT  `/contact`

### SEO

```typescript
export const metadata = {
  title: 'Contact Us | Yuva Ekta India Foundation',
  description: 'Get in touch with Yuva Ekta India Foundation for donations, volunteering, CSR partnerships, or media enquiries. Call, email, or fill our contact form.',
}
```

---

### Page Hero

**[IMAGE]** Photo of Balram Kumar at a community event or a team gathering.
**Title (H1):** "Get in Touch"
**Subtitle:** "Whether you want to donate, volunteer, partner on CSR, or simply know more — we'd love to hear from you."

---

### Section 1 — Contact Details

**Layout:** 2 columns (details card left, form right) on desktop; stacked on mobile.

**Contact card (brand-brown-tint, rounded-2xl):**

```
Contact Person:  Balram Kumar — Founder & Social Worker

📞  (+91) 8569923173
📞  (+91) 99909 11405
💬  WhatsApp: 9990911405

📧  yuvaekta2018@gmail.com
🌐  www.yuvaektaindiafoundation.org

📍  Village Sehjawas, Panchayat Sohna,
    Block Gurgaon, Haryana – 122102

    Also:
    Damdama Lake Road, Vill. Bahelpa,
    Gurugram, Haryana – 122102
```

**Office hours (muted, small):**
"We are a field organisation. The fastest way to reach us is WhatsApp or email. We typically respond within 1–2 working days."

---

### Section 2 — Contact Form

**Heading (H3):** "Send Us a Message"

```typescript
// Form fields
const fields = [
  { name: 'fullName',  label: 'Full Name',      type: 'text',     required: true,  placeholder: 'Your full name' },
  { name: 'email',     label: 'Email Address',  type: 'email',    required: true,  placeholder: 'you@example.com' },
  { name: 'phone',     label: 'Phone Number',   type: 'tel',      required: false, placeholder: '+91 98765 43210' },
  { name: 'subject',   label: 'Subject',        type: 'select',   required: true,
    options: ['General Enquiry', 'Donation', 'CSR Partnership', 'Volunteering', 'Media Enquiry', 'Other'] },
  { name: 'message',   label: 'Message',        type: 'textarea', required: true,  placeholder: 'Tell us how we can help, or how you'd like to get involved...', rows: 5 },
]
```

**Submit button:** "Send Message" (brand-pink, full-width)

**Success toast:**
Title: "Message Sent!"
Description: "Thank you — we'll get back to you within 2 working days."

**Error toast:**
Title: "Something went wrong."
Description: "Please try again, or email us directly at yuvaekta2018@gmail.com"

---

### Section 3 — Volunteer

**Background:** `brand-green-tint`
**Icon:** `Users` (brand-green, large)
**Heading (H3):** "Volunteer With Us"
**Body:**
"We welcome volunteers with skills in education, healthcare, technology, graphic design, communications, fundraising, and community outreach. You don't need to be a professional — you need to care."

"Whether you can give a few hours on a weekend, run a workshop, or support us remotely — we'll find something meaningful for you to do."

**Volunteer form fields:**
- Full Name *
- Email Address *
- Phone Number
- Skills / Background (textarea) — "Tell us what you're good at"
- Availability — "How many hours per week / month can you give?"
- Message — "Anything else you'd like us to know"
- Submit: "Register as a Volunteer"

---

### Section 4 — Google Maps Embed

**Heading (H3):** "Find Us"
**Subtext:** "Our primary centre is in Sehjawas Village, Sohna Block, Gurugram."

Google Maps `<iframe>` embed for: Sehjawas Village, Sohna, Gurugram, Haryana, India.
Full-width, `height: 400px`, rounded corners.

---

---

## PAGE: 404  `not-found.tsx`

**Icon:** `MapPin` (brand-pink, 64px)
**Heading (H1):** "Page Not Found"
**Body:**
"Looks like this page took a wrong turn somewhere in Sohna Block. Let's get you back on track."

**Button 1 (brand-pink):** "Go to Home Page" → `/`
**Button 2 (outline):** "View Our Projects" → `/projects`

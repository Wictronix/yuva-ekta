# TECH STACK
## Yuva Ekta India Foundation — Website

---

## Philosophy

> Component-first. Type-safe. Accessible by default. Built to scale from a 7-page NGO site
> to a full content platform without rewriting anything.
> A developer should be able to clone the repo and run in under 2 minutes.

---

## Core Stack

| Layer | Technology | Version | Why |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14+ | File-based routing, SSG output, image optimisation, SEO metadata API |
| **Language** | TypeScript | 5+ | Type safety across components and content data |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first, co-located with JSX, responsive by default |
| **UI Components** | shadcn/ui | Latest | Accessible Radix primitives styled with Tailwind — no runtime CSS-in-JS |
| **Icons** | Lucide React | Latest | Tree-shakeable, consistent with shadcn/ui's default icon set |
| **Fonts** | next/font (Google Fonts) | — | Zero layout shift, self-hosted automatically at build time |
| **Animations** | Framer Motion | 11+ | React-native scroll animations, counter effects, page transitions |

---

## Project Structure

```
yuva-ekta-foundation/
├── app/                          ← Next.js App Router
│   ├── layout.tsx                ← Root layout: Navbar + Footer wrap every page
│   ├── page.tsx                  ← Home page  /
│   ├── about/
│   │   └── page.tsx              ← /about
│   ├── projects/
│   │   └── page.tsx              ← /projects
│   ├── impact/
│   │   └── page.tsx              ← /impact
│   ├── donate/
│   │   └── page.tsx              ← /donate
│   ├── thank-you/
│   │   └── page.tsx              ← /thank-you  (Razorpay return URL)
│   ├── contact/
│   │   └── page.tsx              ← /contact
│   └── not-found.tsx             ← 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            ← Sticky nav with mobile Sheet drawer
│   │   └── Footer.tsx            ← 4-column footer
│   ├── ui/                       ← shadcn/ui auto-generated — do not edit manually
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx             ← Mobile nav drawer
│   │   ├── accordion.tsx         ← Programme detail expand/collapse
│   │   ├── tabs.tsx              ← Project switcher on /projects
│   │   ├── dialog.tsx            ← Gallery lightbox
│   │   └── toast.tsx             ← Form feedback toasts
│   ├── sections/                 ← Full-width page sections, composed in page.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ImpactStrip.tsx
│   │   ├── AboutTeaser.tsx
│   │   ├── FocusAreas.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── HowToHelp.tsx
│   │   ├── FounderQuote.tsx
│   │   ├── PartnersStrip.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProgrammeCard.tsx
│   │   ├── DonationWidget.tsx
│   │   ├── BankDetails.tsx
│   │   └── TrustSignals.tsx
│   └── shared/
│       ├── PageHero.tsx          ← Reusable inner-page hero banner
│       ├── SectionHeading.tsx    ← Heading + optional subtitle + overline label
│       ├── StatCounter.tsx       ← Animated count-up number
│       └── SocialShareButtons.tsx
│
├── lib/
│   ├── constants.ts              ← Org name, address, phone, social links, nav items
│   ├── projects.ts               ← All 4 project objects + 7 programme objects (typed)
│   ├── impact.ts                 ← Stat numbers, donation utilisation rows, wish list
│   ├── utils.ts                  ← shadcn/ui cn() utility
│   └── razorpay.ts               ← Razorpay URL builder
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   ├── og-home.webp          ← Open Graph preview images
│   │   ├── hero-home.webp
│   │   ├── hero-about.webp
│   │   ├── founder.webp
│   │   ├── qr-code.png           ← Razorpay QR — export from Razorpay dashboard
│   │   └── projects/
│   │       ├── sakshar-sohna.webp
│   │       ├── digital-saksharta.webp
│   │       ├── mahila-ajeevika.webp
│   │       └── swastha-sohna.webp
│   ├── robots.txt
│   └── sitemap.xml
│
├── styles/
│   └── globals.css               ← @tailwind directives + CSS custom properties
│
├── tailwind.config.ts            ← Brand colour tokens, font families
├── components.json               ← shadcn/ui configuration file
├── next.config.ts                ← Image domains, static export flag
├── .env.local                    ← Razorpay URL, Formspree ID (never commit)
└── tsconfig.json
```

---

## shadcn/ui Setup & Components

### Initialise

```bash
npx create-next-app@latest yuva-ekta-foundation --typescript --tailwind --app
cd yuva-ekta-foundation
npx shadcn@latest init
```

**shadcn init prompts:**
- Style: **Default**
- Base colour: **custom** (we override with brand tokens in `globals.css`)
- CSS variables: **Yes**

### Add components

```bash
npx shadcn@latest add button card badge input textarea select separator
npx shadcn@latest add sheet          # Mobile nav slide-in drawer
npx shadcn@latest add accordion      # Programme cards expand/collapse
npx shadcn@latest add tabs           # Project tabs on /projects page
npx shadcn@latest add dialog         # Media gallery lightbox
npx shadcn@latest add toast          # Contact form + donation feedback
npx shadcn@latest add progress       # Optional: donation goal progress bar
npx shadcn@latest add skeleton       # Loading skeletons for images
```

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        brand: {
          pink:       '#BF3475',
          'pink-dark':'#A02C63',
          'pink-tint':'#FCE8F0',
          green:      '#6FA656',
          'green-dark':'#5D8F47',
          'green-tint':'#EBF5E5',
          terra:      '#D94A3D',
          brown:      '#593414',
          'brown-tint':'#F5EDE5',
          offwhite:   '#F2F2F2',
        },
        // shadcn/ui CSS variable mapping
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border:      'hsl(var(--border))',
        ring:        'hsl(var(--ring))',
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'counter-up': 'counterUp 1.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## CSS Variables (globals.css)

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui base — mapped to brand colours */
    --background:        0 0% 100%;
    --foreground:        228 28% 13%;        /* #1A1A2E */
    --primary:           330 57% 48%;        /* #BF3475 brand-pink */
    --primary-foreground:0 0% 100%;
    --secondary:         96 24% 50%;         /* #6FA656 brand-green */
    --secondary-foreground: 0 0% 100%;
    --muted:             0 0% 95%;
    --muted-foreground:  0 0% 42%;           /* #6B6B6B */
    --accent:            330 57% 95%;        /* pink tint */
    --accent-foreground: 330 57% 35%;
    --destructive:       3 67% 51%;          /* #D94A3D */
    --destructive-foreground: 0 0% 100%;
    --border:            0 0% 88%;           /* #E0E0E0 */
    --ring:              330 57% 48%;        /* focus ring = brand-pink */
    --radius:            0.5rem;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
  h1, h2 { @apply font-display tracking-tight; }
  h3, h4, h5, h6 { @apply font-sans; }
}

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Skip to main */
.skip-link {
  @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
         focus:px-4 focus:py-2 focus:bg-brand-pink focus:text-white focus:rounded-md;
}
```

---

## Font Setup (app/layout.tsx)

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Content Data Pattern (lib/projects.ts)

```typescript
export type Project = {
  id: string
  slug: string
  name: string
  tagline: string
  supporter: string
  description: string[]       // paragraphs
  stats: {
    target: string
    objective: string
    monthlyBudget: string
  }
  fundingHeads: string[]
  image: string               // path in /public/images/projects/
  color: string               // Tailwind class for accent
}

export const projects: Project[] = [
  {
    id: 'sakshar-sohna',
    slug: 'sakshar-sohna',
    name: 'Sakshar Sohna',
    tagline: 'Remedial Education for Dropout and At-Risk Children',
    supporter: 'Expert Solutions for Non Profit',
    // ... full content from CONTENT_FINAL.md
  },
  // ...
]
```

---

## Payment / Donation (No Backend)

| Component | Technology | Notes |
|---|---|---|
| **Hosted Payment Page** | Razorpay Payment Pages | Free; no server; supports UPI, cards, net banking, wallets |
| **Redirect** | `router.push(url)` or `<a href>` | Client component — `'use client'` directive on DonationWidget |
| **Return URL** | `/thank-you` | Set in Razorpay dashboard → "Redirect URL after payment" |
| **UPI Deep Link** | `upi://pay?pa=Q64836034@ybl&pn=...&am=AMOUNT` | Mobile deep link as fallback |
| **QR Code** | `/public/images/qr-code.png` | Static image exported from Razorpay dashboard |

```typescript
// lib/razorpay.ts
export const RAZORPAY_PAGE_URL = process.env.NEXT_PUBLIC_RAZORPAY_PAGE_URL!

export function buildDonationUrl(amountInRupees?: number, project?: string): string {
  const url = new URL(RAZORPAY_PAGE_URL)
  if (amountInRupees) url.searchParams.set('amount', String(amountInRupees * 100))
  if (project) url.searchParams.set('description', project)
  return url.toString()
}
```

---

## Forms (No Backend)

| Form | Service | How |
|---|---|---|
| Contact form | Formspree.io | `fetch` POST from `'use client'` component |
| Volunteer sign-up | Formspree (2nd endpoint) | Same pattern, separate form ID |
| Newsletter opt-in | Mailchimp embed | Optional `<iframe>` or JS snippet |

```typescript
// In ContactForm.tsx  ('use client')
const onSubmit = async (data: ContactFormValues) => {
  const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  res.ok
    ? toast({ title: 'Message sent!', description: "We'll respond in 2 working days." })
    : toast({ variant: 'destructive', title: 'Failed to send. Please try again.' })
}
```

---

## Environment Variables

```bash
# .env.local  — never commit this file
NEXT_PUBLIC_RAZORPAY_PAGE_URL=https://pages.razorpay.com/yuva-ekta-donate
NEXT_PUBLIC_SITE_URL=https://yuvaektaindiafoundation.org
NEXT_PUBLIC_FORMSPREE_ID=xpwzabcd
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Deployment (Vercel — recommended)

```bash
npm run build          # verify static export compiles
vercel --prod          # first deploy
```

Or connect GitHub → vercel.com → import repo → auto-deploy on push to `main`.

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove 'export' if staying on Vercel with server features
  output: 'export',
  images: {
    unoptimized: true,   // required when output: 'export'
  },
  trailingSlash: true,
}

export default nextConfig
```

---

## Key npm Scripts

```bash
npm run dev      # localhost:3000 with hot reload
npm run build    # production build + static export
npm run start    # serve production build locally
npm run lint     # ESLint check
```

---

## What We Are NOT Using

- ❌ Pages Router — App Router only
- ❌ Redux / Zustand — no global state needed; React state is enough
- ❌ Prisma / Drizzle / any ORM — no database
- ❌ tRPC / REST API routes — all data is static TypeScript in `lib/`
- ❌ NextAuth — no user authentication
- ❌ CMS (Contentful, Sanity, Strapi) — content lives in `lib/*.ts` files
- ❌ CSS Modules / styled-components — Tailwind + shadcn/ui only
- ❌ Class Variance Authority (standalone) — shadcn/ui bundles it internally

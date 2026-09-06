# BRAND
## Yuva Ekta India Foundation — Visual Identity & Style Guide

---

## Logo

**Primary logo:** Tree of life with three human figures (adult + two children), multi-coloured leaves radiating outwards.
**Wordmark:** "yuva ekta india" in lowercase mixed-colour text + "FOUNDATION" in dark caps beneath.

| Variant | File | When to use |
|---|---|---|
| Full colour | `public/images/logo.png` | White or light backgrounds |
| White | `public/images/logo-white.png` | Dark / coloured backgrounds, footer |

**Logo component:**
```tsx
// components/shared/Logo.tsx
import Image from 'next/image'
import Link from 'next/link'

export function Logo({ variant = 'default' }: { variant?: 'default' | 'white' }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={variant === 'white' ? '/images/logo-white.png' : '/images/logo.png'}
        alt="Yuva Ekta India Foundation"
        width={140}
        height={48}
        priority
      />
    </Link>
  )
}
```

### Logo Rules
- Minimum display width: **120px**
- Clear space: equal to height of the letter "y" on all four sides
- Never stretch, rotate, or recolour the logo
- Never place the colour logo on a dark or busy background

---

## Colour Palette

Derived from the uploaded Adobe Color swatch, harmonised with the logo's warm, earthy, community-driven identity.

### Primary Colours

| Role | Name | Hex | Tailwind class | CSS variable |
|---|---|---|---|---|
| **CTA / Primary** | Crimson Pink | `#BF3475` | `brand-pink` | `--primary` |
| **Nature / Secondary** | Sage Green | `#6FA656` | `brand-green` | `--secondary` |
| **Accent / Energy** | Terracotta Red | `#D94A3D` | `brand-terra` | `--destructive` |

### Neutral Colours

| Role | Name | Hex | Tailwind class |
|---|---|---|---|
| **Dark earth** | Chocolate Brown | `#593414` | `brand-brown` |
| **Page background** | Off White | `#F2F2F2` | `brand-offwhite` |
| **Cards / surfaces** | Pure White | `#FFFFFF` | `white` |
| **Body text** | Near Black | `#1A1A2E` | `foreground` |
| **Muted text** | Warm Gray | `#6B6B6B` | `muted-foreground` |
| **Borders** | Light Gray | `#E0E0E0` | `border` |

### Tint Colours (backgrounds)

| Name | Hex | Tailwind class | Use |
|---|---|---|---|
| Pink Tint | `#FCE8F0` | `brand-pink-tint` | Callout cards, active states |
| Green Tint | `#EBF5E5` | `brand-green-tint` | Info cards, success states |
| Brown Tint | `#F5EDE5` | `brand-brown-tint` | Warm section backgrounds |

### Colour Roles in Practice

| Element | Colour |
|---|---|
| Primary buttons, key links, active nav | `brand-pink` |
| Hover state of primary button | `brand-pink-dark` (`#A02C63`) |
| Secondary buttons, icon accents | `brand-green` |
| Footer, dark hero overlays | `brand-brown` |
| Warning / urgent callouts | `brand-terra` |
| Page & section backgrounds | `brand-offwhite` |
| Stat counter backgrounds | `brand-brown` or `brand-pink` |
| Success toasts, 80G badge | `brand-green` |
| Error toasts | `brand-terra` |

---

## Typography

### Fonts

| Font | Role | Weights | Load via |
|---|---|---|---|
| **Playfair Display** | H1, H2, hero titles, section headings | 700 | `next/font/google` |
| **Inter** | Body, UI, nav, buttons, labels, captions | 400, 500, 600, 700, 800 | `next/font/google` |

### Type Scale

| Element | Font | Desktop size | Mobile size | Weight | Line height | Colour |
|---|---|---|---|---|---|---|
| H1 — Hero title | Playfair | 56px / 3.5rem | 36px / 2.25rem | 700 | 1.15 | white or `foreground` |
| H2 — Section title | Playfair | 40px / 2.5rem | 28px / 1.75rem | 700 | 1.2 | `foreground` |
| H3 — Subsection | Inter | 24px / 1.5rem | 20px / 1.25rem | 600 | 1.3 | `brand-pink` |
| H4 — Card title | Inter | 18px / 1.125rem | 18px | 600 | 1.4 | `foreground` |
| Body default | Inter | 16px / 1rem | 15px | 400 | 1.7 | `foreground` |
| Body large | Inter | 18px / 1.125rem | 16px | 400 | 1.7 | `foreground` |
| Caption / overline | Inter | 13px | 12px | 500 | 1.4 | `muted-foreground` |
| Stat number | Inter | 48px / 3rem | 36px | 800 | 1.0 | white |
| Badge / label | Inter | 12px | 12px | 600 | 1.2 | varies |
| Button | Inter | 16px | 15px | 600 | 1.0 | white |
| Nav link | Inter | 15px | — | 500 | 1.0 | `foreground` |

### Letter Spacing
- H1, H2: `-0.02em` (tighter for display headings)
- Uppercase overlines/labels: `0.08em`
- Body: `0` (default)

---

## shadcn/ui Component Customisation

All shadcn/ui components inherit from CSS variables set in `globals.css`. Override specific variants in `components/ui/*.tsx`.

### Button variants in use

```tsx
// Primary — Donate Now, main CTAs
<Button>Donate Now</Button>
// → bg-primary (brand-pink), white text, hover bg-primary/90

// Secondary — outline buttons
<Button variant="outline">Learn More</Button>
// → border-primary, text-primary, hover bg-accent

// Ghost — nav links, subtle actions
<Button variant="ghost">See Our Work</Button>

// White ghost — on dark/coloured backgrounds
// Custom variant added to button.tsx:
<Button variant="white-outline">Explore Projects</Button>
// → border-white, text-white, hover bg-white/15

// Green — secondary action
// Custom variant:
<Button variant="green">Volunteer With Us</Button>
// → bg-brand-green, white text, hover bg-brand-green-dark
```

**Adding custom variants to `components/ui/button.tsx`:**
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center ...",
  {
    variants: {
      variant: {
        default:       "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:       "border border-primary text-primary hover:bg-accent",
        ghost:         "hover:bg-accent hover:text-accent-foreground",
        "white-outline":"border-2 border-white text-white hover:bg-white/15",
        green:         "bg-brand-green text-white hover:bg-brand-green-dark",
        // ...rest of defaults
      }
    }
  }
)
```

### Badge variants in use

```tsx
<Badge variant="default">80G Certified</Badge>     // brand-pink bg
<Badge variant="secondary">Supported by...</Badge>  // brand-green bg
<Badge variant="outline">CSR-1</Badge>              // outlined
```

### Card usage pattern

```tsx
<Card className="hover:shadow-lg transition-shadow duration-200">
  <CardHeader>
    <CardTitle>Sakshar Sohna</CardTitle>
    <CardDescription>Supported by Expert Solutions for Non Profit</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>
```

---

## Spacing System

Uses Tailwind's default 4px base unit. Standard page sections:

| Token | Value | Common use |
|---|---|---|
| `p-4` | 16px | Card internal padding (sm) |
| `p-6` | 24px | Card internal padding (default) |
| `gap-6` | 24px | Grid / flex gap between cards |
| `py-16` | 64px | Section vertical padding (mobile) |
| `py-24` | 96px | Section vertical padding (desktop) |
| `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | — | Standard container on all sections |

---

## Component Patterns

### SectionHeading component

```tsx
// components/shared/SectionHeading.tsx
interface SectionHeadingProps {
  overline?: string      // small uppercase label above title
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean        // white text for dark backgrounds
}

// Usage:
<SectionHeading
  overline="Our Work"
  title="Active Projects & Programmes"
  subtitle="Four projects. Seven community initiatives. One shared mission."
  centered
/>
```

### PageHero component

```tsx
// components/shared/PageHero.tsx
interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  breadcrumb?: { label: string; href: string }[]
}

// Renders: dark overlay image + title + optional breadcrumb
// Used on: /about, /projects, /impact, /donate, /contact
```

### StatCounter component

```tsx
// components/shared/StatCounter.tsx
// Uses Framer Motion useInView + useMotionValue to animate count-up
// Respects prefers-reduced-motion: skips animation, shows final value

interface StatCounterProps {
  value: number
  suffix?: string    // "+", "%", "₹"
  prefix?: string
  label: string
  duration?: number  // seconds, default 1.5
}
```

---

## Iconography

- **Library:** `lucide-react` (already a dependency of shadcn/ui)
- **Style:** Outline, `strokeWidth={1.5}` for all feature icons
- **Sizes:**

| Context | Size | Tailwind |
|---|---|---|
| Inline / text | 16px | `size-4` |
| Button icon | 20px | `size-5` |
| Card feature icon | 40px | `size-10` |
| Section icon | 48px | `size-12` |
| Hero / large | 64px | `size-16` |

- **Icon → concept mapping:**

| Icon (Lucide) | Concept |
|---|---|
| `BookOpen` | Remedial Education |
| `Monitor` | Digital Literacy |
| `Scissors` | Women's Livelihood / Stitching |
| `Heart` | Health & Nutrition |
| `Users` | Community Mobilisation |
| `GraduationCap` | Career Counselling (Paramarsh) |
| `Droplets` | Water Conservation |
| `ShoppingBag` | Buy Products |
| `HandHeart` | Volunteer |
| `BadgeCheck` | Certification / Trust signals |
| `PhoneCall` | Contact |
| `MapPin` | Address |
| `Mail` | Email |
| `Share2` | Social sharing |
| `CheckCircle2` | Thank-you / success state |

---

## Imagery Guidelines

### Photo Style
- **Real photos only** — no generic stock photography
- Authentic moments: children learning, women at work, field activities
- Warm colour temperature; avoid cold blue-tinted photos
- Subjects' faces should be visible and expressive

### Next.js Image Component usage

```tsx
// Always use next/image for automatic optimisation
import Image from 'next/image'

<Image
  src="/images/projects/sakshar-sohna.webp"
  alt="Children attending Sakshar Sohna remedial class in Sohna Block"
  width={800}
  height={450}
  className="w-full h-48 object-cover rounded-t-lg"
/>
```

### Recommended dimensions

| Usage | Dimensions | Format | Max size |
|---|---|---|---|
| Hero / full-width | 1920×1080px | WebP | 300KB |
| Project card | 800×450px | WebP | 150KB |
| Team / profile | 400×400px | WebP | 80KB |
| Gallery | 600×600px | WebP | 120KB |
| OG preview | 1200×630px | WebP/JPG | 200KB |

### Hero image treatment

```tsx
// Dark gradient overlay pattern for all hero images
<div className="relative h-[600px] w-full">
  <Image src={src} alt={alt} fill className="object-cover" priority />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
  <div className="absolute inset-0 flex items-end pb-16 px-8">
    {/* Hero text content */}
  </div>
</div>
```

---

## Animation

Using Framer Motion throughout. Respect `prefers-reduced-motion`.

```tsx
// Wrap animated components
import { motion, useReducedMotion } from 'framer-motion'

const shouldReduce = useReducedMotion()

const fadeUp = {
  hidden:  { opacity: 0, y: shouldReduce ? 0 : 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
```

| Element | Effect | Trigger |
|---|---|---|
| Section headings | Fade + slide up 24px | Scroll into view |
| Cards | Fade + slide up, staggered 100ms | Scroll into view |
| Stat counters | Count up from 0 | Scroll into view |
| Navbar | bg transparent → white | Scroll past 80px |
| Buttons | `scale(1.02)` | Hover (CSS) |
| Mobile Sheet | Slide in from right | shadcn/ui Sheet |
| Thank-you check | Scale + bounce | Page load |

**Duration standards:**
- Entrances: `0.4–0.6s ease-out`
- Hover transitions: `150ms ease`
- Nav transition: `200ms ease`

---

## Responsive Breakpoints

Using Tailwind's defaults — mobile-first:

| Prefix | Min-width | Use |
|---|---|---|
| *(none)* | 0px | Mobile base styles |
| `sm:` | 640px | Large mobile / landscape |
| `md:` | 768px | Tablet portrait |
| `lg:` | 1024px | Tablet landscape / small desktop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Large desktop |

**Standard grid patterns:**
```tsx
// 4-column focus areas
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// 3-column programme cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 2-column with text + image
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

// Impact strip — 4 stats
<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## Accessibility Standards

- shadcn/ui components built on Radix UI — keyboard navigation and ARIA roles included
- Focus ring: `ring-2 ring-brand-pink ring-offset-2` (set via `--ring` CSS variable)
- Colour contrast ≥ **4.5:1** for body text (WCAG AA)
- Colour contrast ≥ **3:1** for large text (18px+)
- All `<Image>` components require descriptive `alt` attributes
- All form inputs have associated `<label>` via `htmlFor` or shadcn Label component
- Skip-to-main link in root layout
- `<html lang="en">` on root layout
- `<main id="main">` wraps all page content

---

## Voice & Tone

| Trait | What this means |
|---|---|
| **Warm** | Write like a community member, not a marketing team |
| **Honest** | Real numbers, real names, real places — never exaggerate |
| **Hopeful** | Show progress without hiding challenges |
| **Dignified** | Never portray beneficiaries as objects of pity |
| **Concise** | Every sentence earns its place |
| **Grounded** | Avoid "empower", "holistic", "synergy" — use plain language |

### Do / Don't

| ✅ Write | ❌ Never write |
|---|---|
| "100 children receive meals every day" | "Starving children desperately need your help" |
| "Your donation is tax-exempt under 80G" | "Make a tax-saving donation today!" |
| "Rural children in Gurugram" | "Poor, underprivileged victims" |
| "Together, we can reach more families" | "Donate now before it's too late!" |
| "Balram Kumar founded YEIF in 2018" | "A humble man started a small initiative" |

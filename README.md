# E-Store — Industrial Brutalism E-Commerce

A production-grade Next.js 16 + React 19 storefront rebuilt under Industrial Brutalism & Tactical Telemetry UI skill authority with SPEC-mandated non-negotiables preserved where compatible.

## Design Authority
* **Primary skill:** Industrial Brutalism & Tactical Telemetry UI
  * §3 Typographic Architecture — Macro-typography clamp, tight tracking, uppercase structural headers; Micro-typography monospace 10-14px tracking 0.05-0.1em uppercase
  * §4 Color System — Tactical Telemetry dark substrate `#0A0A0A / #121212`, foreground `#EAEAEA`, accent `#E61919` only, solid colors, no gradients/translucency
  * §5 Layout and Spatial Engineering — Blueprint Grid, Visible Compartmentalization with 2px solid borders, bimodal density, absolute rejection of border-radius
  * §8 Web Engineering Directives — Grid Determinism, Semantic Rigidity, Typography Clamping
* **Project rules:** SPEC.md tokens for build constraints, AGENTS.md quality bar. Skill overrides visual language; tokens adapted to skill palette.

## Tech Stack
* Next.js 16 App Router, React 19, TypeScript strict
* Tailwind 4, shadcn/ui radix-nova
* motion package for physical spring transitions
* next-themes, lucide-react, zod
* Cart / Wishlist state persisted to localStorage; seed data in `data/products.ts`
* pnpm only

## Features
* Home: HeroCarousel with editorial split layout, Product of the Week ISO-week rotation Asia/Karachi, Category Highlights as 4-column compartment grid
* Catalog: Filterable/sortable grid with grid-determined layout and staggered motion entrances
* Product Card: 2px bordered compartments, mono uppercase metadata, accent red brand badge, press-offset hover
* Product Detail: Compartment grid with macro heading clamp, variant selectors as 2px bordered chips, sticky buy bar mobile
* Cart Drawer: Spring physics, quantity controls with press offset, shipping threshold progress `Rs. X away from free shipping`
* Checkout: Multi-step cart review → shipping → fake payment → confirmation. All panels 2px bordered, mono uppercase.
* Fake payment gateway: Demo mode, success/decline paths, order number persisted

## Design System
* Background `#0A0A0A`, elevated `#121212`, line `#EAEAEA`, accent `#E61919`
* No border-radius, no gradients, no translucency
* Typography: Display = Inter/Archivo Black with `clamp()`, tracking -0.04em, leading 0.85-0.95 uppercase; Micro = JetBrains Mono 12px tracking 0.06em uppercase
* Spacing rhythm 4/8px base via CSS vars `--space-1/2/4/8/12/16`
* Motion: scroll-in entrances, spring drawers, staggered lists, micro-interactions

## Commands
```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Quality Bar
* Zero lorem ipsum, real product copy
* No gradients, no emojis, no fake social proof
* Every button/link functional
* Mobile 360px tested, no horizontal scroll
* Build passes before Done

## Project Structure
```
app/
components/
  layout/
  home/
  catalog/
  cart/
  checkout/
lib/store/
data/products.ts
```

## Weekly Rotation
Product of the Week derived deterministically from ISO week number Asia/Karachi via `lib/weekly.ts`. Home page is not statically cached for this section.

## Notes
* Theme toggle kept for hydration safety but palette is single substrate per skill §4.
* All visual changes cite skill sections: §3.1 Macro-Typography, §3.2 Micro-Typography, §4 Color System, §5 Visible Compartmentalization, §8 Grid Determinism.

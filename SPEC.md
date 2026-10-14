# SPEC.md — E-Commerce Storefront Build

One-time build spec. Permanent coding rules live in `AGENTS.md`. Where this file
scopes or overrides AGENTS.md for this build, this file wins.

## Scope decisions (read first)

- **No database for this build.** Products live in a typed seed file (`data/products.ts`).
  Cart, wishlist, and orders persist in browser storage (localStorage). The data-layer,
  RLS, and auth rules in AGENTS.md do not apply to this build.
- **Guest checkout:** yes. No login, no accounts.
- **Catalog size:** 12–16 products across 3–4 categories.
- **Shipping:** flat Rs. 250, free on orders over Rs. 5,000. Show the threshold in the cart.
- **PKR formatting:** `Rs. 1,250` — `Rs.` prefix, thousands separators, no decimals.
- **Build order:** build features in numbered order below. Later features depend on earlier ones.

## Project structure

Scaffold exactly this layout. Do not invent extra top-level folders. Every shared
component lives in its own PascalCase folder per AGENTS.md
(`components/ComponentName/ComponentName.tsx`).

```
ecommerce-store/
├── app/
│   ├── globals.css                 # theme tokens (CSS variables) — never hardcode colors
│   ├── layout.tsx                  # root layout: providers + sidebar + navbar (Server)
│   ├── page.tsx                    # home page (Server Component)
│   ├── loading.tsx / error.tsx     # route-level states
│   ├── products/
│   │   ├── page.tsx                # catalog grid (Server Component)
│   │   └── [slug]/page.tsx         # product detail (Server Component)
│   ├── wishlist/page.tsx           # wishlist page (Server Component)
│   ├── checkout/page.tsx           # checkout flow (Server Component)
│   └── order-confirmation/page.tsx # success screen (Server Component)
├── components/
│   ├── ui/                         # shadcn/ui — installed via CLI, never hand-written
│   ├── layout/
│   │   ├── Sidebar/Sidebar.tsx
│   │   ├── Navbar/Navbar.tsx
│   │   └── ThemeToggle/ThemeToggle.tsx
│   ├── home/
│   │   ├── HeroCarousel/HeroCarousel.tsx
│   │   ├── ProductOfTheWeek/ProductOfTheWeek.tsx
│   │   └── CategoryHighlights/CategoryHighlights.tsx
│   ├── catalog/
│   │   ├── ProductGrid/ProductGrid.tsx
│   │   ├── ProductCard/ProductCard.tsx
│   │   ├── ProductFilters/ProductFilters.tsx
│   │   └── ProductGallery/ProductGallery.tsx
│   ├── cart/
│   │   ├── CartDrawer/CartDrawer.tsx
│   │   └── CartSummary/CartSummary.tsx
│   ├── checkout/
│   │   ├── CheckoutSteps/CheckoutSteps.tsx
│   │   ├── ShippingForm/ShippingForm.tsx
│   │   ├── FakePaymentForm/FakePaymentForm.tsx
│   │   └── OrderSummary/OrderSummary.tsx
│   └── providers/
│       └── Providers.tsx           # client boundary: theme + store providers
├── data/
│   └── products.ts                 # typed seed data — the ONLY product source
├── lib/
│   ├── store/cart.ts               # cart state, localStorage-persisted
│   ├── store/wishlist.ts           # wishlist state, localStorage-persisted
│   ├── format.ts                   # PKR formatting: Rs. 1,250
│   ├── weekly.ts                   # ISO-week rotation (Asia/Karachi)
│   ├── validation.ts               # Zod schemas (shipping, payment)
│   └── utils.ts                    # cn() helper
├── public/
│   └── products/                   # locally generated product images, one style
├── components.json                 # shadcn config
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

Structure rules:

- `page.tsx` files are Server Components. All interactivity lives in Client
  Components under `components/` (per AGENTS.md).
- Components never fetch products from anywhere except `data/products.ts`, via props.
- Cart/wishlist state lives in `lib/store/`, persisted to localStorage. No other
  persistence exists in this build.

## Commands

Clean install, in this order. pnpm only — never npm, yarn, bun, or npx.

```bash
# 1. Scaffold (skip if the project already exists)
pnpm dlx create-next-app@latest ecommerce-store --typescript --tailwind --eslint --app --import-alias "@/*"

cd ecommerce-store

# 2. Install dependencies
pnpm install

# 3. shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input sheet dialog badge skeleton select form label

# 4. Feature packages (exact list — do not add others without asking)
pnpm add next-themes motion lucide-react zod

# 5. Env (verify .env exists before dev — a missing .env crashes pnpm dev)
cp .env.example .env

# 6. Daily loop
pnpm dev        # dev server on http://localhost:3000
pnpm lint       # before every commit
pnpm build      # only after tests are green (AGENTS.md: change → test → build → done)
```

Command rules:

- One-off CLIs always via `pnpm dlx`, never npx.
- Do not install framer-motion — the `motion` package is its successor. Confirm the
  import path via Context7.
- Do not add a database, ORM, or auth library for this build. The scope decisions
  forbid it.

## Features

Each feature must fully work, not just render.

### 1. Home page
- Hero carousel with auto-rotation, manual controls, and swipe support.
- "Product of the Week" section. Rotation rule: derive the featured product deterministically
  from the ISO week number in the **Asia/Karachi** timezone. The home page must NOT be
  statically cached — the weekly pick must actually change week to week. Test by mocking the date.
- Category highlights.

### 2. Product catalog
- Filterable and sortable grid (category, price range, search).
- Product detail pages with image gallery, size/color variants, and stock indicators.

### 3. Cart
- Add, remove, and update quantities.
- Slide-over cart drawer.
- Persisted across sessions (localStorage).
- Totals with shipping estimate per the scope decisions above.

### 4. Wishlist
- Heart toggle on cards and detail pages.
- Dedicated wishlist page.
- Persisted across sessions (localStorage).

### 5. Checkout
- Multi-step flow: cart review → shipping info (Zod-validated) → payment → confirmation.
- Order summary visible throughout.

### 6. Fake payment gateway
- Simulated card form with input formatting and validation.
- Realistic processing state.
- Success AND decline paths.
- Clearly labeled "Demo mode — no real charge".
- Generates an order confirmation with order number. Orders persist in localStorage.

### Docs
- README section covering the feature list, the weekly-rotation logic, and how the fake gateway works.
- Docs ship alongside each feature, not as a final phase.

## Design

- **Themes:** dark AND light, toggleable and persisted (CSS variables + next-themes).
  Must look premium in both — test both.
- **Glassmorphism:** frosted navbar, glass cards, translucent cart drawer
  (backdrop-blur, subtle borders, layered depth).
- **Navigation:** collapsible sidebar (becomes hamburger / bottom nav on mobile).
- **Motion:** use the `motion` package (not the old framer-motion — confirm the import
  path via Context7). Page transitions, staggered list entrances, spring-physics drawer,
  animated carousel, button micro-interactions. Motion should feel physical, never
  decorative. If everything on the page is animating at once, it is slop.

### Color system

Exact tokens. Implement as CSS variables, no deviations.

**Brand colors (same in both themes):**

| Token | Value | Use |
| --- | --- | --- |
| `--primary` | `#D8FF3E` | Acid lime: CTAs, highlights, active states only |
| `--primary-ink` | `#0C0C10` | Text on primary |
| `--accent` | `#FF5C38` | Vermilion: sale badges, urgent, destructive |

**Theme tokens:**

| Token | Dark (default) | Light |
| --- | --- | --- |
| `--bg` | `#0C0C10` | `#F5F3EC` (warm paper) |
| `--bg-elevated` | `#141419` | `#FFFFFF` |
| `--glass` | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.55)` |
| `--glass-border` | `rgba(255,255,255,0.10)` | `rgba(12,12,16,0.08)` |
| `--line` (2px solid borders) | `#26262E` | `#141419` |
| `--shadow` (hard offset) | `4px 4px 0 #2E2E38` | `4px 4px 0 #141419` |
| `--text` | `#F4F4F0` | `#141419` |
| `--text-muted` | `#9C9CA6` | `#6B6B76` |
| `--success` | `#34D399` | `#059669` |
| `--warning` | `#FBBF24` | `#D97706` |
| `--error` | `#F87171` | `#DC2626` |

**Color rules:**

- Solid colors only. No linear gradients anywhere, especially no purple-blue.
- Glass surfaces: blur + translucency + 1px `--glass-border`.
- Brutalist elements: 2px solid `--line` borders + hard `--shadow` on buttons, badges,
  and cards on hover.
- `--primary` is for CTAs and key highlights only — as fills with dark text/ink.
  Never as body text or icon color on the light theme (contrast fails). Never large
  background areas.
- `--accent` is reserved for sale/urgent.
- Never place primary and accent adjacent at large sizes.

**Product imagery:** generate all product visuals locally in one consistent style
(flat product renders on the theme background). No external image hosts, no random
stock photos — a wallet must not show a mountain. If any remote image host is ever
used, add it to the Next.js image settings first.

## Quality bar — no AI slop

These are hard failures, not suggestions.

- **Zero lorem ipsum.** Real, believable product names, descriptions, and PKR prices.
  Every product gets a distinct name and a 1-2 sentence description that sounds like
  a real seller wrote it.
- **No generic purple-blue gradients.** Use the color system above exactly.
- **No emojis as UI icons.** Ever. Use lucide-react throughout.
- **No generic marketing copy.** Ban "Welcome to our store", "Discover amazing
  products", "Shop the best deals" and anything in that family. Headlines must say
  something specific.
- **No fake social proof.** No invented testimonials, no "10,000+ happy customers",
  no star ratings on products with zero reviews. No reviews means "No reviews yet".
  Never fabricate.
- **No dead UI.** Every button, link, and control must do something real. No "#"
  links, no "coming soon" pages.
- **No filler sections.** Every section earns its place. A "Why choose us" strip that
  says nothing specific gets cut.
- **One type scale, one spacing rhythm,** applied everywhere. No random font sizes per
  section, nothing eyeballed. (radix-nova is compact — verify spacing visually; airy
  beats cramped on product grids.)
- **Motion with restraint.** Entrances on scroll-in, micro-interactions on hover/press.
- **Mobile-first responsive.** Test at 360px: no horizontal scroll, no overlapping elements.

## Progress tracking

- Keep the checklist below current at all times.
- Allowed statuses: `Not started` / `In progress` / `Blocked` / `Done`. Nothing else —
  no "almost done", no percentages.
- After a feature is fully completed, mark it `Done` with a one-line verified note in
  the format: `tests 12/12 green, build ok`.
- A feature earns `Done` only when all four are true:
  1. Its own tests pass.
  2. Its section re-tests pass.
  3. The full-app smoke pass is green.
  4. `pnpm build` succeeds.
- Anything less stays `In progress`. No partial credit.
- Show the full checklist after every feature so progress is always visible.

### Checklist

| Item | Status | Verified |
| --- | --- | --- |
| 1. Home page | Not started | |
| 2. Product catalog | Not started | |
| 3. Cart | Not started | |
| 4. Wishlist | Not started | |
| 5. Checkout | Not started | |
| 6. Fake payment gateway | Not started | |
| Design system (both themes) | Not started | |
| Docs (README, alongside features) | Not started | |

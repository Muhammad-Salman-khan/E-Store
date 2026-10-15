# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-15

## Product Overview
**One-liner:** Industrial Brutalism e-commerce storefront for Pakistani fashion and lifestyle products with guest checkout and localStorage cart.
**What it does:** A Next.js 16 storefront selling men's/women's clothing, footwear and accessories with catalog filters, wishlist, multi-step checkout, fake payment gateway, and weekly product rotation. Cart and orders persist in browser storage. No auth required.
**Product category:** E-commerce / fashion retail storefront
**Product type:** E-commerce web app, single-tenant storefront
**Business model:** Direct-to-consumer retail with flat Rs. 250 shipping, free over Rs. 5,000. Seed product catalog 12-16 items, PKR pricing.

## Target Audience
**Target companies:** B2C end consumers in Pakistan
**Decision-makers:** Individual shoppers, primarily 18-40
**Primary use case:** Browse and purchase fashion and lifestyle items online without account creation
**Jobs to be done:**
- Find seasonal ethnic and casual apparel quickly
- Compare price/discounts and variants
- Complete purchase with minimal friction
**Use cases:**
- Weekly product discovery via Product of the Week
- Category browsing with filters/sort
- Wishlist for later purchase

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Value Seeker | Discounts, shipping thresholds | High shipping cost | Free shipping over Rs. 5,000, clear threshold progress |
| Trend Shoppers | New arrivals, styling | Finding new styles fast | Product of Week, isNew badges, category highlights |

## Problems & Pain Points
**Core problem:** Consumers want a fast, trustworthy fashion storefront without account friction, clear pricing in PKR, and reliable shipping info.
**Why alternatives fall short:**
- Account required checkout friction
- Unclear shipping costs
- Generic UI with poor mobile experience
**What it costs them:** Abandoned carts, missed sales, time wasted
**Emotional tension:** Uncertainty about shipping cost and product authenticity

## Competitive Landscape
**Direct:** Local Pakistani fashion e-com sites — falls short on design system and guest checkout
**Secondary:** Marketplaces like Daraz — falls short on brand experience and curated catalog
**Indirect:** Social commerce — falls short on trust and structured catalog

## Differentiation
**Key differentiators:**
- Industrial Brutalism design with 2px compartment grid, no gradients, tactile motion
- Guest checkout with localStorage persistence
- Deterministic Product of Week ISO-week rotation Asia/Karachi
- PKR-native formatting and shipping threshold UI
**How we do it differently:** Design authority from Industrial Brutalism & Tactical Telemetry skill, glassmorphism + brutalist borders, motion with restraint
**Why that's better:** Premium, trustworthy, fast perceived performance, mobile-first
**Why customers choose us:** Clear pricing, no account friction, curated catalog

## Objections
| Objection | Response |
|-----------|----------|
| No login/account | Guest checkout by design, cart persisted locally |
| Fake payment | Demo mode clearly labeled, no real charge |
| Shipping cost | Flat Rs.250, free over Rs.5,000, progress shown in cart |

**Anti-persona:** Bulk B2B buyers, users requiring multi-user accounts

## Switching Dynamics
**Push:** Friction from login-required stores, unclear shipping
**Pull:** Guest checkout, clear PKR pricing, premium brutalist UI
**Habit:** Loyalty to marketplaces
**Anxiety:** Payment security in demo mode

## Customer Language
**How they describe the problem:**
- "Shipping cost is hidden"
- "Too many steps to checkout"
**How they describe us:**
- "Clean, brutal design"
- "Fast to add to cart"
**Words to use:** curated, guest checkout, PKR, free shipping threshold, product of week
**Words to avoid:** discover amazing products, welcome to our store
**Glossary:**
| Term | Meaning |
|------|---------|
| Product of Week | ISO-week rotated featured product |

## Brand Voice
**Tone:** Direct, tactile, editorial
**Style:** Uppercase monospace microcopy, macro typography
**Personality:** Industrial, precise, trustworthy

## Proof Points
**Metrics:** TBD
**Customers:** TBD
**Testimonials:** > "[quote]" — [who]
**Value themes:**
| Theme | Proof |
|-------|-------|
| No account friction | Guest checkout flow |
| Clear shipping | Threshold progress UI |

## Goals
**Business goal:** Launch production-grade e-commerce storefront with premium brutalist UX
**Conversion action:** Add to cart → Checkout → Order confirmation
**Current metrics:** Not tracked

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-10-15) — Initial context auto-drafted from SPEC.md, README.md, data/products.ts

# Marketing Plan — E-Store Industrial Brutalism

**Version:** v1
**Date:** 2026-10-15
**Scope:** Full-scale AARRR plan for Pakistani fashion e-commerce storefront

## Current State Audit
- Product: Next.js 16 storefront, guest checkout, localStorage cart, 12 products seed
- Design: Industrial Brutalism, brutalist borders, no gradients
- Traffic: 0, no analytics installed
- Channels: None live
- Conversion: Not measured

## Acquisition
**Goals:** 10k sessions/month in 90 days
**Channels:**
1. SEO — Programmatic SEO for category + product templates, long-tail PKR queries
2. Social — Instagram Reels / Pinterest catalog pins for Product of Week
3. Paid — Meta Advantage+ Shopping with catalog feed
4. Partnerships — Micro-influencer seeding for new arrivals

**KPIs:** Sessions, CPC, CTR, new users

## Activation
**Goals:** 60% product page view → add to cart
**Levers:**
- Hero carousel + Product of Week above fold
- Filterable catalog, clear PKR pricing
- Cart drawer with shipping threshold progress
- First-load performance <2s LCP

**KPIs:** Activation rate, time to first add-to-cart

## Retention
**Goals:** 20% repeat purchase in 60 days
**Levers:**
- Wishlist persistence
- Email capture via exit popup: "Get Product of Week alerts"
- Weekly rotation content push
**KPIs:** Returning users, wishlist conversion

## Referral
**Goals:** 5% of orders from referral
**Levers:**
- Post-purchase shareable order confirmation
- "Share your look" product pages
**KPIs:** Referral sessions, referral orders

## Revenue
**Goals:** Rs. 500k GMV first quarter
**Levers:**
- Free shipping threshold Rs.5,000
- Bundle suggestions on PDP
- New arrivals and sale badges
**KPIs:** AOV, conversion rate, GMV

## SEO Plan
- Technical: Next.js sitemaps, schema Product/Organization/Breadcrumb
- On-page: Unique product copy, no lorem ipsum, H1 macro typography
- Programmatic: /category/[category], /products/[slug], /products?tag=[tag]
- AI-SEO: llms.txt, Open Knowledge Format for product catalog

## Content Strategy
- 60/30/10: 60% product education, 30% style guides, 10% brand
- Weekly Product of Week deep dive
- Category guides for winter/ethnic/summer

## Paid Media
- Meta: Prospecting Advantage+ Shopping, retargeting cart abandoners
- Creative: Brutalist stills, no gradients, 4:5 aspect
- Budget split 70% prospecting / 30% retargeting

## Analytics & Tracking
- GA4 + GTM, server-side events
- Events: view_item, add_to_cart, begin_checkout, purchase, wishlist_add
- UTM naming standard
- Dashboard: Acquisition, Activation, Retention, Revenue

## 90-Day Roadmap
**Month 1:** Analytics install, schema, sitemap, content audit, Product of Week social calendar
**Month 2:** Programmatic SEO pages, exit popup, email welcome series, Meta test budget
**Month 3:** Retargeting scale, influencer seeding, referral share feature

## Risks & Mitigations
- No auth → rely on localStorage, add email capture early
- Demo payment → clear labeling, plan for real gateway
- Stock is static → sync products.ts to CMS later

## Success Criteria
- Sessions 10k/mo, CR 2.5%, AOV Rs. 4,200, returning users 20%

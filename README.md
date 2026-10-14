This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features
- Home page with hero carousel auto-rotation + swipe, Product of the Week ISO-week rotation Asia/Karachi, category highlights
- Product catalog with filters sort, product detail with gallery variants
- Cart with slide-over drawer, localStorage persistence, shipping Rs 250 free over Rs 5,000
- Wishlist with heart toggle, persisted
- Checkout multi-step: cart review → shipping validation via Zod → fake payment
- Fake payment gateway demo mode with success/decline paths, order confirmation persisted

## Weekly rotation logic
`lib/weekly.ts` computes ISO week number in Asia/Karachi timezone via UTC+5 offset and ISO week algorithm. `getWeeklyProduct` returns product index `(week-1) % products.length`. Home page renders `ProductOfTheWeek` client component which updates on mount.

## Fake payment gateway
`components/checkout/FakePaymentForm` validates card with Zod, simulates 1.5s processing, randomly succeeds/declines. On success generates order ID `ORD-######`, stores order in localStorage `ecom_orders_v1`, shows confirmation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

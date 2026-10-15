import type { Metadata } from "next"
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps/CheckoutSteps"

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase. Secure guest checkout with shipping and demo payment.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Checkout | E-Store',
    description: 'Secure guest checkout.',
  },
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <CheckoutSteps />
      </div>
    </main>
  )
}

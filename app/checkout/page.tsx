import { CheckoutSteps } from "@/components/checkout/CheckoutSteps/CheckoutSteps"

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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Your order has been placed successfully. Thank you for shopping with E-Store.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Order Confirmation | E-Store',
    description: 'Thank you for your order.',
  },
}

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center py-[var(--space-12)]">
      <div className="text-center space-y-[var(--space-4)] border-[2px] border-[var(--line)] p-[var(--space-8)] bg-[var(--bg-elevated)] max-w-2xl mx-auto">
        <h1 className="text-[clamp(2.5rem,6vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase mb-[var(--space-4)]">Thank you for your order</h1>
        <p className="mono text-[14px] tracking-[0.06em] uppercase text-[var(--text-muted)]">Your order has been placed successfully.</p>
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { ShippingForm } from "../ShippingForm/ShippingForm"
import { FakePaymentForm } from "../FakePaymentForm/FakePaymentForm"
import { OrderSummary } from "../OrderSummary/OrderSummary"
import { ShippingForm as ShippingFormType } from "@/lib/validation"

type Step = "cart" | "shipping" | "payment" | "confirm"

export function CheckoutSteps() {
  const [step, setStep] = useState<Step>("cart")
  const [shipping, setShipping] = useState<ShippingFormType | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  return (
    <div className="grid lg:grid-cols-3 gap-[var(--space-4)]">
      <div className="lg:col-span-2 space-y-[var(--space-4)]">
        {step === "cart" && (
          <div className="border-[2px] border-[var(--line)] p-[var(--space-6)] bg-[var(--bg-elevated)]">
            <h2 className="mono text-[14px] tracking-[0.06em] uppercase mb-[var(--space-4)] border-b-[2px] border-[var(--line)] pb-[var(--space-2)]">Cart Review</h2>
            <OrderSummary readOnly />
            <button
              onClick={() => setStep("shipping")}
              className="mt-[var(--space-6)] w-full border-[2px] border-[var(--line)] bg-[var(--accent)] text-[var(--accent-ink)] py-[var(--space-4)] mono text-[12px] tracking-[0.06em] uppercase"
            >
              Continue to Shipping
            </button>
          </div>
        )}
        {step === "shipping" && (
          <ShippingForm
            onComplete={(data) => { setShipping(data); setStep("payment") }}
            onBack={() => setStep("cart")}
          />
        )}
        {step === "payment" && (
          <FakePaymentForm
            shipping={shipping}
            onSuccess={(id) => { setOrderId(id); setStep("confirm") }}
            onBack={() => setStep("shipping")}
          />
        )}
        {step === "confirm" && orderId && (
          <div className="border-[2px] border-[var(--line)] p-[var(--space-6)] bg-[var(--bg-elevated)] text-center">
            <h2 className="mono text-[14px] tracking-[0.06em] uppercase mb-[var(--space-2)] border-b-[2px] border-[var(--line)] pb-[var(--space-2)]">Order Confirmed</h2>
            <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--text-muted)]">Order #{orderId}</p>
            <p className="mono text-[12px] tracking-[0.06em] uppercase mt-[var(--space-4)]">Thank you for your purchase. Confirmation saved.</p>
          </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}

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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {step === "cart" && (
          <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg-elevated)]">
            <h2 className="text-xl font-semibold mb-4">Cart Review</h2>
            <OrderSummary readOnly />
            <button
              onClick={() => setStep("shipping")}
              className="mt-6 w-full rounded-full bg-[var(--primary)] text-[var(--primary-ink)] py-3 font-medium"
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
          <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg-elevated)] text-center">
            <h2 className="text-2xl font-bold mb-2">Order Confirmed</h2>
            <p className="text-[var(--text-muted)]">Order #{orderId}</p>
            <p className="mt-4">Thank you for your purchase. A confirmation has been saved.</p>
          </div>
        )}
      </div>
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}

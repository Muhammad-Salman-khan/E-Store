"use client"

import { useState } from "react"
import { PaymentSchema, PaymentForm } from "@/lib/validation"
import { ShippingForm as ShippingFormType } from "@/lib/validation"

interface Props {
  shipping: ShippingFormType | null
  onSuccess: (orderId: string) => void
  onBack: () => void
}

export function FakePaymentForm({ shipping, onSuccess, onBack }: Props) {
  const [data, setData] = useState<Partial<PaymentForm>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<"success" | "decline" | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = PaymentSchema.safeParse(data)
    if (!res.success) {
      const err: Record<string, string> = {}
      res.error.issues.forEach(i => err[i.path[0] as string] = i.message)
      setErrors(err)
      return
    }
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      const success = Math.random() > 0.3
      if (success) {
        const orderId = "ORD-" + Math.floor(Math.random()*1000000).toString().padStart(6,"0")
        localStorage.setItem("ecom_orders_v1", JSON.stringify([...JSON.parse(localStorage.getItem("ecom_orders_v1")||"[]"), { orderId, shipping, payment: data, date: new Date().toISOString() }]))
        setResult("success")
        setTimeout(() => onSuccess(orderId), 800)
      } else {
        setResult("decline")
      }
    }, 1500)
  }

  const input = (name: keyof PaymentForm, placeholder: string, type = "text") => (
    <input
      type={type}
      placeholder={placeholder}
      value={(data[name] as string) ?? ""}
      onChange={e => setData(d => ({ ...d, [name]: e.target.value }))}
      className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-[var(--text)]"
    />
  )

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg-elevated)] space-y-4">
      <h2 className="text-xl font-semibold">Payment</h2>
      <p className="text-xs text-[var(--text-muted)]">Demo mode — no real charge</p>
      {["cardNumber","expiry","cvc","nameOnCard"].map(f => (
        <div key={f}>
          <label className="text-sm text-[var(--text-muted)] capitalize">{f.replace(/([A-Z])/g," $1")}</label>
          {input(f as any, f)}
          {errors[f] && <p className="text-[var(--error)] text-xs">{errors[f]}</p>}
        </div>
      ))}
      {result === "decline" && <p className="text-[var(--error)] text-sm">Payment declined. Try different card number.</p>}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-full border border-[var(--line)]">Back</button>
        <button disabled={processing} className="px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-ink)] disabled:opacity-50">
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  )
}

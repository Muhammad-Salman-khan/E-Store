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
      className="w-full border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase focus:outline-none"
    />
  )

  return (
    <form onSubmit={handleSubmit} className="border-[2px] border-[var(--line)] p-[var(--space-6)] bg-[var(--bg-elevated)] space-y-[var(--space-4)]">
      <h2 className="mono text-[14px] tracking-[0.06em] uppercase border-b-[2px] border-[var(--line)] pb-[var(--space-2)]">Payment</h2>
      <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--text-muted)]">Demo mode — no real charge</p>
      {["cardNumber","expiry","cvc","nameOnCard"].map(f => (
        <div key={f} className="border-[2px] border-[var(--line)] p-[var(--space-4)]">
          <label className="mono text-[12px] tracking-[0.06em] uppercase block mb-[var(--space-2)] text-[var(--text-muted)]">{f.replace(/([A-Z])/g," $1")}</label>
          {input(f as any, f)}
          {errors[f] && <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--error)] mt-[var(--space-2)]">{errors[f]}</p>}
        </div>
      ))}
      {result === "decline" && <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--error)]">Payment declined. Try different card number.</p>}
      <div className="flex gap-[var(--space-3)] pt-[var(--space-2)]">
        <button type="button" onClick={onBack} className="px-[var(--space-4)] py-[var(--space-3)] border-[2px] border-[var(--line)] mono text-[12px] tracking-[0.06em] uppercase bg-[var(--bg)]">Back</button>
        <button disabled={processing} className="px-[var(--space-4)] py-[var(--space-3)] border-[2px] border-[var(--line)] bg-[var(--accent)] text-[var(--accent-ink)] mono text-[12px] tracking-[0.06em] uppercase disabled:opacity-50">
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import { ShippingSchema, ShippingForm as ShippingFormType } from "@/lib/validation"

interface Props {
  onComplete: (data: ShippingFormType) => void
  onBack: () => void
}

export function ShippingForm({ onComplete, onBack }: Props) {
  const [data, setData] = useState<Partial<ShippingFormType>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = ShippingSchema.safeParse(data)
    if (!result.success) {
      const err: Record<string, string> = {}
      result.error.issues.forEach(i => { err[i.path[0] as string] = i.message })
      setErrors(err)
      return
    }
    onComplete(result.data)
  }

  const input = (name: keyof ShippingFormType, placeholder: string) => (
    <input
      placeholder={placeholder}
      value={(data[name] as string) ?? ""}
      onChange={e => setData(d => ({ ...d, [name]: e.target.value }))}
      className="w-full border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase focus:outline-none"
    />
  )

  return (
    <form onSubmit={handleSubmit} className="border-[2px] border-[var(--line)] p-[var(--space-6)] bg-[var(--bg-elevated)] space-y-[var(--space-4)]">
      <h2 className="mono text-[14px] tracking-[0.06em] uppercase mb-[var(--space-4)] border-b-[2px] border-[var(--line)] pb-[var(--space-2)]">Shipping Information</h2>
      {["fullName","email","phone","address","city","postalCode","country"].map(field => (
        <div key={field} className="border-[2px] border-[var(--line)] p-[var(--space-4)]">
          <label className="mono text-[12px] tracking-[0.06em] uppercase block mb-[var(--space-2)] text-[var(--text-muted)]">{field.replace(/([A-Z])/g," $1")}</label>
          {input(field as any, field)}
          {errors[field] && <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--error)] mt-[var(--space-2)]">{errors[field]}</p>}
        </div>
      ))}
      <div className="flex gap-[var(--space-3)] pt-[var(--space-2)]">
        <button type="button" onClick={onBack} className="px-[var(--space-4)] py-[var(--space-3)] border-[2px] border-[var(--line)] mono text-[12px] tracking-[0.06em] uppercase bg-[var(--bg)]">Back</button>
        <button className="px-[var(--space-4)] py-[var(--space-3)] border-[2px] border-[var(--line)] bg-[var(--primary)] text-[var(--primary-ink)] mono text-[12px] tracking-[0.06em] uppercase">Continue to Payment</button>
      </div>
    </form>
  )
}

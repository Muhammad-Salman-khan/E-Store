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
      className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-[var(--text)]"
    />
  )

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg-elevated)] space-y-4">
      <h2 className="text-xl font-semibold">Shipping Information</h2>
      {["fullName","email","phone","address","city","postalCode","country"].map(field => (
        <div key={field}>
          <label className="text-sm text-[var(--text-muted)] capitalize">{field.replace(/([A-Z])/g," $1")}</label>
          {input(field as any, field)}
          {errors[field] && <p className="text-[var(--error)] text-xs">{errors[field]}</p>}
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-full border border-[var(--line)]">Back</button>
        <button className="px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-ink)]">Continue to Payment</button>
      </div>
    </form>
  )
}

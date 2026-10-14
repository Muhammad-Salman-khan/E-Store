"use client"

import { useEffect, useState } from "react"
import { cartStore, CartItem } from "@/lib/store/cart"
import { products } from "@/data/products"
import { formatPKR } from "@/lib/format"

export function OrderSummary({ readOnly }: { readOnly?: boolean }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const update = () => setItems(cartStore.get())
    update()
    window.addEventListener("cart-updated", update)
    return () => window.removeEventListener("cart-updated", update)
  }, [])

  const subtotal = items.reduce((s, i) => {
    const p = products.find(p => p.id === i.productId)
    return s + (p ? p.price * i.quantity : 0)
  }, 0)
  const shipping = subtotal > 500000 ? 0 : 25000
  const total = subtotal + shipping

  return (
    <div className="border-[2px] border-[var(--line)] p-[var(--space-6)] bg-[var(--bg-elevated)] sticky top-6">
      <h3 className="mono text-[14px] tracking-[0.06em] uppercase border-b-[2px] border-[var(--line)] pb-[var(--space-2)] mb-[var(--space-4)]">Order Summary</h3>
      <div className="space-y-[var(--space-3)] max-h-64 overflow-auto">
        {items.map(i => {
          const p = products.find(p => p.id === i.productId)
          if (!p) return null
          return (
            <div key={i.productId} className="flex gap-[var(--space-3)] border-[2px] border-[var(--line)] p-[var(--space-3)]">
              <img src={p.images[0]} className="w-12 h-12 object-cover border-[2px] border-[var(--line)]" alt="" />
              <div className="flex-1 mono text-[12px] tracking-[0.06em] uppercase">
                <p className="truncate">{p.name}</p>
                <p className="text-[var(--text-muted)]">Qty {i.quantity}</p>
              </div>
              <span className="mono text-[12px] tracking-[0.06em] uppercase">{formatPKR(p.price * i.quantity)}</span>
            </div>
          )
        })}
      </div>
      <div className="border-t-[2px] border-[var(--line)] mt-[var(--space-4)] pt-[var(--space-4)] space-y-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span></div>
        <div className="flex justify-between border-t-[2px] border-[var(--line)] pt-[var(--space-2)]"><span>Total</span><span>{formatPKR(total)}</span></div>
      </div>
    </div>
  )
}

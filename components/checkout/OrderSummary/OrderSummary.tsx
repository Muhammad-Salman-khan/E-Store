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
    <div className="border border-[var(--line)] rounded-xl p-6 bg-[var(--bg-elevated)] sticky top-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3 max-h-64 overflow-auto">
        {items.map(i => {
          const p = products.find(p => p.id === i.productId)
          if (!p) return null
          return (
            <div key={i.productId} className="flex gap-3">
              <img src={p.images[0]} className="w-12 h-12 object-cover rounded" alt="" />
              <div className="flex-1 text-sm">
                <p className="truncate">{p.name}</p>
                <p className="text-[var(--text-muted)]">Qty {i.quantity}</p>
              </div>
              <span className="text-sm">{formatPKR(p.price * i.quantity)}</span>
            </div>
          )
        })}
      </div>
      <div className="border-t border-[var(--line)] mt-4 pt-4 space-y-1 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span></div>
        <div className="flex justify-between font-bold text-base"><span>Total</span><span>{formatPKR(total)}</span></div>
      </div>
    </div>
  )
}

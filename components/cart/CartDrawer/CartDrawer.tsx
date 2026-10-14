"use client"

import { useEffect, useState } from "react"
import { cartStore, CartItem } from "@/lib/store/cart"
import { products } from "@/data/products"
import { formatPKR } from "@/lib/format"
import { X, ShoppingBag } from "lucide-react"
import Link from "next/link"

function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  useEffect(() => {
    setItems(cartStore.get())
    const onStorage = () => setItems(cartStore.get())
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])
  return { items, setItems }
}

export function CartDrawer() {
  const { items, setItems } = useCart()
  const [open, setOpen] = useState(false)

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = items.reduce((s, i) => {
    const p = products.find(p => p.id === i.productId)
    return s + (p ? p.price * i.quantity : 0)
  }, 0)
  const shipping = subtotal > 50000 ? 0 : 25000 // Rs 2500? Wait price in paisa, threshold Rs 5,000 = 500000 paisa
  // Spec: flat Rs 250, free over Rs 5,000
  const shippingPaisa = subtotal > 500000 ? 0 : 25000
  const total = subtotal + shippingPaisa

  useEffect(() => {
    const handler = () => setItems(cartStore.get())
    window.addEventListener("cart-updated", handler)
    return () => window.removeEventListener("cart-updated", handler)
  }, [setItems])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[var(--primary)] text-[var(--primary-ink)] p-4 shadow-[var(--shadow)] flex items-center gap-2"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="text-sm font-bold">{totalItems}</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--bg-elevated)] border-l border-[var(--line)] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Cart</h2>
              <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-auto space-y-4">
              {items.length === 0 && <p className="text-[var(--text-muted)]">Your cart is empty.</p>}
              {items.map(item => {
                const p = products.find(p => p.id === item.productId)
                if (!p) return null
                return (
                  <div key={item.productId} className="flex gap-3 border border-[var(--line)] rounded-lg p-3">
                    <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{formatPKR(p.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => { cartStore.update(item.productId, item.quantity - 1); setItems(cartStore.get()); window.dispatchEvent(new Event("cart-updated")) }} className="px-2">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => { cartStore.update(item.productId, item.quantity + 1); setItems(cartStore.get()); window.dispatchEvent(new Event("cart-updated")) }} className="px-2">+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-[var(--line)] pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>{shippingPaisa === 0 ? "Free" : formatPKR(shippingPaisa)}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>{formatPKR(total)}</span></div>
              <Link href="/checkout" onClick={() => setOpen(false)} className="block text-center mt-4 rounded-full bg-[var(--primary)] text-[var(--primary-ink)] py-3 font-medium">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

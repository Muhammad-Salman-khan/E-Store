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
        className="fixed bottom-6 right-6 z-50 border-[2px] border-[var(--line)] bg-[var(--primary)] text-[var(--primary-ink)] p-[var(--space-4)] mono text-[12px] tracking-[0.06em] uppercase flex items-center gap-[var(--space-2)]"
        aria-label="Open cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="text-sm">{totalItems}</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-[var(--bg)]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l-[2px] border-[var(--line)] bg-[var(--bg-elevated)] p-[var(--space-6)] flex flex-col">
            <div className="flex items-center justify-between mb-[var(--space-6)] border-b-[2px] border-[var(--line)] pb-[var(--space-4)]">
              <h2 className="mono text-[14px] tracking-[0.06em] uppercase">Cart [ {totalItems} ]</h2>
              <button onClick={() => setOpen(false)} className="border-[2px] border-[var(--line)] bg-[var(--bg)] p-[var(--space-2)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto space-y-[var(--space-4)]">
              {items.length === 0 && <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--text-muted)]">Cart empty</p>}
              {items.map(item => {
                const p = products.find(p => p.id === item.productId)
                if (!p) return null
                return (
                  <div key={item.productId} className="flex gap-[var(--space-4)] border-[2px] border-[var(--line)] bg-[var(--bg)] p-[var(--space-4)]">
                    <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover border-[2px] border-[var(--line)]" />
                    <div className="flex-1">
                      <p className="mono text-[12px] tracking-[0.06em] uppercase leading-tight">{p.name.toUpperCase()}</p>
                      <p className="mono text-[11px] tracking-[0.06em] uppercase text-[var(--text-muted)]">{formatPKR(p.price)}</p>
                      <div className="flex items-center gap-[var(--space-2)] mt-[var(--space-2)]">
                        <button onClick={() => { cartStore.update(item.productId, item.quantity - 1); setItems(cartStore.get()); window.dispatchEvent(new Event("cart-updated")) }} className="border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase">-</button>
                        <span className="w-8 text-center mono text-[12px] tracking-[0.06em] uppercase">{item.quantity}</span>
                        <button onClick={() => { cartStore.update(item.productId, item.quantity + 1); setItems(cartStore.get()); window.dispatchEvent(new Event("cart-updated")) }} className="border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase">+</button>
                      </div>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => { cartStore.remove(item.productId); setItems(cartStore.get()); window.dispatchEvent(new Event("cart-updated")) }}
                      className="border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] p-[var(--space-2)] self-start"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="border-t-[2px] border-[var(--line)] pt-[var(--space-4)] mt-[var(--space-4)] space-y-[var(--space-2)]">
              <div className="flex justify-between mono text-[12px] tracking-[0.06em] uppercase"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
              <div className="flex justify-between mono text-[12px] tracking-[0.06em] uppercase"><span>Shipping</span><span>{shippingPaisa === 0 ? "FREE" : formatPKR(shippingPaisa)}</span></div>
              {shippingPaisa > 0 && (
                <div className="mono text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)]">Rs. {(500000 - subtotal)/100} away from free shipping</div>
              )}
              <div className="flex justify-between mono text-[14px] tracking-[0.06em] uppercase border-t-[2px] border-[var(--line)] pt-[var(--space-2)]"><span>Total</span><span>{formatPKR(total)}</span></div>
              <Link href="/checkout" onClick={() => setOpen(false)} className="block text-center mt-[var(--space-2)] border-[2px] border-[var(--line)] bg-[var(--primary)] text-[var(--primary-ink)] py-[var(--space-4)] mono text-[12px] tracking-[0.06em] uppercase">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

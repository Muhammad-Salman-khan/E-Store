"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { cartStore } from "@/lib/store/cart"

interface AddToCartButtonProps {
  productId: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    cartStore.add(productId, 1)
    setAdded(true)
    window.dispatchEvent(new Event("cart-updated"))
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className="border-2 border-[var(--line)] bg-[var(--primary)] text-[var(--primary-ink)] px-6 py-3 font-bold shadow-[var(--shadow)] flex items-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
    >
      <ShoppingCart className="w-4 h-4" />
      {added ? "Added" : "Add to Cart"}
    </button>
  )
}
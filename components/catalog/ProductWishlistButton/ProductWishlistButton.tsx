"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { wishlistStore } from "@/lib/store/wishlist"

export function ProductWishlistButton({ productId }: { productId: string }) {
  const [wish, setWish] = useState(false)
  useEffect(() => {
    setWish(wishlistStore.has(productId))
    const handler = () => setWish(wishlistStore.has(productId))
    window.addEventListener("wishlist-updated", handler)
    return () => window.removeEventListener("wishlist-updated", handler)
  }, [productId])
  return (
    <button
      onClick={() => { wishlistStore.toggle(productId); setWish(!wish) }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] hover:border-[var(--primary)]"
    >
      <Heart className={`w-4 h-4 ${wish ? "fill-[var(--accent)] text-[var(--accent)]" : ""}`} />
      {wish ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  )
}

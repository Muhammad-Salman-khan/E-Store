"use client"

import { useEffect, useState } from "react"
import { products } from "@/data/products"
import { wishlistStore } from "@/lib/store/wishlist"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"

export function ProductGridWishlist() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    setIds(wishlistStore.get())
    const handler = () => setIds(wishlistStore.get())
    window.addEventListener("wishlist-updated", handler)
    return () => window.removeEventListener("wishlist-updated", handler)
  }, [])

  const items = products.filter(p => ids.includes(p.id))

  if (items.length === 0) {
    return <p className="text-[var(--text-muted)]">Your wishlist is empty.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(p => <ProductCard key={p.id} product={p} showStock showBrand />)}
    </div>
  )
}

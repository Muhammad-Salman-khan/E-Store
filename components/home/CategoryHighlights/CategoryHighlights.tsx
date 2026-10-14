"use client"

import { useState } from "react"
import type { Product } from "@/data/products"
import { products } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"

const categories = [
  { name: "Men's Clothing", key: "men's clothing" },
  { name: "Women's Clothing", key: "women's clothing" },
  { name: "Footwear", key: "footwear" },
  { name: "Accessories", key: "accessories" },
]

export function CategoryHighlights() {
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false])

  const handleIntersect = (index: number) => {
    setVisible((v) => {
      const next = [...v]
      next[index] = true
      return next
    })
  }

  return (
    <section className="border-[2px] border-[var(--line)] bg-[var(--bg)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => {
          const productsByCategory = products.filter(
            (p: Product) => p.category === cat.key && !p.isFeatured
          )
          return (
            <div key={cat.key} className="border-r-[2px] border-b-[2px] border-[var(--line)] bg-[var(--bg-elevated)] p-[var(--space-6)]">
              <div className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] self-start mb-[var(--space-4)]">[{cat.name.toUpperCase()}]</div>
              <ProductCard
                product={productsByCategory[0]}
                showBrand
                smallDescription
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
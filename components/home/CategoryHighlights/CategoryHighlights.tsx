"use client"

import { useState } from "react"
import type { Product } from "@/data/products"
import { products } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"

const categories = [
  { name: "Men's", key: "men's clothing", color: "bg-primary/10", border: "border-primary/20" },
  { name: "Women's", key: "women's clothing", color: "bg-accent/10", border: "border-accent/20" },
  { name: "Footwear", key: "footwear", color: "bg-[var(--primary)]/10", border: "border-[var(--primary)]/20" },
  { name: "Accessories", key: "accessories", color: "bg-[var(--accent)]/10", border: "border-[var(--accent)]/20" },
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
    <section className="py-12 bg-[var(--bg-elevated)] border-y border-[var(--glass-border)] shadow-[var(--shadow)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text)] mb-10">
          Category Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const productsByCategory = products.filter(
              (p: Product) => p.category === cat.key && !p.isFeatured
            )

            const visibleNow = visible[i]

            return (
              <div
                key={cat.key}
                className={`
                  rounded-xl border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)]
                  transition-all duration-300 hover:shadow-lg hover:${cat.color} ${visibleNow ? "scale-[1.02]" : ""}
                `}
                onMouseEnter={() => handleIntersect(i)}
              >
                <div className="p-4">
                  <p className={`text-sm font-medium ${cat.color} ${cat.border}`}>
                    {cat.name} Collection
                  </p>
                  <ProductCard
                    product={productsByCategory[0]}
                    showBrand
                    smallDescription
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
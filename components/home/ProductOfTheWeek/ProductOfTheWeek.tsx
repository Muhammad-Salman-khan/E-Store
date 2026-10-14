"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/data/products"
import { getWeeklyProduct } from "@/lib/weekly"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"

interface WeeklyProductInfo {
  product: Product
  weekNumber: number
  year: number
}

export function ProductOfTheWeek({ initialWeekly }: { initialWeekly: WeeklyProductInfo } = { initialWeekly: getWeeklyProduct() }) {
  const [weekly, setWeekly] = useState<WeeklyProductInfo | null>(initialWeekly)

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekly(getWeeklyProduct())
    }, 7 * 24 * 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  if (!weekly) {
    return null
  }

  const { product, weekNumber, year } = weekly

  return (
    <section className="py-12 bg-[var(--bg-elevated)] border-y border-[var(--glass-border)] shadow-[var(--shadow)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
              ISO Week {weekNumber} {year}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)]">
              Product of the Week
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--text-muted)] text-sm">
              Changes weekly
            </span>
          </div>
        </div>

        <ProductCard
          product={product}
          showStock
          showBrand
          smallDescription
        />
      </div>
    </section>
  )
}
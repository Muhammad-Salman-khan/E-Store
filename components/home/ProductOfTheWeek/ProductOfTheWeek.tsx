"use client"

import { useEffect, useState } from "react"
import { getWeeklyProduct, WeeklyProduct } from "@/lib/weekly"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"

export function ProductOfTheWeek() {
  const [weekly, setWeekly] = useState<WeeklyProduct | null>(null)

  useEffect(() => {
    setWeekly(getWeeklyProduct())
  }, [])

  if (!weekly) return null

  const { product, weekNumber, year } = weekly

  return (
    <section className="border-[2px] border-[var(--line)] bg-[var(--bg)]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 border-r-[2px] border-[var(--line)] p-[var(--space-8)] flex flex-col justify-center">
          <div className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] self-start mb-[var(--space-4)]">ISO WEEK {String(weekNumber).padStart(2,'0')} / {year}</div>
          <h2 className="text-[clamp(3rem,8vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase">SELECTION</h2>
          <p className="mono text-[14px] tracking-[0.06em] mt-[var(--space-4)]">One product. Seven days. No exceptions. Weekly rotation locked to Asia/Karachi ISO week.</p>
        </div>
        <div className="lg:col-span-7 p-[var(--space-8)] bg-[var(--bg-elevated)] border-l-[2px] border-[var(--line)]">
          <ProductCard
            product={product}
            showStock
            showBrand
            smallDescription
          />
        </div>
      </div>
    </section>
  )
}

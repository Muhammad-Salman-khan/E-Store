import { HeroCarousel } from "@/components/home/HeroCarousel/HeroCarousel"
import { ProductOfTheWeek } from "@/components/home/ProductOfTheWeek/ProductOfTheWeek"
import { CategoryHighlights } from "@/components/home/CategoryHighlights/CategoryHighlights"
import { products } from "@/data/products"

export default function Home() {
  const initialProduct = products[0]

  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <HeroCarousel />
      <ProductOfTheWeek initialWeekly={{ product: initialProduct, weekNumber: 1, year: 2025 }} />
      <CategoryHighlights />
    </main>
  )
}
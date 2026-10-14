import { HeroCarousel } from "@/components/home/HeroCarousel/HeroCarousel"
import { ProductOfTheWeek } from "@/components/home/ProductOfTheWeek/ProductOfTheWeek"
import { CategoryHighlights } from "@/components/home/CategoryHighlights/CategoryHighlights"

export default function Home() {
  return (
    <main className="flex flex-col flex-1 bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <HeroCarousel />
      <ProductOfTheWeek />
      <CategoryHighlights />
    </main>
  )
}

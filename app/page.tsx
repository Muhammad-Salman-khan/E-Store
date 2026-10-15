import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/HeroCarousel/HeroCarousel"
import { ProductOfTheWeek } from "@/components/home/ProductOfTheWeek/ProductOfTheWeek"
import { CategoryHighlights } from "@/components/home/CategoryHighlights/CategoryHighlights"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover premium Pakistani fashion, footwear and accessories. Weekly curated picks, category highlights and industrial brutalist shopping experience.',
  openGraph: {
    title: 'E-Store Home | Premium Pakistani Fashion',
    description: 'Discover premium Pakistani fashion, footwear and accessories.',
  },
}

export default function Home() {
  return (
    <main className="flex flex-col flex-1 bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <HeroCarousel />
      <ProductOfTheWeek />
      <CategoryHighlights />
    </main>
  )
}

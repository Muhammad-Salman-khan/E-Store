import type { Metadata } from "next"
import { ProductGrid } from "@/components/catalog/ProductGrid/ProductGrid"

export const metadata: Metadata = {
  title: 'Products Catalog',
  description: 'Browse our full catalog of Pakistani fashion, footwear and accessories. Filter by category, price and search for premium khaddar, lawn, leather sneakers and more.',
  openGraph: {
    title: 'Products Catalog | E-Store',
    description: 'Browse premium Pakistani fashion and accessories.',
  },
}

export default function ProductsPage() {
  return (
    <main className="flex flex-col flex-1 bg-[var(--bg)] text-[var(--text)]">
      <ProductGrid />
    </main>
  )
}
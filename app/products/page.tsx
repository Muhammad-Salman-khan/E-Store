import { ProductGrid } from "@/components/catalog/ProductGrid/ProductGrid"

export default function ProductsPage() {
  return (
    <main className="flex flex-col flex-1 bg-[var(--bg)] text-[var(--text)]">
      <ProductGrid />
    </main>
  )
}
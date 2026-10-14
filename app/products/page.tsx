import { ProductFilters } from "@/components/catalog/ProductFilters/ProductFilters"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"
import { products } from "@/data/products"

export default function ProductsPage() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center bg-[var(--bg)] text-[var(--text)] py-12">
      <ProductFilters />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showStock
            showBrand
            smallDescription
          />
        ))}
      </div>
    </main>
  )
}
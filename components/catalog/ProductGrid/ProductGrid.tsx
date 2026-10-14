"use client"

import { useState, useMemo } from "react"
import { products, Product } from "@/data/products"
import { ProductCard } from "@/components/catalog/ProductCard/ProductCard"
import { ProductFilters } from "@/components/catalog/ProductFilters/ProductFilters"

export function ProductGrid() {
  const [category, setCategory] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [sort, setSort] = useState<"popularity" | "price-asc" | "price-desc">("popularity")

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCat = category === "all" || p.category === category
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const price = p.price
      const matchesMin = !minPrice || price >= Number(minPrice)
      const matchesMax = !maxPrice || price <= Number(maxPrice)
      return matchesCat && matchesSearch && matchesMin && matchesMax
    })

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price)
    // popularity fallback uses id order
    return list
  }, [category, search, minPrice, maxPrice, sort])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Products</h1>
            <p className="text-[var(--text-muted)]">{filtered.length} items</p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-lg border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-[var(--text)]"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} showStock showBrand smallDescription />
          ))}
        </div>
      </div>
    </div>
  )
}

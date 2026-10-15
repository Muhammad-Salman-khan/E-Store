"use client"

import { useState, useMemo } from "react"
import { motion } from "motion/react"
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
    <div className="py-16 pt-[100px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-[var(--space-8)] border-b-[2px] border-[var(--line)] pb-[var(--space-6)] grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-4)]">
          <div>
            <h1 className="text-[clamp(3rem,8vw,12rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase">Catalog</h1>
            <p className="mono text-[12px] tracking-[0.06em] uppercase mt-[var(--space-2)]">[ {filtered.length} ITEMS AVAILABLE ]</p>
          </div>
          <div className="flex items-center gap-[var(--space-4)] justify-start lg:justify-end">
            <span className="mono text-[12px] tracking-[0.06em] uppercase">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="border-[2px] border-[var(--line)] bg-[var(--bg)] px-[var(--space-4)] py-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        <div className="mb-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="SEARCH PRODUCTS"
            className="w-full border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase placeholder-[var(--text-muted)]"
          />
          <div className="flex flex-wrap gap-[var(--space-2)]">
            {["all","men's clothing","women's clothing","footwear","accessories"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase ${category === cat ? "bg-[var(--primary)] text-[var(--primary-ink)]" : "bg-[var(--bg)]"}`}
              >
                {cat === "all" ? "All Categories" : cat.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex gap-[var(--space-3)]">
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder="MIN PRICE"
              className="flex-1 border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase placeholder-[var(--text-muted)]"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder="MAX PRICE"
              className="flex-1 border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-3)] mono text-[12px] tracking-[0.06em] uppercase placeholder-[var(--text-muted)]"
            />
          </div>
        </div>

        <div className="grid-determined grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} showStock showBrand smallDescription />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

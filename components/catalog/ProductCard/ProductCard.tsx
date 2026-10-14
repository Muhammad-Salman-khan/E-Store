"use client"

import Image from "next/image";
import { Heart } from "lucide-react"
import Link from "next/link"

import type { Product } from "@/data/products";
import { wishlistStore } from "@/lib/store/wishlist"
import { useEffect, useState } from "react"

interface ProductCardProps {
  product?: Product | null;
  showStock?: boolean;
  showBrand?: boolean;
  smallDescription?: boolean;
}

export function ProductCard({
  product,
  showStock = true,
  showBrand = true,
  smallDescription = false,
}: ProductCardProps) {
  const [wish, setWish] = useState(false)
  if (!product) {
    return (
      <div className="p-4 h-64 flex items-center justify-center text-[var(--text-muted)]">
        No product available
      </div>
    );
  }

  useEffect(() => {
    setWish(wishlistStore.has(product.id))
    const handler = () => setWish(wishlistStore.has(product.id))
    window.addEventListener("wishlist-updated", handler)
    return () => window.removeEventListener("wishlist-updated", handler)
  }, [product.id])

  const priceInRupees = product.price / 100;
  const formattedPrice = `Rs. ${priceInRupees.toLocaleString()}`;

  return (
    <Link href={`/products/${product.slug}`} className="group relative rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)] overflow-hidden hover:shadow-lg transition-shadow duration-300 block">
      <div className="relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={400}
          unoptimized
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); wishlistStore.toggle(product.id); setWish(!wish) }}
          className="absolute top-2 right-2 p-2 rounded-full bg-[var(--bg-elevated)]/80 backdrop-blur border border-[var(--line)]"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${wish ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--text-muted)]"}`} />
        </button>
      </div>

      {showBrand && (
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium rounded bg-[var(--primary)]/20 text-primary border border-[var(--primary)]/20">
            {product.brand}
          </span>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="line-clamp-2 text-[var(--text)] font-medium text-sm mb-2">
          {product.name}
        </h3>

        {smallDescription && (
          <p className="text-[var(--text-muted)] text-xs line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-[var(--primary)] font-bold text-lg">
            {formattedPrice}
          </span>

          {showStock && product.stock > 0 && (
            <span className="text-[var(--success)] text-sm font-medium">
              {product.stock} in stock
            </span>
          )}

          {showStock && product.stock <= 0 && (
            <span className="text-[var(--error)] text-sm font-medium">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

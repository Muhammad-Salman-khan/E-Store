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
    <Link href={`/products/${product.slug}`} className="group block border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] active:translate-x-[1px] active:translate-y-[1px] transition">
      <div className="relative aspect-[4/3] overflow-hidden border-b-[2px] border-[var(--line)] bg-[var(--bg)]">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={600}
          height={450}
          unoptimized
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => { e.preventDefault(); wishlistStore.toggle(product.id); setWish(!wish) }}
          className="absolute top-[var(--space-2)] right-[var(--space-2)] border-[2px] border-[var(--line)] bg-[var(--bg)] p-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase"
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${wish ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--text-muted)]"}`} />
        </button>
        {showBrand && (
          <span className="absolute top-[var(--space-2)] left-[var(--space-2)] border-[2px] border-[var(--line)] bg-[var(--accent)] text-[var(--accent-ink)] px-[var(--space-2)] py-[var(--space-1)] mono text-[10px] tracking-[0.06em] uppercase">
            {product.brand.toUpperCase()}
          </span>
        )}
      </div>

      <div className="p-[var(--space-4)]">
        <h3 className="mono text-[12px] tracking-[0.06em] uppercase leading-[1.2] line-clamp-2">
          {product.name.toUpperCase()}
        </h3>

        {smallDescription && (
          <p className="mono text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] mt-[var(--space-2)] line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="mt-[var(--space-4)] flex items-baseline justify-between gap-[var(--space-2)] border-t-[2px] border-[var(--line)] pt-[var(--space-2)]">
          <span className="mono text-[14px] tracking-[0.06em] uppercase">
            {formattedPrice}
          </span>
          <span className={`mono text-[10px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-2)] py-[var(--space-1)] ${product.stock > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
            {product.stock > 0 ? `[ ${product.stock} IN STOCK ]` : '[ OUT OF STOCK ]'}
          </span>
        </div>
      </div>
    </Link>
  );
}

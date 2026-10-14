import Image from "next/image";

import type { Product } from "@/data/products";

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
  if (!product) {
    return (
      <div className="p-4 h-64 flex items-center justify-center text-[var(--text-muted)]">
        No product available
      </div>
    );
  }

  const priceInRupees = product.price / 100;
  const formattedPrice = `Rs. ${priceInRupees.toLocaleString()}`;

  return (
    <div className="group relative rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)] overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={500}
        height={400}
        unoptimized
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      />

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
    </div>
  );
}

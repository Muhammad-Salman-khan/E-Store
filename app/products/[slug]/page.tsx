import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { ProductGallery } from "@/components/catalog/ProductGallery/ProductGallery"
import { ProductWishlistButton } from "@/components/catalog/ProductWishlistButton/ProductWishlistButton"
import { formatPKR } from "@/lib/format"

interface Props {
  params: { slug: string }
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <p className="text-[var(--text-muted)]">{product.brand}</p>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPKR(product.price)}</span>
            {product.originalPrice && (
              <span className="line-through text-[var(--text-muted)]">{formatPKR(product.originalPrice)}</span>
            )}
          </div>
          <p className="mt-4 text-[var(--text-muted)]">{product.description}</p>

          {product.colors && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full border border-[var(--line)] text-sm">{c}</span>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} className="px-3 py-1 rounded-lg border border-[var(--line)] hover:border-[var(--primary)]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <p className={`text-sm ${product.stock > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
              {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
            </p>
            <div className="mt-4">
              <ProductWishlistButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { ProductGallery } from "@/components/catalog/ProductGallery/ProductGallery"
import { ProductWishlistButton } from "@/components/catalog/ProductWishlistButton/ProductWishlistButton"
import { AddToCartButton } from "@/components/catalog/AddToCartButton/AddToCartButton"
import { VariantSelector } from "@/components/catalog/VariantSelector/VariantSelector"
import { formatPKR } from "@/lib/format"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  const price = formatPKR(product.price)
  return {
    title: `${product.name} | ${product.brand}`,
    description: `${product.description} Shop ${product.name} by ${product.brand} for ${price}. ${product.stock > 0 ? 'In stock' : 'Out of stock'}.`,
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      images: product.images.map(img => ({ url: img, alt: product.name })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${product.brand}`,
      description: product.description,
      images: product.images,
    },
  }
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-7xl mx-auto px-[var(--space-4)] py-[var(--space-8)] grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-8)] border-[2px] border-[var(--line)]">
        <div className="border-r-[2px] border-[var(--line)]">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        <div className="p-[var(--space-8)]">
          <div className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] self-start mb-[var(--space-4)]">{product.brand.toUpperCase()}</div>
          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase">{product.name.toUpperCase()}</h1>
          <div className="mono text-[14px] tracking-[0.06em] uppercase mt-[var(--space-4)] flex items-baseline gap-[var(--space-4)]">
            <span>{formatPKR(product.price)}</span>
            {product.originalPrice && (
              <span className="line-through text-[var(--text-muted)]">{formatPKR(product.originalPrice)}</span>
            )}
          </div>
          <p className="mono text-[12px] tracking-[0.06em] uppercase text-[var(--text-muted)] mt-[var(--space-4)] max-w-[60ch]">{product.description}</p>

          <VariantSelector colors={product.colors} sizes={product.sizes} />

          <div className="mt-[var(--space-8)] border-t-[2px] border-[var(--line)] pt-[var(--space-4)]">
            <p className={`mono text-[12px] tracking-[0.06em] uppercase ${product.stock > 0 ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
              {product.stock > 0 ? `[ ${product.stock} IN STOCK ]` : '[ OUT OF STOCK ]'}
            </p>
            <div className="mt-[var(--space-4)] flex items-center gap-[var(--space-4)]">
              <ProductWishlistButton productId={product.id} />
              {product.stock > 0 && (
                <AddToCartButton productId={product.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

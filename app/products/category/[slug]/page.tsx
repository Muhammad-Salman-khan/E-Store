import { products } from '@/data/products'
import Link from 'next/link'
import { ProductCard } from '@/components/catalog/ProductCard/ProductCard'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = decodeURIComponent(params.slug).replace(/-/g, ' ')
  const items = products.filter(p => p.category.toLowerCase() === category.toLowerCase())
  return {
    title: `${category} | E-Store`,
    description: `Shop ${category} in Pakistan. Curated selection of ${items.length} products with guest checkout and PKR pricing.`,
  }
}

export async function generateStaticParams() {
  const cats = Array.from(new Set(products.map(p => p.category.toLowerCase().replace(/\s+/g, '-'))))
  return cats.map(slug => ({ slug }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = decodeURIComponent(params.slug).replace(/-/g, ' ')
  const items = products.filter(p => p.category.toLowerCase() === category.toLowerCase())

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{category}</h1>
      <p className="text-muted-foreground mb-8">
        Curated {category} collection. Guest checkout, flat Rs.250 shipping, free over Rs.5,000.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(p => (
          <Link key={p.id} href={`/products/${p.slug}`}>
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </div>
  )
}

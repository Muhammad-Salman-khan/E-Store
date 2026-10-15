import type { MetadataRoute } from 'next'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'
  const now = new Date()

  const productUrls = products.map(p => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categorySet = Array.from(new Set(products.map(p => p.category.toLowerCase().replace(/\s+/g, '-'))))
  const categoryUrls = categorySet.map(cat => ({
    url: `${base}/products?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/checkout`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...productUrls,
    ...categoryUrls,
  ]
}

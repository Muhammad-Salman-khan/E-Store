import { products } from '@/data/products'
import { getWeeklyProduct } from '@/lib/weekly'

export function generateProductOfWeekContent() {
  const { product: p } = getWeeklyProduct()
  if (!p) return null

  const price = (p.price / 100).toLocaleString('en-PK')
  const title = `Product of the Week: ${p.name}`

  const instagramCaption = `${title}
${p.brand} — ${p.category}
${p.description}
Price: Rs. ${price}
Free shipping over Rs.5,000
Link in bio

#PakistanFashion #EStore #ProductOfTheWeek`

  const pinterestTitle = `${p.name} — ${p.brand}`
  const pinterestDescription = `${p.description} Shop now at E-Store with guest checkout.`

  const meta = {
    title,
    price: `Rs. ${price}`,
    brand: p.brand,
    category: p.category,
    url: `/products/${p.slug}`,
    image: p.images[0],
  }

  return { meta, instagramCaption, pinterestTitle, pinterestDescription }
}

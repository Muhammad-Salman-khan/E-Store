import { getWeeklyProduct } from '../lib/weekly.ts'
import { products } from '../data/products.ts'

const { product, weekNumber, year } = getWeeklyProduct()
const price = (product.price / 100).toLocaleString('en-PK')

console.log(`Week ${weekNumber}/${year} - Product of the Week`)
console.log(`Title: ${product.name}`)
console.log(`Brand: ${product.brand}`)
console.log(`Price: Rs. ${price}`)
console.log(`URL: /products/${product.slug}`)
console.log('')
console.log('Instagram caption:')
console.log(`${product.name}
${product.brand} — ${product.category}
${product.description}
Price: Rs. ${price}
Free shipping over Rs.5,000
Link in bio

#PakistanFashion #EStore #ProductOfTheWeek`)
console.log('')
console.log('Pinterest title:', `${product.name} — ${product.brand}`)
console.log('Pinterest description:', product.description + ' Shop now at E-Store with guest checkout.')

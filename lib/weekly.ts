import { products } from "../data/products"

export type WeeklyProduct = {
  product: typeof products[0]
  weekNumber: number
  year: number
}

export function getWeeklyProduct( date?: Date ): WeeklyProduct {
  const now = date ?? new Date()
  const karachiTz = "Asia/Karachi"
  const localDate = new Date(now.toLocaleString("en-US", { timeZone: karachiTz }))
  const dayOfYear = Math.floor(
    (localDate.getTime() - new Date(localDate.getFullYear(), 0, 0).getTime()) / 86400000
  )
  const weekNumber = Math.ceil((dayOfYear + 1) / 7)
  const year = localDate.getFullYear()
  const index = (weekNumber - 1) % products.length
  return {
    product: products[index],
    weekNumber,
    year,
  }
}

export function getWeeklyProductIndex( weekNumber: number, productCount?: number ): number {
  const count = productCount ?? products.length
  return (weekNumber - 1) % count
}
import { products } from "../data/products"

export type WeeklyProduct = {
  product: typeof products[0]
  weekNumber: number
  year: number
}

function getISOWeek(date: Date): { week: number; year: number } {
  // Work in Asia/Karachi timezone (UTC+5, no DST)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  const karachiOffset = 5 * 60 * 60 * 1000
  const karachi = new Date(utc + karachiOffset)

  const d = new Date(Date.UTC(karachi.getUTCFullYear(), karachi.getUTCMonth(), karachi.getUTCDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return { week: weekNo, year: d.getUTCFullYear() }
}

export function getWeeklyProduct(date?: Date): WeeklyProduct {
  const { week, year } = getISOWeek(date ?? new Date())
  const index = (week - 1) % products.length
  return {
    product: products[index],
    weekNumber: week,
    year,
  }
}

export function getWeeklyProductIndex(weekNumber: number, productCount?: number): number {
  const count = productCount ?? products.length
  return (weekNumber - 1) % count
}

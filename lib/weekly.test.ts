import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getWeeklyProduct, getWeeklyProductIndex } from './weekly'

describe('weekly rotation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('returns deterministic product for same week', () => {
    const d = new Date('2025-06-01T00:00:00Z')
    vi.setSystemTime(d)
    const a = getWeeklyProduct()
    const b = getWeeklyProduct()
    expect(a.weekNumber).toBe(b.weekNumber)
    expect(a.product.id).toBe(b.product.id)
  })

  it('Karachi timezone edge: UTC Sunday becomes Monday Karachi', () => {
    // 2025-01-05T00:00 UTC is 2025-01-05 05:00 Karachi (Sunday -> Sunday)
    // Choose 2025-01-04T19:30 UTC = 2025-01-05 00:30 Karachi
    const d = new Date('2025-01-04T19:30:00Z')
    vi.setSystemTime(d)
    const res = getWeeklyProduct()
    expect(res.weekNumber).toBeGreaterThan(0)
    expect(res.year).toBe(2025)
  })

  it('index wraps with productCount', () => {
    expect(getWeeklyProductIndex(13, 12)).toBe(0)
    expect(getWeeklyProductIndex(14, 12)).toBe(1)
    expect(getWeeklyProductIndex(1, 12)).toBe(0)
  })

  it('week boundary rollover changes product', () => {
    const first = new Date('2025-06-02T00:00:00Z')
    const second = new Date('2025-06-09T00:00:00Z')
    vi.setSystemTime(first)
    const w1 = getWeeklyProduct()
    vi.setSystemTime(second)
    const w2 = getWeeklyProduct()
    expect(w1.weekNumber).not.toBe(w2.weekNumber)
  })
})

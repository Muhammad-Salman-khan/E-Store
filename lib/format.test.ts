import { describe, it, expect } from 'vitest'
import { formatPKR } from './format'

describe('formatPKR', () => {
  it('formats 1250 paisa to Rs. 13', () => {
    expect(formatPKR(1250)).toBe('Rs. 13')
  })
  it('formats 1250 rupees *100 => Rs. 1,250', () => {
    expect(formatPKR(125000)).toBe('Rs. 1,250')
  })
  it('formats zero', () => {
    expect(formatPKR(0)).toBe('Rs. 0')
  })
  it('formats large number with thousands separator', () => {
    expect(formatPKR(12345678900)).toBe('Rs. 123,456,789')
  })
  it('never shows decimals', () => {
    expect(formatPKR(12345)).toBe('Rs. 123')
  })
})

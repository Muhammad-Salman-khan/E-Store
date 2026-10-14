import { describe, it, expect, beforeEach } from 'vitest'
import { cartStore } from './cart'

describe('cartStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('add and get work', () => {
    cartStore.add('p1', 2)
    expect(cartStore.get()).toEqual([{ productId: 'p1', quantity: 2 }])
  })

  it('add increments existing', () => {
    cartStore.add('p1')
    cartStore.add('p1', 3)
    expect(cartStore.get()[0].quantity).toBe(4)
  })

  it('update quantity and removes zero', () => {
    cartStore.add('p1', 2)
    cartStore.update('p1', 0)
    expect(cartStore.get()).toEqual([])
  })

  it('remove works', () => {
    cartStore.add('p1')
    cartStore.add('p2')
    cartStore.remove('p1')
    expect(cartStore.get().map(i => i.productId)).toEqual(['p2'])
  })

  it('clear empties', () => {
    cartStore.add('p1')
    cartStore.clear()
    expect(cartStore.get()).toEqual([])
  })

  it('persistence round-trip', () => {
    cartStore.add('p1', 1)
    const raw = localStorage.getItem('ecom_cart_v1')
    expect(raw).toContain('p1')
  })

  it('corrupted JSON does not crash', () => {
    localStorage.setItem('ecom_cart_v1', 'not json')
    expect(() => cartStore.get()).not.toThrow()
    expect(cartStore.get()).toEqual([])
  })
})

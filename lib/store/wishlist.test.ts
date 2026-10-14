import { describe, it, expect, beforeEach } from 'vitest'
import { wishlistStore } from './wishlist'

describe('wishlistStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('add and get', () => {
    wishlistStore.add('p1')
    expect(wishlistStore.get()).toContain('p1')
  })

  it('toggle adds then removes', () => {
    wishlistStore.toggle('p1')
    expect(wishlistStore.has('p1')).toBe(true)
    wishlistStore.toggle('p1')
    expect(wishlistStore.has('p1')).toBe(false)
  })

  it('dedupe - add twice still one', () => {
    wishlistStore.add('p1')
    wishlistStore.add('p1')
    const list = wishlistStore.get().filter(id => id === 'p1')
    expect(list.length).toBe(1)
  })

  it('persistence round-trip', () => {
    wishlistStore.add('p1')
    const raw = localStorage.getItem('ecom_wishlist_v1')
    expect(raw).toContain('p1')
  })
})

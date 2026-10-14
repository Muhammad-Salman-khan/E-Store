export type CartItem = {
  productId: string
  quantity: number
}

const CART_KEY = "ecom_cart_v1"

function readCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export const cartStore = {
  get() {
    return readCart()
  },
  add(productId: string, qty = 1) {
    const items = readCart()
    const existing = items.find(i => i.productId === productId)
    if (existing) {
      existing.quantity += qty
    } else {
      items.push({ productId, quantity: qty })
    }
    writeCart(items)
  },
  update(productId: string, quantity: number) {
    const items = readCart().filter(i => {
      if (i.productId === productId) i.quantity = Math.max(0, quantity)
      return i.quantity > 0
    })
    writeCart(items)
  },
  remove(productId: string) {
    const items = readCart().filter(i => i.productId !== productId)
    writeCart(items)
  },
  clear() {
    writeCart([])
  },
}

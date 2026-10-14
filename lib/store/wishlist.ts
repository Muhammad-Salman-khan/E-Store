const WISH_KEY = "ecom_wishlist_v1"

function read(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(WISH_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function write(list: string[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(WISH_KEY, JSON.stringify(list))
}

export const wishlistStore = {
  get() { return read() },
  add(id: string) {
    const list = new Set(read())
    list.add(id)
    write([...list])
    window.dispatchEvent(new Event("wishlist-updated"))
  },
  remove(id: string) {
    const list = read().filter(i => i !== id)
    write(list)
    window.dispatchEvent(new Event("wishlist-updated"))
  },
  toggle(id: string) {
    const list = read()
    if (list.includes(id)) this.remove(id)
    else this.add(id)
  },
  has(id: string) { return read().includes(id) }
}

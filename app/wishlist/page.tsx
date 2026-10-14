import { ProductGridWishlist } from "@/components/wishlist/ProductGridWishlist/ProductGridWishlist"

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
        <ProductGridWishlist />
      </div>
    </main>
  )
}

import { ProductGridWishlist } from "@/components/wishlist/ProductGridWishlist/ProductGridWishlist"

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-[var(--space-12)]">
      <div className="max-w-7xl mx-auto px-[var(--space-6)]">
        <h1 className="text-[clamp(2.5rem,6vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase border-b-[2px] border-[var(--line)] pb-[var(--space-4)] mb-[var(--space-8)]">Wishlist</h1>
        <ProductGridWishlist />
      </div>
    </main>
  )
}

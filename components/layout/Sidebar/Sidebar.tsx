"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home as HomeIcon, ShoppingBag, Heart, ShoppingCart } from "lucide-react"

const nav = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/checkout", label: "Checkout", icon: ShoppingCart },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 border-2 border-[var(--line)] bg-[var(--bg-elevated)] p-3"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-[var(--text)]" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-[280px] flex-col border-r-[2px] border-[var(--line)] bg-[var(--bg-elevated)] p-[var(--space-4)]">
        <div className="mono text-[14px] tracking-[0.06em] mb-[var(--space-8)] border-b-[2px] border-[var(--line)] pb-[var(--space-4)]">E Store [ UNIT / D-01 ]</div>
        <nav className="flex flex-col gap-[var(--space-2)]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-[var(--space-4)] py-[var(--space-2)] border-[2px] border-[var(--line)] bg-[var(--bg)] mono text-[12px] tracking-[0.06em] uppercase"
            >
              <item.icon className="w-4 h-4 text-[var(--text)]" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-[var(--bg)]/90" onClick={() => setOpen(false)} />
          <div className="relative w-[280px] h-full bg-[var(--bg-elevated)] p-[var(--space-4)] border-r-[2px] border-[var(--line)]">
            <div className="flex items-center justify-between mb-[var(--space-8)] border-b-[2px] border-[var(--line)] pb-[var(--space-4)]">
              <span className="mono text-[14px] tracking-[0.06em]">E Store</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="border-2 border-[var(--line)] bg-[var(--bg)] p-2">
                <X className="w-5 h-5 text-[var(--text)]" />
              </button>
            </div>
            <nav className="flex flex-col gap-[var(--space-2)]">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-[var(--space-4)] py-[var(--space-2)] border-[2px] border-[var(--line)] bg-[var(--bg)] mono text-[12px] tracking-[0.06em] uppercase"
                >
                  <item.icon className="w-4 h-4 text-[var(--text)]" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

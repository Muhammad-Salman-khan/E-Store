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
        className="md:hidden fixed top-4 left-4 z-50 rounded-full bg-[var(--primary)] p-2 text-[var(--primary-ink)]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col border-r border-[var(--line)] bg-[var(--bg-elevated)] p-4">
        <div className="text-xl font-bold text-[var(--text)] mb-8">EStore</div>
        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--glass)] text-[var(--text)]"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-72 h-full bg-[var(--bg-elevated)] p-4 border-r border-[var(--line)]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-[var(--text)]">EStore</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--glass)] text-[var(--text)]"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

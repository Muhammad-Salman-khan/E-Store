"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass)] border-t border-[var(--glass-border)] shadow-[var(--shadow)] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo/brand */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[var(--primary)]">EStore</span>
        </div>

        {/* Menu button for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-full bg-[var(--primary)] p-2"
          aria-label="Open menu"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center gap-8">
          <Link href="/products" className="text-2xl font-bold text-[var(--text)] hover:text-[var(--primary)]">
            Products
          </Link>
          <Link href="/" className="text-2xl font-bold text-[var(--text)] hover:text-[var(--primary)]">
            Home
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 px-6 py-2 bg-[var(--primary)] text-[var(--primary-ink)] rounded-full text-sm font-medium"
          >
            Close
          </button>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
          Home
        </Link>
        <Link href="/products" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
          Products
        </Link>
      </div>
    </nav>
  )
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-[280px] right-0 z-50 border-b-[2px] border-[var(--line)] bg-[var(--bg-elevated)] h-[64px]">
      <div className="max-w-7xl mx-auto px-[var(--space-4)] h-full flex items-center justify-between">
        <div className="hidden md:flex items-center gap-[var(--space-8)]">
          <Link
            href="/"
            className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] bg-[var(--bg)]"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] bg-[var(--bg)]"
          >
            Catalog
          </Link>
          <Link
            href="/wishlist"
            className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] bg-[var(--bg)]"
          >
            Wishlist
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden border-2 border-[var(--line)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
          aria-label="Open menu"
        >
          {isMenuOpen ?
            <X className="w-5 h-5 text-[var(--text)]" />
          : <Menu className="w-5 h-5 text-[var(--text)]" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[var(--bg)]">
          <div className="h-[64px]" />
          <div className="px-[var(--space-4)] py-[var(--space-8)] flex flex-col gap-[var(--space-4)]">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="mono text-[14px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-4)]"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className="mono text-[14px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-4)]"
            >
              Catalog
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="mono text-[14px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] px-[var(--space-4)] py-[var(--space-4)]"
            >
              Wishlist
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mt-[var(--space-4)] border-[2px] border-[var(--line)] bg-[var(--primary)] text-[var(--primary-ink)] px-[var(--space-4)] py-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase self-start"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

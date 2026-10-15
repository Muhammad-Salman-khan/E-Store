"use client"

import { useState } from "react"

interface VariantSelectorProps {
  colors?: string[]
  sizes?: string[]
}

export function VariantSelector({ colors, sizes }: VariantSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <>
      {colors && colors.length > 0 && (
        <div className="mt-[var(--space-8)] border-t-[2px] border-[var(--line)] pt-[var(--space-4)]">
          <h3 className="mono text-[12px] tracking-[0.06em] uppercase mb-[var(--space-2)]">Colors</h3>
          <div className="flex gap-[var(--space-2)]">
            {colors.map((c) => {
              const active = selectedColor === c
              return (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-[var(--space-4)] py-[var(--space-2)] border-[2px] border-[var(--line)] mono text-[11px] tracking-[0.06em] uppercase ${active ? "bg-[var(--primary)] text-[var(--primary-ink)]" : "bg-[var(--bg)]"}`}
                >
                  {c.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && (
        <div className="mt-[var(--space-8)] border-t-[2px] border-[var(--line)] pt-[var(--space-4)]">
          <h3 className="mono text-[12px] tracking-[0.06em] uppercase mb-[var(--space-2)]">Sizes</h3>
          <div className="flex flex-wrap gap-[var(--space-2)]">
            {sizes.map((s) => {
              const active = selectedSize === s
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-[var(--space-4)] py-[var(--space-2)] border-[2px] border-[var(--line)] mono text-[11px] tracking-[0.06em] uppercase ${active ? "bg-[var(--primary)] text-[var(--primary-ink)]" : "bg-[var(--bg)]"}`}
                >
                  {s.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

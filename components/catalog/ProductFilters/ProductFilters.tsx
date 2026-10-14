"use client"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const allCategories = [
  "men's clothing",
  "women's clothing",
  "footwear",
  "accessories",
]

export function ProductFilters() {
  return (
    <div className="p-[var(--space-6)] border-y-[2px] border-[var(--line)] bg-[var(--bg-elevated)] mb-[var(--space-8)]">
      <h2 className="mono text-[14px] tracking-[0.06em] uppercase border-b-[2px] border-[var(--line)] pb-[var(--space-2)] mb-[var(--space-6)]">
        Filters
      </h2>

      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4">
        {/* Category filter */}
        <div className="border-[2px] border-[var(--line)] p-[var(--space-4)]">
          <Label className="mono text-[12px] tracking-[0.06em] uppercase block mb-[var(--space-2)] text-[var(--text-muted)]">
            Category
          </Label>

          <Select>
            <SelectTrigger className="border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] mono text-[12px] tracking-[0.06em] uppercase">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="border-[2px] border-[var(--line)] bg-[var(--bg-elevated)]">
              <SelectItem value="all" className="mono text-[12px] tracking-[0.06em] uppercase">All Categories</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat} className="mono text-[12px] tracking-[0.06em] uppercase">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min price */}
        <div className="border-[2px] border-[var(--line)] p-[var(--space-4)]">
          <Label className="mono text-[12px] tracking-[0.06em] uppercase block mb-[var(--space-2)] text-[var(--text-muted)]">
            Min Price
          </Label>
          <Input
            type="number"
            value={0}
            className="w-full border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] mono text-[12px] tracking-[0.06em] uppercase"
            placeholder="0"
          />
        </div>

        {/* Max price */}
        <div className="border-[2px] border-[var(--line)] p-[var(--space-4)]">
          <Label className="mono text-[12px] tracking-[0.06em] uppercase block mb-[var(--space-2)] text-[var(--text-muted)]">
            Max Price
          </Label>
          <Input
            type="number"
            value={999999}
            className="w-full border-[2px] border-[var(--line)] bg-[var(--bg-elevated)] mono text-[12px] tracking-[0.06em] uppercase"
            placeholder="999999"
          />
        </div>
      </div>
    </div>
  )
}
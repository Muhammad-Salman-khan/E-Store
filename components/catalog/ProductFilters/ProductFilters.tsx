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
    <div className="p-6 border-y border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)] mb-8">
      <h2 className="text-xl font-bold tracking-tight text-[var(--text)] mb-6">
        Filters
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category filter */}
        <div>
          <Label className="text-[var(--text-muted)] text-sm mb-2">
            Category
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min price */}
        <div>
          <Label className="text-[var(--text-muted)] text-sm mb-2">
            Min Price
          </Label>
          <Input
            type="number"
            value={0}
            className="w-full"
            placeholder="0"
          />
        </div>

        {/* Max price */}
        <div>
          <Label className="text-[var(--text-muted)] text-sm mb-2">
            Max Price
          </Label>
          <Input
            type="number"
            value={999999}
            className="w-full"
            placeholder="999999"
          />
        </div>
      </div>
    </div>
  )
}
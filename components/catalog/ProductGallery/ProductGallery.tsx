"use client"

import Image from "next/image"
import { useState } from "react"

interface Props {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0)
  const img = images[selected] ?? images[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`aspect-square relative rounded-lg overflow-hidden border ${selected === i ? "border-[var(--primary)]" : "border-[var(--line)]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${name} ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

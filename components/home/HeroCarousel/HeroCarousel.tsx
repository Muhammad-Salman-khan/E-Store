"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "motion/react"

interface HeroSlide {
  id: string
  title: string
  description: string
  image: string
  ctaText?: string
  ctaUrl?: string
}

const slides: HeroSlide[] = [
  {
    id: "s1",
    title: "Winter Collection 2025",
    description: "Discover premium khaddar suits and winter essentials. Up to 40% off.",
    image: "/products/khaddar-1.jpg",
    ctaText: "Shop Now",
    ctaUrl: "/products",
  },
  {
    id: "s2",
    title: "Summer Lawn Edit",
    description: "Light-as-air lawn fabrics with hand-embroidered floral patterns.",
    image: "/products/lawn-1.jpg",
    ctaText: "View Collection",
    ctaUrl: "/products?category=women's clothing",
  },
  {
    id: "s3",
    title: "Footwear Finale",
    description: "Premium leather sneakers and shoes for every occasion.",
    image: "/products/sneakers-1.jpg",
    ctaText: "Browse Shoes",
    ctaUrl: "/products?category=footwear",
  },
]

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const prev = () => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  const next = () => {
    setActiveIndex((i) => (i + 1) % slides.length)
  }

  return (
    <motion.div
      className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)]"
    >
      <motion.div
        className="flex w-5/6 items-center gap-4 transform transition-transform duration-700 ease-out"
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex
          const translateX = i * 100
          return (
            <motion.div
              key={slide.id}
              className={`
                min-w-0 flex-0 flex shrink-0
                ${isActive ? "" : `translateX([${translateX}%,0%)`}
              `}
            >
              <motion.div className="relative group">
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-48 object-cover rounded-t-xl transition-transform duration-500 ease-out group:scale-95"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/[.6] via-black/[.4] to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <h3 className="text-xl font-bold tracking-tight">{slide.title}</h3>
                  <p className="mt-1 text-base leading-relaxed">{slide.description}</p>
                  {slide.ctaText && (
                    <a
                      href={slide.ctaUrl}
                      className="mt-3 inline-block rounded-full bg-primary px-4 py-2 text-primary-ink text-sm font-medium transition-colors hover:bg-primary/90"
                    >
                      {slide.ctaText}
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] p-2 hover:bg-white/[.1] transition-colors" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] p-2 hover:bg-white/[.1] transition-colors" aria-label="Next slide">
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  )
}
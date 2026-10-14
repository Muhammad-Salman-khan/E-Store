"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaUrl?: string;
}

const slides: HeroSlide[] = [
  {
    id: "s1",
    title: "Winter Collection 2025",
    description:
      "Discover premium khaddar suits and winter essentials. Up to 40% off.",
    image:
      "https://mtjonline.com/cdn/shop/products/MKS-4020_3.jpg?v=1757321166",
    ctaText: "Shop Now",
    ctaUrl: "/products",
  },
  {
    id: "s2",
    title: "Summer Lawn Edit",
    description:
      "Light-as-air lawn fabrics with hand-embroidered floral patterns.",
    image:
      "https://baroque.com.pk/cdn/shop/files/187_764d7673-7eec-4a6b-8819-756a39b6672a.jpg?v=1770200560&width=1200",
    ctaText: "View Collection",
    ctaUrl: "/products?category=women's clothing",
  },
  {
    id: "s3",
    title: "Footwear Finale",
    description: "Premium leather sneakers and shoes for every occasion.",
    image:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTEyL3NyLWltYWdlLTE1MTIyMDI1LWt1MDMtcy0zMzFfMS5qcGc.jpg",
    ctaText: "Browse Shoes",
    ctaUrl: "/products?category=footwear",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const prev = () => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  };
  const next = () => {
    setActiveIndex((i) => (i + 1) % slides.length);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      next();
    }
    if (distance < -minSwipeDistance) {
      prev();
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass)] shadow-[var(--shadow)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-72 w-full">
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-full h-full flex-shrink-0">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/[.6] via-black/[.2] to-transparent text-white rounded-xl">
                <h3 className="text-xl font-bold tracking-tight">{slide.title}</h3>
                <p className="mt-1 text-base leading-relaxed">{slide.description}</p>
                {slide.ctaText && (
                  <a
                    href={slide.ctaUrl}
                    className="mt-3 inline-block w-fit rounded-full bg-primary px-4 py-2 text-primary-ink text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] p-2 hover:bg-white/[.1] transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] p-2 hover:bg-white/[.1] transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === activeIndex ? "w-6 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

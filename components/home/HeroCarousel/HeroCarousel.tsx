"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
      className="relative w-full max-w-6xl overflow-hidden border-[2px] border-[var(--line)] bg-[var(--bg-elevated)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden border-r-[2px] border-[var(--line)]">
          <motion.div
            className="flex h-full w-full"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="relative min-w-full h-full flex-shrink-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="border-t-[2px] lg:border-t-0 lg:border-l-[2px] border-[var(--line)] bg-[var(--bg)] p-[var(--space-8)] flex flex-col justify-center">
          <div className="mono text-[12px] tracking-[0.06em] uppercase border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] self-start mb-[var(--space-4)]">Carousel [ {activeIndex+1} / {slides.length} ]</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-[clamp(3rem,8vw,12rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase">
                {slides[activeIndex].title}
              </h2>
              <p className="mono text-[14px] tracking-[0.06em] mt-[var(--space-4)] max-w-[48ch] opacity-80">
                {slides[activeIndex].description}
              </p>
              {slides[activeIndex].ctaText && (
                <a
                  href={slides[activeIndex].ctaUrl}
                  className="mt-[var(--space-8)] inline-flex items-center border-[2px] border-[var(--line)] bg-[var(--accent)] text-[var(--accent-ink)] px-[var(--space-6)] py-[var(--space-4)] mono text-[12px] tracking-[0.06em] uppercase"
                >
                  {slides[activeIndex].ctaText}
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 border-2 border-[var(--line)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-[var(--text)]" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 border-2 border-[var(--line)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] hover:translate-x-[-1px] hover:translate-y-[1px] hover:shadow-none transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-[var(--text)]" />
      </button>

      <div className="absolute bottom-4 left-4 flex items-center gap-[var(--space-2)] mono text-[12px] tracking-[0.06em] uppercase">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`border-[2px] border-[var(--line)] px-[var(--space-4)] py-[var(--space-2)] bg-[var(--bg)] ${i === activeIndex ? "bg-[var(--accent)] text-[var(--accent-ink)]" : ""}`}
          >
            {String(i+1).padStart(2,'0')}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

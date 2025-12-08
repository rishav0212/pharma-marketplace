"use client";

import React from "react";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryMarqueeProps {
  categories: string[];
  speed?: number;
}

export default function CategoryMarquee({
  categories,
  speed = 40,
}: CategoryMarqueeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  // Duplicate list for seamless loop
  const scrollContent = [
    ...categories,
    ...categories,
  ];

  const handleCategoryClick = (category: string) => {
    // 1. Update URL without reloading
    const params = new URLSearchParams(window.location.search);
    if (activeCategory === category) {
      params.delete("category"); // Toggle off if already active
    } else {
      params.set("category", category);
    }

    router.push(`?${params.toString()}`, { scroll: false });

    // 2. Smooth Scroll to Gallery
    const galleryElement = document.getElementById("product-gallery-anchor");
    if (galleryElement) {
      const offset = 180; // Account for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = galleryElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full overflow-hidden py-4 border-b border-neutral-100 bg-white/40 backdrop-blur-sm relative z-10">
      {/* Side Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-20 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max hover:[animation-play-state:paused]">
        <motion.div
          className="flex gap-3 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {scrollContent.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={`${cat}-${index}`}
                onClick={() => handleCategoryClick(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-sm font-medium whitespace-nowrap transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-[var(--brand-glow)]"
                    : "bg-white border-neutral-200/60 text-neutral-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                }`}
              >
                <Tag
                  className={`w-3.5 h-3.5 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span className="text-xs md:text-sm tracking-wide">{cat}</span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

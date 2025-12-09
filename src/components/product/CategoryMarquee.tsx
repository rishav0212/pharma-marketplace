"use client";

import React from "react";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryMarqueeProps {
  categories: string[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  speed?: number;
}

export default function CategoryMarquee({
  categories,
  activeCategory,
  onCategorySelect,
  speed = 40,
}: CategoryMarqueeProps) {
  // Duplicate list for seamless loop
  const scrollContent = [...categories, ...categories];

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
                onClick={() => onCategorySelect(cat)}
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

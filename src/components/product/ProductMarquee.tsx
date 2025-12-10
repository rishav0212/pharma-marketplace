"use client";

import React, { useState, useRef } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductMarqueeProps {
  products: Product[];
  speed?: number; // Duration in seconds
}

export default function ProductMarquee({
  products,
  speed = 40, // Adjusted default: 1000s is very slow, usually 30-60s is good
}: ProductMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate list for seamless loop
  const scrollContent = [...products, ...products];

  // 1. Function to PAUSE immediately
  const handlePause = () => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // 2. Function to RESUME after 5 seconds
  const handleResume = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 150); // 5 Seconds Delay
  };

  return (
    <div className="w-full overflow-hidden py-6 md:py-10 relative">
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-32 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 md:w-32 bg-gradient-to-l from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />

      <div
        // Attach Logic Here
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
        className="flex gap-3 md:gap-6 w-max"
        style={{
          animation: `scroll ${speed}s linear infinite`,
          // This allows React state to control CSS animation
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {scrollContent.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="w-[200px] md:w-[320px] flex-shrink-0 transform hover:scale-[1.02] transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
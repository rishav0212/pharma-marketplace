"use client";

import React, { useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductMarqueeProps {
  products: Product[];
  secondsPerItem?: number;
}

export default function ProductMarquee({
  products,
  secondsPerItem = 4,
}: ProductMarqueeProps) {
  // 1. Seamless Loop: Duplicate the list
  const scrollContent = useMemo(() => [...products, ...products], [products]);

  // 2. Dynamic Duration: Calculate based on list size for constant speed
  const animationDuration = useMemo(() => {
    const baseDuration = Math.max(products.length * secondsPerItem, 20);
    return `${baseDuration}s`;
  }, [products.length, secondsPerItem]);

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full overflow-hidden py-6 md:py-10 relative">
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-32 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 md:w-32 bg-gradient-to-l from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />

      {/* Change: Removed JS handlers (onMouseEnter/Leave). 
         Added: hover:[animation-play-state:paused]
         This uses native CSS to pause, which is instantly smooth and lag-free.
      */}
      <div
        className="flex gap-3 md:gap-6 w-max will-change-transform hover:[animation-play-state:paused]"
        style={{
          animationName: "scroll",
          animationDuration: animationDuration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
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

"use client";

import React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductMarqueeProps {
  products: Product[];
  speed?: number; // Duration in seconds
}

export default function ProductMarquee({ products, speed = 1000 }: ProductMarqueeProps) {
  // Duplicate list enough times to ensure seamless loop on large screens
  const scrollContent = [...products, ...products];

  return (
    <div className="w-full overflow-hidden py-10 relative">
      {/* Premium Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8f9fa] via-[#f8f9fa]/80 to-transparent z-20 pointer-events-none" />

      <div 
        className="flex gap-6 w-max hover:[animation-play-state:paused]"
        style={{
          animation: `scroll ${speed}s linear infinite`,
        }}
      >
        {scrollContent.map((product, index) => (
          <div 
            key={`${product.id}-${index}`} 
            className="w-[280px] md:w-[320px] flex-shrink-0 transform hover:scale-[1.02] transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
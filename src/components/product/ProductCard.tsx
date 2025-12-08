// src/components/product/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ArrowRight, Building2 } from "lucide-react";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);

  const hasProductImage =
    product.images && product.images.length > 0 && product.images[0];
  const showMainImage = hasProductImage && !imageError;
  const hasCompanyLogo = product.company && product.company.logo;

  // Generate Product Initials for the "Logo"
  // e.g., "Mv-Clav 625" -> "MC", "Paradin" -> "Pa"
  const getProductInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const productInitials = getProductInitials(product.name);

  return (
    <a href={`/product/${product.slug}`} className="block group h-full">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden h-full flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-[var(--brand-primary)] transition-all duration-300 relative">
        {/* --- IMAGE AREA --- */}
        <div className="relative aspect-[4/3] md:aspect-[5/4] bg-white overflow-hidden border-b border-neutral-100">
          {showMainImage ? (
            // A. Product Image
            <div className="relative w-full h-full p-6 transition-transform duration-500 group-hover:scale-105">
              <Image
                src={product.images![0]}
                alt={product.name}
                fill
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            // B. Typographic Product Logo Fallback
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-neutral-100 flex items-center justify-center overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-soft)] rounded-full blur-[60px] opacity-60 translate-x-10 -translate-y-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-[40px] opacity-60 -translate-x-5 translate-y-5" />

              {/* The "Product Logo" */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-white/60 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
                  }}
                >
                  <span
                    className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-neutral-800 to-neutral-500"
                    style={{
                      // Fallback color if gradient fails, or use brand color
                      color: "var(--brand-primary)",
                    }}
                  >
                    {productInitials}
                  </span>
                </div>
                {/* Optional: Small text label below */}
                <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {product.category}
                </span>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/80 backdrop-blur-md text-amber-700 text-[10px] font-bold border border-amber-100 shadow-sm">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                <span>Featured</span>
              </span>
            </div>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-3 md:p-4 flex flex-col flex-grow bg-white relative z-10">
          {/* 1. Company Identity Row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-5 h-5 rounded-full border border-neutral-100 bg-white overflow-hidden shrink-0">
              {hasCompanyLogo ? (
                <Image
                  src={product.company.logo}
                  alt={product.company.name}
                  fill
                  className="object-contain p-0.5"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-50 text-[8px] text-neutral-400">
                  <Building2 className="w-3 h-3" />
                </div>
              )}
            </div>
            <div className="text-[10px] md:text-xs text-neutral-500 font-medium truncate uppercase tracking-wide">
              {product.company.name}
            </div>
          </div>

          {/* 2. Product Name */}
          <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-2 leading-snug line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
            {product.name}
          </h3>

          {/* 3. Category Chip */}
          <div className="mb-3">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-100 truncate max-w-full">
              {product.category}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* 4. Price & Action */}
          <div className="flex items-end justify-between pt-3 border-t border-dashed border-neutral-200">
            <div>
              <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-0.5">
                MRP
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xs font-bold text-neutral-500">₹</span>
                <span className="text-xl font-extrabold text-neutral-900 tracking-tight">
                  {product.pricing.minPrice}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium ml-0.5">
                  /{product.pricing.unit}
                </span>
              </div>
            </div>

            {/* Hover Action Button */}
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-0.5">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

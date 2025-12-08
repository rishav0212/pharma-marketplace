"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const images =
    product.images && product.images.length > 0 ? product.images : [];
  const hasMultipleImages = images.length > 1;
  const showMainImage = images.length > 0 && !imageError;
  const hasCompanyLogo = product.company && product.company.logo;

  // Handle Multiple Categories (Display the first one)
  const primaryCategory =
    product.categories && product.categories.length > 0
      ? product.categories[0]
      : "General";

  useEffect(() => {
    if (!hasMultipleImages || isHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, isHovered, images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getProductInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };
  const productInitials = getProductInitials(product.name);

  return (
    <a
      href={`/product/${product.slug}`}
      className="block group h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-[1.25rem] border border-neutral-200 overflow-hidden h-full flex flex-col hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:border-[var(--brand-primary)]/50 transition-all duration-500 relative transform hover:-translate-y-1">
        {/* --- IMAGE AREA --- */}
        <div className="relative aspect-[4/3] bg-neutral-50 overflow-hidden border-b border-neutral-100">
          {showMainImage ? (
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-6 flex items-center justify-center"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                </motion.div>
              </AnimatePresence>

              {hasMultipleImages && (
                <>
                  <div
                    className={`absolute inset-0 flex items-center justify-between px-2 opacity-0 ${
                      isHovered ? "opacity-100" : ""
                    } transition-opacity duration-300 z-20`}
                  >
                    <button
                      onClick={prevImage}
                      className="p-1.5 rounded-full bg-white/90 shadow-sm border border-neutral-100 hover:text-[var(--brand-primary)] hover:scale-110 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="p-1.5 rounded-full bg-white/90 shadow-sm border border-neutral-100 hover:text-[var(--brand-primary)] hover:scale-110 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 p-1 rounded-full bg-white/30 backdrop-blur-sm">
                    {images.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className={`h-1 rounded-full ${
                          idx === currentImageIndex
                            ? "bg-[var(--brand-primary)]"
                            : "bg-neutral-300"
                        }`}
                        animate={{ width: idx === currentImageIndex ? 16 : 6 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            // FALLBACK
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-white to-[var(--brand-soft)] group-hover:to-[var(--brand-primary)]/5 transition-colors duration-500">
              <div className="mb-4 relative w-12 h-12 p-1 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                {hasCompanyLogo ? (
                  <Image
                    src={product.company.logo}
                    alt=""
                    fill
                    className="object-contain p-1.5 opacity-90"
                  />
                ) : (
                  <PackageOpen className="w-6 h-6 text-[var(--brand-primary)] opacity-50" />
                )}
              </div>
              <div className="relative z-10 w-full">
                <h3 className="font-display text-lg md:text-xl font-black text-neutral-900 leading-tight tracking-tight mb-2 line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                  {product.name}
                </h3>
                <div className="h-1 w-8 bg-[var(--brand-primary)] mx-auto rounded-full opacity-20 group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[60px] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity" />
            </div>
          )}

          {product.featured && (
            <div className="absolute top-3 left-3 z-20">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-amber-700 text-[10px] font-bold border border-amber-100 shadow-sm">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>Featured</span>
              </span>
            </div>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-4 flex flex-col flex-grow bg-white relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-bold text-[var(--brand-primary)] uppercase tracking-wider bg-[var(--brand-soft)] px-2 py-0.5 rounded-md border border-[var(--brand-primary)]/10 truncate max-w-[60%]">
              {primaryCategory}
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <Building2 className="w-3 h-3" />
              <span className="text-[10px] font-semibold uppercase truncate max-w-[80px]">
                {product.company.name.split(" ")[0]}
              </span>
            </div>
          </div>

          <h3 className="text-base md:text-lg font-bold text-neutral-900 mb-1 leading-snug line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed h-8">
            {product.description ||
              `Premium quality ${primaryCategory} product.`}
          </p>

          <div className="flex-grow" />

          <div className="flex items-end justify-between pt-4 border-t border-dashed border-neutral-100 mt-2">
            <div>
              <div className="text-[10px] text-neutral-400 font-bold uppercase mb-0.5">
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

            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-0.5">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

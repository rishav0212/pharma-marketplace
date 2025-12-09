"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Search, PackageX, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  products: Product[];
  activeCategory: string; // Received from parent
}

export default function ProductGallery({
  products,
  activeCategory,
}: ProductGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // --- SCROLL LOGIC FOR STICKY BAR ---
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productCategories =
        product.categories && product.categories.length > 0
          ? product.categories
          : ["General"];

      const matchesCategory =
        activeCategory === "All" || productCategories.includes(activeCategory);

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // --- HORIZONTAL SCROLL BUTTONS (Keep existing logic) ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 100;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="space-y-8" id="product-gallery-anchor">
      {/* --- SMART STICKY SEARCH BAR --- */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -120, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-[80px] z-30 px-1 pointer-events-auto"
      >
        <div className="bg-white/95 backdrop-blur-2xl border border-neutral-200/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] rounded-3xl p-2 md:p-3 max-w-2xl mx-auto">
          {/* SEARCH BAR (Tabs removed from here as they are in Marquee) */}
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 md:h-5 md:w-5 text-neutral-400 group-focus-within:text-[var(--brand-primary)] transition-colors" />
            </div>
            <input
              type="text"
              placeholder={`Search in ${activeCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 md:pl-12 pr-10 py-2 md:py-3 bg-neutral-100/60 border border-transparent rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]/30 transition-all duration-300 font-medium text-sm md:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5 md:h-4 md:w-4 bg-neutral-200 rounded-full p-0.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="max-w-5xl mx-auto px-4 mt-2 opacity-0 md:opacity-100 transition-opacity">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">
            {filteredProducts.length} Products Found
          </p>
        </div>
      </motion.div>

      {/* --- GRID --- */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20 px-1"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-24 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <PackageX className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                No matches found
              </h3>
              <p className="text-neutral-500 max-w-sm">
                Try adjusting your search or category.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-8 px-8 py-3 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-all shadow-lg"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

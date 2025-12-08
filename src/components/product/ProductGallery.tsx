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
import {
  Search,
  PackageX,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

interface ProductGalleryProps {
  products: Product[];
  categories: string[];
}

export default function ProductGallery({
  products,
  categories,
}: ProductGalleryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL param
  const urlCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(urlCategory || "All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync state when URL changes (e.g. from Category Marquee click)
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    } else {
      setActiveCategory("All");
    }
  }, [urlCategory]);

  // Update URL when internal filter changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

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
        product.categories;
      const matchesCategory =
        activeCategory === "All" || productCategories.includes(activeCategory);
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // --- HORIZONTAL SCROLL BUTTONS ---
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
      {/* --- SMART STICKY SEARCH & FILTER BAR --- */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -120, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-[80px] z-30 px-1 pointer-events-auto"
      >
        <div className="bg-white/95 backdrop-blur-2xl border border-neutral-200/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] rounded-3xl p-3 max-w-5xl mx-auto flex flex-col md:flex-row gap-3 md:items-center">
          {/* 1. SEARCH BAR */}
          <div className="relative w-full md:flex-[2] group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-[var(--brand-primary)] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-10 py-3 bg-neutral-100/60 border border-transparent rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]/30 transition-all duration-300 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="h-4 w-4 bg-neutral-200 rounded-full p-0.5" />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px h-8 bg-neutral-200" />

          {/* 2. CATEGORY TABS */}
          <div className="relative flex-1 min-w-0 group/tabs">
            <div
              className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white shadow-md border border-neutral-100 rounded-full text-neutral-500 hover:text-[var(--brand-primary)]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth h-12 px-1 items-center"
            >
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                  activeCategory === "All"
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                    : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-md shadow-[var(--brand-glow)]"
                      : "bg-white text-neutral-500 border-neutral-200 hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div
              className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center bg-white shadow-md border border-neutral-100 rounded-full text-neutral-500 hover:text-[var(--brand-primary)]"
              >
                <ChevronRight className="w-4 h-4" />
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
                No items match your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("All");
                }}
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

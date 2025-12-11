"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import ProductSearch from "@/components/company/ProductSearch";
import { motion, AnimatePresence } from "framer-motion";
import { PackageX } from "lucide-react";

interface ProductGalleryProps {
  products: Product[];
  categories: string[]; // Use this if you want tabs, or remove if not needed
  // NEW PROPS: Receive state from parent
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductGallery({
  products,
  categories,
  searchQuery,
  setSearchQuery,
}: ProductGalleryProps) {
  // --- STATE ---
  // We manage 'activeCategory' locally since you didn't ask to hoist it,
  // but we can if you want hero links to work. For now, local is fine.
  const [activeCategory, setActiveCategory] = useState("All");

  // --- SMART STICKY LOGIC (Your Logic) ---
  const [isFixed, setIsFixed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const galleryRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const stickyThreshold = 90; // Top offset + buffer

        // 1. Fixed State
        const shouldBeFixed = rect.top <= stickyThreshold;
        setIsFixed(shouldBeFixed);

        // 2. Visibility / Hiding Logic
        if (!shouldBeFixed) {
          setIsHidden(false); // In Hero -> Always Show
        } else {
          // BUFFER: Stay visible for first 250px of list
          const stickyDistance = stickyThreshold - rect.top;
          const inBufferZone = stickyDistance < 250;

          if (inBufferZone) {
            setIsHidden(false); // Buffer -> Force Show
          } else {
            // Deep in list -> Hide on Down, Show on Up
            if (direction === "down") setIsHidden(true);
            else setIsHidden(false);
          }
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productCategories =
        product.categories && product.categories.length > 0
          ? product.categories
          : ["General"];

      const matchesCategory =
        activeCategory === "All" || productCategories.includes(activeCategory);

      // Filter using the PROP searchQuery
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="space-y-8" id="product-gallery-anchor" ref={galleryRef}>
      {/* STICKY BAR CONTAINER */}
      <div className="relative h-[80px] z-30">
        <div
          className={`
            w-full transition-none px-1
            ${
              isFixed
                ? "fixed top-[90px] left-0 right-0 z-40 max-w-7xl mx-auto px-4"
                : "relative"
            }
          `}
        >
          <motion.div
            initial={false}
            animate={isFixed && isHidden ? "hidden" : "visible"}
            variants={{
              visible: { y: 0, opacity: 1, scale: 1 },
              hidden: { y: -60, opacity: 0, scale: 0.98 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-neutral-200/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] rounded-3xl p-2 md:p-3 max-w-2xl mx-auto">
              {/* Controlled Search Component */}
              <ProductSearch
                variant="minimal"
                placeholder={`Search inside ${activeCategory}...`}
                value={searchQuery}
                onChange={setSearchQuery}
                scrollTargetId="product-gallery-anchor"
              />
            </div>

            <div className="max-w-2xl mx-auto px-4 mt-2">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">
                {filteredProducts.length} Products Found
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GRID */}
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
                Try adjusting your search for "{searchQuery}".
              </p>
              {/* Reset Button */}
              <div className="mt-6 max-w-xs mx-auto">
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-neutral-900 text-white rounded-full text-sm font-bold shadow-lg"
                >
                  Clear Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

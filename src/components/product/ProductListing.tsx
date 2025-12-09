"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Keep router for updates
import CategoryMarquee from "./CategoryMarquee";
import ProductGallery from "./ProductGallery";
import { Product } from "@/types";

interface ProductListingProps {
  products: Product[];
  categories: string[];
}

export default function ProductListing({
  products,
  categories,
}: ProductListingProps) {
  const router = useRouter();
  // Default to "All" so the Server Renders the full list (Good for SEO)
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. Client-Side Only: Check URL on load
  // This runs ONLY in the browser, so it doesn't break the Static Build
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        setActiveCategory(cat);
      }
    }
  }, []);

  // 2. Handle Filter Click
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // Update URL without page reload
    const params = new URLSearchParams(window.location.search);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="mb-6">
        <CategoryMarquee
          categories={["All", ...categories]}
          activeCategory={activeCategory}
          onCategorySelect={handleCategoryChange}
          speed={100}
        />
      </div>

      <div className="container-custom relative z-10 px-2 md:px-0">
        <ProductGallery products={products} activeCategory={activeCategory} />
      </div>
    </>
  );
}

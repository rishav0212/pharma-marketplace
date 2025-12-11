"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import ProductSearch from "@/components/company/ProductSearch";
import ProductMarquee from "@/components/product/ProductMarquee";
// import ProductListing from "@/components/product/ProductListing"; 
// Note: We use the NEW ProductGallery instead of ProductListing for the grid
import ProductGallery from "@/components/product/ProductGallery"; 
import {
  PackageOpen,
  ShieldCheck,
  Truck,
  Sparkles,
  Search,
  MessageCircle,
  Award,
  Zap,
} from "lucide-react";
import Logo from "@/components/company/Logo";

interface ProductsClientProps {
  company: any; // Use proper type
  companyProducts: Product[];
  categories: string[];
}

export default function ProductsClient({
  company,
  companyProducts,
  categories,
}: ProductsClientProps) {
  // --- GLOBAL STATE ---
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 md:px-0">
        {/* ... (Background elements kept same as your page.tsx) ... */}
        
        <div className="container-custom relative z-10">
           {/* ... (Breadcrumbs etc kept same) ... */}
           
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             <div className="flex-1 max-w-2xl text-center lg:text-left">
               {/* ... (Badges and Heading kept same) ... */}
               
               <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-[1.1] tracking-tight">
                Explore Our Premium <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-blue-600">
                  Pharmaceutical Range
                </span>
              </h1>

               <p className="text-neutral-500 text-base md:text-lg leading-relaxed mb-8 mx-auto lg:mx-0 max-w-lg">
                 Access <strong>{companyProducts.length}</strong> verified products...
               </p>

               {/* HERO SEARCH (Connected to State) */}
               <div className="w-full max-w-lg mx-auto lg:mx-0 relative z-20 mb-10">
                 <ProductSearch
                   variant="hero"
                   placeholder={`Search ${companyProducts.length} products...`}
                   value={searchQuery}
                   onChange={setSearchQuery}
                   scrollTargetId="product-gallery-anchor"
                 />
               </div>

               {/* ... (Stats Row kept same) ... */}
             </div>

             {/* ... (Right Content / 3D Card kept same) ... */}
             <div className="hidden lg:block relative w-[400px] h-[400px]">
                {/* Copy your 3D Card JSX here */}
                <div className="absolute inset-0 animate-float">
                   <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl border flex items-center justify-center">
                      <Logo src={company.logo} name={company.name} size={160} />
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-10 border-y border-neutral-200/60 bg-gradient-to-b from-white to-[#f8f9fa] relative mb-10">
         {/* ... (Marquee Header) ... */}
         <ProductMarquee products={companyProducts.slice(0, 10)} secondsPerItem={4} />
      </div>

      {/* --- MAIN GALLERY (Connected to State) --- */}
      <div className="min-h-[60vh] space-y-8 relative z-20">
        <ProductGallery 
           products={companyProducts} 
           categories={categories}
           searchQuery={searchQuery}
           setSearchQuery={setSearchQuery}
        />
      </div>

      {/* --- CTA CARD --- */}
      {/* ... (Copy your CTA Card JSX here) ... */}
    </>
  );
}
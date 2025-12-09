import React from "react";
import { Product, Company } from "@/types";
import { ShieldCheck, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

interface ProductHeroProps {
  product: Product;
  company?: Company;
}

export default function ProductHero({ product, company }: ProductHeroProps) {
  return (
    <div className="relative bg-gradient-hero-dark pt-12 pb-20 overflow-hidden border-b border-white/5">
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-[0.07] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Back Nav */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              {product.categories[0]}
            </span>
            {product.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4 text-shadow">
            {product.name}
          </h1>

          {/* Short Desc */}
          <p className="text-lg text-white/70 max-w-2xl font-medium leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

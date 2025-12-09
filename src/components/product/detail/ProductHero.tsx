import React from "react";
import { Product } from "@/types";
import { ShieldCheck, ArrowLeft, Star, Tag } from "lucide-react";
import Link from "next/link";

export default function ProductHero({ product }: { product: Product }) {
  return (
    <div className="relative bg-gradient-hero-dark pt-12 pb-24 overflow-hidden border-b border-white/5">
      {/* Background FX */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-[0.3] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Main Info */}
          <div className="max-w-3xl">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>

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

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4 text-shadow">
              {product.name}
            </h1>

            <p className="text-lg text-white/70 font-medium leading-relaxed line-clamp-2 max-w-2xl">
              {product.description}
            </p>
          </div>

          {/* Pricing Block in Banner */}
          <div className="hidden md:block text-right">
            <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[180px]">
              <div className="flex items-center justify-end gap-1.5 text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                <Tag className="w-3 h-3" />
                MRP / Price
              </div>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-3xl font-bold text-white">
                  ₹{product.pricing.minPrice}
                </span>
                <span className="text-sm text-white/60 font-medium">
                  / {product.pricing.unit}
                </span>
              </div>
              <p className="text-[10px] text-white/40 mt-1">Excl. of taxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

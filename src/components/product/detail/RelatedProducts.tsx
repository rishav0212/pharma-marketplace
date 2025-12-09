"use client";
import React from "react";
import { products } from "@/data/products";
import { Sparkles } from "lucide-react";
import ProductMarquee from "@/components/product/ProductMarquee";

export default function RelatedProducts({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  // Filter logic: Same category, not same product
  // Increased slice to 10 to make the marquee look populated
  const related = products
    .filter((p) => p.slug !== currentSlug && p.categories.includes(category))
    .slice(0, 10);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-neutral-200 bg-white overflow-hidden">
      <div className="container-custom mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[var(--brand-soft)] text-[var(--brand-primary)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-display text-2xl font-bold text-neutral-900">
            Similar Products
          </h2>
        </div>
      </div>

      {/* Reusing your existing Marquee Component */}
      <div className="-mx-4 md:mx-0">
        <ProductMarquee products={related} speed={50} />
      </div>
    </section>
  );
}

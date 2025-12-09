import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

export default function RelatedProducts({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  // Filter logic: Same category, not same product
  const related = products
    .filter((p) => p.slug !== currentSlug && p.categories.includes(category))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-neutral-200 bg-white">
      <div className="container-custom">
        <div className="flex items-center gap-2 mb-8">
          <div className="p-2 rounded-lg bg-[var(--brand-soft)] text-[var(--brand-primary)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-display text-2xl font-bold text-neutral-900">
            Similar Products
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

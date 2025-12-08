// src/components/company/ProductsSection.tsx
import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyProductsSectionProps {
  products: Product[];
  companyName: string;
}

export default function ProductsSection({
  products,
  companyName,
}: CompanyProductsSectionProps) {
  const displayProducts = products.slice(0, 6);
  const hasMore = products.length > 6;

  return (
    <motion.section
      id="products-section-inner"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--brand-soft)] flex items-center justify-center">
            <Package className="w-5 h-5 text-[var(--brand-primary)]" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
              Products
            </h2>
            <p className="text-xs text-neutral-500">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              listed
            </p>
          </div>
        </div>

        {hasMore && (
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1.5 text-[var(--brand-primary)] text-sm font-medium"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {displayProducts.length > 0 ? (
        <>
          {/* CHANGED: grid-cols-2 even on mobile, gap-3 for tighter spacing */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-3 md:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-[var(--brand-primary)] text-sm font-medium"
              >
                View all {products.length}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-[1.75rem] border border-dashed border-neutral-200 py-14 px-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[var(--brand-soft)] flex items-center justify-center">
            <Package className="w-8 h-8 text-[var(--brand-primary)]" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No products listed yet
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            {companyName} has not added their product catalogue. You can request
            it directly in your enquiry.
          </p>
        </div>
      )}
    </motion.section>
  );
}

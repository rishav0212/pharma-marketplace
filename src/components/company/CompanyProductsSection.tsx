// src/components/company/CompanyProductsSection.tsx
import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { Package, ArrowRight } from "lucide-react";

interface CompanyProductsSectionProps {
  products: Product[];
  companyName: string;
}

export default function CompanyProductsSection({
  products,
  companyName,
}: CompanyProductsSectionProps) {
  const displayProducts = products.slice(0, 6); // Show first 6
  const hasMore = products.length > 6;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Our Products
            </h2>
            <p className="text-sm text-neutral-500">
              {products.length} products available
            </p>
          </div>
        </div>

        {hasMore && (
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {displayProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 btn-primary"
              >
                View All {products.length} Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-neutral-200">
          <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No Products Yet
          </h3>
          <p className="text-neutral-500">
            {companyName} hasn't listed any products yet.
          </p>
        </div>
      )}
    </section>
  );
}

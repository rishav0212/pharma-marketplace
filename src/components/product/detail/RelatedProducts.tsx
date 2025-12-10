"use client";
import React, { useMemo } from "react";
import { products } from "@/data/products"; // Using all products
import ProductMarquee from "@/components/product/ProductMarquee"; // Using the Marquee for motion
import { Sparkles } from "lucide-react";
import { Product } from "@/types";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  
  // Logic: Calculate a "Relevance Score" for every product
  const related = useMemo(() => {
    // Helper to normalize composition strings into an array of ingredients
    const getIngredients = (p: Product) => {
      const ingredients: string[] = [];
      
      // 1. Check structured details
      if (p.details?.composition) {
        p.details.composition.forEach(item => ingredients.push(item.salt.toLowerCase()));
      } 
      // 2. Fallback to specifications string
      else {
        const spec = p.specifications.find(s => s.label.toLowerCase() === 'composition');
        if (spec) {
          // Split by '+' or ',' to get individual salts
          spec.value.toLowerCase().split(/[+,]/).forEach(s => ingredients.push(s.trim()));
        }
      }
      return ingredients;
    };

    const currentIngredients = getIngredients(currentProduct);

    return products
      .filter((p) => p.id !== currentProduct.id) 
      .map((p) => {
        let score = 0;
        const candidateIngredients = getIngredients(p);

        // --- SCORING ALGORITHM ---

        // 1. COMPOSITION MATCH (High Weight: +10 per matching ingredient)
        // If current product is "Amoxycillin + Clav", searching for others with same salts
        const sharedIngredients = currentIngredients.filter(i => 
          candidateIngredients.some(ci => ci.includes(i) || i.includes(ci))
        );
        if (sharedIngredients.length > 0) {
          score += (sharedIngredients.length * 10);
        }

        // 2. COMPANY MATCH (Medium Weight: +8)
        if (p.companyId === currentProduct.companyId) {
          score += 8;
        }

        // 3. DOSAGE FORM MATCH (Low Weight: +5)
        // e.g. Both are "Tablet" or "Injection"
        if (
          p.details?.form && 
          currentProduct.details?.form && 
          p.details.form === currentProduct.details.form
        ) {
          score += 5;
        }

        // 4. CATEGORY MATCH (Base Weight: +2)
        // Ensures we at least show something relevant if no direct matches exist
        const hasCategoryMatch = p.categories.some(c => currentProduct.categories.includes(c));
        if (hasCategoryMatch) {
          score += 2;
        }

        return { product: p, score };
      })
      // Filter out totally irrelevant items (score 0)
      .filter(item => item.score > 0)
      // Sort by highest score first
      .sort((a, b) => b.score - a.score)
      // Take top 10
      .slice(0, 10)
      .map(item => item.product);
      
  }, [currentProduct]);

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

      {/* Dynamic Scrolling List */}
      <div className="-mx-4 md:mx-0">
        <ProductMarquee products={related} secondsPerItem={4} />
      </div>
    </section>
  );
}
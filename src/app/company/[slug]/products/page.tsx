import React from "react";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import { products } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductMarquee from "@/components/product/ProductMarquee";
import CategoryMarquee from "@/components/product/CategoryMarquee"; // Imported!
import Link from "next/link";
import { ArrowLeft, Box, Sparkles } from "lucide-react";
import Image from "next/image";
import Logo from "@/components/company/Logo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AllProductsPage({ params }: PageProps) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  // 1. Fetch products for this company
  const companyProducts = products.filter((p) => p.companyId === company.id);

  // 2. Extract unique categories (Robust check for array or string)
  const allCategories = companyProducts.flatMap((p) => p.categories);
  const categories = Array.from(new Set(allCategories)).sort();

  // 3. Fallback brand color
  const brandColor = company.themeColor || "color-primary-200";

  return (
    <div
      style={
        {
          "--brand-primary": brandColor,
          "--brand-soft": `color-mix(in srgb, ${brandColor}, white 92%)`,
          "--brand-glow": `${brandColor}40`,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[#f8f9fa] selection:bg-[var(--brand-primary)] selection:text-white pb-20"
    >
      {/* Background Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- 1. COMPACT HEADER --- */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-neutral-200 sticky top-0 z-50 shadow-sm transition-all">
        <div className="container-custom py-3 px-4 md:px-0">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href={`/company/${slug}`}
              className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center hover:bg-[var(--brand-soft)] hover:text-[var(--brand-primary)] transition-all flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500" />
            </Link>

            {/* Logo & Name Combined */}
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Logo Avatar */}
              {/* <div className="relative w-9 h-9 shrink-0 rounded-lg border border-neutral-100 bg-white overflow-hidden"> */}
                <Logo
                  src={company.logo}
                  name={company.name}
                  size={45} // Slightly smaller for header
                />
              {/* </div> */}

              {/* Text Details */}
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-3 overflow-hidden">
                <h1 className="text-sm md:text-lg font-bold text-neutral-900 truncate">
                  {company.name}
                </h1>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="hidden md:inline">|</span>
                  <Box className="w-3.5 h-3.5" />
                  <p className="text-[10px] md:text-xs font-medium truncate">
                    Product Catalogue ({companyProducts.length} Items)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. HIGHLIGHTS MARQUEE --- */}
      <div className="py-6 border-b border-neutral-100 bg-gradient-to-b from-white to-[#f8f9fa] overflow-hidden">
        <div className="container-custom px-4 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--brand-primary)]" />
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400">
            Featured Collection
          </h2>
        </div>
        {/* Slower speed for premium feel */}
        <ProductMarquee products={companyProducts.slice(0, 10)} speed={80} />
      </div>

      {/* --- 3. CATEGORY MARQUEE --- */}
      <div className="mb-6">
        <CategoryMarquee categories={categories} speed={100} />
      </div>

      {/* --- 4. MAIN GALLERY (Search & Grid) --- */}
      <div className="container-custom relative z-10 px-2 md:px-0">
        <ProductGallery products={companyProducts} categories={categories} />
      </div>
    </div>
  );
}

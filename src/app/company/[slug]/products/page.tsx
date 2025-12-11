import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { companies } from "@/data/companies";
import { products } from "@/data/products";
import ProductsClient from "@/components/company/ProductClient";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import Logo from "@/components/company/Logo";

export async function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  if (!company) return { title: "Company Not Found" };

  return {
    title: `All Products | ${company.name} - Pharma Marketplace`,
    description: `Explore the complete pharmaceutical product catalogue of ${company.name}.`,
  };
}

export default async function AllProductsPage({ params }: PageProps) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  if (!company) notFound();

  // Filter data on the server first
  const companyProducts = products.filter((p) => p.companyId === company.id);
  const allCategories = companyProducts.flatMap((p) => p.categories);
  const categories = Array.from(new Set(allCategories)).sort();
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div
      style={
        {
          "--brand-primary": brandColor,
          "--brand-soft": `color-mix(in srgb, ${brandColor}, white 92%)`,
          "--brand-accent": `color-mix(in srgb, ${brandColor}, white 80%)`,
          "--brand-glow": `${brandColor}40`,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[#f8f9fa] selection:bg-[var(--brand-primary)] selection:text-white pb-20 overflow-x-hidden"
    >
      {/* --- FIXED HEADER (Keep outside to ensure stability) --- */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-neutral-200 z-[100] shadow-sm">
        <div className="container-custom py-3 px-4 md:px-0">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href={`/company/${slug}`}
              className="group w-9 h-9 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center hover:bg-[var(--brand-soft)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-current transition-colors" />
            </Link>

            <div className="flex items-center gap-3">
              <Logo
                src={company.logo}
                name={company.name}
                size={40}
                brandColor={company.themeColor}
              />
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                <h1 className="text-sm md:text-lg font-bold text-neutral-900">
                  {company.name}
                </h1>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="hidden md:inline w-1 h-1 rounded-full bg-neutral-300" />
                  <Box className="w-3.5 h-3.5" />
                  <p className="text-[10px] md:text-xs font-medium">
                    Product Catalogue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CLIENT CONTENT WRAPPER --- */}
      <ProductsClient
        company={company}
        companyProducts={companyProducts}
        categories={categories}
      />
    </div>
  );
}

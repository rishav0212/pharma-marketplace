"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link"; // For the back arrow if needed
import { Company, Product } from "@/types";
import {
  LayoutGrid,
  Info,
  Award,
  Factory,
  FileText,
  ArrowLeft,
} from "lucide-react";

// Components
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection";
import StatsGrid from "./StatsGrid";
import Certifications from "./Certifications";
import Infrastructure from "./Infrastructure";
import CategoryGrid from "@/components/product/CategoryGrid";
import CompanyHeader from "@/components/company/CompanyHeader";
import ContactModal from "@/components/company/EnquiryModal";
import StickyScrollNav from "@/components/common/StickyScrollNav"; // [!code ++]
import Logo from "./Logo"; // [!code ++]

interface Props {
  company: Company;
  products: Product[];
}

export default function ProfileLayout({ company, products }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 1. PREPARE DATA ---
  const { uniqueCategories, categoryCounts } = useMemo(() => {
    const categories = Array.from(
      new Set(products.flatMap((p) => p.categories))
    ).sort();

    const counts = products.reduce((acc, product) => {
      product.categories.forEach((cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return { uniqueCategories: categories, categoryCounts: counts };
  }, [products]);

  // --- 2. DEFINE SECTIONS ---
  const navSections = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "infrastructure", label: "Infrastructure", icon: Factory },
    // Conditionally add Category tab
    ...(uniqueCategories.length > 0
      ? [{ id: "categories", label: "Categories", icon: FileText }]
      : []),
    { id: "products", label: "Products", icon: LayoutGrid },
    ...(company.certifications?.length
      ? [{ id: "certifications", label: "Compliance", icon: Award }]
      : []),
  ];

  // --- 3. DEFINE BRAND ELEMENT FOR NAV ---
  const BrandNavElement = (
    <div className="flex items-center gap-2">
      {/* Optional Back Button inside the pill */}
      <Link
        href="/"
        className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-neutral-500" />
      </Link>

      {/* Company Logo & Name */}
      <div className="flex items-center gap-2 pl-1">
        <Logo
          src={company.logo}
          name={company.name}
          size={32}
          brandColor={company.themeColor}
        />
        <span className="font-bold text-xs text-neutral-900 whitespace-nowrap max-w-[100px] truncate hidden sm:block">
          {company.name}
        </span>
      </div>
    </div>
  );

  return (
    <div className="pb-24 relative">
      <CompanyHeader
        company={company}
        onContactClick={() => setIsModalOpen(true)}
      />

      <Hero company={company} />

      <div className="container-custom px-4 relative z-30">
        {/* --- REUSABLE NAV WITH BRANDING --- */}
        <StickyScrollNav
          sections={navSections}
          offset={140}
          brandElement={BrandNavElement}
          position="sticky"
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section id="overview" className="scroll-mt-40 space-y-6">
              <StatsGrid company={company} />
              <AboutSection company={company} />
            </section>

            <section
              id="infrastructure"
              className="scroll-mt-40 space-y-6 pt-2"
            >
              <Infrastructure />
            </section>

            {uniqueCategories.length > 0 && (
              <section
                id="categories"
                className="scroll-mt-40 pt-4 border-t border-dashed border-neutral-200"
              >
                <CategoryGrid
                  title="Our Manufacturing Range"
                  categories={uniqueCategories}
                  counts={categoryCounts}
                  basePath={`/company/${company.slug}/products`}
                  themeColor={company.themeColor}
                />
              </section>
            )}

            <section id="products" className="scroll-mt-40 space-y-4 pt-2">
              <ProductsSection
                products={products}
                companyName={company.name}
                slug={company.slug}
              />
            </section>

            {company.certifications && (
              <section
                id="certifications"
                className="scroll-mt-40 space-y-4 pt-4"
              >
                <Certifications certifications={company.certifications} />
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Sidebar company={company} onContactClick={() => setIsModalOpen} />
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={company}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Product, Company } from "@/types";
import {
  Activity,
  FlaskConical,
  Thermometer,
  FileText,
  Stethoscope,
  Info,
  ShieldPlus,
  Share2,
  BookOpen,
} from "lucide-react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// Components
import ProductHero from "@/components/product/detail/ProductHero";
import CompanyHeader from "@/components/company/CompanyHeader";
import RelatedProducts from "@/components/product/detail/RelatedProducts";
import AutoScrollGallery from "@/components/product/detail/AutoScrollGallery";
import ChemicalComposition from "@/components/product/detail/ChemicalComposition";
import InfoBlock from "@/components/product/detail/InfoBlock";
import EnquirySidebar from "@/components/product/detail/EnquirySidebar";
import ProductTabs from "@/components/product/detail/ProductTabs";

// Shared Components
import ContactModal from "@/components/company/ContactModal";
import ContactButton from "@/components/company/ContactButton";
import StickyScrollNav from "@/components/common/StickyScrollNav";
import { CheckCircle2 } from "lucide-react";
import CategoryGrid from "@/components/product/CategoryGrid";
import { products } from "@/data/products";

interface ProductDetailLayoutProps {
  product: Product;
  company: Company;
}

export default function ProductDetailLayout({
  product,
  company,
}: ProductDetailLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const details = product.details;

  // --- SCROLL LOGIC FOR WIDGET ---
  const { scrollY } = useScroll();
  const [showWidget, setShowWidget] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show widget after scrolling past the Hero section (approx 600px)
    const threshold = 600;
    if (latest > threshold && !showWidget) {
      setShowWidget(true);
    } else if (latest <= threshold && showWidget) {
      setShowWidget(false);
    }
  });

  const filteredSpecs = details?.composition
    ? product.specifications.filter(
        (s) => s.label.toLowerCase() !== "composition"
      )
    : product.specifications;

  // 1. Get filtered products for this company
  const companyProducts = products.filter((p) => p.companyId === company.id);

  // 2. Get Unique Categories
  const uniqueCategories = Array.from(
    new Set(companyProducts.flatMap((p) => p.categories))
  );

  // 3. (NEW) Calculate Counts
  const categoryCounts = companyProducts.reduce((acc, product) => {
    product.categories.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // --- NAVIGATION SETUP ---
  const staticSections = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "specs", label: "Specifications", icon: FileText },
    ...(details?.composition?.length
      ? [{ id: "composition", label: "Composition", icon: FlaskConical }]
      : []),
    { id: "clinical", label: "Clinical Info", icon: Stethoscope },
  ];

  const dynamicSections =
    product.customSections?.map((section, index) => ({
      id: `custom-${index}`,
      label: section.title,
      icon: BookOpen,
    })) || [];

  const navSections = [...staticSections, ...dynamicSections];

  // --- THEME DEFINITIONS ---
  const websiteStyle = {
    "--brand-primary": "#0ea5e9",
    "--brand-soft": "#f0f9ff",
    "--brand-accent": "#e0f2fe",
    "--brand-glow": "rgba(14, 165, 233, 0.15)",
  } as React.CSSProperties;

  const companyStyle = {
    "--brand-primary": company.themeColor || "#0ea5e9",
    "--brand-soft": `color-mix(in srgb, ${
      company.themeColor || "#0ea5e9"
    }, white 92%)`,
    "--brand-accent": `color-mix(in srgb, ${
      company.themeColor || "#0ea5e9"
    }, white 80%)`,
    "--brand-glow": `${company.themeColor || "#0ea5e9"}40`,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] selection:bg-neutral-900 selection:text-white"
      style={websiteStyle}
    >
      <CompanyHeader
        company={company}
        onContactClick={() => setIsModalOpen(true)}
      />

      <StickyScrollNav sections={navSections} offset={120} />
      <ProductHero product={product} />

      {/* --- DESKTOP FLOATING WIDGET (Bottom Right) --- */}
      {/* Replaces the top bar with a non-intrusive card */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-white/90 backdrop-blur-xl border border-neutral-200 p-4 rounded-2xl shadow-2xl shadow-neutral-900/10 max-w-[320px] flex-col gap-4"
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail */}
              <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-100 flex-shrink-0 overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-neutral-900 line-clamp-2 leading-snug">
                  {product.name}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                  By {company.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: company.themeColor || "#000" }}
            >
              Enquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="container-custom -mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div
            className="lg:col-span-5 xl:col-span-5 space-y-6 lg:sticky lg:top-24 h-fit self-start"
            style={companyStyle}
          >
            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-neutral-900/5 border border-white/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <AutoScrollGallery images={product.images || []} />
            </div>

            <div className="block">
              <EnquirySidebar
                company={company}
                productName={product.name}
                onContactClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8 min-h-screen">
            {/* Overview */}
            <div id="overview" className="scroll-mt-32">
              <div className="bg-white rounded-3xl border border-neutral-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--brand-soft)] text-[var(--brand-primary)]">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-neutral-900">
                    Product Overview
                  </h3>
                </div>
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div id="specs" className="scroll-mt-32">
              <InfoBlock title="Product Specifications" icon={FileText}>
                <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/30">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-neutral-100">
                      {filteredSpecs.map((spec, idx) => (
                        <tr
                          key={idx}
                          className="group hover:bg-white transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold text-neutral-500 w-1/3 group-hover:text-[var(--brand-primary)] transition-colors">
                            {spec.label}
                          </td>
                          <td className="py-4 px-6 font-medium text-neutral-900">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                      {details?.packaging && (
                        <tr className="group hover:bg-white transition-colors">
                          <td className="py-4 px-6 font-semibold text-neutral-500 w-1/3 group-hover:text-[var(--brand-primary)] transition-colors">
                            Packaging
                          </td>
                          <td className="py-4 px-6 font-medium text-neutral-900">
                            {details.packaging.type} ({details.packaging.size})
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </InfoBlock>
            </div>

            {/* Composition */}
            {details?.composition && details.composition.length > 0 && (
              <div id="composition" className="scroll-mt-32">
                <InfoBlock title="Active Composition" icon={FlaskConical}>
                  <ChemicalComposition ingredients={details.composition} />
                </InfoBlock>
              </div>
            )}

            {/* Clinical Info */}
            <div id="clinical" className="scroll-mt-32 space-y-8">
              {details?.indications && details.indications.length > 0 && (
                <InfoBlock title="Therapeutic Indications" icon={Activity}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.indications.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 hover:shadow-sm hover:bg-emerald-50 transition-all"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-neutral-700 font-medium text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </InfoBlock>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details?.dosage && (
                  <InfoBlock title="Dosage" icon={Stethoscope}>
                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-900 text-sm leading-relaxed font-medium">
                      {details.dosage}
                    </div>
                  </InfoBlock>
                )}
                {details?.storage && (
                  <InfoBlock title="Storage" icon={Thermometer}>
                    <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100 text-amber-900 text-sm font-medium">
                      {details.storage}
                    </div>
                  </InfoBlock>
                )}
              </div>

              {product.customSections?.map((section, idx) => (
                <div id={`custom-${idx}`} key={idx} className="scroll-mt-32">
                  <InfoBlock title={section.title} icon={ShieldPlus}>
                    <div className="prose prose-sm max-w-none text-neutral-600 whitespace-pre-line">
                      {section.content}
                    </div>
                  </InfoBlock>
                </div>
              ))}
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </div>

      <section className="container-custom">
        <CategoryGrid
          title={`Explore the Full Range by ${company.name}`}
          categories={uniqueCategories}
          counts={categoryCounts}
          basePath={`/company/${company.slug}/products`} // Links to this company's filtered page
          themeColor={company.themeColor}
        />
      </section>

      <RelatedProducts currentProduct={product} />

      {/* --- MOBILE STICKY FOOTER --- */}
      {/* Updated to include Product Name for context on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 flex flex-col gap-0 pb-safe">
        {/* Name Strip */}
        <div className="bg-neutral-50 px-4 py-1.5 border-b border-neutral-200 text-[10px] font-medium text-center text-neutral-500 truncate">
          Viewing:{" "}
          <span className="text-neutral-900 font-bold">{product.name}</span>
        </div>

        {/* Buttons */}
        <div className="p-3 flex gap-3">
          <button className="flex-1 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-100 active:scale-95 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <ContactButton
            fullWidth
            className="flex-[2]"
            brandColor={company.themeColor}
            onClick={() => setIsModalOpen(true)}
          >
            Send Enquiry
          </ContactButton>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={company}
        productName={product.name}
      />
    </div>
  );
}

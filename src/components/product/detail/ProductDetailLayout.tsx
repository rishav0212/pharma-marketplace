// "use client";

import React from "react";
import { Product, Company } from "@/types";
import {
  CheckCircle2,
  Activity,
  FlaskConical,
  Thermometer,
  TriangleAlert,
  FileText,
  Stethoscope,
} from "lucide-react";

import ProductHero from "@/components/product/detail/ProductHero";
import CompanyHeader from "@/components/company/CompanyHeader";
import RelatedProducts from "@/components/product/detail/RelatedProducts";
import AutoScrollGallery from "@/components/product/detail/AutoScrollGallery";
import ChemicalComposition from "@/components/product/detail/ChemicalComposition";
import InfoBlock from "@/components/product/detail/InfoBlock";
import EnquirySidebar from "@/components/product/detail/EnquirySidebar";
import ProductTabs from "@/components/product/detail/ProductTabs";

interface ProductDetailLayoutProps {
  product: Product;
  company: Company;
}

export default function ProductDetailLayout({ product, company }: ProductDetailLayoutProps) {
  const details = product.details;

  // SMART FILTER: If we have rich composition data, remove 'Composition' from the generic specs table
  const filteredSpecs = details?.composition
    ? product.specifications.filter((s) => s.label.toLowerCase() !== "composition")
    : product.specifications;

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-neutral-900 selection:text-white"
         style={{ "--brand-primary": company.themeColor || "#0ea5e9" } as React.CSSProperties}>
      
      {/* 1. STICKY COMPANY HEADER (Becomes the main nav on scroll) */}
      <CompanyHeader company={company} />

      {/* 2. HERO SECTION (Now includes Price) */}
      <ProductHero product={product} />

      {/* 3. MAIN CONTENT GRID */}
      <div className="container-custom -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white p-2 rounded-[1.5rem] shadow-lg shadow-neutral-900/5 border border-white/50">
              <AutoScrollGallery images={product.images || []} />
            </div>
            
            <EnquirySidebar company={company} productName={product.name} />
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-8 space-y-8 pt-4 lg:pt-0">
            
            {/* Rich Composition Visualizer */}
            {details?.composition && details.composition.length > 0 && (
              <InfoBlock title="Active Composition" icon={FlaskConical}>
                <ChemicalComposition ingredients={details.composition} />
              </InfoBlock>
            )}

            {/* Indications Grid */}
            {details?.indications && details.indications.length > 0 && (
              <InfoBlock title="Therapeutic Indications" icon={Activity}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.indications.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-neutral-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </InfoBlock>
            )}

            {/* Smart Specs Table (Filtered) */}
            <InfoBlock title="Product Specifications" icon={FileText}>
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-neutral-100">
                    {filteredSpecs.map((spec, idx) => (
                      <tr key={idx} className="group hover:bg-neutral-50/50">
                        <td className="py-3 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30">
                          {spec.label}
                        </td>
                        <td className="py-3 px-5 font-medium text-neutral-900">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    {details?.packaging && (
                       <tr className="group hover:bg-neutral-50/50">
                       <td className="py-3 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30">Packaging</td>
                       <td className="py-3 px-5 font-medium text-neutral-900">{details.packaging.type} ({details.packaging.size})</td>
                     </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </InfoBlock>

            {/* Dosage & Side Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.dosage && (
                <InfoBlock title="Dosage" icon={Stethoscope}>
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-900 text-sm">
                    {details.dosage}
                  </div>
                </InfoBlock>
              )}
              {details?.storage && (
                <InfoBlock title="Storage" icon={Thermometer}>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 text-sm">
                    {details.storage}
                  </div>
                </InfoBlock>
              )}
            </div>

            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts currentSlug={product.slug} category={product.categories[0]} />
    </div>
  );
}
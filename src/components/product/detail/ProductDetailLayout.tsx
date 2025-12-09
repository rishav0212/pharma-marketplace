"use client";

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
  Info,
  ShieldPlus, // Generic icon for custom sections
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

export default function ProductDetailLayout({
  product,
  company,
}: ProductDetailLayoutProps) {
  const details = product.details;

  // 1. FILTER SPECS: Prevent duplicate "Composition" row if visualizer exists
  const filteredSpecs = details?.composition
    ? product.specifications.filter(
        (s) => s.label.toLowerCase() !== "composition"
      )
    : product.specifications;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] selection:bg-neutral-900 selection:text-white"
      style={
        {
          "--brand-primary": company.themeColor || "#0ea5e9",
        } as React.CSSProperties
      }
    >
      {/* --- HEADER SECTION --- */}
      <CompanyHeader company={company} />
      <ProductHero product={product} />

      {/* --- MAIN CONTENT --- */}
      <div className="container-custom -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT SIDEBAR (Sticky Images & Action) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white p-2 rounded-[1.5rem] shadow-lg shadow-neutral-900/5 border border-white/50">
              <AutoScrollGallery images={product.images || []} />
            </div>
            <EnquirySidebar company={company} productName={product.name} />
          </div>

          {/* RIGHT CONTENT (Prioritized Information Flow) */}
          <div className="lg:col-span-8 space-y-8 pt-4 lg:pt-0">
            {/* PRIORITY 1: DESCRIPTION (The "Pitch") */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--brand-primary)]" />
                Product Overview
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>
            {/* PRIORITY 2: SPECIFICATIONS (The "Hard Data") */}
            <InfoBlock title="Product Specifications" icon={FileText}>
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-neutral-100">
                    {filteredSpecs.map((spec, idx) => (
                      <tr
                        key={idx}
                        className="group hover:bg-neutral-50/50 transition-colors"
                      >
                        <td className="py-3.5 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30 group-hover:bg-neutral-50">
                          {spec.label}
                        </td>
                        <td className="py-3.5 px-5 font-medium text-neutral-900">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    {/* Append Packaging if exists in details but not specs */}
                    {details?.packaging && (
                      <tr className="group hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30 group-hover:bg-neutral-50">
                          Packaging
                        </td>
                        <td className="py-3.5 px-5 font-medium text-neutral-900">
                          {details.packaging.type} ({details.packaging.size})
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </InfoBlock>
            {/* PRIORITY 3: COMPOSITION (The "Science") */}
            {details?.composition && details.composition.length > 0 && (
              <InfoBlock title="Active Composition" icon={FlaskConical}>
                <ChemicalComposition ingredients={details.composition} />
              </InfoBlock>
            )}
            {/* PRIORITY 4: INDICATIONS (The "Use Case") */}
            {details?.indications && details.indications.length > 0 && (
              <InfoBlock title="Therapeutic Indications" icon={Activity}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.indications.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-[var(--brand-primary)]/30 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </InfoBlock>
            )}
            {/* PRIORITY 5: DYNAMIC CUSTOM SECTIONS (Flexibility) */}
            {/* If product has 'customSections', render them here using InfoBlock */}
            {/* @ts-ignore - Assuming you might add this field to your types later */}
            {/* PRIORITY 6: USAGE & SAFETY (The "Fine Print") */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.dosage && (
                <InfoBlock title="Dosage" icon={Stethoscope}>
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-900 text-sm leading-relaxed">
                    <strong>Recommended:</strong> {details.dosage}
                  </div>
                </InfoBlock>
              )}
              {details?.storage && (
                <InfoBlock title="Storage" icon={Thermometer}>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-medium">
                    {details.storage}
                  </div>
                </InfoBlock>
              )}
            </div>
            {/* Side Effects (Collapsible or Block) */}
            {details?.sideEffects && details.sideEffects.length > 0 && (
              <InfoBlock title="Potential Side Effects" icon={TriangleAlert}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {details.sideEffects.map((effect, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-neutral-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </InfoBlock>
            )}{" "}
            {product.customSections?.map((section: any, idx: number) => (
              <InfoBlock
                key={idx}
                title={section.title}
                icon={ShieldPlus} // Generic icon, or you can map specific icons based on title
              >
                <div className="prose prose-sm max-w-none text-neutral-600 whitespace-pre-line">
                  {section.content}
                </div>
              </InfoBlock>
            ))}
            {/* Footer: Extended Details Tab (Pharmacology, etc.) */}
            {/* Kept at bottom for deep readers */}
            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts
        currentProduct={product}
      />
    </div>
  );
}

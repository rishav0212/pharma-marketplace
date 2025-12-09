import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { companies } from "@/data/companies";
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const company = companies.find((c) => c.id === product.companyId);
  const details = product.details;

  return (
    <main
      className="min-h-screen bg-[#F8FAFC] selection:bg-neutral-900 selection:text-white"
      style={{ "--brand-primary": "#0ea5e9" } as React.CSSProperties}
    >
      {/* 1. COMPANY CONTEXT HEADER */}
      {company && <CompanyHeader company={company} />}

      {/* 2. REDUCED HERO */}
      <ProductHero product={product} company={company} />

      {/* 3. MAIN CONTENT GRID */}
      <div className="container-custom -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* --- LEFT SIDEBAR (Sticky Command Center) --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <div className="bg-white p-2 rounded-[1.5rem] shadow-lg shadow-neutral-900/5 border border-white/50">
              <AutoScrollGallery images={product.images || []} />
            </div>

            {/* Price Card (Visible on Desktop Sidebar) */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
                List Price
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-neutral-900">
                  ₹{product.pricing.minPrice}
                </span>
                <span className="text-sm text-neutral-500 font-medium">
                  / {product.pricing.unit}
                </span>
              </div>
            </div>

            {company && (
              <EnquirySidebar company={company} productName={product.name} />
            )}
          </div>

          {/* --- RIGHT CONTENT (Scrollable Dossier) --- */}
          <div className="lg:col-span-8 space-y-8 pt-4 lg:pt-0">
            {/* Composition */}
            {details?.composition && details.composition.length > 0 && (
              <InfoBlock title="Active Composition" icon={FlaskConical}>
                <ChemicalComposition ingredients={details.composition} />
              </InfoBlock>
            )}

            {/* Indications */}
            {details?.indications && details.indications.length > 0 && (
              <InfoBlock title="Therapeutic Indications" icon={Activity}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.indications.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 transition-colors hover:bg-white hover:border-blue-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-neutral-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </InfoBlock>
            )}

            {/* Technical Specs */}
            <InfoBlock title="Product Specifications" icon={FileText}>
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-neutral-100">
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className="group hover:bg-neutral-50/50">
                        <td className="py-3 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30">
                          {spec.label}
                        </td>
                        <td className="py-3 px-5 font-medium text-neutral-900">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                    {details?.shelfLife && (
                      <tr className="group hover:bg-neutral-50/50">
                        <td className="py-3 px-5 font-semibold text-neutral-500 w-1/3 bg-neutral-50/30">
                          Shelf Life
                        </td>
                        <td className="py-3 px-5 font-medium text-neutral-900">
                          {details.shelfLife}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </InfoBlock>

            {/* Dosage */}
            {details?.dosage && (
              <InfoBlock title="Dosage & Administration" icon={Stethoscope}>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-900 text-sm leading-relaxed">
                  <strong>Recommended:</strong> {details.dosage}
                </div>
              </InfoBlock>
            )}

            {/* Side Effects & Storage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details?.sideEffects && details.sideEffects.length > 0 && (
                <InfoBlock title="Potential Side Effects" icon={TriangleAlert}>
                  <ul className="space-y-2">
                    {details.sideEffects.map((effect, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-neutral-600 bg-neutral-50 p-2 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                </InfoBlock>
              )}

              {details?.storage && (
                <InfoBlock title="Storage" icon={Thermometer}>
                  <p className="text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    {details.storage}
                  </p>
                </InfoBlock>
              )}
            </div>

            {/* Description Tab (If rich text is needed) */}
            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      {/* 4. RELATED PRODUCTS */}
      <RelatedProducts
        currentSlug={product.slug}
        category={product.categories[0]}
      />
    </main>
  );
}

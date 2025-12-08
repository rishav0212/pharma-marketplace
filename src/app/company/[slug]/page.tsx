import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Users,
  Calendar,
  Award,
  ArrowRight,
  Package,
} from "lucide-react";

import { companies } from "@/data/companies";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import CompanySidebar from "@/components/company/CompanySidebar";

// --- HELPERS ---
function getBrandColors(hex: string) {
  const color = hex || "#0ea5e9";
  return {
    "--brand-color": color,
    "--brand-color-light": `${color}15`, // Light bg for badges
  } as React.CSSProperties;
}

export async function generateStaticParams() {
  return companies.map((company) => ({ slug: company.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  const companyProducts = products.filter((p) => p.companyId === company.id);
  const featuredProducts = companyProducts.slice(0, 4); // Show top 4 only

  return (
    <main
      className="min-h-screen bg-neutral-50 pb-20"
      style={getBrandColors(company.themeColor || "")}
    >
      {/* 1. Immersive Cover Header */}
      <div className="relative h-[280px] md:h-[320px] w-full bg-neutral-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${
              company.coverImage || "/images/defaults/company-cover.jpg"
            })`,
            backgroundColor: "#0f172a",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-6 left-0 w-full z-10">
          <div className="container-custom">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Companies
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="container-custom relative -mt-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: Sticky Sidebar (3 Cols) --- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <CompanySidebar company={company} />
          </div>

          {/* --- RIGHT: Main Content (9 Cols) --- */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 mt-4 lg:mt-32">
            {/* A. Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Products",
                  value: company.stats.products + "+",
                  icon: Package,
                },
                {
                  label: "Experience",
                  value: company.stats.yearsInBusiness + " Yrs",
                  icon: Calendar,
                },
                {
                  label: "Employees",
                  value: company.stats.employees || "N/A",
                  icon: Users,
                },
                {
                  label: "Est. Year",
                  value: new Date(company.createdAt).getFullYear(),
                  icon: Building2,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center hover:border-[var(--brand-color)] transition-colors group"
                >
                  <stat.icon className="w-5 h-5 text-neutral-400 mb-2 group-hover:text-[var(--brand-color)] transition-colors" />
                  <div className="font-bold text-lg text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* B. About Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[var(--brand-color)] rounded-full"></span>
                About Company
              </h2>
              <div className="prose prose-neutral max-w-none text-neutral-600">
                <p className="leading-relaxed text-lg">{company.description}</p>
              </div>

              {/* Certifications Mini-Grid */}
              {company.certifications.length > 0 && (
                <div className="mt-8 pt-8 border-t border-neutral-100">
                  <h3 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wide">
                    Accreditations
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {company.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg hover:border-[var(--brand-color)] transition-colors"
                      >
                        <Award className="w-4 h-4 text-[var(--brand-color)]" />
                        <span className="font-medium text-neutral-700 text-sm">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* C. Featured Products (Top 4 Only) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-neutral-900 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[var(--brand-color)] rounded-full"></span>
                  Featured Products
                </h2>
                {/* Desktop "View All" Link */}
                <Link
                  href="#"
                  className="hidden sm:flex items-center gap-2 text-[var(--brand-color)] font-medium hover:underline transition-all"
                >
                  View All Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {featuredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}

                  {/* "View All" Card */}
                  <div className="h-full min-h-[350px] rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-center p-6 hover:border-[var(--brand-color)] hover:bg-[var(--brand-color-light)] transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-8 h-8 text-[var(--brand-color)]" />
                    </div>
                    <h3 className="font-bold text-lg text-neutral-900 mb-1">
                      View Full Catalog
                    </h3>
                    <p className="text-sm text-neutral-500 max-w-[200px]">
                      See all {companyProducts.length} products from{" "}
                      {company.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 border-dashed">
                  <p className="text-neutral-500">
                    No products listed by this company yet.
                  </p>
                </div>
              )}

              {/* Mobile View All Button */}
              <div className="mt-6 sm:hidden">
                <button className="w-full py-3 rounded-lg font-medium border border-neutral-200 text-neutral-700 hover:text-[var(--brand-color)] hover:border-[var(--brand-color)] transition-colors">
                  View All Products
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

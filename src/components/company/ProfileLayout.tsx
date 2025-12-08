// src/components/company/ModernProfileLayout.tsx
"use client";
import React, { useState } from "react";
import { Company, Product } from "@/types";
import ModernCompanyHero from "./Hero";
import ModernSidebar from "./Sidebar";
import CompanyAboutSection from "./AboutSection";
import CompanyProductsSection from "./ProductsSection";
import CompanyStatsGrid from "./StatsGrid";
import { LayoutGrid, Info, Award, MessageSquare } from "lucide-react";

interface Props {
  company: Company;
  products: Product[];
}

export default function ProfileLayout({ company, products }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "products", label: "Products", icon: LayoutGrid },
    { id: "certifications", label: "Certifications", icon: Award },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      // 100px offset for the sticky header
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="bg-[#F8F9FC] min-h-screen pb-20">
      {/* 1. Hero Section */}
      <ModernCompanyHero company={company} />

      <div className="container-custom px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-8">
            {/* Sticky Floating Navigation Pill */}
            <div className="sticky top-20 z-40 mb-8 flex justify-start md:justify-center pointer-events-none">
              <div className="inline-flex items-center p-1.5 bg-white/90 backdrop-blur-lg border border-white/50 rounded-full shadow-lg shadow-neutral-200/40 pointer-events-auto overflow-x-auto max-w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap
                        ${
                          isActive
                            ? "bg-neutral-900 text-white shadow-md transform scale-105"
                            : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                        }
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-neutral-400"
                        }`}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-16">
              {/* Overview Section */}
              <div
                id="overview"
                className="scroll-mt-32 space-y-10 animate-fade-in"
              >
                <CompanyStatsGrid company={company} />

                <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-soft)] flex items-center justify-center">
                      <Info className="w-5 h-5 text-[var(--brand-primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      About {company.name}
                    </h2>
                  </div>
                  <CompanyAboutSection company={company} />
                </div>
              </div>

              {/* Products Section */}
              <div id="products" className="scroll-mt-32 pt-4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">
                      Product Catalog
                    </h2>
                    <p className="text-neutral-500 mt-1">
                      Explore {products.length} premium pharmaceuticals
                    </p>
                  </div>
                  <button className="hidden md:flex items-center gap-2 text-[var(--brand-primary)] font-bold hover:underline decoration-2 underline-offset-4">
                    View All <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
                <CompanyProductsSection
                  products={products}
                  companyName={company.name}
                />
              </div>

              {/* Optional: Add Certifications visually here if needed */}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <ModernSidebar company={company} />
          </div>
        </div>
      </div>
    </main>
  );
}

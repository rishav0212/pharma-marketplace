// src/components/company/ProfileLayout.tsx
"use client";
import React, { useState } from "react";
import { Company, Product } from "@/types";
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection";
import StatsGrid from "./StatsGrid";
import Certifications from "./Certifications";
import Infrastructure from "./Infrastructure";
// import FAQ from "./FAQ";
import { LayoutGrid, Info, Award, Factory } from "lucide-react";

interface Props {
  company: Company;
  products: Product[];
}

export default function ProfileLayout({ company, products }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "infrastructure", label: "Infrastructure", icon: Factory },
    { id: "products", label: "Products", icon: LayoutGrid },
    { id: "certifications", label: "Compliance", icon: Award },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <Hero company={company} />

      <div className="container-custom px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-8">
            {/* Sticky Navigation Pills */}
            <div className="sticky top-20 z-40 mb-8 -mx-4 px-4 md:mx-0 md:px-0 pointer-events-none">
              <div className="inline-flex bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-neutral-200/60 shadow-lg shadow-neutral-200/20 pointer-events-auto overflow-x-auto max-w-full no-scrollbar">
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
                            ? "bg-[var(--brand-primary)] text-white shadow-md transform scale-105"
                            : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-12">
              {/* Overview */}
              <div
                id="overview"
                className="scroll-mt-32 space-y-8 animate-fade-in"
              >
                <StatsGrid company={company} />
                <AboutSection company={company} />
              </div>

              {/* Infrastructure */}
              <div
                id="infrastructure"
                className="scroll-mt-32 animate-slide-up"
              >
                <Infrastructure />
              </div>

              {/* Products */}
              <div
                id="products"
                className="scroll-mt-32 pt-4 border-t border-neutral-200"
              >
                <ProductsSection
                  products={products}
                  companyName={company.name}
                />
              </div>

              {/* Certifications */}
              <div id="certifications" className="scroll-mt-32 pt-4">
                <Certifications certifications={company.certifications} />
              </div>

              {/* FAQ Section */}
              {/* <FAQ companyName={company.name} /> */}
            </div>
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            <Sidebar company={company} />
            {/* Cleaned: Removed Download List CTA */}
          </div>
        </div>
      </div>
    </main>
  );
}

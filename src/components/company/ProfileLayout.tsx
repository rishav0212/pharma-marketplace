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
import { LayoutGrid, Info, Award, Factory } from "lucide-react";
import { motion } from "framer-motion";

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
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="pb-24">
      <Hero company={company} />

      <div className="container-custom px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="sticky top-20 z-30 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="inline-flex max-w-full overflow-x-auto no-scrollbar rounded-full bg-white/80 backdrop-blur-xl border border-neutral-100 shadow-[0_14px_35px_rgba(15,23,42,0.08)] p-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-[var(--brand-primary)] text-white shadow-[0_10px_25px_rgba(15,23,42,0.22)]"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-10">
              {/* Overview */}
              <section id="overview" className="scroll-mt-32 space-y-6">
                <StatsGrid company={company} />
                <AboutSection company={company} />
              </section>

              {/* Infrastructure */}
              <section
                id="infrastructure"
                className="scroll-mt-32 space-y-6 pt-2"
              >
                <Infrastructure />
              </section>

              {/* Products */}
              <section
                id="products"
                className="scroll-mt-32 space-y-4 pt-4 border-t border-neutral-200/70"
              >
                <ProductsSection
                  products={products}
                  companyName={company.name}
                />
              </section>

              {/* Certifications */}
              {company.certifications && (
                <section
                  id="certifications"
                  className="scroll-mt-32 space-y-4 pt-4"
                >
                  <Certifications certifications={company.certifications} />
                </section>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Sidebar company={company} />
          </div>
        </div>
      </div>
    </main>
  );
}

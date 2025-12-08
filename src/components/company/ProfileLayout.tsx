// src/components/company/ProfileLayout.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Company, Product } from "@/types";
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import AboutSection from "./AboutSection";
import ProductsSection from "./ProductsSection";
import StatsGrid from "./StatsGrid";
import Certifications from "./Certifications";
import Infrastructure from "./Infrastructure";
import { LayoutGrid, Info, Award, Factory, ArrowLeft } from "lucide-react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Logo from "./Logo";

interface Props {
  company: Company;
  products: Product[];
}

export default function ProfileLayout({ company, products }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 300;
    if (latest > threshold && !isScrolled) setIsScrolled(true);
    if (latest <= threshold && isScrolled) setIsScrolled(false);
  });

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
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="pb-24 relative">
      <Hero company={company} />

      {/* Sticky Smart Navigation */}
      <div className="sticky top-2 md:top-6 z-40 mb-6 pointer-events-none">
        <div className="container-custom flex justify-start items-center gap-2 md:gap-3">
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -10 }}
                className="pointer-events-auto"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-md text-neutral-600 hover:text-neutral-900 hover:scale-105 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="pointer-events-auto inline-flex items-center gap-1 p-1 md:p-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-neutral-200/60 shadow-lg shadow-black/5 max-w-full overflow-hidden"
          >
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ width: 0, opacity: 0, paddingRight: 0 }}
                  animate={{ width: "auto", opacity: 1, paddingRight: 8 }}
                  exit={{ width: 0, opacity: 0, paddingRight: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="flex items-center gap-2 md:gap-3 overflow-hidden border-r border-neutral-200 pl-1 md:pl-2"
                >
                  {/* <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full border border-neutral-100 bg-white overflow-hidden"> */}
                    <Logo
                      src={company.logo}
                      name={company.name}
                      size={45} // Adjust size as needed
                    />
                  {/* </div> */}
                  <span className="font-bold text-xs md:text-sm text-neutral-900 whitespace-nowrap max-w-[120px] truncate hidden sm:block">
                    {company.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-sm font-medium transition-all whitespace-nowrap relative flex-shrink-0 ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: "var(--brand-primary)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <Icon
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 relative z-10 ${
                        isActive ? "text-white" : ""
                      }`}
                    />
                    <span
                      className={`relative z-10 ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom px-4 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section id="overview" className="scroll-mt-32 space-y-6">
              <StatsGrid company={company} />

              <AboutSection company={company} />
            </section>

            <section
              id="infrastructure"
              className="scroll-mt-32 space-y-6 pt-2"
            >
              <Infrastructure />
            </section>

            <section
              id="products"
              className="scroll-mt-32 space-y-4 pt-4 border-t border-dashed border-neutral-200"
            >
              <ProductsSection
                products={products}
                companyName={company.name}
                slug={company.slug}
              />
            </section>

            {company.certifications && (
              <section
                id="certifications"
                className="scroll-mt-32 space-y-4 pt-4"
              >
                <Certifications certifications={company.certifications} />
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Sidebar company={company} />
          </div>
        </div>
      </div>
    </main>
  );
}

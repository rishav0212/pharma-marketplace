// src/components/company/ProfileLayout.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
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

interface Props {
  company: Company;
  products: Product[];
}

export default function ProfileLayout({ company, products }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Detect scroll to toggle the "Mini Brand" header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 350;
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
    <main className="pb-24">
      <Hero company={company} />

      {/* --- STICKY SMART NAVIGATION (Left Aligned & Top Positioned) --- */}
      {/* Changed top-[80px] to top-6 for proper 'Minisite' feel since main nav scrolls away */}
      <div className="sticky top-6 z-40 mb-8 pointer-events-none">
        <div className="container-custom flex justify-start items-center gap-3">
          {/* Back Button (Appears when scrolled) */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -20 }}
                className="pointer-events-auto"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-sm text-neutral-500 hover:text-neutral-900 hover:scale-105 transition-all"
                  title="Back to Marketplace"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="pointer-events-auto inline-flex items-center gap-1 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            {/* Collapsible Brand Section */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ width: 0, opacity: 0, paddingRight: 0 }}
                  animate={{ width: "auto", opacity: 1, paddingRight: 12 }}
                  exit={{ width: 0, opacity: 0, paddingRight: 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="flex items-center gap-3 overflow-hidden border-r border-neutral-200 pl-2"
                >
                  <div className="relative w-8 h-8 shrink-0 rounded-full border border-neutral-100 bg-white overflow-hidden">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-[10px] font-bold">
                        {company.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-sm text-neutral-900 whitespace-nowrap max-w-[150px] truncate hidden md:block">
                    {company.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[70vw] md:max-w-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap relative ${
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
                      className={`w-4 h-4 relative z-10 ${
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

      {/* --- MAIN CONTENT --- */}
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT COLUMN CONTENT */}
          <div className="lg:col-span-8 space-y-10">
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
              className="scroll-mt-32 space-y-4 pt-4 border-t border-dashed border-neutral-200"
            >
              <ProductsSection products={products} companyName={company.name} />
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

          {/* RIGHT COLUMN SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <Sidebar company={company} />
          </div>
        </div>
      </div>
    </main>
  );
}

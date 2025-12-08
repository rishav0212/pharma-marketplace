// src/components/company/CompanyProfileLayout.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Company, Product } from "@/types";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import CompanyHeroSection from "./CompanyHero";
import CompanyInfoCard from "./CompanyInfoCard";
import CompanyAboutSection from "./CompanyAboutSection";
import CompanyProductsSection from "./CompanyProductsSection";
import CompanyCertifications from "./CompanyCertifications";
import CompanyStats from "./CompanyStatsGrid";

interface CompanyProfileLayoutProps {
  company: Company;
  products: Product[];
}

export default function CompanyProfileLayout({
  company,
  products,
}: CompanyProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <CompanyHeroSection company={company} />

      {/* Sticky Navigation */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "about", label: "Overview" },
                { id: "products", label: `Products (${products.length})` },
                { id: "certifications", label: "Certifications" },
                { id: "contact", label: "Contact" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    document
                      .getElementById(tab.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`text-sm font-semibold whitespace-nowrap pb-1 border-b-2 transition-colors ${
                    activeSection === tab.id
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Sticky Info Card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <CompanyInfoCard company={company} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Grid */}
            <CompanyStats company={company} />

            {/* About Section */}
            <div id="about">
              <CompanyAboutSection company={company} />
            </div>

            {/* Certifications */}
            {company.certifications.length > 0 && (
              <div id="certifications">
                <CompanyCertifications
                  certifications={company.certifications}
                />
              </div>
            )}

            {/* Products Section */}
            <div id="products">
              <CompanyProductsSection
                products={products}
                companyName={company.name}
              />
            </div>

            {/* Contact Section */}
            <div
              id="contact"
              className="bg-white rounded-2xl border border-neutral-200 p-8"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-neutral-600 mb-6">
                Interested in our products? Contact us for pricing, bulk orders,
                or franchise opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`mailto:${company.contact.email}`}
                  className="btn-primary flex-1 md:flex-none text-center"
                >
                  Send Email
                </Link>
                <Link
                  href={`tel:${company.contact.phone}`}
                  className="btn-ghost flex-1 md:flex-none text-center border border-neutral-300"
                >
                  Call Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

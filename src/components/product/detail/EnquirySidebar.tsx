"use client";
import React from "react";
import { Company } from "@/types";
import Logo from "@/components/company/Logo";
import Link from "next/link";
import EnquiryForm from "@/components/company/EnquiryForm"; // Verified import path
import { MapPin, Building2, ShieldCheck } from "lucide-react";

export default function EnquirySidebar({
  company,
  productName,
}: {
  company: Company;
  productName: string;
}) {
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div className="space-y-6">
      {/* 1. SUPPLIER IDENTITY BADGE (Simplified) 
          - Removed 'View Profile' button (Redundant with Header)
          - Kept Logo & Name for context 
      */}
      {/* <Link
        href={`/company/${company.slug}`}
        className="block bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm relative overflow-hidden group hover:border-[var(--s-color)] transition-colors"
        style={{ "--s-color": brandColor } as React.CSSProperties}
      > */}
        {/* Brand Accent Bar */}
        {/* <div
          className="absolute top-0 inset-x-0 h-1 transition-opacity opacity-50 group-hover:opacity-100"
          style={{ backgroundColor: brandColor }}
        />

        <div className="flex items-center gap-4 pt-1">
          <div className="shrink-0">
            <Logo
              src={company.logo}
              name={company.name}
              size={48} // Slightly smaller for compactness
              className="shadow-sm border border-neutral-100"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              Sold By
            </div>
            <div className="block font-display font-bold text-sm text-neutral-900 truncate group-hover:text-[var(--s-color)] transition-colors leading-tight">
              {company.name}
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
              <MapPin className="w-3 h-3" />
              {company.location.city}, {company.location.state}
            </div>
          </div>
        </div>
      </Link> */}

      {/* 2. ENQUIRY FORM CARD (Primary Action) */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xl shadow-neutral-900/5">
        <h3 className="font-bold text-neutral-900 mb-4 text-base">
          Contact Supplier
        </h3>

        <EnquiryForm
          productName={productName}
          companyName={company.name}
          brandColor={brandColor}
          variant="sidebar"
        />

        <div className="mt-4 pt-4 border-t border-dashed border-neutral-100 flex gap-2 text-[10px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <p>Verified Supplier. Direct connection.</p>
        </div>
      </div>
    </div>
  );
}

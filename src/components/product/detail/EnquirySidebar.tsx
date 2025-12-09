"use client";
import React from "react";
import { Company } from "@/types";
import Logo from "@/components/company/Logo";
import Link from "next/link";
import EnquiryForm from "@/components/company/EnquiryForm";
import { ArrowRight, MapPin, Building2, ShieldCheck } from "lucide-react";

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
      {/* 1. SUPPLIER CARD (Top Priority) */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm relative overflow-hidden group">
        {/* Brand Accent Bar */}
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ backgroundColor: brandColor }}
        />

        <div className="flex items-start gap-4 mb-4 pt-2">
          <Link href={`/company/${company.slug}`} className="shrink-0">
            <Logo
              src={company.logo}
              name={company.name}
              size={56}
              className="shadow-sm border border-neutral-100"
            />
          </Link>
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              Manufacturer
            </div>
            <Link
              href={`/company/${company.slug}`}
              className="block font-display font-bold text-base text-neutral-900 truncate hover:text-[var(--s-color)] transition-colors leading-tight"
              style={{ "--s-color": brandColor } as React.CSSProperties}
            >
              {company.name}
            </Link>
            <div className="flex items-center gap-1 text-xs text-neutral-500 mt-1">
              <MapPin className="w-3 h-3" />
              {company.location.city}, {company.location.state}
            </div>
          </div>
        </div>

        <Link
          href={`/company/${company.slug}`}
          className="flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide bg-neutral-50 text-neutral-600 border border-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 transition-all gap-1"
        >
          View Profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 2. ENQUIRY FORM CARD */}
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

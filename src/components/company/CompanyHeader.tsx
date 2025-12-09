"use client";
import React from "react";
import Link from "next/link";
import { Company } from "@/types";
import Logo from "./Logo";
import { Store, CheckCircle2, User, Phone } from "lucide-react";
import ContactButton from "./ContactButton";

export default function CompanyHeader({
  company,
  onContactClick, // Optional prop for external control
}: {
  company: Company;
  onContactClick?: () => void;
}) {
  return (
    <div className="border-b border-neutral-200 bg-white/80 backdrop-blur-xl sticky top-0 z-40 transition-all supports-[backdrop-filter]:bg-white/60">
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Left: Identity */}
        <div className="flex items-center gap-4">
          <Link
            href={`/company/${company.slug}`}
            className="flex items-center gap-3 group"
          >
            <div className="p-0.5 rounded-lg border border-neutral-100 shadow-sm bg-white group-hover:scale-105 transition-transform duration-300">
              <Logo src={company.logo} name={company.name} size={36} />
            </div>
            <div>
              <span className="block text-sm font-bold text-neutral-900 leading-tight group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1 max-w-[150px] sm:max-w-none">
                {company.name}
              </span>
              {company.verified && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Verified Supplier</span>
                  <span className="sm:hidden">Verified</span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hidden on Mobile as requested */}
          <Link
            href={`/company/${company.slug}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            Profile
          </Link>

          <Link
            href={`/company/${company.slug}/products`}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            Products
          </Link>

          <div className="w-px h-6 bg-neutral-200 hidden md:block" />

          {/* Contact Button - triggers modal if prop provided */}
          <div className="hidden sm:block">
            <ContactButton
              variant="primary"
              brandColor={company.themeColor}
              onClick={onContactClick}
              className="!py-2 !px-4 !text-xs !rounded-lg"
            >
              <span className="hidden lg:inline">Contact Supplier</span>
              <span className="lg:hidden">Contact</span>
            </ContactButton>
          </div>

          {/* Mobile Only Contact Icon (if needed in header, otherwise footer handles it) */}
          <button
            onClick={onContactClick}
            className="sm:hidden w-9 h-9 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Company } from "@/types";
import Logo from "./Logo";
import { ChevronRight, Store, CheckCircle2, User, Phone } from "lucide-react";

export default function CompanyHeader({ company }: { company: Company }) {
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    // Changed top-16 to top-0 since main navbar is relative (scrolls away)
    <div className="border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-all">
      <div className="container-custom py-2.5 flex items-center justify-between">
        {/* Left: Identity */}
        <div className="flex items-center gap-4">
          <Link
            href={`/company/${company.slug}`}
            className="flex items-center gap-3 group"
          >
            <div className="p-0.5 rounded-lg border border-neutral-100 shadow-sm bg-white">
              <Logo src={company.logo} name={company.name} size={32} />
            </div>
            <div>
              <span className="block text-sm font-bold text-neutral-900 leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                {company.name}
              </span>
              {company.verified && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Supplier
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href={`/company/${company.slug}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            Profile
          </Link>

          <Link
            href={`/company/${company.slug}/products`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            Products
          </Link>

          <div className="w-px h-6 bg-neutral-200 hidden md:block" />

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: brandColor }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact Supplier</span>
            <span className="sm:hidden">Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}

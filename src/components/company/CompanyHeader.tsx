import React from "react";
import Link from "next/link";
import { Company } from "@/types";
import Logo from "./Logo";
import { ChevronRight, Store, CheckCircle2 } from "lucide-react";

export default function CompanyHeader({ company }: { company: Company }) {
  return (
    <div className="border-b border-neutral-200 bg-white sticky top-16 z-30 hidden md:block">
      <div className="container-custom py-2 flex items-center justify-between">
        {/* Left: Breadcrumb-ish Company Link */}
        <div className="flex items-center gap-3">
          <Link
            href={`/company/${company.slug}`}
            className="flex items-center gap-2 group"
          >
            <div className="p-0.5 rounded-lg border border-neutral-100 shadow-sm bg-white">
              <Logo src={company.logo} name={company.name} size={28} />
            </div>
            <span className="text-sm font-bold text-neutral-700 group-hover:text-[var(--brand-primary)] transition-colors">
              {company.name}
            </span>
          </Link>

          {company.verified && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 border border-blue-100">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
          <Link
            href={`/company/${company.slug}/products`}
            className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            More from this supplier
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

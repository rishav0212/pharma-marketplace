import React from "react";
import { Company } from "@/types";
import { Building2, Award, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/company/Logo";

export default function AboutManufacturer({ company }: { company: Company }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-neutral-400" />
          About the Manufacturer
        </h3>
        <Link
          href={`/company/${company.slug}`}
          className="text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1"
        >
          Visit Profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href={`/company/${company.slug}`} className="shrink-0">
          <Logo
            src={company.logo}
            name={company.name}
            size={80}
            className="shadow-sm border border-neutral-100"
            brandColor={company.themeColor}
          />
        </Link>

        <div className="space-y-3">
          <h4 className="font-display font-bold text-xl text-neutral-900 leading-tight">
            {company.name}
          </h4>
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {company.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-medium text-neutral-600">
              <MapPin className="w-3 h-3" /> {company.location.city}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-medium text-neutral-600">
              <Award className="w-3 h-3" /> {company.stats.yearsInBusiness}{" "}
              Years Exp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

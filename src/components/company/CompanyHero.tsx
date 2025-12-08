import React from "react";
import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import { Company } from "@/types";

export default function CompanyHero({ company }: { company: Company }) {
  return (
    <div className="relative">
      {/* 1. Cover Image Area (Taller & Immersive) */}
      <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url(${
              company.coverImage || "/images/defaults/company-cover.jpg"
            })`,
          }}
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />
      </div>

      {/* 2. Company Info Floating over Cover */}
      <div className="container-custom relative -mt-24 pb-6 z-10 flex flex-col md:flex-row items-end md:items-end gap-6">
        {/* Logo Box */}
        <div className="p-1 bg-white rounded-2xl shadow-xl">
          <div className="w-32 h-32 md:w-40 md:h-40 relative bg-white rounded-xl overflow-hidden border border-neutral-100 flex items-center justify-center">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain p-2"
              />
            ) : (
              <span className="text-4xl font-bold text-neutral-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 text-white pb-2 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 mb-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-shadow-lg">
              {company.name}
            </h1>
            {company.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success-500/20 border border-success-400/30 backdrop-blur-sm text-success-300 text-xs font-medium mt-2">
                <CheckCircle className="w-3 h-3" /> Verified Partner
              </span>
            )}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-neutral-300 text-sm md:text-base font-medium">
            <MapPin className="w-4 h-4 text-[var(--brand-color)]" />
            <span>
              {company.location.city}, {company.location.state},{" "}
              {company.location.country}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-2 w-full md:w-auto">
          <button
            className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-[var(--brand-color)]/20 transition-transform hover:-translate-y-1 active:translate-y-0"
            style={{ backgroundColor: "var(--brand-color)" }}
          >
            Contact Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

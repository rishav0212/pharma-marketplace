// src/components/company/CompanyHeroSection.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/types";
import { ArrowLeft, CheckCircle, MapPin, ExternalLink } from "lucide-react";

interface CompanyHeroSectionProps {
  company: Company;
}

export default function CompanyHeroSection({
  company,
}: CompanyHeroSectionProps) {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-[280px] md:h-[320px] w-full relative overflow-hidden bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url(${
              company.coverImage || "/images/defaults/company-cover.jpg"
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-0 w-full z-10">
          <div className="container-custom">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 hover:bg-black/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Companies
            </Link>
          </div>
        </div>
      </div>

      {/* Company Info Overlay */}
      <div className="container-custom relative -mt-24 pb-8 z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          {/* Logo */}
          <div className="p-1 bg-white rounded-2xl shadow-2xl border border-neutral-100">
            <div className="w-32 h-32 md:w-40 md:h-40 relative bg-white rounded-xl overflow-hidden flex items-center justify-center">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain p-3"
                />
              ) : (
                <span className="text-5xl font-bold text-neutral-400">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Company Details */}
          <div className="flex-1 text-white md:pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-display font-bold drop-shadow-lg">
                {company.name}
              </h1>
              {company.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-500/20 border border-success-400/40 backdrop-blur-sm text-success-200 text-sm font-medium w-fit">
                  <CheckCircle className="w-4 h-4" fill="currentColor" />
                  Verified Partner
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-neutral-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium">
                  {company.location.city}, {company.location.state},{" "}
                  {company.location.country}
                </span>
              </div>

              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden md:flex gap-3 pb-2">
            <a
              href={`mailto:${company.contact.email}`}
              className="btn-primary whitespace-nowrap"
            >
              Contact Supplier
            </a>
            <button className="btn-ghost bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20">
              Request Quote
            </button>
          </div>
        </div>

        {/* CTA Buttons - Mobile */}
        <div className="flex md:hidden gap-3 mt-6">
          <a
            href={`mailto:${company.contact.email}`}
            className="btn-primary flex-1 text-center"
          >
            Contact
          </a>
          <button className="btn-ghost flex-1 text-center border border-neutral-300">
            Quote
          </button>
        </div>
      </div>
    </div>
  );
}

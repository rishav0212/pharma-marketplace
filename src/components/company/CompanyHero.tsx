// src/components/company/CompanyHero.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/types";
import { ArrowLeft, CheckCircle, MapPin, Globe, Share2 } from "lucide-react";

export default function CompanyHeroSection({ company }: { company: Company }) {
  return (
    <div className="relative group">
      {/* 1. Cover Image with Brand Gradient Overlay */}
      <div className="h-[320px] md:h-[380px] w-full relative overflow-hidden bg-neutral-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `url(${
              company.coverImage || "/images/defaults/company-cover.jpg"
            })`,
          }}
        />

        {/* Brand Gradient Overlay: Mixes black with brand color for a premium feel */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(to top, #0f172a 0%, var(--brand-primary) 100%)`,
            mixBlendMode: "multiply",
          }}
        />

        {/* Dark Fade for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

        {/* Navigation & Actions */}
        <div className="absolute top-0 left-0 w-full z-20 p-6">
          <div className="container-custom flex justify-between items-center">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <button className="p-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Identity Section */}
      <div className="container-custom relative -mt-24 z-30">
        <div className="flex flex-col md:flex-row items-end gap-6 pb-6">
          {/* Brand Logo Card */}
          <div className="relative group/logo">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-2xl p-1 border-4 border-white overflow-hidden">
              <div className="w-full h-full relative bg-neutral-50 rounded-xl flex items-center justify-center overflow-hidden">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-5xl font-bold text-[var(--brand-primary)]">
                    {company.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            {/* Verified Badge styling */}
            {company.verified && (
              <div
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
                title="Verified Business"
              >
                <CheckCircle className="w-6 h-6 text-success-500 fill-success-50" />
              </div>
            )}
          </div>

          {/* Text Info */}
          <div className="flex-1 text-white pb-2">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white`}
              >
                {company.type === "marketing" ? "Marketing" : "Manufacturing"}
              </span>
              {company.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 backdrop-blur-md">
                  Premium Partner
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 text-shadow-sm">
              {company.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-neutral-300 text-sm md:text-base">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                <span>
                  {company.location.city}, {company.location.state}
                </span>
              </div>
              {company.contact.website && (
                <a
                  href={company.contact.website}
                  target="_blank"
                  className="flex items-center gap-1.5 hover:text-[var(--brand-primary)] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span className="underline decoration-dotted underline-offset-4">
                    Visit Website
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

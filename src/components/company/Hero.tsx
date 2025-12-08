// src/components/company/ModernCompanyHero.tsx
import React from "react";
import Image from "next/image";
import { Company } from "@/types";
import { MapPin, BadgeCheck, Share2, Star, Plus } from "lucide-react";

export default function Hero({ company }: { company: Company }) {
  return (
    <div className="relative pb-24 md:pb-36 group/hero">
      {/* 1. Immersive Cover Image with Slow Zoom */}
      <div className="h-[320px] md:h-[420px] w-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out scale-105 group-hover/hero:scale-110"
          style={{
            backgroundImage: `url(${
              company.coverImage || "/images/defaults/company-cover.jpg"
            })`,
          }}
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-neutral-50/90" />
      </div>

      {/* 2. Floating Brand Interface */}
      <div className="absolute top-[240px] md:top-[300px] left-0 right-0 px-4 z-10">
        <div className="container-custom">
          {/* Main Card with Glass Effect & Glow */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-neutral-200/50 p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8 border border-white/50 overflow-visible animate-slide-up">
            {/* Top Accent Line (Brand Color) */}
            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-lg bg-[var(--brand-primary)] opacity-80" />

            {/* Ambient Glow Behind (Brand Color) */}
            <div className="absolute -inset-4 bg-[var(--brand-primary)] opacity-[0.07] blur-3xl rounded-[3rem] -z-10" />

            {/* Floating Logo Box */}
            <div className="relative shrink-0 -mt-16 md:-mt-24 animate-float">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-[6px] border-white shadow-xl bg-white flex items-center justify-center relative overflow-hidden group/logo">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover/logo:scale-110"
                  />
                ) : (
                  <span className="text-6xl font-bold text-[var(--brand-primary)]">
                    {company.name.charAt(0)}
                  </span>
                )}
                {/* Internal Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Pulsing Verified Badge */}
              {company.verified && (
                <div
                  className="absolute -bottom-4 -right-4 z-20 bg-white rounded-full p-2 shadow-lg border border-neutral-100 animate-scale-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full blur animate-pulse opacity-50"></div>
                    <BadgeCheck className="relative w-6 h-6 text-blue-600 fill-blue-50" />
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0 pt-2 md:pt-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white shadow-md shadow-neutral-900/10">
                      {company.type === "marketing"
                        ? "Marketing Partner"
                        : "Manufacturer"}
                    </span>
                    {company.featured && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] md:text-xs font-bold border border-amber-100 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Premium
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight leading-tight">
                    {company.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-neutral-500 font-medium">
                    <span className="flex items-center gap-1.5 transition-colors hover:text-[var(--brand-primary)] cursor-default">
                      <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                      {company.location.city}, {company.location.country}
                    </span>
                    {company.stats.yearsInBusiness && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                        Est.{" "}
                        {new Date().getFullYear() -
                          company.stats.yearsInBusiness}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button className="group relative p-3 rounded-2xl border border-neutral-200 text-neutral-500 bg-white hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
                    <Share2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </button>
                  <button className="btn-primary flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white shadow-xl shadow-neutral-900/20 border-none px-6 py-3 rounded-2xl active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

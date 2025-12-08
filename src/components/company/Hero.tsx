// src/components/company/Hero.tsx
import React from "react";
import Image from "next/image";
import { Company } from "@/types";
import { MapPin, BadgeCheck, Share2, Star, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  company: Company;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0.55, 0.45, 1],
      delay: 0.1,
    },
  },
};

export default function Hero({ company }: HeroProps) {
  const currentYear = new Date().getFullYear();
  const establishedYear = company.stats.yearsInBusiness
    ? currentYear - company.stats.yearsInBusiness
    : undefined;

  const coverStyle: React.CSSProperties = company.coverImage
    ? { backgroundImage: `url(${company.coverImage})` }
    : {
        background: `
        radial-gradient(circle at 20% 20%, var(--brand-soft), transparent 55%),
        radial-gradient(circle at 80% 80%, #ffffffdd, transparent 55%)
      `,
        position: "relative" as "relative",
        overflow: "hidden" as "hidden",
      };

  const initials = company.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative pb-24 md:pb-36 group/hero">
      {/* Banner */}
      <div className="h-[280px] md:h-[360px] w-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2500ms] ease-out scale-105 group-hover/hero:scale-110"
          style={coverStyle}
        />

        {/* Pharma Illustration Shapes */}
        {!company.coverImage && (
          <>
            <div className="pharma-molecule molecule-1" />
            <div className="pharma-molecule molecule-2" />
            <div className="pharma-molecule molecule-3" />

            <div className="pharma-pill pill-1" />
            <div className="pharma-pill pill-2" />

            <div className="pharma-node node-1" />
            <div className="pharma-node node-2" />
            <div className="pharma-node node-3" />
          </>
        )}

        {/* Gentle glass gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/90" />
      </div>

      {/* Floating card */}
      <div className="absolute top-[200px] md:top-[240px] left-0 right-0 px-4 z-10">
        <div className="container-custom">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.12)] p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8 overflow-visible"
          >
            {/* Soft brand glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[var(--brand-primary)]/10 blur-3xl" />

            {/* Top accent */}
            <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-[var(--brand-primary)]/80" />

            {/* Logo */}
            <motion.div
              variants={logoVariants}
              className="relative shrink-0 -mt-16 md:-mt-20"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-[1.75rem] border border-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.16)] bg-white/80 backdrop-blur-xl flex items-center justify-center overflow-hidden">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover/hero:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--brand-soft)] text-[var(--brand-primary)] font-bold text-3xl md:text-4xl tracking-tight">
                    {initials}
                  </div>
                )}
              </div>

              {/* Verified badge */}
              {company.verified && (
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-1.5 shadow-md border border-neutral-100">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[var(--brand-primary)]/40 blur-sm animate-ping" />
                    <BadgeCheck className="relative w-6 h-6 text-[var(--brand-primary)] fill-[var(--brand-primary)]/10" />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-2 md:pt-4 relative z-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] bg-neutral-900 text-white shadow">
                      {company.type === "marketing"
                        ? "Marketing Partner"
                        : "Manufacturer"}
                    </span>
                    {company.featured && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] md:text-xs font-semibold border border-amber-100 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        Premium Profile
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 tracking-tight leading-tight">
                    {company.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-neutral-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                      {company.location.city}, {company.location.country}
                    </span>
                    {establishedYear && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                        Est. {establishedYear}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <button className="group relative p-3 rounded-2xl border border-neutral-200 text-neutral-500 bg-white shadow-sm hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all active:scale-95">
                    <Share2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold bg-[var(--brand-primary)] text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] hover:shadow-[0_18px_45px_rgba(15,23,42,0.28)] active:scale-95 transition-all">
                    <Plus className="w-4 h-4" />
                    Follow Supplier
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

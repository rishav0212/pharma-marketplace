// src/components/company/Hero.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Company } from "@/types";
import {
  MapPin,
  BadgeCheck,
  Share2,
  Star,
  Globe,
  Check,
  Building2,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Logo from "./Logo";

interface HeroProps {
  company: Company;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15, type: "spring", stiffness: 120 },
  },
};

export default function Hero({ company }: HeroProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const currentYear = new Date().getFullYear();
  const establishedYear = company.stats.yearsInBusiness
    ? currentYear - company.stats.yearsInBusiness
    : undefined;



  return (
    <div className="group/hero w-full relative z-10">
      {/* --- BANNER SECTION --- */}
      <div
        className="h-[260px] md:h-[440px] w-full relative overflow-hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--brand-primary), #020617 90%)",
        }}
      >
        {company.coverImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] ease-out scale-105 group-hover/hero:scale-110 opacity-50 mix-blend-overlay"
              style={{ backgroundImage: `url(${company.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--brand-primary),#000_92%)] via-transparent to-transparent opacity-90" />
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full">
            {/* Ambient Brand Glows */}
            <div
              className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] mix-blend-screen animate-pulse"
              style={{
                background: "var(--brand-primary)",
                animationDuration: "6s",
              }}
            />
            <div
              className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] mix-blend-screen"
              style={{ background: "var(--brand-primary)" }}
            />

            {/* Dot Pattern */}
            <div
              className="absolute inset-0 dot-pattern opacity-[0.15]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 40%, transparent 100%)",
              }}
            />

            {/* Dynamic Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                transform:
                  "perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 70%)",
              }}
            />
          </div>
        )}
      </div>

      {/* --- PROFILE CARD --- */}
      {/* Fix: Added 'mb-20' on mobile to push content down significantly */}
      <div className="container-custom px-4 relative z-20 -mt-20 md:-mt-28 mb-20 md:mb-12">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative bg-white/95 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex flex-col md:flex-row items-start gap-5 md:gap-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/50"
        >
          {/* Top Brand Accent Line */}
          <div
            className="absolute top-0 inset-x-10 h-1 rounded-b-full opacity-100 shadow-[0_2px_15px_-3px_var(--brand-primary)]"
            style={{ backgroundColor: "var(--brand-primary)" }}
          />

          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            className="relative shrink-0 -mt-16 md:-mt-24 self-center md:self-auto"
          >
            <Logo
              src={company.logo}
              name={company.name}
              size={160}
              rounded="rounded-[1.75rem]"
              padding="p-4"
              className="transition-transform duration-500 group-hover/logo:-translate-y-1"
            />

            {company.verified && (
              <div className="absolute -bottom-2 -right-2 z-20 bg-white rounded-full p-1.5 shadow-md ring-1 ring-neutral-100">
                <BadgeCheck className="w-6 h-6 text-sky-500" />
              </div>
            )}
          </motion.div>

          {/* Company Info */}
          <div className="flex-1 min-w-0 pt-0 md:pt-1 w-full text-center md:text-left">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 md:gap-6">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2 md:mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-neutral-900 text-white shadow-sm">
                    {company.type === "marketing"
                      ? "Marketing"
                      : "Manufacturer"}
                  </span>
                  {company.featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] md:text-[11px] font-bold border border-amber-100 shadow-sm">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      Premium
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight mb-3 tracking-tight">
                  {company.name}
                </h1>

                {/* Meta Data */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm font-medium text-neutral-500">
                  <span className="flex items-center gap-1.5 group/meta cursor-default">
                    <div className="p-1 rounded-full bg-neutral-100 text-neutral-600 transition-colors group-hover/meta:bg-[var(--brand-soft)] group-hover/meta:text-[var(--brand-primary)]">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    {company.location.city}, {company.location.country}
                  </span>
                  {establishedYear && (
                    <span className="flex items-center gap-1.5 group/meta cursor-default">
                      <div className="p-1 rounded-full bg-neutral-100 text-neutral-600 transition-colors group-hover/meta:bg-[var(--brand-soft)] group-hover/meta:text-[var(--brand-primary)]">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      Est. {establishedYear}
                    </span>
                  )}
                  {company.contact.website && (
                    <a
                      href={company.contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 hover:text-[var(--brand-primary)] transition-colors group/link"
                    >
                      <div className="p-1 rounded-full bg-neutral-100 text-neutral-600 group-hover/link:text-white group-hover/link:bg-[var(--brand-primary)] transition-colors">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      Website
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 transition-all shadow-sm active:scale-95 min-w-[120px] overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div
                        key="copied"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-emerald-600 font-bold"
                      >
                        <Check className="w-4 h-4" />
                        <span>Copied</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4 transition-transform group-hover:rotate-12 group-hover:-translate-y-0.5" />
                        <span className="font-semibold">Share</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* <button
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-[var(--brand-glow)] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all"
                  style={{ backgroundColor: "var(--brand-primary)" }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Follow</span>
                </button> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

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
  Copy,
} from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";

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

  const initials = company.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative pb-24 md:pb-32 group/hero">
      {/* --- BANNER SECTION --- */}
      <div
        className="h-[380px] md:h-[460px] w-full relative overflow-hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--brand-primary), #020617 90%)",
        }}
      >
        {company.coverImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] ease-out scale-105 group-hover/hero:scale-110 opacity-50 mix-blend-overlay"
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

            {/* Use Theme Class */}
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

      {/* --- FLOATING PROFILE CARD --- */}
      <div className="absolute top-[260px] md:top-[320px] left-0 right-0 px-4 z-20">
        <div className="container-custom">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 md:gap-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/50"
          >
            {/* Top Brand Accent Line */}
            <div
              className="absolute top-0 inset-x-10 h-1 rounded-b-full opacity-100"
              style={{ backgroundColor: "var(--brand-primary)" }}
            />

            {/* Logo Section */}
            <motion.div
              variants={logoVariants}
              className="relative shrink-0 -mt-20 md:-mt-24 group/logo"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[1.75rem] bg-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-4 ring-white flex items-center justify-center overflow-hidden relative z-10">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover/logo:scale-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-5xl font-bold tracking-tighter"
                    style={{
                      backgroundColor: "var(--brand-soft)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              {company.verified && (
                <div
                  className="absolute -bottom-2 -right-2 z-20 bg-white rounded-full p-1.5 shadow-md ring-1 ring-neutral-100"
                  title="Verified"
                >
                  <BadgeCheck className="w-6 h-6 text-sky-500 fill-sky-50" />
                </div>
              )}
            </motion.div>

            {/* Company Info */}
            <div className="flex-1 min-w-0 pt-1 w-full">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-neutral-900 text-white">
                      {company.type === "marketing"
                        ? "Marketing"
                        : "Manufacturer"}
                    </span>
                    {company.featured && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-100">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Premium
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4 tracking-tight">
                    {company.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-neutral-500">
                    <span className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-neutral-100 text-neutral-600">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      {company.location.city}, {company.location.country}
                    </span>
                    {establishedYear && (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                        Est. {establishedYear}
                      </span>
                    )}
                    {company.contact.website && (
                      <a
                        href={company.contact.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-[var(--brand-primary)] transition-colors group/link"
                      >
                        <div className="p-1.5 rounded-full bg-neutral-100 text-neutral-600 group-hover/link:text-white group-hover/link:bg-[var(--brand-primary)] transition-colors">
                          <Globe className="w-3.5 h-3.5" />
                        </div>
                        Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 text-neutral-600 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm active:scale-95 min-w-[140px]"
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 text-emerald-600 font-medium"
                        >
                          <Check className="w-4 h-4" />
                          <span>Copied</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="share"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share Profile</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

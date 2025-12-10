"use client";
import React, { useState } from "react";
import { Company } from "@/types";
import {
  ShieldCheck,
  ArrowRight,
  MapPin,
  Building2,
  Clock,
  Send,
} from "lucide-react";
import QuickContactBar from "@/components/company/QuickContactBar";
import Logo from "@/components/company/Logo";
import { motion } from "framer-motion";

interface EnquirySidebarProps {
  company: Company;
  productName: string;
  onContactClick: () => void;
}

export default function EnquirySidebar({
  company,
  productName,
  onContactClick,
}: EnquirySidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* --- MAIN CARD --- */}
      <div
        className="group relative bg-white rounded-[2rem] border border-neutral-200 p-5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--brand-glow)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Brand Gradient Border Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />

        {/* Ambient Glow Background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--brand-primary)] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />

        {/* Company Header */}
        <div className="relative flex items-center gap-4 mb-5 pt-2">
          <div className="shrink-0 p-1 rounded-2xl border border-neutral-100 shadow-sm bg-white group-hover:scale-105 transition-transform duration-300">
            <Logo src={company.logo} name={company.name} size={48} brandColor={company.themeColor}/>
          </div>
          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--brand-soft)] text-[var(--brand-primary)] border border-[var(--brand-primary)]/10">
                <Building2 className="w-3 h-3" />
                Supplier
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-900 leading-tight line-clamp-1 group-hover:text-[var(--brand-primary)] transition-colors">
              {company.name}
            </h3>
            {company.verified && (
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5 fill-emerald-50" />
                <span className="opacity-90">Verified Partner</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="space-y-0.5 p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100 group-hover:bg-[var(--brand-soft)]/30 group-hover:border-[var(--brand-primary)]/10 transition-colors">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3" /> Location
            </div>
            <div className="text-xs font-semibold text-neutral-700 truncate">
              {company.location.city}
            </div>
          </div>
          <div className="space-y-0.5 p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100 group-hover:bg-[var(--brand-soft)]/30 group-hover:border-[var(--brand-primary)]/10 transition-colors">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" /> Experience
            </div>
            <div className="text-xs font-semibold text-neutral-700">
              {company.stats.yearsInBusiness} Years
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3 relative z-10">
          <button
            onClick={onContactClick}
            className="relative w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-[var(--brand-glow)] overflow-hidden group/btn transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

            <span className="relative flex items-center justify-center gap-2 text-sm">
              Send Enquiry <Send className="w-4 h-4" />
            </span>
          </button>

          <QuickContactBar
            company={company}
            variant="outline"
            className="w-full text-sm py-2.5"
          />
        </div>

        {/* Footer Link */}
        <div className="mt-4 text-center">
          <a
            href={`/company/${company.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-neutral-400 hover:text-[var(--brand-primary)] transition-colors group/link"
          >
            View Company Profile
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
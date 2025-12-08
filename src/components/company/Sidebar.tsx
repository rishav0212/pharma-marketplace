// src/components/company/Sidebar.tsx
import React from "react";
import { Company } from "@/types";
import {
  Mail,
  Phone,
  Globe,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  company: Company;
}

export default function Sidebar({ company }: SidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Main CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="group relative rounded-[1.75rem] bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] p-6 overflow-hidden"
      >
        {/* Light brand glow */}
        <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[var(--brand-primary)]/7 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">
              Contact Supplier
            </h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-[0.18em]">
                Active
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`mailto:${company.contact.email}`}
              className="relative flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.3)] active:scale-95 overflow-hidden"
              style={{
                backgroundColor: "var(--brand-primary)",
              }}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-[1400ms]" />
              <Mail className="w-4 h-4 relative z-10" />
              <span className="relative z-10 text-sm">Send Enquiry</span>
            </a>

            {company.contact.phone && (
              <a
                href={`tel:${company.contact.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-medium text-neutral-700 bg-neutral-50 border border-neutral-100 shadow-sm hover:bg-white hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:shadow-md transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                {company.contact.phone}
              </a>
            )}
          </div>

          {/* Trust strip */}
          <div className="mt-6 pt-5 border-t border-neutral-100 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                Response Time
              </div>
              <p className="font-semibold text-neutral-900">Within 2 hours</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                <Zap className="w-3.5 h-3.5" />
                Activity
              </div>
              <p className="font-semibold text-neutral-900">High</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary info */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="rounded-[1.75rem] bg-white/80 backdrop-blur-xl border border-neutral-100 shadow-[0_18px_40px_rgba(15,23,42,0.06)] p-6"
      >
        <h4 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.22em] mb-4">
          Connect
        </h4>

        <div className="space-y-2">
          {company.contact.website && (
            <a
              href={company.contact.website}
              target="_blank"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 hover:bg-[var(--brand-soft)]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-500">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-neutral-700">
                  Official Website
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </a>
          )}

          {company.verified && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              Verified Supplier on Platform
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

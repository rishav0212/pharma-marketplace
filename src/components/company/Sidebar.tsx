// src/components/company/Sidebar.tsx
import React from "react";
import { Company } from "@/types";
import { Mail, Phone, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  company: Company;
}

export default function Sidebar({ company }: SidebarProps) {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Primary CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-[1.5rem] bg-white border border-neutral-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-900">
            Contact Supplier
          </h3>
        </div>

        <div className="space-y-3">
          {/* Main Action Button */}
          <a
            href={`mailto:${company.contact.email}`}
            className="group relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-[var(--brand-glow)] hover:shadow-xl active:scale-[0.98] transition-all overflow-hidden"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Send Enquiry</span>
          </a>

          {/* Secondary Action */}
          {company.contact.phone && (
            <a
              href={`tel:${company.contact.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-neutral-700 bg-neutral-50 border border-neutral-100 hover:bg-white hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all active:scale-[0.98]"
            >
              <Phone className="w-4 h-4" />
              {company.contact.phone}
            </a>
          )}
        </div>
      </motion.div>

      {/* Additional Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-[1.5rem] bg-white border border-neutral-100 shadow-sm p-6"
      >
        <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
          Company Details
        </h4>

        <div className="space-y-2">
          {company.contact.website && (
            <a
              href={company.contact.website}
              target="_blank"
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-[var(--brand-soft)] border border-transparent hover:border-[var(--brand-accent)] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-[var(--brand-primary)]">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-neutral-700 group-hover:text-[var(--brand-primary)]">
                  Official Website
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--brand-primary)]" />
            </a>
          )}

          {company.verified && (
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-800">
                  Verified Seller
                </div>
                <div className="text-[10px] font-medium text-blue-600/80">
                  Identity verified by platform
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

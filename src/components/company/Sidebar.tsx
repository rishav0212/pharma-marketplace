// src/components/company/ModernSidebar.tsx
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

export default function Sidebar({ company }: { company: Company }) {
  return (
    <div
      className="sticky top-24 space-y-6 animate-fade-in"
      style={{ animationDelay: "0.3s" }}
    >
      {/* 1. Main Action Card - "The Business Card" */}
      <div className="group bg-white rounded-3xl shadow-xl shadow-neutral-200/40 p-1 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--brand-primary)]/10 hover:-translate-y-1">
        {/* Gradient Border Trick */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/20 to-transparent opacity-50 rounded-3xl" />

        <div className="relative bg-white rounded-[1.4rem] p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-neutral-900">
              Contact Supplier
            </h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                Online
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Shimmering Primary Button */}
            <a
              href={`mailto:${company.contact.email}`}
              className="relative overflow-hidden flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-transform active:scale-[0.98] group/btn"
              style={{
                backgroundColor: "var(--brand-primary)",
                boxShadow: "0 8px 20px -6px var(--brand-glow)",
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

              <Mail className="w-5 h-5 relative z-20" />
              <span className="relative z-20">Send Enquiry</span>
            </a>

            <a
              href={`tel:${company.contact.phone}`}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-neutral-700 bg-neutral-50 border border-neutral-100 hover:bg-white hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:shadow-md transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              {company.contact.phone}
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wide">
                <Clock className="w-3.5 h-3.5" /> Response
              </div>
              <p className="font-bold text-neutral-900 text-sm">~ 2 Hours</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5" /> Activity
              </div>
              <p className="font-bold text-neutral-900 text-sm">High</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Secondary Info */}
      <div className="bg-white rounded-3xl border border-neutral-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 pl-1">
          Connect
        </h4>
        <div className="space-y-2">
          {company.contact.website && (
            <a
              href={company.contact.website}
              target="_blank"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 hover:bg-[var(--brand-soft)] group transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-500 group-hover:text-[var(--brand-primary)] transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900">
                  Official Website
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--brand-primary)] transition-colors" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

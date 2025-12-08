// src/components/company/CompanyInfoCard.tsx
import React from "react";
import { Company } from "@/types";
import { Mail, Phone, MessageCircle, ArrowUpRight, Copy } from "lucide-react";

export default function InfoCard({ company }: { company: Company }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-200/50 overflow-hidden sticky top-24">
      {/* Brand Header Strip */}
      <div className="h-2 w-full bg-[var(--brand-primary)]" />

      <div className="p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          Contact Supplier
          <span className="relative flex h-2.5 w-2.5 ml-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500"></span>
          </span>
        </h3>

        {/* Primary Actions - Using Brand Color */}
        <div className="space-y-3 mb-6">
          <a
            href={`mailto:${company.contact.email}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "var(--brand-primary)",
              boxShadow: "0 8px 20px -8px var(--brand-primary)",
            }}
          >
            <Mail className="w-5 h-5" />
            Send Inquiry
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${company.contact.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 transition-all">
              <MessageCircle className="w-4 h-4 text-success-600" />
              WhatsApp
            </button>
          </div>
        </div>

        <hr className="border-neutral-100 mb-6" />

        {/* Quick Details */}
        <div className="space-y-4">
          <div className="group cursor-pointer">
            <div className="text-xs text-neutral-500 font-medium mb-1 uppercase tracking-wide">
              Email
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-neutral-900 group-hover:text-[var(--brand-primary)] transition-colors">
              <span className="truncate">{company.contact.email}</span>
              <Copy className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="text-xs text-neutral-500 font-medium mb-1 uppercase tracking-wide">
              Phone
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-neutral-900 group-hover:text-[var(--brand-primary)] transition-colors">
              <span>{company.contact.phone}</span>
              <Copy className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {company.socialLinks?.linkedin && (
            <a
              href={company.socialLinks.linkedin}
              target="_blank"
              className="block group"
            >
              <div className="text-xs text-neutral-500 font-medium mb-1 uppercase tracking-wide">
                Social
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-neutral-900 group-hover:text-[#0077b5] transition-colors">
                LinkedIn Profile
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          )}
        </div>

        {/* Trust Note */}
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 text-center leading-relaxed">
            Response rate:{" "}
            <span className="text-success-600 font-medium">Very High</span> •
            Usually responds within 2 hours
          </p>
        </div>
      </div>
    </div>
  );
}

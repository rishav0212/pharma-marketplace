"use client";

import React from "react";
import { Company } from "@/types";
import {
  Globe,
  ShieldCheck,
  ArrowUpRight,
  MessageSquare,
  Phone,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import EnquiryForm from "@/components/company/EnquiryForm";
import QuickContactBar from "@/components/company/QuickContactBar";

interface SidebarProps {
  company: Company;
  onContactClick?: () => void; // Keeps the modal trigger from parent
}

export default function Sidebar({ company, onContactClick }: SidebarProps) {
  return (
    <>
      {/* =========================================================
          DESKTOP VIEW (Large Screens: Sticky Sidebar)
          Hidden on Mobile
      ========================================================= */}
      <div className="hidden lg:block sticky top-24 space-y-6">
        {/* 1. Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-[1.5rem] bg-white border border-neutral-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="p-6 pb-0">
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-[var(--brand-primary)]" />
              Contact Supplier
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Get quotes directly from {company.name}.
            </p>
          </div>

          <div className="px-6 pt-4 pb-2">
            <EnquiryForm
              companyName={company.name}
              brandColor={company.themeColor}
              variant="modal"
            />
          </div>

          <div className="relative flex py-2 items-center px-6">
            <div className="flex-grow border-t border-neutral-100"></div>
            <span className="flex-shrink-0 mx-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Or Connect via
            </span>
            <div className="flex-grow border-t border-neutral-100"></div>
          </div>

          <div className="px-6 pb-6">
            <QuickContactBar company={company} view="row" className="w-full" />
          </div>

          <div className="bg-neutral-50 p-3 text-center border-t border-neutral-100">
            <p className="text-[10px] text-neutral-400 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Verified response rate within 24 hours
            </p>
          </div>
        </motion.div>

        {/* 2. Company Details Card */}
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
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 hover:bg-[var(--brand-soft)] border border-transparent hover:border-[var(--brand-accent)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-[var(--brand-primary)] transition-colors">
                    Official Website
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--brand-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            )}

            {company.verified && (
              <div className="mt-4 flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800">
                    Verified Seller
                  </div>
                  <div className="text-[10px] font-medium text-emerald-600/80">
                    Identity checked by platform
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          MOBILE VIEW (Small Screens: Sticky Bottom Bar)
          Hidden on Desktop
      ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 pb-safe bg-white/95 backdrop-blur-xl border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 items-center">
          {/* 1. QUICK CONTACT BUTTON SLOT (Wider than before, w-1/3) */}
          {/* This slot renders the 'Connect' button and opens the modal */}
          <div className="shrink-0 w-1/3 h-12">
            <QuickContactBar
              view="modal-sheet"
              company={company}
              // Ensuring the QuickContactBar component renders its button filling this 1/3 slot
              className="w-full h-full"
            />
          </div>

          {/* 2. MAIN ENQUIRY BUTTON (Takes up the remaining 2/3 space) */}
          <button
            onClick={onContactClick}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-white shadow-lg shadow-[var(--brand-glow)] active:scale-[0.98] transition-all"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
            <span className="text-sm">Send Enquiry</span>
          </button>
        </div>
      </div>
    </>
  );
}

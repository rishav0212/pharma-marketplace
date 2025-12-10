"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2 } from "lucide-react";
import EnquiryForm from "@/components/company/EnquiryForm";
import Logo from "@/components/company/Logo";
import { Company } from "@/types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  productName?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  company,
  productName,
}: ContactModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm">
                  <Logo src={company.logo} name={company.name} size={32} brandColor={company.themeColor}/>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Enquire with
                  </div>
                  <div className="font-bold text-neutral-900 leading-tight">
                    {company.name}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              {productName && (
                <div className="mb-6 p-3 rounded-xl bg-[var(--brand-soft)] border border-[var(--brand-accent)] text-[var(--brand-primary)] text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Requesting quote for:{" "}
                  <span className="font-bold">{productName}</span>
                </div>
              )}

              <EnquiryForm
                productName={productName}
                companyName={company.name}
                brandColor={company.themeColor}
                variant="modal"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

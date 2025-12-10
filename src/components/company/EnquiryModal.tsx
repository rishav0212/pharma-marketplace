"use client";

import React from "react";
import { Building2, X } from "lucide-react";
import EnquiryForm from "@/components/company/EnquiryForm";
import Logo from "@/components/company/Logo";
import { Company } from "@/types";
import BaseModal from "@/components/common/BaseModal"; // Import the reusable modal wrapper

// Rename interface for clarity
interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  productName?: string;
}

// Rename component
export default function EnquiryModal({
  isOpen,
  onClose,
  company,
  productName,
}: EnquiryModalProps) {
  const brandColor = company.themeColor || "#0ea5e9";

  // NOTE: Body scroll lock is handled inside BaseModal

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      // Replicating original desktop dimensions and structure
      contentClass="w-full max-w-lg bg-white rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
      isSheet={false} // Ensures it centers nicely on desktop
      animationType="spring" // Using the default spring animation
    >
      {/* Header (Now inside the Modal children) */}
      {/* The BaseModal will automatically provide the desktop close button, but we keep this one for mobile context */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-neutral-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm">
            <Logo
              src={company.logo}
              name={company.name}
              size={32}
              brandColor={brandColor}
            />
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
        {/* Mobile/In-Content Close Button */}
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
          <div
            className="mb-6 p-3 rounded-xl text-sm font-medium flex items-center gap-2"
            style={
              {
                "--brand-soft": `color-mix(in srgb, ${brandColor}, white 90%)`,
                "--brand-accent": `color-mix(in srgb, ${brandColor}, white 70%)`,
                backgroundColor: "var(--brand-soft)",
                border: "1px solid var(--brand-accent)",
                color: brandColor,
              } as React.CSSProperties
            }
          >
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
    </BaseModal>
  );
}

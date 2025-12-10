"use client";

import React, { useState } from "react";
import { Phone, Mail, MessageCircle, ExternalLink, X } from "lucide-react";
import { Company } from "@/types";
import BaseModal from "@/components/common/BaseModal";
import Logo from "@/components/company/Logo";
import { motion } from "framer-motion";

interface QuickContactBarProps {
  company: Company;
  className?: string;
  /**
   * 'row' = Horizontal row of buttons (default)
   * 'large-cards' = Vertical stack of large cards (for static display)
   * 'modal-sheet' = Vertical stack of large cards inside a modal overlay (for mobile pop-up)
   */
  view?: "row" | "large-cards" | "modal-sheet";
}

export default function QuickContactBar({
  company,
  className = "",
  view = "row",
}: QuickContactBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { phone, email } = company.contact;
  const whatsappNumber = phone ? phone.replace(/[^0-9]/g, "") : "";
  const brandColor = company.themeColor || "#0ea5e9";
  const PRIMARY_BLUE = "#0ea5e9";

  // --- OFFICIAL COLORS & ACCENTS ---
  const WHATSAPP_COLOR = "#25D366";
  const EMAIL_ACCENT = "#D93025";

  // Shared transition for motion elements
  const springTransition = { type: "spring", stiffness: 300, damping: 30 };

  // --- RENDERING LOGIC FOR THE LARGE CARD OPTIONS (Unchanged) ---
  const renderContactCards = (isModalContent = false) => (
    <div className={`space-y-3 ${isModalContent ? "pb-4" : "pb-0"}`}>
      {/* Header for Modal View */}
      {isModalContent && (
        <div className="text-center mb-6 pt-4">
          <div className="flex justify-center mb-3">
            <Logo
              src={company.logo}
              name={company.name}
              size={50}
              brandColor={brandColor}
            />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">
            Connect with {company.name}
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            Select your preferred contact method.
          </p>
        </div>
      )}

      {/* Phone Card */}
      {phone && (
        <a
          href={`tel:${phone}`}
          // Base background is neutral-50. Hover border and shadow now explicitly use blue-600.
          // Removed style={{ "--brand": dynamicColor }}
          className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-blue-600 hover:shadow-lg transition-all group duration-300"
        >
          <div
            // Background uses explicit blue-600 for the solid icon circle.
            className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 duration-300"
          >
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold text-neutral-900 text-lg">Call Now</div>
            <div className="text-sm text-neutral-500">{phone}</div>
          </div>
          <ExternalLink
            // Icon color adopts text-blue-600 on hover.
            className="w-5 h-5 text-neutral-300 group-hover:text-blue-600 transition-colors duration-300 group-hover:translate-x-0.5"
          />
        </a>
      )}
      {/* WhatsApp Card */}
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-[#25D366] hover:shadow-lg transition-all group duration-300"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 duration-300"
            style={{ backgroundColor: WHATSAPP_COLOR }}
          >
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-bold text-neutral-900 text-lg">WhatsApp</div>
            <div className="text-sm text-neutral-500">Chat instantly</div>
          </div>
          <ExternalLink className="w-5 h-5 text-neutral-300 group-hover:text-[#25D366] transition-colors duration-300 group-hover:translate-x-0.5" />
        </a>
      )}

      {/* Email Card */}
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:border-[var(--email)] hover:shadow-lg transition-all group duration-300"
        style={{ "--email": EMAIL_ACCENT } as React.CSSProperties}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 duration-300"
          style={{ backgroundColor: EMAIL_ACCENT }}
        >
          <Mail className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <div className="font-bold text-neutral-900 text-lg">Email</div>
          <div className="text-sm text-neutral-500 truncate max-w-[200px]">
            {email}
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-neutral-300 group-hover:text-[var(--email)] transition-colors duration-300 group-hover:translate-x-0.5" />
      </a>

      {/* Close button for Sheet view only */}
      {isModalContent && (
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full mt-4 py-3 font-bold text-neutral-500 hover:text-neutral-900 transition-colors text-sm rounded-xl border border-neutral-100 hover:border-neutral-200"
        >
          Cancel
        </button>
      )}
    </div>
  );

  // --- Main Render based on View Prop ---

  // 1. MODAL SHEET OVERLAY
  if (view === "modal-sheet") {
    return (
      <>
        {/* Button to open the modal (uses the shine animation) */}
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileTap={{ scale: 0.95 }}
          // *** CHANGED: Removed flex-col. Set w-full/h-full to fit parent slot. ***
          className={`bg-blue-600 w-full h-full flex items-center justify-center gap-2 rounded-xl text-white shadow-lg transition-all active:scale-95 duration-200 relative overflow-hidden group`}
          title="Open Contact Options"
        >
          {/* SHINE EFFECT LAYER */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

          <Phone className="w-5 h-5 relative z-20" />
          {/* Text is now next to the icon */}
          <span className="text-sm font-bold uppercase tracking-wide relative z-20">
            Contact
          </span>
        </motion.button>

        <BaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isSheet={true}
          contentClass="md:w-[420px] p-0"
        >
          {renderContactCards(true)}
        </BaseModal>
      </>
    );
  }

  // 2. LARGE CARDS (Static Inline Display)
  if (view === "large-cards") {
    return <div className={className}>{renderContactCards(false)}</div>;
  }

  // 3. ROW (Horizontal Solid Icons) - Default View
  const rowBtnBase =
    "flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-white shadow-md transition-all active:scale-95 duration-200 relative overflow-hidden group"; // Added relative & overflow-hidden for shine

  return (
    <div className={`flex gap-3 ${className}`}>
      {/* Call Button (Brand Color) */}
      {phone && (
        <motion.a
          href={`tel:${phone}`}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className={`${rowBtnBase} hover:bg-opacity-90 bg-blue-600`}
          title="Call Supplier"
        >
          {/* SHINE LAYER */}
          <div className=" absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

          <Phone className="w-5 h-5 relative z-20" />
          <span className="text-[10px] font-bold uppercase tracking-wide relative z-20">
            Call
          </span>
        </motion.a>
      )}

      {/* WhatsApp Button (Official Green) */}
      {whatsappNumber && (
        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          className={`${rowBtnBase} bg-[#25D366] hover:bg-[#1DA851]`}
          title="Chat on WhatsApp"
        >
          {/* SHINE LAYER */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

          <MessageCircle className="w-5 h-5 relative z-20" />
          <span className="text-[10px] font-bold uppercase tracking-wide relative z-20">
            WhatsApp
          </span>
        </motion.a>
      )}

      {/* Email Button (Standard Red) */}
      <motion.a
        href={`mailto:${email}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${rowBtnBase} bg-[#D93025] hover:bg-[#C2372B]`}
        title="Send Email"
      >
        {/* SHINE LAYER */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

        <Mail className="w-5 h-5 relative z-20" />
        <span className="text-[10px] font-bold uppercase tracking-wide relative z-20">
          Email
        </span>
      </motion.a>
    </div>
  );
}

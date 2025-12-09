"use client";

import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Company } from "@/types";

interface QuickContactBarProps {
  company: Company;
  className?: string;
  variant?: "solid" | "outline" | "minimal";
}

export default function QuickContactBar({ 
  company, 
  className = "",
  variant = "outline" 
}: QuickContactBarProps) {
  
  // Helper to format phone for WhatsApp (remove spaces/dashes)
  const whatsappNumber = company.contact.phone.replace(/[^0-9]/g, "");

  const buttonBase = "flex-1 flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-200 active:scale-95 group";
  
  const styles = {
    solid: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-200 bg-white text-neutral-600 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:shadow-md",
    minimal: "bg-neutral-50 text-neutral-600 hover:bg-white hover:shadow-sm"
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {/* Call Button */}
      <a
        href={`tel:${company.contact.phone}`}
        className={`${buttonBase} ${styles[variant]}`}
        title="Call Supplier"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBase} ${styles[variant]} hover:!border-[#25D366] hover:!text-[#25D366]`}
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
      </a>

      {/* Email Button */}
      <a
        href={`mailto:${company.contact.email}`}
        className={`${buttonBase} ${styles[variant]}`}
        title="Send Email"
      >
        <Mail className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-wide">Email</span>
      </a>
    </div>
  );
}
"use client";
import React from "react";
import { Company } from "@/types";
import { ShieldCheck, ArrowRight, MapPin, Building2, Clock } from "lucide-react";
import ContactButton from "@/components/company/ContactButton";
import QuickContactBar from "@/components/company/QuickContactBar";
import Logo from "@/components/company/Logo";

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
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div className="space-y-4">
      {/* --- MAIN CARD --- */}
      <div className="bg-white rounded-[2rem] border border-neutral-200 p-6 shadow-xl shadow-neutral-900/5 overflow-hidden relative">
        {/* Brand Header Background */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 opacity-100"
          style={{ backgroundColor: brandColor }}
        />

        {/* Company Header */}
        <div className="flex items-start gap-4 mb-6 pt-2">
          <div className="shrink-0 p-1 rounded-xl border border-neutral-100 shadow-sm bg-white">
            <Logo src={company.logo} name={company.name} size={48} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-3 h-3" />
              Manufacturer
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-900 leading-tight line-clamp-2">
              {company.name}
            </h3>
            {company.verified && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Supplier
              </div>
            )}
          </div>
        </div>

        {/* Company Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-neutral-50/80 border border-neutral-100">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <MapPin className="w-3 h-3" /> Location
            </div>
            <div className="text-sm font-semibold text-neutral-700 truncate">
              {company.location.city}, {company.location.state}
            </div>
          </div>
          <div className="space-y-1 border-l border-neutral-200 pl-4">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" /> Experience
            </div>
            <div className="text-sm font-semibold text-neutral-700">
              {company.stats.yearsInBusiness} Years
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3">
          <ContactButton 
            fullWidth 
            brandColor={brandColor}
            onClick={onContactClick}
            className="shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Send Enquiry
          </ContactButton>
          
          <QuickContactBar company={company} variant="outline" />
        </div>

        <div className="mt-5 pt-5 border-t border-dashed border-neutral-100 text-center">
          <a 
            href={`/company/${company.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[var(--brand-primary)] transition-colors group"
          >
            View Full Company Profile
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* --- TRUST BADGE (Optional Small Card below) --- */}
      <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-4 flex items-center gap-3">
        <div className="p-2 bg-white rounded-full shadow-sm text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-800">Verified Partner</div>
          <div className="text-[10px] text-emerald-600/80 leading-tight">
            Identity & certifications verified by PharmaConnect.
          </div>
        </div>
      </div>
    </div>
  );
}
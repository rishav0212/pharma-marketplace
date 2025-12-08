// src/components/company/CompanyInfoCard.tsx
import React from "react";
import { Company } from "@/types";
import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  MapPin,
  Building2,
  MessageCircle,
} from "lucide-react";

interface CompanyInfoCardProps {
  company: Company;
}

export default function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg overflow-hidden">
      {/* Header with brand color accent */}
      <div className="h-3 w-full" style={{ backgroundColor: brandColor }} />

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <a
            href={`mailto:${company.contact.email}`}
            className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            style={{
              backgroundColor: brandColor,
              boxShadow: `0 10px 25px -10px ${brandColor}`,
            }}
          >
            <Mail className="w-4 h-4" />
            Send Inquiry
          </a>

          <button className="w-full py-3 rounded-xl font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            WhatsApp Chat
          </button>
        </div>

        <hr className="border-neutral-200" />

        {/* Contact Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Contact Information
          </h3>

          <ContactItem
            icon={Mail}
            label="Email"
            value={company.contact.email}
            href={`mailto:${company.contact.email}`}
            brandColor={brandColor}
          />

          <ContactItem
            icon={Phone}
            label="Phone"
            value={company.contact.phone}
            href={`tel:${company.contact.phone}`}
            brandColor={brandColor}
          />

          {company.contact.website && (
            <ContactItem
              icon={Globe}
              label="Website"
              value="Visit Website"
              href={company.contact.website}
              brandColor={brandColor}
              isExternal
            />
          )}

          {company.socialLinks?.linkedin && (
            <ContactItem
              icon={Linkedin}
              label="LinkedIn"
              value="View Profile"
              href={company.socialLinks.linkedin}
              brandColor={brandColor}
              isExternal
            />
          )}
        </div>

        <hr className="border-neutral-200" />

        {/* Company Type & Location */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Company Details
          </h3>

          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${brandColor}15` }}
            >
              <Building2 className="w-4 h-4" style={{ color: brandColor }} />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium mb-0.5">
                Company Type
              </div>
              <div className="text-sm text-neutral-900 font-semibold">
                {company.type === "marketing"
                  ? "Marketing Company"
                  : "Retailer"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${brandColor}15` }}
            >
              <MapPin className="w-4 h-4" style={{ color: brandColor }} />
            </div>
            <div>
              <div className="text-xs text-neutral-500 font-medium mb-0.5">
                Location
              </div>
              <div className="text-sm text-neutral-900 font-semibold">
                {company.location.city}, {company.location.state}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component
interface ContactItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  brandColor: string;
  isExternal?: boolean;
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  brandColor,
  isExternal,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-start gap-3 group"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${brandColor}15` }}
      >
        <Icon className="w-4 h-4" 
        // style={{ color: brandColor }} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-neutral-500 font-medium mb-0.5">
          {label}
        </div>
        <div className="text-sm text-neutral-900 font-semibold truncate group-hover:text-primary-600 transition-colors">
          {value}
        </div>
      </div>
    </a>
  );
}

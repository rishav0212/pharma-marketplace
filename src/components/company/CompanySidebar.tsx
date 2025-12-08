import React from "react";
import Image from "next/image";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Company } from "@/types";

export default function CompanySidebar({ company }: { company: Company }) {
  // Fallback to blue if no theme color is set
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden sticky top-24">
      {/* 1. Logo Section (Overlapping) */}
      <div className="relative h-24 bg-neutral-50 border-b border-neutral-100">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg p-2 border border-neutral-100 flex items-center justify-center">
            {company.logo ? (
              <div className="relative w-full h-full">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-3xl font-bold text-neutral-400">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Info */}
      <div className="pt-12 pb-6 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="font-display font-bold text-xl text-neutral-900 leading-tight">
            {company.name}
          </h1>
          {company.verified && (
            <CheckCircle className="w-5 h-5 text-success-500 fill-success-50 shrink-0" />
          )}
        </div>

        <div className="text-sm text-neutral-500 flex items-center justify-center gap-1 mb-6">
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {company.location.city}, {company.location.country}
          </span>
        </div>

        {/* 3. Primary Actions (THEMED) */}
        <div className="space-y-3">
          <button
            className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            style={{
              backgroundColor: brandColor, // Uses the Company Brand Color
              boxShadow: `0 10px 25px -10px ${brandColor}`,
            }}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Supplier</span>
          </button>

          <button className="w-full py-3 rounded-xl font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>

      <hr className="border-neutral-100" />

      {/* 4. Contact Details (THEMED ICONS) */}
      <div className="p-6 space-y-5">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          Business Details
        </h3>

        <div className="space-y-4">
          <ContactItem
            icon={Mail}
            label="Email Address"
            value={company.contact.email}
            href={`mailto:${company.contact.email}`}
            color={brandColor}
          />
          <ContactItem
            icon={Phone}
            label="Phone Number"
            value={company.contact.phone}
            href={`tel:${company.contact.phone}`}
            color={brandColor}
          />
          {company.contact.website && (
            <ContactItem
              icon={Globe}
              label="Website"
              value="Visit Site"
              href={company.contact.website}
              color={brandColor}
              isExternal
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Component for cleaner code
function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  color,
  isExternal,
}: any) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      className="flex items-start gap-3 group"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
        style={{ backgroundColor: `${color}15` }} // 15% opacity background
      >
        <Icon className="w-4 h-4" style={{ color: color }} />
      </div>
      <div>
        <div className="text-xs text-neutral-400 font-medium">{label}</div>
        <div className="text-sm text-neutral-700 font-medium break-all group-hover:underline flex items-center gap-1">
          {value} {isExternal && <ExternalLink className="w-3 h-3" />}
        </div>
      </div>
    </a>
  );
}

import React from "react";
import {
  ShieldCheck,
  Award,
  Globe,
  FlaskConical,
  Stethoscope,
  Microscope,
} from "lucide-react";

const partners = [
  { name: "WHO GMP Certified", icon: FlaskConical },
  { name: "ISO 9001:2015", icon: Award },
  { name: "FDA Approved Facility", icon: ShieldCheck },
  { name: "Global Export Ready", icon: Globe },
  { name: "Clinical Research Partners", icon: Microscope },
  { name: "Medical Alliance", icon: Stethoscope },
];

export default function TrustMarquee() {
  return (
    <div className="w-full bg-neutral-50 border-y border-neutral-200 py-4 overflow-hidden relative z-20">
      <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
        {/* Render list multiple times to ensure seamless infinite loop */}
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[200px] gap-3 group cursor-default opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <partner.icon className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors grayscale group-hover:grayscale-0" />
              <span className="text-sm font-semibold text-neutral-500 group-hover:text-neutral-900 transition-colors">
                {partner.name}
              </span>
            </div>
          )
        )}
      </div>

      {/* Fade edges for smooth look */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none"></div>
    </div>
  );
}

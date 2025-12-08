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
    <div className="w-full bg-white border-y border-neutral-100 py-6 overflow-hidden relative z-20">
      {/* FIX: Changed w-[200%] to w-max. 
        This forces the container to be as wide as its content (approx 4800px), 
        ensuring the animation speed (pixels/second) is consistent on mobile and desktop.
      */}
      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        {/* Render list multiple times to ensure seamless infinite loop */}
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[200px] gap-3 group cursor-default transition-all duration-300 px-6"
            >
              {/* Added a subtle icon background for a 'better' look */}
              <div className="p-2 rounded-full bg-neutral-50 group-hover:bg-primary-50 transition-colors duration-300">
                <partner.icon className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors duration-300" />
              </div>
              <span className="text-sm font-semibold text-neutral-500 group-hover:text-primary-700 transition-colors duration-300">
                {partner.name}
              </span>
            </div>
          )
        )}
      </div>

      {/* Fade edges updated to match bg-white */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    </div>
  );
}

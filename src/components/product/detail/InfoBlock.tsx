import React from "react";
import { LucideIcon } from "lucide-react";

interface InfoBlockProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export default function InfoBlock({
  title,
  icon: Icon,
  children,
  className = "",
}: InfoBlockProps) {
  // If no content is passed, don't render anything (Smart Hiding)
  if (!children) return null;

  return (
    <section
      className={`group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Header with Brand Accent */}
      <div className="bg-neutral-50/50 border-b border-neutral-100 px-6 py-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white border border-neutral-200 shadow-sm text-[var(--brand-primary)] group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-display font-bold text-lg text-neutral-900 tracking-tight">
          {title}
        </h3>
      </div>

      {/* Content Area */}
      <div className="p-6 text-neutral-600 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}

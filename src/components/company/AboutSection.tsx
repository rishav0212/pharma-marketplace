// src/components/company/CompanyAboutSection.tsx
import React from "react";
import { Company } from "@/types";

export default function AboutSection({ company }: { company: Company }) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 rounded-full bg-[var(--brand-primary)]" />
        <h2 className="text-2xl font-bold text-neutral-900">
          About {company.name}
        </h2>
      </div>

      <div className="prose prose-neutral max-w-none mb-8">
        <p className="text-lg text-neutral-600 leading-relaxed whitespace-pre-line">
          {company.description}
        </p>
      </div>

      {company.categories.length > 0 && (
        <div className="pt-6 border-t border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">
            Key Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {company.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all hover:shadow-sm cursor-default"
                style={{
                  backgroundColor: "var(--brand-50)",
                  borderColor: "var(--brand-100)",
                  color: "var(--brand-primary)",
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

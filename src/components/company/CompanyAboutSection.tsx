// src/components/company/CompanyAboutSection.tsx
import React from "react";
import { Company } from "@/types";

interface CompanyAboutSectionProps {
  company: Company;
}

export default function CompanyAboutSection({ company }: CompanyAboutSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
        <span
          className="w-1.5 h-8 rounded-full"
          style={{ backgroundColor: company.themeColor || "#0ea5e9" }}
        />
        About {company.name}
      </h2>

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-line">
          {company.description}
        </p>
      </div>

      {/* Categories */}
      {company.categories.length > 0 && (
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">
            Specializations
          </h3>
          <div className="flex flex-wrap gap-3">
            {company.categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700 font-medium hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-pointer"
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
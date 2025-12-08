// src/components/company/CompanyCertifications.tsx
import React from "react";
import { Award, ShieldCheck } from "lucide-react";

interface CompanyCertificationsProps {
  certifications: string[];
}

export default function CompanyCertifications({
  certifications,
}: CompanyCertificationsProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
          <Award className="w-5 h-5 text-accent-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          Certifications & Compliance
        </h2>
      </div>

      <p className="text-neutral-600 mb-6">
        This company maintains the following certifications and quality
        standards:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-success-50 to-accent-50 border border-success-200 rounded-xl hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-success-600" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-neutral-900 group-hover:text-success-700 transition-colors">
                {cert}
              </div>
              <div className="text-xs text-neutral-500">
                Verified Certification
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

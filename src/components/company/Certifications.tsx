// src/components/company/Certifications.tsx
import React from "react";
import { Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface CompanyCertificationsProps {
  certifications: string[];
}

export default function Certifications({
  certifications,
}: CompanyCertificationsProps) {
  if (!certifications || certifications.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-[1.75rem] border border-neutral-100 p-7 md:p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-neutral-50 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-neutral-300" />
        </div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-1">
          Certifications not added yet
        </h2>
        <p className="text-sm text-neutral-500">
          This supplier has not listed their certifications. You can request
          details in your enquiry.
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-[1.75rem] border border-neutral-100 p-7 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-[var(--brand-soft)] flex items-center justify-center">
          <Award className="w-5 h-5 text-[var(--brand-primary)]" />
        </div>
        <h2 className="text-2xl font-semibold text-neutral-900">
          Certifications & Compliance
        </h2>
      </div>

      <p className="text-sm text-neutral-600 mb-5">
        This company maintains the following certifications and quality
        standards:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 rounded-[1.25rem] bg-gradient-to-br from-emerald-50 to-[var(--brand-soft)] border border-emerald-100 shadow-[0_12px_30px_rgba(16,185,129,0.16)]"
          >
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-neutral-900">{cert}</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">
                Verified certification documentation available on request
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// src/components/company/AboutSection.tsx
import React from "react";
import { Company } from "@/types";
import { motion } from "framer-motion";

interface AboutProps {
  company: Company;
}

export default function AboutSection({ company }: AboutProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-xl rounded-[1.75rem] border border-neutral-100 p-7 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-7 rounded-full bg-[var(--brand-primary)]" />
        <h2 className="text-2xl font-semibold text-neutral-900">
          About {company.name}
        </h2>
      </div>

      <p className="text-[15px] text-neutral-600 leading-relaxed whitespace-pre-line">
        {company.description}
      </p>

      {company.categories.length > 0 && (
        <div className="mt-6 pt-5 border-t border-neutral-100">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.22em] mb-3">
            Key Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {company.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white/80 backdrop-blur-sm shadow-sm"
                style={{
                  borderColor: "var(--brand-soft)",
                  color: "var(--brand-primary)",
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

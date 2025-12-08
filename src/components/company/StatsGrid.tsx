// src/components/company/StatsGrid.tsx
import React from "react";
import { Company } from "@/types";
import { Building2, Package, Users, Award } from "lucide-react";
import { motion, Variants } from "framer-motion";

const defaultPharmaBanner = {
  background: `
    radial-gradient(circle at 20% 20%, var(--brand-soft), transparent 55%),
    radial-gradient(circle at 80% 80%, #ffffffcc, transparent 60%)
  `,
  position: "relative",
  overflow: "hidden",
};

interface StatsGridProps {
  company: Company;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ❗ FIX: replaced ease: "easeOut" with bezier ease array
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0, 0.55, 0.45, 1], // ← easeOut bezier
    },
  },
};

export default function StatsGrid({ company }: StatsGridProps) {
  const stats = [
    {
      label: "Total Products",
      value: company.stats.products,
      suffix: "+",
      icon: Package,
    },
    {
      label: "Experience",
      value: company.stats.yearsInBusiness,
      suffix: " yrs",
      icon: Building2,
    },
    {
      label: "Team Size",
      value: company.stats.employees || "N/A",
      suffix: "",
      icon: Users,
    },
    {
      label: "Certifications",
      value: company.certifications?.length,
      suffix: "",
      icon: Award,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative bg-white/80 backdrop-blur-xl p-4.5 md:p-5 rounded-[1.5rem] border border-neutral-100 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "var(--brand-soft)" }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: "var(--brand-primary)" }}
                />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-[var(--brand-primary)] transition-colors" />
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-[1.7rem] font-semibold text-neutral-900 tracking-tight">
                {stat.value}
                <span className="ml-1 text-sm text-neutral-400 font-medium">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.22em]">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

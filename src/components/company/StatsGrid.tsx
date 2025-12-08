// src/components/company/StatsGrid.tsx
import React from "react";
import { Company } from "@/types";
import { Building2, Package, Users, Award } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface StatsGridProps {
  company: Company;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function StatsGrid({ company }: StatsGridProps) {
  const stats = [
    {
      label: "Products",
      value: company.stats.products,
      suffix: "+",
      icon: Package,
    },
    {
      label: "Experience",
      value: company.stats.yearsInBusiness,
      suffix: " Yrs",
      icon: Building2,
    },
    {
      label: "Team",
      value: company.stats.employees || "N/A",
      suffix: "",
      icon: Users,
    },
    {
      label: "Certificates",
      value: company.certifications?.length || 0,
      suffix: "",
      icon: Award,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative bg-white border border-neutral-100 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--brand-accent)] transition-all duration-300 overflow-hidden"
          >
            {/* Subtle Brand Hover Fill */}
            <div className="absolute inset-0 bg-[var(--brand-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center justify-between mb-3 md:mb-4">
              <div
                className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 border"
                style={{
                  backgroundColor: "var(--brand-soft)",
                  borderColor: "var(--brand-accent)",
                  color: "var(--brand-primary)",
                }}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="relative z-10 space-y-0.5 md:space-y-1">
              <div className="text-xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                {stat.value}
                <span className="text-sm md:text-lg text-neutral-400 ml-0.5 font-semibold">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-[var(--brand-primary)] transition-colors">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

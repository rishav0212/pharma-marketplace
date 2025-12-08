// src/components/company/CompanyStatsGrid.tsx
import React from "react";
import { Company } from "@/types";
import { Building2, Package, Users, Award } from "lucide-react";

export default function StatsGrid({ company }: { company: Company }) {
  const stats = [
    {
      label: "Total Products",
      value: company.stats.products,
      suffix: "+",
      icon: Package,
      delay: "0s",
    },
    {
      label: "Experience",
      value: company.stats.yearsInBusiness,
      suffix: " Years",
      icon: Building2,
      delay: "0.1s",
    },
    {
      label: "Team Size",
      value: company.stats.employees || "N/A",
      suffix: "",
      icon: Users,
      delay: "0.2s",
    },
    {
      label: "Certifications",
      value: company.certifications.length,
      suffix: "",
      icon: Award,
      delay: "0.3s",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/40 hover:-translate-y-1 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: stat.delay, animationFillMode: "both" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: "var(--brand-soft)" }}
              >
                <Icon
                  className="w-6 h-6 transition-colors"
                  style={{ color: "var(--brand-primary)" }}
                />
              </div>
              {/* Tiny decorative dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-[var(--brand-primary)] transition-colors" />
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-display font-bold text-neutral-900 tracking-tight group-hover:text-[var(--brand-primary)] transition-colors">
                {stat.value}
                <span className="text-base md:text-lg text-neutral-400 font-medium ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

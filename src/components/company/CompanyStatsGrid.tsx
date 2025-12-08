// src/components/company/CompanyStatsGrid.tsx
import React from "react";
import { Company } from "@/types";
import { Building2, Package, Users, Calendar } from "lucide-react";

interface CompanyStatsProps {
  company: Company;
}

export default function CompanyStats({ company }: CompanyStatsProps) {
  const stats = [
    {
      icon: Package,
      label: "Products",
      value: `${company.stats.products}+`,
      color: "text-primary-600 bg-primary-50",
    },
    {
      icon: Calendar,
      label: "Years in Business",
      value: company.stats.yearsInBusiness,
      color: "text-accent-600 bg-accent-50",
    },
    {
      icon: Users,
      label: "Team Size",
      value: company.stats.employees || "50+",
      color: "text-success-600 bg-success-50",
    },
    {
      icon: Building2,
      label: "Established",
      value: new Date(company.createdAt).getFullYear(),
      color: "text-warning-600 bg-warning-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

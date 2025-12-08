// src/components/company/Infrastructure.tsx
import React from "react";
import { Factory, Warehouse, FlaskConical } from "lucide-react";

export default function Infrastructure() {
  // In a real app, these would come from props
  const facilities = [
    {
      title: "Manufacturing Unit",
      desc: "WHO-GMP compliant unit with automated lines.",
      icon: Factory,
    },
    {
      title: "R&D Lab",
      desc: "In-house quality testing and formulation development.",
      icon: FlaskConical,
    },
    {
      title: "Warehousing",
      desc: "Temperature controlled storage for sensitive drugs.",
      icon: Warehouse,
    },
  ];

  return (
    <section className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 rounded-full bg-[var(--brand-primary)]" />
        <h2 className="text-2xl font-bold text-neutral-900">
          Infrastructure & Facilities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100 p-6 hover:border-[var(--brand-primary)] hover:shadow-lg hover:shadow-[var(--brand-glow)] transition-all duration-300"
          >
            <div className="mb-4 w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[var(--brand-primary)] group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {item.desc}
            </p>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-10 transition-opacity">
              <item.icon className="w-24 h-24 -mr-4 -mt-4 text-[var(--brand-primary)]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

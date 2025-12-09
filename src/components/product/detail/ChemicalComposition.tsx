import React from "react";
import { FlaskConical } from "lucide-react";

interface CompositionProps {
  ingredients: {
    salt: string;
    strength: string;
    class?: string;
    description?: string;
  }[];
}

export default function ChemicalComposition({ ingredients }: CompositionProps) {
  return (
    <div className="space-y-2">
      {ingredients.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md border border-transparent hover:border-neutral-100"
        >
          {/* Connector Line (Visual only) */}
          {idx !== ingredients.length - 1 && (
            <div className="absolute left-[27px] top-12 bottom-[-10px] w-0.5 bg-neutral-100 group-hover:bg-primary-100 transition-colors" />
          )}

          {/* Icon */}
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm text-neutral-400 group-hover:text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)]/30 transition-all shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>

          <div className="flex-1 pt-1">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
              <h4 className="font-bold text-neutral-900 text-base leading-tight">
                {item.salt}
              </h4>
              <span className="px-2 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-bold border border-neutral-200">
                {item.strength}
              </span>
            </div>

            {item.class && (
              <div className="text-[10px] font-bold text-primary-600 uppercase tracking-wider mb-1.5">
                {item.class}
              </div>
            )}

            {item.description && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

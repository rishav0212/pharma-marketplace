"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Pill,
  Syringe,
  FlaskConical,
  Droplets,
  Tablets,
  Baby,
  Activity,
  Stethoscope,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/common/spotlight-card";

// --- ICON MAPPING ---
const ICON_MAP: Record<string, LucideIcon> = {
  tablet: Tablets,
  capsule: Tablets,
  injection: Syringe,
  injectable: Syringe,
  syrup: Droplets,
  liquid: Droplets,
  pediatric: Baby,
  drop: Baby,
  gel: FlaskConical,
  ointment: FlaskConical,
  cream: FlaskConical,
  surgical: Stethoscope,
  device: Stethoscope,
  wellness: Activity,
  supplement: Activity,
};

const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase();
  const foundKey = Object.keys(ICON_MAP).find((k) => lower.includes(k));
  return foundKey ? ICON_MAP[foundKey] : Pill;
};

interface CategoryGridProps {
  categories: string[];
  basePath: string;
  title?: string;
  themeColor?: string;
  counts?: Record<string, number>;
}

export default function CategoryGrid({
  categories,
  basePath,
  title = "Browse by Category",
  themeColor = "#0ea5e9",
  counts,
}: CategoryGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!categories || categories.length === 0) return null;

  const visibleCategories = isExpanded ? categories : categories.slice(0, 8);
  const hasHiddenItems = categories.length > 8;

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="font-display font-bold text-2xl text-neutral-900">
          {title}
        </h3>

        {hasHiddenItems && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: themeColor }}
          >
            {isExpanded ? "Show Less" : `View All (${categories.length})`}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleCategories.map((category, idx) => {
          const Icon = getCategoryIcon(category);
          const count = counts ? counts[category] : undefined;

          return (
            <motion.div
              key={`${category}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* 1. Link wraps the SpotlightCard to make it clickable */}
              <Link
                href={`${basePath}?category=${encodeURIComponent(category)}`}
                className="block h-full"
              >
                {/* 2. SpotlightCard acts as the Main Container */}
                {/* We pass the layout styles (p-5, flex, etc.) here. */}
                {/* Note: SpotlightCard already has border & bg-white in its definition, so we don't add them again. */}
                <SpotlightCard
                  // Added bg-white and border explicitly here
                  className="h-full flex flex-col justify-between p-5 rounded-2xl bg-white border border-neutral-200 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  spotlightColor={`${themeColor}20`}
                  spotlightSize={150}
                >
                  {/* 3. Inner Content is transparent (no bg-white, no border) */}
                  <div className="relative z-20">
                    <div className="flex justify-between items-start mb-4">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
                        style={{
                          backgroundColor: `${themeColor}10`,
                          color: themeColor,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Arrow */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-neutral-100">
                        <ArrowRight className="w-4 h-4 text-neutral-500" />
                      </div>
                    </div>

                    <div>
                      <h4
                        className="font-bold text-neutral-900 text-lg leading-tight mb-1 group-hover:text-[var(--brand-color)] transition-colors"
                        style={
                          {
                            "--brand-color": themeColor,
                          } as React.CSSProperties
                        }
                      >
                        {category}
                      </h4>
                      {count !== undefined && (
                        <p className="text-xs font-medium text-neutral-500">
                          {count} Products
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Optional: Add a subtle brand tint on hover if desired */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </SpotlightCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

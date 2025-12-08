"use client";

import React from "react";
import {
  ArrowRight,
  MapPin,
  Package,
  CheckCircle,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import { companies } from "@/data/companies";
import { Company } from "@/types";
import { SpotlightCard } from "./spotlight-card";
import Logo, { logoVariants } from "../company/Logo"; // Updated Import
import { motion } from "framer-motion";

export default function FeaturedCompanies() {
  const featuredCompanies: (Company | undefined)[] = [
    companies.find((c) => c.id === "1"),
    companies.find((c) => c.id === "2"),
    companies.find((c) => c.id === "3"),
  ];

  const apexCompany = featuredCompanies.find((c) => c?.id === "1") as
    | Company
    | undefined;
  const otherCompanies = featuredCompanies
    .slice(1)
    .filter((c): c is Company => !!c);

  if (!apexCompany) {
    return null;
  }

  return (
    <section className="section-spacing bg-neutral-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Featured Partners</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Trusted by India's Leading
            <br />
            <span className="gradient-text">Pharma Companies</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Connect with verified pharmaceutical manufacturers, distributors,
            and retailers
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* --- LARGE APEX CARD --- */}
          <div className="lg:col-span-2 lg:row-span-2">
            <a
              href={`/company/${apexCompany.slug}`}
              className="block group h-full"
            >
              <SpotlightCard className="h-full flex flex-col p-8 bg-white/50 backdrop-blur-sm border-neutral-200">
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  {/* UNIFIED LOGO COMPONENT */}
                  <div className="shrink-0">
                    <Logo
                      src={apexCompany.logo}
                      name={apexCompany.name}
                      size={80} // Larger size for featured
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-2xl text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {apexCompany.name}
                      </h3>
                      <CheckCircle
                        className="w-6 h-6 text-success-500"
                        fill="currentColor"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {apexCompany.location.city},{" "}
                        {apexCompany.location.state}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-600 mb-6 text-lg relative z-10">
                  {apexCompany.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {apexCompany.categories.slice(0, 5).map((cat) => (
                    <span key={cat} className="badge badge-primary">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 group-hover:border-primary-100 transition-colors">
                    <div className="flex items-center gap-2 text-primary-600 mb-1">
                      <Package className="w-5 h-5" />
                      <span className="text-sm font-medium">Products</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">
                      {apexCompany.stats.products}+
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 group-hover:border-accent-100 transition-colors">
                    <div className="flex items-center gap-2 text-accent-600 mb-1">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900">
                      {apexCompany.stats.yearsInBusiness} Years
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-200 mt-auto relative z-10">
                  <span className="text-primary-600 font-semibold group-hover:underline decoration-2 underline-offset-4">
                    View Full Profile
                  </span>
                  <ArrowRight className="w-6 h-6 text-primary-600 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </SpotlightCard>
            </a>
          </div>

          {/* --- OTHER COMPANIES CARDS --- */}
          {otherCompanies.map((company) => (
            <a
              key={company.id}
              href={`/company/${company.slug}`}
              className="block group"
            >
              <SpotlightCard className="h-full flex flex-col p-6 bg-white/50 backdrop-blur-sm border-neutral-200">
                <div className="flex items-start gap-4 mb-4">
                  {/* UNIFIED LOGO COMPONENT */}

                  <Logo
                    src={company.logo}
                    name={company.name}
                    size={64} // Smaller size for list
                    className="group-hover:-translate-y-1 transition-transform duration-300"
                  />

                  {company.verified && (
                    <div className="absolute -bottom-2 -right-2 z-20 bg-white rounded-full p-1 shadow-md ring-1 ring-neutral-100">
                      <BadgeCheck className="w-4 h-4 text-sky-500 fill-sky-50" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                        {company.name}
                      </h3>
                      {company.verified && (
                        <CheckCircle
                          className="w-4 h-4 text-success-500 flex-shrink-0"
                          fill="currentColor"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-neutral-500 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{company.location.city}</span>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow relative z-10">
                  {company.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {company.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="badge badge-primary text-xs">
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 relative z-10">
                  <span className="text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-900">
                      {company.stats.products}+
                    </span>{" "}
                    Products
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a
            href="/companies"
            className="inline-flex items-center gap-2 btn-gradient shadow-lg shadow-primary-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

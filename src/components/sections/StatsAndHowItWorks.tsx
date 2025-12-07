import React from "react";
import {
  Search,
  CheckCircle,
  Handshake,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import { APP_STATS } from "@/data/appStats";

// Stats Section with Gradient Background
export function Stats() {
  const stats = APP_STATS.engagement;

  return (
    // 1. CHANGED: Use the new darker gradient for the overall section background
    <section className="section-spacing bg-gradient-hero-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      <div className="absolute inset-0 dot-pattern opacity-10"></div>

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Join India's fastest growing B2B pharma marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            // Extracts only the color name (e.g., 'primary') from the Tailwind class (e.g., 'text-primary-500')
            const colorName = stat.color.split("-")[1];

            return (
              // 2. CHANGED: Explicit classes for the preferred dark/transparent card style (old version)
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 text-center rounded-2xl border border-white/20 hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 3. CHANGED: Icon box styling uses semi-transparent color as in the old version */}
                <div
                  className={`w-16 h-16 bg-${colorName}-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description:
        "Browse through thousands of verified companies and quality pharmaceutical products",
      color: "primary",
      gradient: "from-primary-500 to-primary-600",
    },
    {
      icon: CheckCircle,
      title: "Verify & Compare",
      description:
        "Check certifications, compare products, and read reviews from other businesses",
      color: "accent",
      gradient: "from-accent-500 to-accent-600",
    },
    {
      icon: Handshake,
      title: "Connect & Grow",
      description:
        "Send inquiries, negotiate deals, and build long-term business relationships",
      color: "success",
      gradient: "from-success-500 to-success-600",
    },
  ];

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            How PharmaConnect Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Three simple steps to connect with the right pharmaceutical partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-success-200"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="card-hover p-8 text-center h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center text-sm font-bold text-neutral-400 group-hover:border-primary-500 group-hover:text-primary-600 transition-colors">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">{step.description}</p>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 -z-10`}
                  ></div>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-6 z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <ArrowRight className="w-6 h-6 text-neutral-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/companies"
            className="inline-flex items-center gap-2 btn-gradient text-lg px-8 py-4"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Combined Example
export default function StatsAndHowItWorks() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Stats />
      <HowItWorks />
    </div>
  );
}

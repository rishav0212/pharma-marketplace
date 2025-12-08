import React from "react";
import { Search } from "lucide-react";
import { APP_STATS } from "@/data/appStats";

export default function Hero() {
  const { heroIndicators } = APP_STATS;
  const BadgeIcon = heroIndicators[2].icon;

  return (
    // REDUCED SPACING: py-12 md:py-24 (was py-20 md:py-32)
    <section className="relative overflow-hidden bg-gradient-hero-dark py-12 md:py-24">
      {/* --- Background Elements --- */}

      {/* Spotlight Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] -z-10"></div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float"
        style={{ animation: "float 3s ease-in-out infinite 1s" }}
      ></div>

      {/* Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-medium mb-8 animate-fade-in shadow-lg">
            <BadgeIcon className="w-4 h-4 text-accent-300" />
            <span className="tracking-wide">
              Connecting India's Pharma Industry
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up text-shadow-lg leading-tight">
            Find Trusted Pharma
            <br />
            <span className="bg-gradient-to-r from-accent-300 via-primary-300 to-accent-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Partners in Seconds
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-neutral-200 mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed font-medium"
            style={{ animationDelay: "0.1s" }}
          >
            Connect with verified pharmaceutical companies, retailers, and
            suppliers. Discover quality products and build lasting business
            relationships.
          </p>

          {/* Search Bar Container */}
          <div
            className="max-w-3xl mx-auto mb-16 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20 ring-1 ring-white/10">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search companies, products, or categories..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 placeholder:text-neutral-500 shadow-inner"
                  />
                </div>
                <button className="btn-gradient whitespace-nowrap px-8 py-4 font-bold tracking-wide shadow-lg">
                  Search Now
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-neutral-300 text-sm font-medium">
                Popular:
              </span>
              {[
                "Cardiovascular",
                "Diabetes Care",
                "Antibiotics",
                "Pain Relief",
              ].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* --- UPDATED TRUST INDICATORS (Stats) --- */}
          {/* Removed bg-white/10, Thinner Border (border-white/10) */}
          <div
            className="flex flex-wrap justify-center items-center gap-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {heroIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-transparent hover:bg-white/5 transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 bg-white/25 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                    <Icon className={`w-6 h-6 ${indicator.color}`} />
                  </div>

                  <div className="text-left">
                    <div className="text-2xl font-bold text-white font-mono leading-none mb-1">
                      {indicator.value}
                    </div>
                    <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider group-hover:text-neutral-200 transition-colors">
                      {indicator.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- FLOATING DECORATIVE ELEMENTS --- */}

        {/* 1. Left Floater */}
        <div className="hidden lg:block absolute top-1/2 left-10 -translate-y-1/2 animate-float duration-[6000ms]">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center transform rotate-[-10deg]">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg "></div>
          </div>
        </div>

        {/* 2. Right Floater */}
        <div
          className="hidden lg:block absolute top-1/4 right-20 animate-float duration-[7000ms]"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center transform rotate-[15deg]">
            <div className="w-14 h-14 bg-gradient-accent rounded-lg opacity-60"></div>
          </div>
        </div>

        {/* 3. NEW ADDED FLOATING BOX (Bottom Left) */}
        <div
          className="hidden lg:block absolute bottom-20 left-20 animate-float duration-[8000ms]"
          style={{ animationDelay: "2s" }}
        >
          {/* Pill Shape for variety */}
          <div className="w-auto px-6 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center transform rotate-[-5deg]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

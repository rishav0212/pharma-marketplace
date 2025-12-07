import React from "react";
import { Search } from "lucide-react";
import { APP_STATS } from "@/data/appStats";

export default function Hero() {
  const { heroIndicators } = APP_STATS;
  const BadgeIcon = heroIndicators[2].icon;

  return (
    // CHANGED: Use the new 'bg-gradient-hero-dark' class for the darker background
    <section className="relative overflow-hidden bg-gradient-hero-dark py-20 md:py-32">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>

      {/* Floating Shapes - Opacity adjusted for better contrast on dark bg */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float"
        style={{ animation: "float 3s ease-in-out infinite 1s" }}
      ></div>

      {/* Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
            <BadgeIcon className="w-4 h-4 text-accent-300" />
            <span>Connecting India's Pharma Industry</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up text-shadow-lg">
            Find Trusted Pharma
            <br />
            {/* CHANGED: Use inline gradient text from old version for visual pop */}
            <span className="bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
              Partners in Seconds
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Connect with verified pharmaceutical companies, retailers, and
            suppliers. Discover quality products and build lasting business
            relationships.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-3xl mx-auto mb-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* CHANGED: Revert to the explicit dark/transparent search bar container styling */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search companies, products, or categories..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>
                {/* Kept .btn-gradient, just ensuring padding is correct from old version */}
                <button className="btn-gradient whitespace-nowrap px-8 py-4 font-semibold">
                  Search Now
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-blue-200 text-sm">Popular:</span>
              {[
                "Cardiovascular",
                "Diabetes Care",
                "Antibiotics",
                "Pain Relief",
              ].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm hover:bg-white/20 transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {heroIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${indicator.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white font-mono">
                      {indicator.value}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {indicator.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Company Logos (Decorative) */}
        <div className="hidden lg:block absolute top-1/2 left-10 -translate-y-1/2 animate-float">
          <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg"></div>
          </div>
        </div>
        <div
          className="hidden lg:block absolute top-1/4 right-20 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-accent rounded-lg"></div>
          </div>
        </div>
        <div
          className="hidden lg:block absolute bottom-1/4 right-10 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-10 h-10 bg-primary-500 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

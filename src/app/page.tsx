import React from 'react';
import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee"; // New Component
import FeaturedCompanies from "@/components/sections/FeaturedCompanies"; // Updated
import StatsAndHowItWorks from "@/components/sections/StatsAndHowItWorks"; // Updated

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section (Clean & Dark) */}
      <Hero />

      {/* 2. Infinite Marquee (Visual Bridge) */}
      <TrustMarquee />

      {/* 3. Featured Companies (Spotlight Effect) */}
      <FeaturedCompanies />

      {/* 4. Stats & How it Works (Glass & Animation) */}
      <StatsAndHowItWorks />
    </main>
  );
}
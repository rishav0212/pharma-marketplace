import FeaturedCompanies from "@/components/sections/FeaturedCompanies";
import Hero from "@/components/sections/Hero";
import StatsAndHowItWorks from "@/components/sections/StatsAndHowItWorks";
// Navbar Component// Main Homepage
export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedCompanies />
      <StatsAndHowItWorks />
    </div>
  );
}

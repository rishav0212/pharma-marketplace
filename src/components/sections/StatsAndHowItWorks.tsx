"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  Handshake,
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  Package,
  Users,
} from "lucide-react";
import { useInView } from "framer-motion";

// --- ANIMATED COUNTER COMPONENT ---
function Counter({ from, to }: { from: number; to: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(from + (to - from) * ease));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, from, to]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

// --- STATS SECTION ---
export function Stats() {
  const statsData = [
    {
      icon: Building2,
      numValue: 500,
      suffix: "+",
      label: "Verified Companies",
      color: "text-primary-500",
    },
    {
      icon: Package,
      numValue: 5000,
      suffix: "+",
      label: "Quality Products",
      color: "text-accent-500",
    },
    {
      icon: Users,
      numValue: 10000,
      suffix: "+",
      label: "Happy Customers",
      color: "text-success-500",
    },
    {
      icon: TrendingUp,
      numValue: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      color: "text-warning-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero-dark relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <Globe className="w-[800px] h-[800px] text-white absolute -right-40 top-0 opacity-20" strokeWidth={0.5} />
      </div>
      <div className="absolute inset-0 dot-pattern opacity-10"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto opacity-80">
            Join India's fastest growing B2B pharma marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-5xl font-bold text-white mb-2 font-mono">
                  <Counter from={0} to={stat.numValue} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 ${stat.color.replace("text-", "bg-")} opacity-50 blur-[1px] group-hover:w-1/2 transition-all duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- HOW IT WORKS SECTION ---
export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse through thousands of verified companies and quality pharmaceutical products",
      gradient: "from-primary-500 to-primary-600",
      shadow: "shadow-primary-500/30",
    },
    {
      icon: CheckCircle,
      title: "Verify & Compare",
      description: "Check certifications, compare products, and read reviews from other businesses",
      gradient: "from-accent-500 to-accent-600",
      shadow: "shadow-accent-500/30",
    },
    {
      icon: Handshake,
      title: "Connect & Grow",
      description: "Send inquiries, negotiate deals, and build long-term business relationships",
      gradient: "from-success-500 to-success-600",
      shadow: "shadow-success-500/30",
    },
  ];

  return (
    <section className="section-spacing bg-white relative overflow-hidden">
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            How PharmaConnect Works
          </h2>
        </div>

        {/* IMPORTANT: gap-12 is 3rem (48px). We rely on this for arrow positioning. */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* --- ANIMATED LINE (Desktop Only) --- */}
          <div className="absolute top-12 left-0 w-full hidden md:block px-20 h-24 pointer-events-none">
             <svg className="w-full h-full" overflow="visible">
                {/* 1. Light Grey Track */}
                <line 
                  x1="0" y1="50%" x2="100%" y2="50%" 
                  stroke="#E2E8F0" 
                  strokeWidth="2" 
                />
                {/* 2. Moving Blue Dash */}
                <line 
                  x1="0" y1="50%" x2="100%" y2="50%" 
                  stroke="#3B82F6" 
                  strokeWidth="2" 
                  strokeDasharray="12 12" 
                  className="animate-dash" 
                />
             </svg>
          </div>

          {/* --- VERTICAL LINE (Mobile Only) --- */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-neutral-200 md:hidden -z-10 -ml-[1px]"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group flex flex-col items-center text-center">
                
                {/* Icon Box */}
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl ${step.shadow} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                  
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center font-bold border-2 border-neutral-100 shadow-sm z-20">
                    {index + 1}
                  </div>
                </div>

                {/* --- ARROW (Between Steps) --- */}
                {/* Logic: left-full (move to right edge) + ml-1 (4px margin). 
                    Since gap is 48px and arrow is 40px (w-10), we have 8px space.
                    4px left + 4px right = Perfectly Centered. */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[28px] left-full ml-1 z-20 justify-center">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100 text-neutral-400">
                        <ArrowRight className="w-5 h-5" />
                     </div>
                  </div>
                )}

                <h3 className="font-display font-bold text-xl text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 max-w-xs leading-relaxed">
                  {step.description}
                </p>
                
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300 -z-10 blur-xl scale-110`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="/companies" className="inline-flex items-center gap-2 btn-gradient px-8 py-4 text-lg shadow-xl shadow-primary-500/20">
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function StatsAndHowItWorks() {
  return (
    <div className="bg-neutral-50">
      <Stats />
      <HowItWorks />
    </div>
  );
}
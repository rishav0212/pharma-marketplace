"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface StickyScrollNavProps {
  sections: Section[];
  offset?: number;
}

export default function StickyScrollNav({
  sections,
  offset = 120,
}: StickyScrollNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Show/Hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Adjusted to 100 for mobile so it appears sooner
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. "Spy" logic
  useEffect(() => {
    const handleSpy = () => {
      const sectionElements = sections.map((s) =>
        document.getElementById(s.id)
      );

      // Find the section currently in view
      let currentId = activeSection;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section top crosses the "spy line" (offset + buffer)
          if (rect.top < offset + 100 && rect.bottom > offset) {
            currentId = section.id;
          }
        }
      }
      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleSpy);
    return () => window.removeEventListener("scroll", handleSpy);
  }, [sections, offset, activeSection]);

  // 3. Scroll Logic
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          // FIXED: Removed 'hidden md:block'.
          // Added 'top-[60px]' for mobile to sit below header.
          className="fixed top-[60px] md:top-[70px] left-0 right-0 z-30 pointer-events-none"
        >
          {/* Container: Handles alignment. Mobile = Start (for scroll), Desktop = Center */}
          <div className="container-custom flex justify-start md:justify-center overflow-x-auto no-scrollbar pb-4 md:pb-0 px-4 md:px-0">
            {/* The Pill: Added 'min-w-max' so items don't squash on mobile */}
            <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-lg shadow-neutral-900/5 rounded-full p-1.5 pointer-events-auto flex items-center gap-1 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all relative whitespace-nowrap ${
                      isActive
                        ? "text-white"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-[var(--brand-primary)] rounded-full shadow-md"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {section.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

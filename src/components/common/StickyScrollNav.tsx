"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Refs for logic
  const isManualScrolling = useRef(false); // Prevents spy from overriding click
  const navContainerRef = useRef<HTMLDivElement>(null); // For auto-centering

  // 1. SIMPLE VISIBILITY (Show when scrolled past header, stay fixed)
  useEffect(() => {
    const handleScroll = () => {
      // Simple threshold: Show if scrolled down more than 100px
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. AUTO-CENTER ACTIVE TAB (The feature you wanted)
  // Whenever activeSection changes (via scroll or click), center it in the container
  useEffect(() => {
    if (navContainerRef.current) {
      const activeButton = document.getElementById(`nav-btn-${activeSection}`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Don't scroll the whole page, just the container
          inline: "center", // Center it horizontally
        });
      }
    }
  }, [activeSection]);

  // 3. SPY LOGIC (Updates active tab while scrolling)
  useEffect(() => {
    const handleSpy = () => {
      // If user clicked a button recently, don't update active section automatically
      if (isManualScrolling.current) return;

      let currentId = activeSection;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the "active zone" (offset + buffer)
          if (rect.top < offset + 100 && rect.bottom > offset) {
            currentId = section.id;
          }
        }
      }

      if (currentId !== activeSection) {
        setActiveSection(currentId);
      }
    };

    window.addEventListener("scroll", handleSpy);
    return () => window.removeEventListener("scroll", handleSpy);
  }, [sections, offset, activeSection]);

  // 4. CLICK HANDLER (Smooth scroll with manual lock)
  const scrollToSection = (id: string) => {
    isManualScrolling.current = true;
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Release the lock after animation (approx 1s)
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          // Stays fixed at the top
          className="fixed top-[60px] md:top-[70px] left-0 right-0 z-30 pointer-events-none"
        >
          {/* Scrollable Container with Ref */}
          <div
            ref={navContainerRef}
            className="container-custom flex justify-start md:justify-center overflow-x-auto no-scrollbar pb-4 md:pb-0 px-4 md:px-0 scroll-smooth"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-lg shadow-neutral-900/5 rounded-full p-1.5 pointer-events-auto flex items-center gap-1 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    id={`nav-btn-${section.id}`} // Important for Auto-Center
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
                        // Snappy transition to prevent "floating" feel
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
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

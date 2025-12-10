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
  brandElement?: React.ReactNode;
  /**
   * 'fixed' = Overlays content, spans full viewport width (Good for Product Pages)
   * 'sticky' = Stays in flow, respects parent width (Good for Company Profiles)
   */
  position?: "fixed" | "sticky";
}

export default function StickyScrollNav({
  sections,
  offset = 120,
  brandElement,
  position = "fixed", // Default to fixed to maintain backward compatibility
}: StickyScrollNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isVisible, setIsVisible] = useState(position === "sticky"); // Sticky is visible by default

  const isManualScrolling = useRef(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // 1. VISIBILITY LOGIC
  useEffect(() => {
    const handleScroll = () => {
      if (!sections || sections.length === 0) return;

      const lastSectionId = sections[sections.length - 1].id;
      const lastElement = document.getElementById(lastSectionId);

      // Determine Start Visibility
      // Fixed: Show after 150px scroll
      // Sticky: Always show (unless past bottom)
      let shouldShow = position === "sticky" ? true : window.scrollY > 150;

      // Determine End Visibility (Hide when reaching footer)
      if (lastElement) {
        const rect = lastElement.getBoundingClientRect();
        const lastSectionBottomAbs = rect.bottom + window.scrollY;

        if (window.scrollY > lastSectionBottomAbs - offset) {
          shouldShow = false;
        }
      }

      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset, position]);

  // 2. AUTO-CENTER ACTIVE TAB
  useEffect(() => {
    if (navContainerRef.current) {
      const activeButton = document.getElementById(`nav-btn-${activeSection}`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

  // 3. SPY LOGIC
  useEffect(() => {
    const handleSpy = () => {
      if (isManualScrolling.current) return;

      let currentId = activeSection;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < offset + 100 && rect.bottom > offset) {
            currentId = section.id;
          }
        }
      }
      if (currentId !== activeSection) setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleSpy);
    return () => window.removeEventListener("scroll", handleSpy);
  }, [sections, offset, activeSection]);

  // 4. SCROLL HANDLER
  const scrollToSection = (id: string) => {
    isManualScrolling.current = true;
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Animate only if fixed (pop-in effect). Sticky stays solid.
          initial={
            position === "fixed" ? { y: -20, opacity: 0 } : { opacity: 1 }
          }
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`z-50 pointer-events-none 
            ${
              position === "fixed"
                ? "fixed top-[60px] md:top-[70px] left-0 right-0" // Full width overlay
                : "sticky top-[70px] w-full mb-6" // In-flow sticky
            }
          `}
        >
          <div
            ref={navContainerRef}
            // If sticky, we likely want start alignment. If fixed, center alignment.
            className={`container-custom flex overflow-x-auto no-scrollbar pb-4 md:pb-0 px-4 md:px-0 scroll-smooth 
              ${
                position === "fixed"
                  ? "justify-start md:justify-center"
                  : "justify-start"
              }
            `}
          >
            <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-lg shadow-neutral-900/5 rounded-full p-1.5 pointer-events-auto flex items-center gap-1 min-w-max">
              {brandElement && (
                <div className="flex items-center border-r border-neutral-200 pr-3 mr-1 pl-1">
                  {brandElement}
                </div>
              )}

              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    id={`nav-btn-${section.id}`}
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
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-50 flex items-center gap-2">
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

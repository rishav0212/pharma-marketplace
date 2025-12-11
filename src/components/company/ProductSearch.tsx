"use client";

import React, { useState, useEffect } from "react";
import { Search, X, } from "lucide-react";

interface ProductSearchProps {
  variant?: "hero" | "minimal";
  className?: string;
  placeholder?: string;
  value: string; // Controlled value
  onChange: (value: string) => void; // Parent handles the change
  scrollTargetId?: string;
}

export default function ProductSearch({
  variant = "minimal",
  className = "",
  placeholder = "Search products...",
  value,
  onChange,
  scrollTargetId,
}: ProductSearchProps) {
  const [isTyping, setIsTyping] = useState(false);

  // --- AUTO-SCROLL LOGIC ---
  useEffect(() => {
    // Only scroll if we have a target, a value, and user just stopped typing
    if (!scrollTargetId || !value) return;

    // Wait 1.0s after typing stops to auto-scroll
    const timer = setTimeout(() => {
      const target = document.getElementById(scrollTargetId);
      if (target) {
        // Don't scroll if user is already focused inside the target (prevent jumps)
        if (target.contains(document.activeElement)) return;

        const headerOffset = 140;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Optional: Move focus to the input inside the target
        const inputInsideTarget = target.querySelector("input");
        if (inputInsideTarget) {
          inputInsideTarget.focus({ preventScroll: true });
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, scrollTargetId]);

  // Handle Clear
  const handleClear = () => {
    onChange("");
    // Optionally focus back on input
  };

  // Styles
  const styles = {
    hero: {
      container:
        "relative w-full max-w-lg shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-0.5 transition-all duration-300",
      input:
        "w-full pl-12 pr-12 py-4 bg-white border-0 rounded-2xl text-lg font-medium text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-[var(--brand-primary)]/50 outline-none transition-all",
      iconWrapper:
        "absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-primary)]",
      clearBtn:
        "absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors",
    },
    minimal: {
      container: "relative w-full group",
      input:
        "w-full pl-10 pr-10 py-2.5 bg-neutral-100/50 border border-transparent rounded-xl text-sm text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:ring-2 focus:ring-[var(--brand-primary)]/20 focus:border-[var(--brand-primary)]/30 outline-none transition-all",
      iconWrapper:
        "absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[var(--brand-primary)] transition-colors",
      clearBtn:
        "absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-600 transition-colors",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className={`${currentStyle.container} ${className}`}>
      <div className={currentStyle.iconWrapper}>
        <Search className={variant === "hero" ? "w-6 h-6" : "w-4 h-4"} />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={currentStyle.input}
      />

      {value && (
        <button onClick={handleClear} className={currentStyle.clearBtn}>
          <X className={variant === "hero" ? "w-5 h-5" : "w-3.5 h-3.5"} />
        </button>
      )}
    </div>
  );
}

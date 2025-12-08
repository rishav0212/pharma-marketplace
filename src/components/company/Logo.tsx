"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, HTMLMotionProps } from "framer-motion";

interface CompanyLogoProps extends HTMLMotionProps<"div"> {
  src?: string;
  name: string;
  size?: number; // width/height in pixels
  rounded?: string; // tailwind class for border radius
  padding?: string; // tailwind class for padding
  className?: string;
  brandColor?: string; // Optional: for colored fallbacks
  priority?: boolean;
}

export const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15, type: "spring", stiffness: 120 },
  },
};

export default function Logo({
  src,
  name,
  size = 80,
  rounded = "rounded-2xl",
  padding = "p-3",
  className = "",
  brandColor,
  priority = false,
  ...props
}: CompanyLogoProps) {
  const [imgError, setImgError] = useState(false);

  // Generate initials (e.g., "DM Pharma" -> "DP")
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // 1. Dynamic Brand Style (if brandColor exists)
  const brandStyle = brandColor
    ? {
        backgroundColor: `color-mix(in srgb, ${brandColor}, white 90%)`,
        color: brandColor, // Explicitly set text color to brand color
        borderColor: `color-mix(in srgb, ${brandColor}, white 80%)`,
      }
    : null;

  // 2. Default Premium Style (if no brandColor)
  // Uses CSS variable --brand-primary if available, or falls back to a default blue
  const defaultStyle = {
    background: "var(--brand-soft, #eff6ff)",
    color: "var(--brand-primary, #0284c7)",
    borderColor: "var(--brand-accent, #e0f2fe)",
  };

  const activeStyle = brandStyle || defaultStyle;

  return (
    <motion.div
      className={`relative flex items-center justify-center bg-white overflow-hidden shadow-lg ring-1 ring-white/50 group-hover:shadow-primary-glow/40 transition-all duration-500 ${rounded} ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      {/* Background Layer for Fallback */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundColor: !src || imgError ? "transparent" : "transparent",
        }}
      />

      {src && !imgError ? (
        <Image
          src={src}
          alt={name}
          fill
          className={`object-contain ${padding}`}
          onError={() => setImgError(true)}
          priority={priority}
          sizes={`${size}px`}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-black tracking-tighter select-none"
          style={{
            color: activeStyle.color, // Uses the primary brand color
            fontSize: size * 0.4,
          }}
        >
          {initials}
        </div>
      )}
    </motion.div>
  );
}

"use client";

import React from "react";
import { Send, Phone } from "lucide-react";

interface ContactButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  icon?: boolean;
  children?: React.ReactNode;
  brandColor?: string;
  fullWidth?: boolean;
}

export default function ContactButton({
  variant = "primary",
  icon = true,
  children,
  brandColor,
  fullWidth = false,
  className = "",
  style,
  ...props
}: ContactButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 active:scale-95";

  const variants = {
    primary:
      "text-white shadow-lg shadow-[var(--brand-glow)] hover:shadow-xl hover:-translate-y-0.5",
    outline: "border-2 bg-transparent hover:bg-neutral-50",
    ghost: "bg-transparent hover:bg-neutral-100 text-neutral-700",
  };

  const dynamicStyle =
    variant === "primary"
      ? {
          backgroundColor: brandColor || "var(--brand-primary)",
          ...style,
        }
      : variant === "outline"
      ? {
          borderColor: brandColor || "var(--brand-primary)",
          color: brandColor || "var(--brand-primary)",
          ...style,
        }
      : style;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full py-3.5" : "px-6 py-2.5"
      } ${className}`}
      style={dynamicStyle}
      {...props}
    >
      {icon && <Send className="w-4 h-4" />}
      {children || "Contact Supplier"}
    </button>
  );
}

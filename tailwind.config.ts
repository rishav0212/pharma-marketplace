// tailwind.config.ts
import type { Config } from "tailwindcss";
import { designTokens } from "./src/design/token";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Colors: Direct mapping from tokens
      colors: designTokens.colors,

      // 2. Fonts
      fontFamily: designTokens.typography.fontFamily as unknown as Record<
        string,
        string[]
      >,

      // 3. Spacing & Radius
      borderRadius: designTokens.borderRadius,

      // 4. Shadows
      boxShadow: {
        ...designTokens.shadows,
        colored: "0 4px 20px -4px rgba(2, 132, 199, 0.15)",
      },

      // 5. Gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": designTokens.gradients.hero,
        "gradient-hero-dark": designTokens.gradients["hero-dark"],
        "gradient-primary": designTokens.gradients.primary,
        "gradient-accent": designTokens.gradients.accent,
        "gradient-overlay": designTokens.gradients.overlay,
        "gradient-mesh":
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(189, 95%, 42%, 0.15) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(184, 94%, 45%, 0.15) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(210, 96%, 51%, 0.15) 0px, transparent 50%)",
      },

      // 6. Animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

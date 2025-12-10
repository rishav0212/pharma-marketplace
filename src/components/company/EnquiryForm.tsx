"use client";

import React, { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface EnquiryFormProps {
  productName?: string;
  companyName?: string;
  brandColor?: string;
  variant?: "sidebar" | "modal";
}

// 1. Stagger Animation for the container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// 2. Slide Up Animation for items
const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

// 3. Draw Animation for the Success Checkmark
const checkPathVariants : Variants= {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function EnquiryForm({
  productName,
  companyName,
  brandColor = "#0ea5e9",
  variant = "sidebar",
}: EnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  // --- DYNAMIC STYLES ---
  // Create a soft glow shadow using the brand color with low opacity
  const getInputStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return {
      borderColor: isFocused ? brandColor : "",
      boxShadow: isFocused ? `0 0 0 4px ${brandColor}15` : "", // 15 = ~8% opacity hex
      backgroundColor: isFocused ? "#ffffff" : "",
    };
  };

  const inputBaseClass =
    "w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 outline-none text-sm font-medium transition-all duration-300 placeholder:text-neutral-400";

  // --- SUCCESS VIEW ---
  if (sent) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]"
      >
        <motion.div variants={itemVariants}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm"
            style={{ backgroundColor: `${brandColor}15` }} // Very light tint
          >
            {/* Animated SVG Checkmark */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M20 6L9 17L4 12"
                stroke={brandColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkPathVariants}
              />
            </svg>
          </div>
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="text-xl font-bold text-neutral-900 mb-2"
        >
          Enquiry Sent!
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-sm text-neutral-500 max-w-[250px] mx-auto"
        >
          We have sent your details to{" "}
          <span className="font-bold text-neutral-900">{companyName}</span>.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSent(false)}
          className="mt-8 text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg hover:bg-neutral-50 transition-colors"
          style={{ color: brandColor }}
        >
          Send another
        </motion.button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!sent && (
        <motion.form
          key="form"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10 }}
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="space-y-4 relative z-10"
        >
          {/* Row 1 */}
          <div
            className={
              variant === "modal" ? "grid grid-cols-2 gap-3" : "space-y-3"
            }
          >
            <motion.div variants={itemVariants}>
              <label className="sr-only">Your Name</label>
              <motion.input
                type="text"
                required
                placeholder="Your Name"
                className={inputBaseClass}
                // Micro-interaction: Scale slightly on focus
                whileFocus={{ scale: 1.01 }}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("name")}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="sr-only">Mobile Number</label>
              <motion.input
                type="tel"
                required
                placeholder="Mobile"
                className={inputBaseClass}
                whileFocus={{ scale: 1.01 }}
                onFocus={() => setFocusedField("mobile")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("mobile")}
              />
            </motion.div>
          </div>

          {/* Row 2 */}
          <div
            className={
              variant === "modal" ? "grid grid-cols-2 gap-3" : "space-y-3"
            }
          >
            <motion.div variants={itemVariants}>
              <label className="sr-only">Email Address</label>
              <motion.input
                type="email"
                required
                placeholder="Email Address"
                className={inputBaseClass}
                whileFocus={{ scale: 1.01 }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("email")}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="sr-only">Quantity</label>
              <motion.input
                type="text"
                placeholder="Qty (e.g. 500)"
                className={inputBaseClass}
                whileFocus={{ scale: 1.01 }}
                onFocus={() => setFocusedField("qty")}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle("qty")}
              />
            </motion.div>
          </div>

          {/* Row 3: Requirement */}
          <motion.div variants={itemVariants}>
            <label className="sr-only">Requirement</label>
            <motion.textarea
              required
              rows={variant === "sidebar" ? 3 : 4}
              placeholder={
                productName
                  ? `I am interested in ${productName}...`
                  : "Describe your requirement..."
              }
              className={`${inputBaseClass} resize-none`}
              whileFocus={{ scale: 1.01 }}
              onFocus={() => setFocusedField("req")}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle("req")}
            />
          </motion.div>

          {/* SHINY SEND BUTTON */}
          <motion.button
            variants={itemVariants}
            disabled={loading}
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-lg shadow-black/5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none relative overflow-hidden group"
            style={{
              backgroundColor: variant === "sidebar" ? "#171717" : brandColor,
            }}
          >
            {/* Moving Shine Layer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 flex items-center gap-2">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </div>
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="text-[10px] text-center text-neutral-400 pt-1"
          >
            By clicking, you agree to our Terms & Privacy Policy.
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { X } from "lucide-react";

// Define possible animation types for better TypeScript support
type AnimationType = "tween" | "spring" | "just";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Custom class for the content container (e.g., width, padding) */
  contentClass?: string;
  /** If true, the modal opens as a sheet from the bottom (mobile default) */
  isSheet?: boolean;
  /** Animation type for the modal content ('tween', 'spring', or 'just') */
  animationType?: AnimationType;
  /** Duration in seconds for tween animation or stiffness for spring */
  animationConfig?: number | Transition;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  contentClass = "md:w-[400px] p-6",
  isSheet = false,
  animationType = "spring", // Default to spring
  animationConfig,
}: BaseModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Determine the transition object based on props
  const getTransition = (): Transition => {
    if (typeof animationConfig === "object") {
      return animationConfig;
    }

    if (animationType === "tween") {
      return { type: "tween", duration: (animationConfig as number) || 0.3 };
    }

    // Default to spring transition
    return {
      type: "spring",
      stiffness: (animationConfig as number) || 300,
      damping: 30,
    };
  };

  const transition = getTransition();

  // Define motion properties based on sheet mode
  const contentMotionProps = {
    initial: isSheet ? { y: "100%" } : { opacity: 0, y: 50 },
    animate: isSheet ? { y: 0 } : { opacity: 1, y: 0 },
    exit: isSheet ? { y: "100%", opacity: 0 } : { opacity: 0, y: 50 },
    transition: transition,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            {...contentMotionProps} // Apply dynamic animation props
            className={`relative bg-white md:rounded-3xl rounded-t-[2rem] w-full max-h-[90vh] overflow-y-auto ${contentClass}`}
          >
            {/* Close Button (Desktop Only) */}
            <button
              onClick={onClose}
              className="hidden md:block absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

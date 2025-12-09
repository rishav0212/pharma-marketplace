"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryProps {
  images: string[];
}

export default function AutoScrollGallery({ images }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic (slower, smoother)
  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Stage - Reduced Aspect Ratio for "Smaller" feel */}
      <div className="relative aspect-[16/10] w-full bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
        {/* Subtle texture background */}
        <div className="absolute inset-0 bg-neutral-50/30" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 p-6 flex items-center justify-center"
          >
            <Image
              src={images[index] || "/placeholder.png"}
              alt="Product view"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimal Controls */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prev}
              className="p-1.5 rounded-full bg-white/90 shadow-sm border border-neutral-100 hover:scale-105 transition-transform"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={next}
              className="p-1.5 rounded-full bg-white/90 shadow-sm border border-neutral-100 hover:scale-105 transition-transform"
            >
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        )}

        {/* Zoom Icon (Top Right) */}
        <button className="absolute top-3 right-3 p-1.5 bg-white/50 hover:bg-white rounded-lg text-neutral-400 hover:text-neutral-700 transition-all">
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 flex">
          {images.map((_, idx) => (
            <div
              key={idx}
              className="h-full flex-1 transition-all duration-500 relative overflow-hidden"
            >
              {idx === index && (
                <motion.div
                  layoutId="active-slide"
                  className="absolute inset-0 bg-[var(--brand-primary)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ ease: "linear", duration: 4 }} // Matches interval
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails Row (Optional - keeping it clean for now) */}
    </div>
  );
}

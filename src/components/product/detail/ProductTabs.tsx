"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, List, AlertCircle } from "lucide-react";
import { Product } from "@/types";

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc");

  return (
    <div className="bg-white rounded-[2rem] border border-neutral-200 shadow-sm overflow-hidden min-h-[300px]">
      {/* Clean Tab Header */}
      <div className="flex border-b border-neutral-100">
        <button
          onClick={() => setActiveTab("desc")}
          className={`flex-1 py-5 text-sm font-bold tracking-wide relative transition-colors ${
            activeTab === "desc"
              ? "text-primary-700 bg-primary-50/30"
              : "text-neutral-500 hover:bg-neutral-50"
          }`}
        >
          Description
          {activeTab === "desc" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`flex-1 py-5 text-sm font-bold tracking-wide relative transition-colors ${
            activeTab === "specs"
              ? "text-primary-700 bg-primary-50/30"
              : "text-neutral-500 hover:bg-neutral-50"
          }`}
        >
          Additional Specs
          {activeTab === "specs" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
            />
          )}
        </button>
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "desc" ? (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="prose prose-neutral prose-sm max-w-none text-neutral-600"
            >
              {/* Side Effects & Storage Info as Text Blocks */}
              <h4 className="text-neutral-900 font-bold mb-2">Pharmacology</h4>
              <p className="mb-6">{product.description}</p>

              {product.details?.sideEffects && (
                <>
                  <h4 className="text-neutral-900 font-bold mb-2">
                    Common Side Effects
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 list-none p-0 m-0 mb-6">
                    {product.details.sideEffects.map((effect, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs before:content-['•'] before:text-neutral-300"
                      >
                        {effect}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-xs leading-relaxed">
                <strong>Storage:</strong> {product.details?.storage}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                {product.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-0"
                  >
                    <span className="text-xs font-bold text-neutral-400 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";

const tabs = [
  { id: "about", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact Info" },
];

export default function Nav() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                document
                  .getElementById(tab.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[var(--brand-color)] text-[var(--brand-color)]"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

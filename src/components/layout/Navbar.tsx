// src/components/layout/Navbar.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Search, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const pathname = usePathname();

  // Check if we are on a company profile page
  const isCompanyPage = pathname?.startsWith("/company/");

  return (
    <nav
      className={`z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all duration-300 ${
        // If on company page, make it relative (scrolls away). Otherwise, sticky (stays on top).
        isCompanyPage ? "relative" : "sticky top-0"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 logo-placeholder group-hover:shadow-primary-glow transition-all duration-300">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-display font-bold text-xl text-neutral-900 hidden sm:block">
                PharmaConnect
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="/companies"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                Companies
              </a>
              <a
                href="/products"
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                Products
              </a>
              <div className="relative group">
                <button className="flex items-center gap-1 text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      Cardiovascular
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      Diabetes Care
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      Antibiotics
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      Pain Relief
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            <button className="hidden md:block btn-gradient">
              List Your Company
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        {searchOpen && (
          <div className="py-4 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search companies, products, categories..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 animate-slide-up">
            <div className="flex flex-col gap-2">
              <a
                href="/companies"
                className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium transition-colors"
              >
                Companies
              </a>
              <a
                href="/products"
                className="px-4 py-3 text-neutral-700 hover:bg-neutral-50 rounded-lg font-medium transition-colors"
              >
                Products
              </a>
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-neutral-500 mb-2">
                  Categories
                </div>
                <div className="flex flex-col gap-1 ml-4">
                  <a
                    href="#"
                    className="py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    Cardiovascular
                  </a>
                  <a
                    href="#"
                    className="py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    Diabetes Care
                  </a>
                  <a
                    href="#"
                    className="py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                  >
                    Antibiotics
                  </a>
                </div>
              </div>
              <button className="mt-2 btn-gradient w-full">
                List Your Company
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

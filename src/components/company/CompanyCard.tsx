import React from "react";
import {
  MapPin,
  Package,
  CheckCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface CompanyCardProps {
  company: {
    id: string;
    slug: string;
    name: string;
    description: string;
    logo: string;
    verified: boolean;
    location: {
      city: string;
      state: string;
    };
    stats: {
      products: number;
      yearsInBusiness: number;
    };
    categories: string[];
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <a href={`/companies/${company.slug}`} className="block group">
      <div className="card-hover p-6 h-full flex flex-col relative overflow-hidden">
        {/* Gradient Border Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo */}
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {company.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Name & Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-lg text-neutral-900 truncate group-hover:text-primary-600 transition-colors">
                {company.name}
              </h3>
              {company.verified && (
                <div className="flex-shrink-0 relative">
                  <CheckCircle
                    className="w-5 h-5 text-success-500"
                    fill="currentColor"
                  />
                  <div className="absolute inset-0 bg-success-400 blur-sm opacity-50 animate-pulse"></div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-neutral-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>
                {company.location.city}, {company.location.state}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">
          {company.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {company.categories.slice(0, 2).map((category) => (
            <span key={category} className="badge badge-primary text-xs">
              {category}
            </span>
          ))}
          {company.categories.length > 2 && (
            <span className="badge bg-neutral-100 text-neutral-600 text-xs">
              +{company.categories.length - 2} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-primary-500" />
            <span className="text-neutral-600">
              <span className="font-semibold text-neutral-900">
                {company.stats.products}
              </span>{" "}
              Products
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-accent-500" />
            <span className="text-neutral-600">
              <span className="font-semibold text-neutral-900">
                {company.stats.yearsInBusiness}
              </span>{" "}
              Years
            </span>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-primary-600 font-medium text-sm">
            View Profile
          </span>
          <ArrowRight className="w-5 h-5 text-primary-600 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );
}

// Example Usage Component
export function CompanyCardExample() {
  const exampleCompany = {
    id: "1",
    slug: "apex-pharmaceuticals",
    name: "Apex Pharmaceuticals",
    description:
      "Leading manufacturer of generic medicines with 25+ years of excellence in pharmaceutical manufacturing.",
    logo: "/logos/apex-pharma.svg",
    verified: true,
    location: {
      city: "Mumbai",
      state: "Maharashtra",
    },
    stats: {
      products: 150,
      yearsInBusiness: 25,
    },
    categories: ["Cardiovascular", "Diabetes Care", "Antibiotics"],
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Company Card Example</h2>
        <CompanyCard company={exampleCompany} />
      </div>
    </div>
  );
}

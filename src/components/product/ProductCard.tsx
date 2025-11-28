import React from "react";
import { Package, Star, CheckCircle, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    images: string[];
    company: {
      name: string;
      logo: string;
    };
    category: string;
    pricing: {
      minPrice: number;
      currency: string;
      unit: string;
    };
    availability: "in_stock" | "out_of_stock" | "on_demand";
    featured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const availabilityConfig = {
    in_stock: { label: "In Stock", color: "text-success-600 bg-success-50" },
    out_of_stock: {
      label: "Out of Stock",
      color: "text-error-600 bg-error-50",
    },
    on_demand: { label: "On Demand", color: "text-warning-600 bg-warning-50" },
  };

  const availability = availabilityConfig[product.availability];

  return (
    <a href={`/products/${product.slug}`} className="block group">
      <div className="card-hover overflow-hidden h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
          {/* Placeholder Image with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-accent-50 to-neutral-100 flex items-center justify-center">
            <Package className="w-20 h-20 text-neutral-300 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.featured && (
              <span className="badge badge-gradient shadow-md">
                <Star className="w-3 h-3" fill="currentColor" />
                <span className="ml-1">Featured</span>
              </span>
            )}
            <span className={`badge ${availability.color} shadow-md`}>
              {availability.label}
            </span>
          </div>

          {/* Quick View Button - Shows on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-white text-neutral-900 font-medium py-2 px-4 rounded-lg hover:bg-neutral-100 transition-colors duration-200 flex items-center justify-center gap-2">
                <span>Quick View</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Company */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {product.company.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-neutral-500 truncate">
              {product.company.name}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>

          {/* Category */}
          <span className="inline-block badge badge-primary mb-3 w-fit">
            {product.category}
          </span>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
            <div>
              <div className="text-xs text-neutral-500 mb-1">Starting from</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-neutral-900">
                  ₹{product.pricing.minPrice}
                </span>
                <span className="text-sm text-neutral-500">
                  /{product.pricing.unit}
                </span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// Example Usage Component
export function ProductCardExample() {
  const exampleProduct = {
    id: "1",
    slug: "atorvastatin-20mg",
    name: "Atorvastatin 20mg Tablets",
    images: ["/images/products/atorvastatin-1.jpg"],
    company: {
      name: "Apex Pharmaceuticals",
      logo: "/logos/apex-pharma.svg",
    },
    category: "Cardiovascular",
    pricing: {
      minPrice: 120,
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock" as const,
    featured: true,
  };

  const exampleProduct2 = {
    id: "2",
    slug: "metformin-500mg",
    name: "Metformin HCl 500mg Extended Release Tablets",
    images: ["/images/products/metformin-1.jpg"],
    company: {
      name: "BioTech Solutions",
      logo: "/logos/biotech.svg",
    },
    category: "Diabetes Care",
    pricing: {
      minPrice: 80,
      currency: "INR",
      unit: "strip",
    },
    availability: "on_demand" as const,
    featured: false,
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Product Card Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard product={exampleProduct} />
          <ProductCard product={exampleProduct2} />
        </div>
      </div>
    </div>
  );
}

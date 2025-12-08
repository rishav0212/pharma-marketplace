// src/types/index.ts

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  type: "marketing" | "retailer";
  verified: boolean;
  featured?: boolean;
  themeColor?: string;
  location: {
    city: string;
    state: string;
    country: string;
    address?: string; // Added address
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  stats: {
    products: number;
    yearsInBusiness: number;
    employees?: string;
    partners?: string; // Added partners count
  };
  categories: string[];
  certifications?: string[];
  // NEW: Marketing & Franchise Support Data
  support?: {
    heading: string;
    items: string[];
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images?: string[];
  companyId: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string;
  };
  categories: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  pricing: {
    minPrice: number;
    maxPrice?: number;
    currency: string;
    unit: string;
  };
  availability?: "in_stock" | "out_of_stock" | "on_demand";
  minOrderQuantity?: number;
  tags: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt?: string;
}
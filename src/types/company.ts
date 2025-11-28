// src/features/company/types.ts

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  type: "marketing" | "retailer";
  verified: boolean;
  featured: boolean;
  location: {
    city: string;
    state: string;
    country: string;
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
  };
  categories: string[];
  certifications: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// src/features/product/types.ts

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  companyId: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logo: string;
  };
  category: string;
  subCategory?: string;
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
  availability: "in_stock" | "out_of_stock" | "on_demand";
  minOrderQuantity: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// src/data/companies.ts

// import { Company } from '@/features/company/types';

export const companies: Company[] = [
  {
    id: "1",
    slug: "apex-pharmaceuticals",
    name: "Apex Pharmaceuticals",
    description:
      "Leading manufacturer of generic medicines with 25+ years of excellence in pharmaceutical manufacturing. Specialized in cardiovascular and diabetes care products.",
    logo: "/logos/apex-pharma.svg",
    coverImage: "/images/companies/apex-cover.jpg",
    type: "marketing",
    verified: true,
    featured: true,
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
    },
    contact: {
      email: "contact@apexpharma.com",
      phone: "+91 22 1234 5678",
      website: "https://apexpharma.com",
    },
    stats: {
      products: 150,
      yearsInBusiness: 25,
      employees: "500-1000",
    },
    categories: ["Cardiovascular", "Diabetes Care", "Antibiotics"],
    certifications: ["WHO-GMP", "ISO 9001:2015", "FDA Approved"],
    socialLinks: {
      linkedin: "https://linkedin.com/company/apex-pharma",
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-11-20T00:00:00Z",
  },
  {
    id: "2",
    slug: "medico-plus-retailers",
    name: "Medico Plus Retailers",
    description:
      "Premium pharmacy chain with 50+ outlets across North India. Your trusted partner for quality medicines and healthcare products.",
    logo: "/logos/medico-plus.svg",
    coverImage: "/images/companies/medico-cover.jpg",
    type: "retailer",
    verified: true,
    featured: true,
    location: {
      city: "Delhi",
      state: "Delhi",
      country: "India",
    },
    contact: {
      email: "info@medicoplusretailers.com",
      phone: "+91 11 9876 5432",
      website: "https://medicoplusretailers.com",
    },
    stats: {
      products: 5000,
      yearsInBusiness: 15,
      employees: "100-500",
    },
    categories: ["Pharmacy", "Healthcare Products", "Medical Devices"],
    certifications: ["Licensed Pharmacy", "ISO 9001:2015"],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-11-18T00:00:00Z",
  },
  {
    id: "3",
    slug: "biotech-solutions",
    name: "BioTech Solutions",
    description:
      "Innovative biotechnology company specializing in advanced drug formulations and research-backed pharmaceutical products.",
    logo: "/logos/biotech.svg",
    coverImage: "/images/companies/biotech-cover.jpg",
    type: "marketing",
    verified: true,
    featured: false,
    location: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    contact: {
      email: "hello@biotechsolutions.in",
      phone: "+91 80 5555 6666",
      website: "https://biotechsolutions.in",
    },
    stats: {
      products: 75,
      yearsInBusiness: 10,
      employees: "50-100",
    },
    categories: ["Biotechnology", "Research Products", "Specialty Medicines"],
    certifications: ["WHO-GMP", "ISO 13485:2016"],
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-11-15T00:00:00Z",
  },
];

// src/data/products.ts

// import { Product } from '@/features/product/types';

export const products: Product[] = [
  {
    id: "1",
    slug: "atorvastatin-20mg",
    name: "Atorvastatin 20mg Tablets",
    description:
      "High-quality generic atorvastatin tablets for cholesterol management. Clinically proven efficacy with excellent safety profile. Available in multiple pack sizes.",
    images: [
      "/images/products/atorvastatin-1.jpg",
      "/images/products/atorvastatin-2.jpg",
      "/images/products/atorvastatin-3.jpg",
    ],
    companyId: "1",
    company: {
      id: "1",
      name: "Apex Pharmaceuticals",
      slug: "apex-pharmaceuticals",
      logo: "/logos/apex-pharma.svg",
    },
    category: "Cardiovascular",
    subCategory: "Statins",
    specifications: [
      { label: "Strength", value: "20mg" },
      { label: "Form", value: "Tablet" },
      { label: "Pack Size", value: "10x10 Tablets" },
      { label: "Storage", value: "Store below 30°C" },
      { label: "Shelf Life", value: "36 months" },
    ],
    pricing: {
      minPrice: 120,
      maxPrice: 150,
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 100,
    tags: ["Cholesterol", "Heart Health", "Generic"],
    featured: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-11-20T00:00:00Z",
  },
  {
    id: "2",
    slug: "metformin-500mg",
    name: "Metformin HCl 500mg Tablets",
    description:
      "First-line treatment for type 2 diabetes. Extended-release formulation for better compliance and reduced side effects.",
    images: [
      "/images/products/metformin-1.jpg",
      "/images/products/metformin-2.jpg",
    ],
    companyId: "1",
    company: {
      id: "1",
      name: "Apex Pharmaceuticals",
      slug: "apex-pharmaceuticals",
      logo: "/logos/apex-pharma.svg",
    },
    category: "Diabetes Care",
    subCategory: "Oral Hypoglycemics",
    specifications: [
      { label: "Strength", value: "500mg" },
      { label: "Form", value: "Extended Release Tablet" },
      { label: "Pack Size", value: "10x15 Tablets" },
      { label: "Storage", value: "Store at room temperature" },
      { label: "Shelf Life", value: "24 months" },
    ],
    pricing: {
      minPrice: 80,
      maxPrice: 100,
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 200,
    tags: ["Diabetes", "Blood Sugar", "Generic"],
    featured: true,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-11-19T00:00:00Z",
  },
  {
    id: "3",
    slug: "amoxicillin-500mg",
    name: "Amoxicillin 500mg Capsules",
    description:
      "Broad-spectrum antibiotic for bacterial infections. High bioavailability and excellent tolerability profile.",
    images: ["/images/products/amoxicillin-1.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "Apex Pharmaceuticals",
      slug: "apex-pharmaceuticals",
      logo: "/logos/apex-pharma.svg",
    },
    category: "Antibiotics",
    subCategory: "Penicillins",
    specifications: [
      { label: "Strength", value: "500mg" },
      { label: "Form", value: "Capsule" },
      { label: "Pack Size", value: "10x10 Capsules" },
      { label: "Storage", value: "Store in cool, dry place" },
      { label: "Shelf Life", value: "24 months" },
    ],
    pricing: {
      minPrice: 150,
      maxPrice: 180,
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 50,
    tags: ["Antibiotic", "Infection", "Generic"],
    featured: false,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-11-18T00:00:00Z",
  },
];

import { Product } from "@/types";

export const dmPharmaProducts: Product[] = [
  {
    id: "101",
    slug: "mv-clav-625",
    name: "Mv-Clav 625 Tablets",
    description:
      "Premium quality Amoxycillin 500mg + Potassium Clavulanate 125mg tablets.",
    images: ["/images/products/mv-clav.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Antibiotics",
    subCategory: "Penicillin",
    specifications: [
      {
        label: "Composition",
        value: "Amoxycillin 500mg + Clavulanic Acid 125mg",
      },
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "10x6 Alu-Alu" },
    ],
    pricing: { minPrice: 180, currency: "INR", unit: "strip" },
    availability: "in_stock",
    minOrderQuantity: 50,
    tags: ["Antibiotic", "Bacterial Infection", "WHO-GMP"],
    featured: true,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "102",
    slug: "pantoprazole-domperidone-capsules",
    name: "Pantoprazole & Domperidone Capsules",
    description: "Effective relief from acidity and heartburn.",
    images: ["/images/products/panto-d.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Gastrointestinal",
    subCategory: "Acidity",
    specifications: [
      { label: "Composition", value: "Pantoprazole 40mg + Domperidone 30mg" },
      { label: "Form", value: "Capsule" },
      { label: "Packing", value: "10x10 Alu-Alu" },
    ],
    pricing: { minPrice: 95, currency: "INR", unit: "strip" },
    availability: "in_stock",
    minOrderQuantity: 100,
    tags: ["Acidity", "Gastritis"],
    featured: false,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "103",
    slug: "d-zithro-500",
    name: "D Zithro 500 Tablets",
    description:
      "High-quality Azithromycin 500mg tablets. A macrolide antibiotic used for treating respiratory tract, ear, nose, throat, skin, and soft tissue infections.",
    images: ["/images/products/d-zithro.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Antibiotics",
    subCategory: "Macrolides",
    specifications: [
      { label: "Composition", value: "Azithromycin 500mg" },
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "3 Tablets/Strip" }, // Standard Azithromycin pack
    ],
    pricing: {
      minPrice: 70, // Estimated based on market average for Azithromycin 500mg 3's
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 50,
    tags: ["Antibiotic", "Throat Infection", "Respiratory"],
    featured: false,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "104",
    slug: "paradin-650",
    name: "Paradin 650 Tablets",
    description:
      "Effective analgesic and antipyretic containing Paracetamol 650mg. Provides fast relief from fever, headache, muscle ache, and mild to moderate pain.",
    images: ["/images/products/paradin-650.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Pain Relief",
    subCategory: "Analgesics",
    specifications: [
      { label: "Composition", value: "Paracetamol 650mg" },
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "10x10 Blister" }, //
    ],
    pricing: {
      minPrice: 20, // Based on MRP mentioned in search
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 100,
    tags: ["Fever", "Pain Killer", "OTC"],
    featured: false,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "105",
    slug: "sytolin-500",
    name: "Sytolin 500 Tablets",
    description:
      "Neuro-protective Citicoline 500mg tablets. Used to support cognitive function, stroke recovery, and treatment of head injuries and age-related memory loss.",
    images: ["/images/products/sytolin.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Neurology",
    subCategory: "Nootropics",
    specifications: [
      { label: "Composition", value: "Citicoline 500mg" },
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "10x10 Alu-Alu" }, //
    ],
    pricing: {
      minPrice: 350, // Estimate for Citicoline
      currency: "INR",
      unit: "strip",
    },
    availability: "on_demand",
    minOrderQuantity: 20,
    tags: ["Brain Health", "Stroke", "Memory"],
    featured: true,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "106",
    slug: "fawet-s-1-5g",
    name: "Fawet-S 1.5g Injection",
    description:
      "Potent antibiotic injection combining Ceftriaxone 1000mg and Sulbactam 500mg. Highly effective against resistant bacterial infections.",
    images: ["/images/products/fawet-s.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Injectables",
    subCategory: "Antibiotics",
    specifications: [
      { label: "Composition", value: "Ceftriaxone 1000mg + Sulbactam 500mg" }, //
      { label: "Form", value: "Dry Powder Injection" },
      { label: "Packing", value: "Single Vial + WFI" },
    ],
    pricing: {
      minPrice: 90,
      currency: "INR",
      unit: "vial",
    },
    availability: "in_stock",
    minOrderQuantity: 50,
    tags: ["Injection", "Critical Care", "Hospital Supply"],
    featured: false,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "107",
    slug: "amlodin-5",
    name: "Amlodin 5 Tablets",
    description:
      "Amlodipine 5mg tablets for the management of hypertension (high blood pressure) and angina. Helps reduce workload on the heart.",
    images: ["/images/products/amlodin.jpg"],
    companyId: "1",
    company: {
      id: "1",
      name: "DM Pharma Marketing Pvt Ltd",
      slug: "dm-pharma",
      logo: "/logos/dm-pharma.png",
    },
    category: "Cardiovascular",
    subCategory: "Anti-Hypertensive",
    specifications: [
      { label: "Composition", value: "Amlodipine 5mg" }, //
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "10x10 Blister" },
    ],
    pricing: {
      minPrice: 16, // Verified price from DM Pharma site
      currency: "INR",
      unit: "strip",
    },
    availability: "in_stock",
    minOrderQuantity: 100,
    tags: ["Blood Pressure", "Heart Health", "Daily Meds"],
    featured: false,
    createdAt: "2024-12-08T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
];

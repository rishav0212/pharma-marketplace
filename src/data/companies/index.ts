import { Company } from "@/types";

export const companies: Company[] = [
  {
    id: "1",
    slug: "dm-pharma",
    name: "DM Pharma Marketing Pvt Ltd",
    description:
      "A leading pharmaceutical company established in 2007, operating 4 world-class manufacturing units. We are a WHO-GMP & ISO 9001:2008 certified company exporting to Nepal, Afghanistan, and Australia.",
    logo: "/companies/dmpharma-logo.png",

    type: "marketing",
    verified: true,
    featured: true,
    location: {
      city: "Chandigarh",
      state: "Chandigarh",
      country: "India",
      address: "SCO-177, Sector-38C, 160036",
    },
    themeColor: "#dc2626",
    contact: {
      email: "saarbiotechda@gmail.com",
      phone: "+91 987 255 4244",
      website: "https://www.dmpharmachd.com",
    },
    stats: {
      products: 300,
      yearsInBusiness: 17,
      employees: "100-500",
      partners: "1500+",
    },
    categories: [
      "Tablets",
      "Capsules",
      "Injections",
      "Syrups",
      "Ayurvedic",
      "Soft Gel",
      "Ointments",
    ],
    certifications: [
      "WHO-GMP",
      "ISO 9001:2008",
      "GLP Certified",
      "Udyog Patra Award",
    ],
    // NEW: Added based on website offerings
    support: {
      heading: "Franchise & Marketing Support",
      items: [
        "Monopoly Rights",
        "Visual Aids & LBLs",
        "MR Bags & Catch Covers",
        "Reminder Cards",
        "Sample Kits",
        "Festive Gifts for Doctors",
      ],
    },
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/dm-pharma-marketing-pvt-ltd",
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-12-08T00:00:00Z",
  },
  {
    id: "2",
    slug: "medico-plus-retailers",
    name: "Medico Plus Retailers",
    description:
      "Premium pharmacy chain with 50+ outlets across North India. Your trusted partner for quality medicines and healthcare products.",

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

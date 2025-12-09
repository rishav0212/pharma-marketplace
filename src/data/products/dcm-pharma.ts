import { Product } from "@/types";

export const dcmPharmaCompanyId = "2";
export const dcmPharmaProducts: Product[] = [
  // --- TABLETS ---
  {
    id: "dcm-tab-001",
    slug: "dcm-ccm",
    name: "DCM CCM Tablets",
    description:
      "Comprehensive bone health formula combining Calcium Citrate Malate, Vitamin D3, and Folic Acid. Effective for treating hypocalcemia, osteomalacia, and rickets.",
    images: [
      "/companies/dcm-pharma/dcm-ccm-bottle.png",
      "/companies/dcm-pharma/dcm-ccm-label.png",
    ],
    customSections: [
      {
        title: "Clinical Studies",
        content:
          "In a randomized double-blind study, Calcium Citrate Malate showed 2.5x better absorption than Calcium Carbonate...",
      },
      {
        title: "Quality Certifications",
        content: "• ISO 9001:2015 Certified\n• WHO-GMP Compliant Facility",
      },
    ],
    companyId: "2",

    categories: ["Tablets", "Supplements", "Bone Health"],
    specifications: [
      {
        label: "Composition",
        value:
          "Calcium Citrate Malate 250mg + Vitamin D3 100 IU + Folic Acid 50mcg",
      },
      { label: "Form", value: "Tablet" },
      { label: "Packing", value: "40 Tablets (Bottle)" },
      { label: "Therapeutic Class", value: "Calcium Supplement" },
    ],
    pricing: {
      minPrice: 450,
      currency: "INR",
      unit: "bottle",
    },
    availability: "in_stock",
    tags: ["Calcium", "Osteoporosis", "Pregnancy Care", "Vitamin D3"],
    featured: true,
    createdAt: "2024-03-10T00:00:00Z",

    details: {
      form: "Film Coated Tablet",
      indications: [
        "Hypocalcemia (Low Calcium)",
        "Osteomalacia & Rickets",
        "Senile Osteoporosis",
        "Post-Menopausal Osteoporosis",
        "Tetany",
        "Hypoparathyroidism",
      ],
      composition: [
        {
          salt: "Calcium Citrate Malate",
          strength: "250 mg",
          class: "Calcium Salt",
          description:
            "Highly bioavailable calcium source that increases bone mineral density.",
        },
        {
          salt: "Vitamin D3 (Cholecalciferol)",
          strength: "100 IU",
          class: "Vitamin",
          description:
            "Enhances calcium absorption from the gastrointestinal tract.",
        },
        {
          salt: "Folic Acid",
          strength: "50 mcg",
          class: "Vitamin B9",
          description:
            "Essential for DNA synthesis and red blood cell formation.",
        },
      ],
      packaging: {
        type: "HDPE Bottle",
        size: "40 Tablets",
      },
      storage: "Store in a cool, dry place. Protect from light and moisture.",
      dosage: "As directed by the Physician. Typically 1-2 tablets daily.",
      sideEffects: ["Nausea", "Constipation", "Stomach upset", "Flatulence"],
      shelfLife: "24 Months",
    },
  },
  {
    id: "dcm-tab-002",
    slug: "dycotif-plus",
    name: "Dycotif Plus",
    description: "Effective analgesic for pain and inflammation.",
    companyId: "2",

    categories: ["Tablets", "Pain Relief"],
    specifications: [
      { label: "Composition", value: "Diclofenac 50mg + Paracetamol 325mg" },
      { label: "Form", value: "Tablet" },
    ],
    pricing: { minPrice: 30, currency: "INR", unit: "strip" },
    availability: "in_stock",
    tags: ["Pain Relief", "Fever"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-tab-003",
    slug: "umoxtif-cl-625",
    name: "Umoxtif-CL 625",
    description: "Broad spectrum antibiotic for bacterial infections.",
    companyId: "2",

    categories: ["Tablets", "Antibiotics"],
    specifications: [
      {
        label: "Composition",
        value: "Amoxycillin 500mg + Clavulanic Acid 125mg",
      },
      { label: "Form", value: "Tablet" },
    ],
    pricing: { minPrice: 200, currency: "INR", unit: "strip" },
    availability: "in_stock",
    tags: ["Antibiotic", "Infection"],
    featured: true,
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-tab-004",
    slug: "levotrijeen-m",
    name: "Levotrijeen-M",
    description: "Advanced anti-allergic formula.",
    companyId: "2",

    categories: ["Tablets", "Respiratory"],
    specifications: [
      { label: "Composition", value: "Levocetirizine 5mg + Montelukast 10mg" },
      { label: "Form", value: "Tablet" },
    ],
    pricing: { minPrice: 103, currency: "INR", unit: "strip" },
    availability: "in_stock",
    tags: ["Allergy", "Cold"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-tab-005",
    slug: "thyporox-100",
    name: "Thyporox 100",
    description: "Thyroxine sodium tablets for thyroid management.",
    companyId: "2",

    categories: ["Tablets", "Hormones"],
    specifications: [
      { label: "Composition", value: "Thyroxine Sodium 100mcg" },
      { label: "Form", value: "Tablet" },
    ],
    pricing: { minPrice: 161, currency: "INR", unit: "bottle" },
    availability: "in_stock",
    tags: ["Thyroid", "Hormonal"],
    createdAt: "2024-03-10T00:00:00Z",
  },

  // --- SOFT GELS ---
  {
    id: "dcm-soft-001",
    slug: "yanclear-breathe",
    name: "Yanclear Breathe",
    description: "Softgel capsules for respiratory relief.",
    companyId: "2",

    categories: ["Soft Gel", "Respiratory"],
    specifications: [
      {
        label: "Composition",
        value: "Camphor, Chlorthymol, Eucalyptol, Menthol",
      },
      { label: "Form", value: "Soft Gel" },
    ],
    pricing: { minPrice: 360, currency: "INR", unit: "box" },
    availability: "in_stock",
    tags: ["Cold", "Congestion"],
    featured: true,
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-soft-002",
    slug: "tocalgen-60k",
    name: "Tocalgen-60K",
    description: "High dose Vitamin D3 softgels.",
    companyId: "2",

    categories: ["Soft Gel", "Supplements"],
    specifications: [
      { label: "Composition", value: "Cholecalciferol 60,000 IU" },
      { label: "Form", value: "Soft Gel" },
    ],
    pricing: { minPrice: 140, currency: "INR", unit: "strip" },
    availability: "in_stock",
    tags: ["Vitamin D3", "Bones"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-soft-003",
    slug: "salofish-1000",
    name: "Salofish-1000",
    description: "Premium Salmon Fish Oil Omega-3 supplement.",
    companyId: "2",

    categories: ["Soft Gel", "Nutraceuticals"],
    specifications: [
      { label: "Composition", value: "Salmon Fish Oil 1000mg" },
      { label: "Form", value: "Soft Gel" },
    ],
    pricing: { minPrice: 987, currency: "INR", unit: "bottle" },
    availability: "in_stock",
    tags: ["Omega-3", "Heart Health"],
    createdAt: "2024-03-10T00:00:00Z",
  },

  // --- DERMA & TOPICAL ---
  {
    id: "dcm-derma-001",
    slug: "minrist-5",
    name: "Minrist 5%",
    description: "Topical solution for hair regrowth.",
    companyId: "2",

    categories: ["Derma", "Hair Care"],
    specifications: [
      { label: "Composition", value: "Minoxidil 5% w/v" },
      { label: "Form", value: "Lotion" },
    ],
    pricing: { minPrice: 835, currency: "INR", unit: "bottle" },
    availability: "in_stock",
    tags: ["Hair Loss", "Alopecia"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-derma-002",
    slug: "kojicment-gel",
    name: "Kojicment Gel",
    description: "Skin brightening and depigmentation gel.",
    companyId: "2",

    categories: ["Derma", "Cosmetics"],
    specifications: [
      {
        label: "Composition",
        value: "Kojic Acid, Arbutin, Mulberry Extract, Vitamin E",
      },
      { label: "Form", value: "Gel" },
    ],
    pricing: { minPrice: 315, currency: "INR", unit: "tube" },
    availability: "in_stock",
    tags: ["Skin Care", "Beauty"],
    featured: true,
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-derma-003",
    slug: "yoniscab-pmr",
    name: "Yoniscab PMR",
    description: "Anti-scabies cream.",
    companyId: "2",

    categories: ["Derma", "Ointments"],
    specifications: [
      { label: "Composition", value: "Permethrin 5% w/w" },
      { label: "Form", value: "Cream" },
    ],
    pricing: { minPrice: 58, currency: "INR", unit: "tube" },
    availability: "in_stock",
    tags: ["Scabies", "Anti-Parasitic"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-derma-004",
    slug: "sohneya-sunscreen",
    name: "Sohneya Sunscreen",
    description: "Broad spectrum UV protection.",
    companyId: "2",

    categories: ["Derma", "Cosmetics"],
    specifications: [
      { label: "Composition", value: "Octinoxate, Avobenzone, Vitamin E" },
      { label: "Form", value: "Lotion" },
    ],
    pricing: { minPrice: 320, currency: "INR", unit: "tube" },
    availability: "in_stock",
    tags: ["Sun Care", "SPF"],
    createdAt: "2024-03-10T00:00:00Z",
  },

  // --- SYRUPS ---
  {
    id: "dcm-syr-001",
    slug: "quitkof-am",
    name: "Quitkof-AM",
    description: "Cough syrup for wet cough.",
    companyId: "2",

    categories: ["Syrups", "Respiratory"],
    specifications: [
      {
        label: "Composition",
        value: "Ambroxol, Terbutaline, Guaiphenesin, Menthol",
      },
      { label: "Form", value: "Syrup" },
    ],
    pricing: { minPrice: 85, currency: "INR", unit: "bottle" },
    availability: "in_stock",
    tags: ["Cough", "Cold"],
    createdAt: "2024-03-10T00:00:00Z",
  },
  {
    id: "dcm-syr-002",
    slug: "cyclailth",
    name: "Cyclailth Syrup",
    description: "Herbal uterine tonic for women.",
    companyId: "2",

    categories: ["Syrups", "Ayurvedic"],
    specifications: [
      { label: "Composition", value: "Ashoka, Lodhra, Amla, Haritaki" },
      { label: "Form", value: "Syrup" },
    ],
    pricing: { minPrice: 85, currency: "INR", unit: "bottle" },
    availability: "in_stock",
    tags: ["Women Health", "Herbal"],
    createdAt: "2024-03-10T00:00:00Z",
  },
];

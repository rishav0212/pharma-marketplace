// src/app/companies/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import { products } from "@/data/products";
import CompanyProfileLayout from "@/components/company/CompanyProfileLayout";

export async function generateStaticParams() {
  return companies.map((company) => ({
    slug: company.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  const companyProducts = products.filter((p) => p.companyId === company.id);

  return <CompanyProfileLayout company={company} products={companyProducts} />;
}

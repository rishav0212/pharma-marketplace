// src/app/company/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import { products } from "@/data/products";
import ProfileLayout from "@/components/company/ProfileLayout";

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
  
  // DEFAULT LOGIC: Use company themeColor if available, otherwise website default (Primary Blue)
  const brandColor = company.themeColor || "#0ea5e9"; 

  return (
    <div
      style={
        {
          "--brand-primary": brandColor,
          "--brand-soft": `${brandColor}15`, // 15% opacity
          "--brand-glow": `${brandColor}60`, // 60% opacity
        } as React.CSSProperties
      }
      className="min-h-screen bg-neutral-50"
    >
      <ProfileLayout company={company} products={companyProducts} />
    </div>
  );
}
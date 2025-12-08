// src/app/company/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { companies } from "@/data/companies";
import { products } from "@/data/products";
import ProfileLayout from "@/components/company/ProfileLayout";

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
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    // We inject the color as a variable, but we won't use it for heavy backgrounds blindly
    <div
      style={
        {
          "--brand-primary": brandColor,
          "--brand-soft": `${brandColor}15`, // 15% opacity for soft backgrounds
          "--brand-glow": `${brandColor}60`, // 60% opacity for shadows/glows
        } as React.CSSProperties
      }
      className="min-h-screen bg-[#F8F9FC]"
    >
      <ProfileLayout company={company} products={companyProducts} />
    </div>
  );
}

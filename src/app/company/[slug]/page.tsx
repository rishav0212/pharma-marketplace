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

  // Brand color: use company themeColor or a calm, professional blue
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div
      style={
        {
          "--brand-primary": brandColor,
          "--brand-soft": `${brandColor}15`,
          "--brand-glow": `${brandColor}40`,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[#f5f5f7]"
    >
      {/* Subtle page background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-10 w-[420px] h-[420px] rounded-full bg-[var(--brand-soft)] blur-3xl opacity-70" />
        <div className="absolute bottom-[-200px] right-0 w-[520px] h-[520px] rounded-full bg-white blur-3xl opacity-80" />
      </div>

      <ProfileLayout company={company} products={companyProducts} />
    </div>
  );
}

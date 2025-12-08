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

  // Use brand color or fallback to professional blue
  const brandColor = company.themeColor || "#0ea5e9";

  return (
    <div
      style={
        {
          "--brand-primary": brandColor,
          // Background tint (very subtle)
          "--brand-soft": `color-mix(in srgb, ${brandColor}, white 95%)`,
          // Border/Accent tint
          "--brand-accent": `color-mix(in srgb, ${brandColor}, white 85%)`,
          // Stronger glow effect
          "--brand-glow": `${brandColor}40`,
        } as React.CSSProperties
      }
      className="min-h-screen bg-[#f8f9fa] selection:bg-[var(--brand-primary)] selection:text-white"
    >
      {/* Page Background Grain Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <ProfileLayout company={company} products={companyProducts} />
    </div>
  );
}

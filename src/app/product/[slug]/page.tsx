import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { companies } from "@/data/companies";
import ProductDetailLayout from "@/components/product/detail/ProductDetailLayout";

// This file is now purely for Data Fetching & SEO
// All UI logic is in ProductDetailLayout

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Product
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // 2. Fetch Company
  const company = companies.find((c) => c.id === product.companyId);
  if (!company) notFound();

  // 3. Render Layout
  return <ProductDetailLayout product={product} company={company} />;
}



export const dynamicParams = true;
export const revalidate = 3600;
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS_DATA } from "@/data/products-data";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = PRODUCTS_DATA[params.slug];
  if (!product) {
    return {
      title: "Product Not Found | Krynex Labs",
    };
  }

  return {
    title: `${product.name} | ${product.shortTagline} | Krynex Labs`,
    description: product.summary,
    alternates: {
      canonical: `https://www.krynexlabs.in/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — ${product.shortTagline}`,
      description: product.summary,
      url: `https://www.krynexlabs.in/products/${product.slug}`,
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS_DATA[params.slug];
  if (!product) {
    return notFound();
  }

  return <ProductDetailView product={product} />;
}

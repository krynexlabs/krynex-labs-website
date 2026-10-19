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
    title: `${product.name} | ${product.shortTagline}`,
    description: product.summary,
    alternates: {
      canonical: `https://www.krynexlabs.in/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — ${product.shortTagline}`,
      description: product.summary,
      url: `https://www.krynexlabs.in/products/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — ${product.shortTagline}`,
      description: product.summary,
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS_DATA[params.slug];
  if (!product) {
    return notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.krynexlabs.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.krynexlabs.in/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://www.krynexlabs.in/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}

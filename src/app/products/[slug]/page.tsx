import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/ProductDetailView";
import { PRODUCTS_DATA } from "@/data/products-data";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS_DATA[params.slug];
  if (!product) {
    return {
      title: "Product Not Found | Krynex Labs",
    };
  }

  return {
    title: `${product.name} | ${product.category} | Krynex Labs`,
    description: product.summary,
    alternates: {
      canonical: `https://www.krynexlabs.in/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Krynex Labs`,
      description: product.summary,
      url: `https://www.krynexlabs.in/products/${product.slug}`,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Krynex Labs`,
      description: product.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS_DATA[params.slug];

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

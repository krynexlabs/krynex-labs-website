import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsDirectory from "@/components/ProductsDirectory";
import { PRODUCTS_DATA } from "@/data/products-data";

export const metadata: Metadata = {
  title: "Software Products & Commercial Directory | Krynex Labs",
  description:
    "Explore Krynex Labs' portfolio of problem-driven SaaS products: Krynex LawOS for legal document automation, SolarOps, and Dastaveg.",
  alternates: {
    canonical: "https://www.krynexlabs.in/products",
  },
  openGraph: {
    title: "Software Products & Commercial Directory | Krynex Labs",
    description:
      "Explore Krynex Labs' portfolio of problem-driven SaaS products: Krynex LawOS for legal document automation, SolarOps, and Dastaveg.",
    url: "https://www.krynexlabs.in/products",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Products & Commercial Directory | Krynex Labs",
    description:
      "Explore Krynex Labs' portfolio of problem-driven SaaS products: Krynex LawOS for legal document automation, SolarOps, and Dastaveg.",
    images: ["/opengraph-image"],
  },
};

export default function ProductsPage() {
  const products = Object.values(PRODUCTS_DATA);

  return (
    <main className="min-h-screen bg-[#080B12] text-[#F8FAFC]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono tracking-widest text-blue-400 uppercase">
              PRODUCT PORTFOLIO // RECURRING SAAS
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-2 mb-4">
              Intelligent Software for Real-World Operations.
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed">
              We research industry bottlenecks, build practical software platforms, and deliver them through predictable recurring subscription access.
            </p>
          </div>

          <ProductsDirectory products={products} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

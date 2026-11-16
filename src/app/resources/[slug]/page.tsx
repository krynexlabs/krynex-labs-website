import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  technicalArticles,
  TechnicalArticle,
} from "@/data/articles-data";
import {
  ChevronRight,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  FileCheck,
  Shield,
  ExternalLink,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return technicalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = technicalArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Krynex Labs",
      description: "The requested technical resource could not be found.",
    };
  }

  const canonicalUrl = `https://www.krynexlabs.in/resources/${article.slug}`;

  return {
    title: `${article.title} | Krynex Labs Research`,
    description: article.summary,
    keywords: [
      ...article.keywords,
      "Krynex Labs Research",
      "Software Product Company Ahmedabad",
      "Enterprise Tech Whitepaper",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} | Krynex Labs`,
      description: article.summary,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${article.title} - Krynex Labs Whitepaper`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Krynex Labs`,
      description: article.summary,
      images: ["/opengraph-image"],
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const article = technicalArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `https://www.krynexlabs.in/resources/${article.slug}#article`,
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://www.krynexlabs.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Krynex Labs",
      logo: "https://www.krynexlabs.in/opengraph-image",
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.krynexlabs.in/resources/${article.slug}`,
    },
    keywords: article.keywords.join(", "),
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#FFFFFF]">
      <Navbar />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </li>
              <li className="text-white truncate max-w-[200px] sm:max-w-xs">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Category Badge & Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-6">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 font-semibold tracking-wider uppercase">
              {article.category}
            </span>
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="text-zinc-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
          </div>

          {/* EXACTLY ONE H1 HEADING */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Executive Summary Box */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
              <BookOpen className="w-4 h-4" />
              <span>EXECUTIVE RESEARCH SUMMARY</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
              {article.summary}
            </p>
          </div>

          {/* Article Body Sections */}
          <div className="space-y-12">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-zinc-400 font-mono text-base font-normal">
                    0{idx + 1}.
                  </span>
                  {section.heading.replace(/^\d+\.\s*/, "")}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Sources and Governance */}
          <div className="mt-16 pt-8 border-t border-white/[0.08]">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-zinc-500" />
              <span>Citations, Standards &amp; Empirical References</span>
            </h3>
            <ul className="space-y-2">
              {article.sources.map((src, idx) => (
                <li
                  key={idx}
                  className="text-xs font-mono text-zinc-500 flex items-center gap-2"
                >
                  <span className="text-zinc-400">[{idx + 1}]</span>
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Product Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                COMMERCIAL IMPLEMENTATION
              </span>
              <h4 className="text-lg font-bold text-white">
                Operated via {article.relatedProduct.name}
              </h4>
              <p className="text-xs text-zinc-400 max-w-md">
                Experience the production architecture described in this
                whitepaper deployed inside live enterprise environments.
              </p>
            </div>
            <Link
              href={article.relatedProduct.href}
              className="px-6 py-3 rounded-full bg-[#F5F5F5] hover:bg-white text-[#050505] font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2 whitespace-nowrap"
            >
              <span>{article.relatedProduct.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

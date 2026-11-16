"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { technicalArticles } from "@/data/articles-data";

export default function InsightsSection() {
  const articles = technicalArticles.slice(0, 3);

  return (
    <section id="insights" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.06] pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>10 // INSIGHTS &amp; RESOURCES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Engineering Whitepapers &amp; Industry Insights.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Explore practical research, technical architecture dossiers, and operational benchmarks produced by the Krynex Labs engineering team.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F5F5] text-[#050505] font-semibold text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>View All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.slug}
              className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.22] transition-all relative overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 font-semibold uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                <Link href={`/resources/${art.slug}`} className="block group/link">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover/link:text-zinc-200 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-sans line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {art.publishedDate}
                </span>
                <Link
                  href={`/resources/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white font-semibold"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

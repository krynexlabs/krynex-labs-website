"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageSquare, MapPin } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="relative bg-black border-t border-white/[0.08] text-white overflow-hidden">
      {/* Top Specular Rim */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Address Column */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block" aria-label="Krynex Labs Home">
              <KrynexLogo showTagline={true} />
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              We design custom AI solutions, scalable cloud systems, and enterprise software that solve real operational bottlenecks for modern businesses.
            </p>

            <div className="space-y-3 pt-2 text-xs text-zinc-400 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                <a
                  href="mailto:support@krynexlabs.in"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  support@krynexlabs.in
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-zinc-500 shrink-0" />
                <a
                  href="https://wa.me/919879418569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 9879418569 (Chat Only)
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Consultation Column */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">
              Start a Dialogue
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Have a technical hurdle or an engineering project to discuss? Connect directly with our team.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            &copy; {currentYear} Krynex Labs. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

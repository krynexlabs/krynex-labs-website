"use client";

import React from "react";
import { Metadata } from "next";
import { MapPin, Mail, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import OrbitalGlobeScene from "@/components/canvas/OrbitalGlobeScene";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* ======================================================== */}
      {/* HERO & CONTACT SECTION (2-Column Layout)                 */}
      {/* ======================================================== */}
      <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 flex items-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Info & 3D Globe */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-[#02fcef] animate-pulse" />
                  <span>CONTACT US</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Let’s Build Something Great Together.
                </h1>

                <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                  Reach out to discuss a custom software project, AI integration, or technical consultation.
                </p>
              </div>

              {/* 3D Orbital Signal Globe */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <OrbitalGlobeScene />
              </div>

              {/* Direct Contact Details Card */}
              <div className="rounded-2xl bg-[#09090b] border border-white/[0.08] p-6 sm:p-8 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                <div className="space-y-4 text-xs sm:text-sm text-zinc-300 font-mono">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-0.5">Location</span>
                      <span>Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-0.5">Email</span>
                      <a
                        href="mailto:support@krynexlabs.in"
                        className="hover:text-white transition-colors underline underline-offset-4"
                      >
                        support@krynexlabs.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-0.5">WhatsApp / Phone</span>
                      <a
                        href="https://wa.me/919879418569"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                      >
                        +91 9879418569 (Chat Only)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-white/[0.06]">
                    <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-0.5">Response Time</span>
                      <span className="text-zinc-400">Engineering review within 1 business day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Contact Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

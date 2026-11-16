"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsShowcase from "@/components/ProductsShowcase";
import WhatWeSolveSection from "@/components/WhatWeSolveSection";
import ProductDemonstrations from "@/components/ProductDemonstrations";
import IndustriesSection from "@/components/IndustriesSection";
import WhyKrynexSection from "@/components/WhyKrynexSection";
import SecurityTrustSection from "@/components/SecurityTrustSection";
import FounderSection from "@/components/FounderSection";
import InsightsSection from "@/components/InsightsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import dynamic from "next/dynamic";

const DemoModal = dynamic(() => import("@/components/DemoModal"), { ssr: false });

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#FFFFFF] selection:bg-white selection:text-black">
      {/* 01. Clean Responsive Navigation */}
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* 02. Hero Section: Building Intelligent Software for Real-World Industries */}
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* 03. Our Products: SolarOps, Krynex LawOS */}
      <ProductsShowcase onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* 04. What We Solve: Practical Industry Friction */}
      <WhatWeSolveSection />

      <SectionDivider />

      {/* 05. Product Demonstrations: Clean Interactive Workflows */}
      <ProductDemonstrations />

      <SectionDivider />

      {/* 06. Industries: Solar Energy, Legal & Document Automation, Manufacturing */}
      <IndustriesSection />

      <SectionDivider />

      {/* 07. Why Krynex Labs: 5 Core Differentiators */}
      <WhyKrynexSection />

      <SectionDivider />

      {/* 08. Security and Trust: Understandable Protections */}
      <SecurityTrustSection />

      <SectionDivider />

      {/* 09. Founder Section: D. Patel & Leadership Statement */}
      <FounderSection />

      <SectionDivider />

      {/* 10. Insights: Educational Articles & Whitepapers */}
      <InsightsSection />

      <SectionDivider />

      {/* 11. Final CTA: Let's Build Something Meaningful */}
      <FinalCTASection onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* 12. Corporate Multi-Column Footer */}
      <Footer onRequestDemo={() => setIsDemoModalOpen(true)} />

      {/* Product Demo / Consultation Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* Floating Sticky Mobile CTA Bar */}
      <StickyMobileCTA onRequestDemo={() => setIsDemoModalOpen(true)} />
    </main>
  );
}

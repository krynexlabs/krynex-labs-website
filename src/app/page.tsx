"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsShowcase from "@/components/ProductsShowcase";
import WhatWeSolveSection from "@/components/WhatWeSolveSection";
import ProductDemonstrations from "@/components/ProductDemonstrations";
import IndustriesSection from "@/components/IndustriesSection";
import WhyKrynexSection from "@/components/WhyKrynexSection";
import TechnologyCapabilitiesSection from "@/components/TechnologyCapabilitiesSection";
import SecurityTrustSection from "@/components/SecurityTrustSection";
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

      {/* 03. Product Showcase: SolarOps, Krynex LawOS */}
      <ProductsShowcase onRequestDemo={() => setIsDemoModalOpen(true)} />

      <SectionDivider />

      {/* 04. Business Problems We Solve: Practical Industry Friction */}
      <WhatWeSolveSection />

      <SectionDivider />

      {/* 05. Product Demonstrations: Clean Interactive Workflows */}
      <ProductDemonstrations />

      <SectionDivider />

      {/* 06. Target Industries: Solar Energy, Legal Practice, Manufacturing */}
      <IndustriesSection />

      <SectionDivider />

      {/* 07. Why Krynex Labs: Core Differentiators */}
      <WhyKrynexSection />

      <SectionDivider />

      {/* 08. Technology Capabilities: Modern Engineering Stack */}
      <TechnologyCapabilitiesSection />

      <SectionDivider />

      {/* 09. Security and Privacy: Enterprise Protections */}
      <SecurityTrustSection />

      <SectionDivider />

      {/* 10. Insights and Resources: Technical Articles & Analysis */}
      <InsightsSection />

      <SectionDivider />

      {/* 11. Contact CTA: Start the Conversation */}
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

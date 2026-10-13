import type { Metadata } from 'next';
import Hero from '@/components/sections/home/Hero';
import CompanyIntro from '@/components/sections/home/CompanyIntro';
import WhatWeDoSection from '@/components/sections/home/WhatWeDoSection';
import OurApproach from '@/components/sections/home/OurApproach';
import OurPhilosophy from '@/components/sections/home/OurPhilosophy';
import CTA from '@/components/sections/home/CTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * HOMEPAGE — PREMIUM COMPANY MARKETING EXPERIENCE
 * Section 1: Cinematic Hero (3D WebGL scene)
 * Section 2: Company Introduction ("TECHNOLOGY WITH A CLEAR PURPOSE.")
 * Section 3: What We Do ("OUR FOCUS.")
 * Section 4: Our Approach ("BUILT WITH INTENTION.")
 * Section 5: Our Philosophy ("GOOD SOFTWARE SHOULD MAKE WORK SIMPLER.")
 * Section 6: Final Call to Action ("LET'S TALK ABOUT YOUR BUSINESS.")
 * Section 7: Footer (in layout.tsx)
 */
export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — CINEMATIC HERO */}
      <Hero />

      {/* SECTION 2 — COMPANY INTRODUCTION */}
      <CompanyIntro />

      {/* SECTION 3 — WHAT WE DO */}
      <WhatWeDoSection />

      {/* SECTION 4 — OUR APPROACH */}
      <OurApproach />

      {/* SECTION 5 — OUR PHILOSOPHY */}
      <OurPhilosophy />

      {/* SECTION 6 — FINAL CALL TO ACTION */}
      <CTA />
    </>
  );
}

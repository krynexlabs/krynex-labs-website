import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cloud, Layers, Cpu, Wrench, RefreshCw, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/animation/Reveal';

import styles from './WhatWeDo.module.css';

export const metadata: Metadata = {
  title: 'What We Do | SaaS Products & Capabilities',
  alternates: { canonical: '/what-we-do' },
  description: 'Explore Krynex Labs capabilities in SaaS product development, operational business systems, and practical intelligent technology.',
};

const capabilities = [
  {
    id: 'saas-products',
    icon: Cloud,
    title: 'SaaS Product Development',
    tagline: 'Recurring access and software licensing models',
    description:
      'We develop ready-made software products designed to serve business needs through recurring access and licensing models. Our products are engineered with robust multi-tenant architectures, regular feature enhancements, and dependable cloud availability.',
    businessValue:
      'Eliminates the astronomical upfront capital expenditure and long-term maintenance burdens of bespoke software builds, giving organizations immediate access to maintained, evolving tools.',
    bulletPoints: [
      'Multi-tenant cloud architectures with strict data isolation',
      'Continuous security patches and feature releases',
      'Transparent licensing and subscription tiers',
      'Standardized integration pipelines and webhook hooks',
    ],
  },
  {
    id: 'business-software',
    icon: Layers,
    title: 'Business Software',
    tagline: 'Organizing everyday operations and managing workflows',
    description:
      'We engineer practical digital systems that help businesses organize operations, coordinate teams, and manage everyday workflows. From inventory and operational telemetry to workforce enablement, our software minimizes operational confusion.',
    businessValue:
      'Replaces fragmented spreadsheets, disconnected manual handoffs, and brittle ad-hoc workarounds with unified, intuitive tools that teams actually enjoy using daily.',
    bulletPoints: [
      'Centralized operational dashboards and management panels',
      'Standardized business process workflows',
      'Reduced repetitive manual overhead and error rates',
      'Intuitive user interfaces requiring minimal staff onboarding',
    ],
  },
  {
    id: 'practical-engineering',
    icon: Wrench,
    title: 'Practical Software Engineering',
    tagline: 'Architectural discipline focused on real utility',
    description:
      'We believe software engineering should prioritize stability, clean architecture, and practical functionality. We design resilient databases, robust API endpoints, and clean data pipelines built for long-term operational dependability.',
    businessValue:
      'Ensures critical business data is safe, responsive, and readily accessible when needed, with zero unnecessary architectural bloat or fragile dependencies.',
    bulletPoints: [
      'Clean, maintainable full-stack application architectures',
      'High-throughput database design and spatial partitioning',
      'Sub-second query response times and optimized asset delivery',
      'Strict TypeScript and rigorous automated validation',
    ],
  },
  {
    id: 'intelligent-technology',
    icon: Cpu,
    title: 'Intelligent Technology & AI Integration',
    tagline: 'Applying AI where it delivers measurable practical value',
    description:
      'We integrate modern machine learning and artificial intelligence capabilities only where they provide meaningful practical benefits. Rather than adding superficial AI features, we focus on high-utility applications like semantic document parsing and predictive operational routing.',
    businessValue:
      'Automates complex cognitive bottlenecks—like parsing thousands of unstructured documents or screening candidate competencies—freeing human specialists for higher-value decisions.',
    bulletPoints: [
      'Semantic document and resume parsing engines',
      'Real-time vector matching and contextual scoring',
      'Automated data normalization and schema validation',
      'Unbiased algorithmic evaluation frameworks',
    ],
  },
  {
    id: 'software-evolution',
    icon: RefreshCw,
    title: 'Software Maintenance & Evolution',
    tagline: 'Keeping business technology modern and secure',
    description:
      'Modern business software cannot remain static. As underlying operating environments, security standards, and client workflows change, our software products undergo continuous updates and performance optimizations.',
    businessValue:
      'Guarantees your software investment never goes obsolete. Your team continually benefits from performance optimizations and compatibility updates.',
    bulletPoints: [
      'Regular proactive security patch deployments',
      'Performance profiling and bundle optimization',
      'Compatibility updates for emerging web standards',
      'Direct customer feedback cycles informing product roadmaps',
    ],
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero Header */}
      <section
        className={`section ${styles.heroSection}`}
        aria-labelledby="capabilities-heading"
      >
        <div className="site-container">
          <Reveal>
            <p className="section-label">Company Capabilities</p>
            <h1 id="capabilities-heading" className={styles.heroHeading}>
              What we do.
            </h1>
            <p className={`prose-width ${styles.heroLead}`}>
              Krynex Labs develops purpose-built SaaS products and business software.
              Here is how our core engineering capabilities create lasting operational value for businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Capabilities List */}
      <section className={`section ${styles.capabilitiesSection}`}>
        <div className="site-container">
          <div className={styles.capabilitiesList}>
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div key={cap.id} id={cap.id} style={{ scrollMarginTop: '6rem' }}>
                  <Reveal delay={index * 50}>
                    <article className={styles.capabilityCard}>
                      <div>
                        <div className={styles.capabilityBadge}>
                          <Icon size={14} aria-hidden="true" />
                          <span>0{index + 1} {'//'} CAPABILITY</span>
                        </div>

                        <h2 className={styles.capabilityTitle}>
                          {cap.title}
                        </h2>

                        <p className={styles.capabilityTagline}>
                          {cap.tagline}
                        </p>

                        <p className={styles.capabilityDesc}>
                          {cap.description}
                        </p>

                        <div className={styles.businessValueBox}>
                          <strong className={styles.businessValueLabel}>
                            Business Value
                          </strong>
                          <p className={styles.businessValueText}>
                            {cap.businessValue}
                          </p>
                        </div>
                      </div>

                      <div className={styles.focusElementsBox}>
                        <h3 className={styles.focusElementsTitle}>
                          Key Focus Elements
                        </h3>
                        <ul className={styles.focusElementsList}>
                          {cap.bulletPoints.map((point) => (
                            <li key={point} className={styles.focusElementItem}>
                              <CheckCircle2
                                size={16}
                                style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }}
                                aria-hidden="true"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="site-container" style={{ maxWidth: '38rem' }}>
          <Reveal>
            <h2>Have a business software requirement?</h2>
            <p className={styles.ctaLead}>
              Get in touch with the Krynex Labs team to discuss how our software capabilities can support your operations.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-primary">
                Talk to Our Team
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Learn About Our Approach
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

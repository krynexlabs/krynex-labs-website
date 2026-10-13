import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cloud, Layers, Cpu, Wrench, RefreshCw, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';

export const metadata: Metadata = {
  title: 'What We Do — Core Capabilities',
  alternates: { canonical: '/what-we-do' },
  description: `Discover what ${siteConfig.name} builds: SaaS product development, business software, practical engineering, and intelligent technology.`,
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
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}
        aria-labelledby="capabilities-heading"
      >
        <div className="site-container">
          <Reveal>
            <p className="section-label">Company Capabilities</p>
            <h1 id="capabilities-heading" style={{ maxWidth: '44rem' }}>
              What we do.
            </h1>
            <p
              className="prose-width"
              style={{
                marginTop: '1.5rem',
                fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Krynex Labs develops purpose-built SaaS products and business software.
              Here is how our core engineering capabilities create lasting operational value for businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Capabilities List */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div key={cap.id} id={cap.id} style={{ scrollMarginTop: '6rem' }}>
                  <Reveal delay={index * 50}>
                    <article
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'clamp(2rem, 4vw, 3.5rem)',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr',
                        gap: '3rem',
                        alignItems: 'start',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            padding: '0.375rem 0.875rem',
                            borderRadius: '9999px',
                            background: 'var(--color-surface-elevated)',
                            border: '1px solid var(--color-border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--color-accent)',
                            marginBottom: '1.5rem',
                          }}
                        >
                          <Icon size={14} aria-hidden="true" />
                          <span>0{index + 1} {'//'} CAPABILITY</span>
                        </div>

                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {cap.title}
                        </h2>

                        <p
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.875rem',
                            color: 'var(--color-accent)',
                            marginBottom: '1.25rem',
                          }}
                        >
                          {cap.tagline}
                        </p>

                        <p
                          style={{
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            color: 'var(--color-text-secondary)',
                            marginBottom: '1.5rem',
                          }}
                        >
                          {cap.description}
                        </p>

                        <div
                          style={{
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.25rem',
                          }}
                        >
                          <strong
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.8125rem',
                              color: 'var(--color-text-primary)',
                              marginBottom: '0.375rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Business Value
                          </strong>
                          <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                            {cap.businessValue}
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          background: 'var(--color-surface-elevated)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '2rem',
                          height: '100%',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            marginBottom: '1.25rem',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          Key Focus Elements
                        </h3>
                        <ul
                          style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.875rem',
                          }}
                        >
                          {cap.bulletPoints.map((point) => (
                            <li
                              key={point}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.625rem',
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                color: 'var(--color-text-secondary)',
                              }}
                            >
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
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="site-container" style={{ maxWidth: '38rem' }}>
          <Reveal>
            <h2>Have a business software requirement?</h2>
            <p
              style={{
                marginTop: '1rem',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Get in touch with the Krynex Labs team to discuss how our software capabilities can support your operations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
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

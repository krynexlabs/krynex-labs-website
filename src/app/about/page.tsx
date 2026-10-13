import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteConfig, focusAreas, approachPrinciples, philosophy } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';

export const metadata: Metadata = {
  title: 'About Krynex Labs',
  alternates: { canonical: '/about' },
  description: `Learn about ${siteConfig.name}, a technology company focused on SaaS products and business software.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}
        aria-labelledby="about-heading"
      >
        <div className="site-container">
          <Reveal>
            <p className="section-label">Company Profile</p>
            <h1 id="about-heading" style={{ maxWidth: '44rem' }}>
              Software built with purpose and engineering rigor.
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
              {siteConfig.name} is a technology company focused on developing practical SaaS products and business software.
              We build digital systems that help businesses simplify operations, connect workflows, and move forward with technology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Focus & Capabilities */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="site-container">
          <Reveal>
            <p className="section-label">Our Focus</p>
            <h2 style={{ marginBottom: '1.5rem' }}>What Krynex Labs Focuses On</h2>
            <p className="prose-width" style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
              We build ready-made, reliable software tools designed to tackle practical operational challenges.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2rem',
            }}
          >
            {focusAreas.map((area, idx) => (
              <Reveal key={area.id} delay={idx * 80}>
                <div
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-accent)',
                      marginBottom: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    0{idx + 1} {'//'} AREA
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                    {area.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--color-text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {area.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                    {area.highlights.map((h) => (
                      <li key={h} style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="section" id="approach" aria-labelledby="about-approach-heading">
        <div className="site-container">
          <Reveal>
            <p className="section-label">Methodology</p>
            <h2 id="about-approach-heading">Our Approach to Software</h2>
            <p className="prose-width" style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
              We build software through four deliberate stages, keeping user workflow needs at the center of every architectural decision.
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              marginTop: '3rem',
            }}
          >
            {approachPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div
                  style={{
                    padding: '2rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    height: '100%',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.125rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                    {p.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                    {p.summary}
                  </p>
                  <p style={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--color-text-tertiary)', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles / Philosophy */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="site-container">
          <Reveal>
            <p className="section-label">Core Philosophy</p>
            <h2>{philosophy.headline}</h2>
            <p className="prose-width" style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
              {philosophy.copy}
            </p>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
              marginTop: '3rem',
            }}
          >
            {philosophy.pillars.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 60}>
                <div
                  style={{
                    padding: '1.75rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Veracity */}
      <section className="section">
        <div className="site-container">
          <Reveal>
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '54rem',
                marginInline: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} style={{ color: 'var(--color-accent)' }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: 0 }}>
                  Independent SaaS Company
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem', margin: 0 }}>
                Krynex Labs operates as a dedicated software company. We communicate with total transparency regarding our software capabilities, engineering methodologies, and product directions without inflated metrics or fabricated statistics.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--color-bg-secondary)' }}>
        <div className="site-container" style={{ maxWidth: '38rem' }}>
          <Reveal>
            <h2>Let&apos;s talk about your business.</h2>
            <p
              style={{
                marginTop: '1rem',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Looking to explore software solutions for your business? Get in touch with Krynex Labs to start a conversation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Contact Krynex Labs
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/what-we-do" className="btn btn-secondary">
                Explore What We Do
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

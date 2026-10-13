import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteConfig, focusAreas, approachPrinciples, philosophy } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';

import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'About Us | Purpose-Built Business Software',
  alternates: { canonical: '/about' },
  description: 'Learn about Krynex Labs, an independent technology company dedicated to developing dependable SaaS products and practical business software.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className={`section ${styles.heroSection}`}
        aria-labelledby="about-heading"
      >
        <div className="site-container">
          <Reveal>
            <p className="section-label">Company Profile</p>
            <h1 id="about-heading" className={styles.heroHeading}>
              Software built with purpose and engineering rigor.
            </h1>
            <p className={`prose-width ${styles.heroLead}`}>
              {siteConfig.name} is a technology company focused on developing practical SaaS products and business software.
              We build digital systems that help businesses simplify operations, connect workflows, and move forward with technology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Focus & Capabilities */}
      <section className={`section ${styles.sectionAlt}`}>
        <div className="site-container">
          <Reveal>
            <p className="section-label">Our Focus</p>
            <h2 style={{ marginBottom: '1.5rem' }}>What Krynex Labs Focuses On</h2>
            <p className="prose-width" style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
              We build ready-made, reliable software tools designed to tackle practical operational challenges.
            </p>
          </Reveal>

          <div className={styles.focusGrid}>
            {focusAreas.map((area, idx) => (
              <Reveal key={area.id} delay={idx * 80}>
                <div className={styles.focusCard}>
                  <span className={styles.focusCardIndex}>
                    0{idx + 1} {'//'} AREA
                  </span>
                  <h3 className={styles.focusCardTitle}>
                    {area.title}
                  </h3>
                  <p className={styles.focusCardDesc}>
                    {area.description}
                  </p>
                  <ul className={styles.focusCardList}>
                    {area.highlights.map((h) => (
                      <li key={h} className={styles.focusCardListItem}>
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

          <div className={styles.approachGrid}>
            {approachPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className={styles.approachCard}>
                  <span className={styles.approachNumber}>
                    {p.number}
                  </span>
                  <h3 className={styles.approachTitle}>
                    {p.title}
                  </h3>
                  <p className={styles.approachSummary}>
                    {p.summary}
                  </p>
                  <p className={styles.approachDetail}>
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles / Philosophy */}
      <section className={`section ${styles.sectionAlt}`}>
        <div className="site-container">
          <Reveal>
            <p className="section-label">Core Philosophy</p>
            <h2>{philosophy.headline}</h2>
            <p className="prose-width" style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontSize: '1.0625rem' }}>
              {philosophy.copy}
            </p>
          </Reveal>

          <div className={styles.pillarsGrid}>
            {philosophy.pillars.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 60}>
                <div className={styles.pillarCard}>
                  <h3 className={styles.pillarTitle}>
                    {pillar.title}
                  </h3>
                  <p className={styles.pillarDesc}>
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
            <div className={styles.governanceCard}>
              <div className={styles.governanceHeader}>
                <ShieldCheck size={20} style={{ color: 'var(--color-accent)' }} />
                <h3 className={styles.governanceTitle}>
                  Independent SaaS Company
                </h3>
              </div>
              <p className={styles.governanceText}>
                Krynex Labs operates as a dedicated software company. We communicate with total transparency regarding our software capabilities, engineering methodologies, and product directions without inflated metrics or fabricated statistics.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className={`site-container ${styles.ctaContainer}`}>
          <Reveal>
            <h2>Let&apos;s talk about your business.</h2>
            <p className={styles.ctaLead}>
              Looking to explore software solutions for your business? Get in touch with Krynex Labs to start a conversation.
            </p>
            <div className={styles.ctaActions}>
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

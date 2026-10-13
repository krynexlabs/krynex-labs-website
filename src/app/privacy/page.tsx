import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy' },
  description: 'Privacy Policy for Krynex Labs, detailing how we safeguard your personal and business inquiry information.',
};

export default function PrivacyPage() {
  const styles = {
    section: { paddingTop: 'calc(var(--nav-height) + 4rem)' } as const,
    prose: {
      maxWidth: '56rem',
      fontSize: '1rem',
      lineHeight: 1.8,
      color: 'var(--color-text-secondary)',
    } as const,
    h2: { marginTop: '3rem', marginBottom: '1rem' } as const,
    p: { marginBottom: '1rem' } as const,
    ul: {
      listStyle: 'disc',
      paddingLeft: '1.5rem',
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.375rem',
    } as const,
  };

  return (
    <section className="section" style={styles.section} aria-labelledby="privacy-heading">
      <div className="site-container" style={styles.prose}>
        <Reveal>
          <p className="section-label">Legal</p>
          <h1 id="privacy-heading">Privacy Policy</h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
            Last updated: October 2026
          </p>

          <h2 style={styles.h2}>1. Introduction</h2>
          <p style={styles.p}>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
            is committed to protecting the privacy of visitors to our website ({siteConfig.domain}) and our software product subscribers.
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h2 style={styles.h2}>2. Information We Collect</h2>
          <p style={styles.p}>We may collect the following types of information:</p>
          <ul style={styles.ul}>
            <li>Contact information you voluntarily provide through our inquiry form (name, email, company, project details).</li>
            <li>Technical data collected automatically, such as IP address, browser type, and pages visited, via standard web server logs.</li>
            <li>Cookies required for essential website functionality.</li>
          </ul>

          <h2 style={styles.h2}>3. How We Use Your Information</h2>
          <ul style={styles.ul}>
            <li>To respond to your inquiries and communicate about potential projects.</li>
            <li>To improve our website and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2 style={styles.h2}>4. Data Sharing</h2>
          <p style={styles.p}>
            We do not sell, rent, or trade your personal information. We may share data with trusted
            service providers who assist in operating our website or conducting business, provided
            they agree to keep your information confidential.
          </p>

          <h2 style={styles.h2}>5. Data Security</h2>
          <p style={styles.p}>
            We implement reasonable technical and organizational measures to protect your personal
            information against unauthorized access, alteration, or destruction.
          </p>

          <h2 style={styles.h2}>6. Your Rights</h2>
          <p style={styles.p}>
            You may request access to, correction of, or deletion of your personal information at
            any time by contacting us at {siteConfig.contactEmail}.
          </p>

          <h2 style={styles.h2}>7. Changes to This Policy</h2>
          <p style={styles.p}>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated &ldquo;Last updated&rdquo; date.
          </p>

          <h2 style={styles.h2}>8. Contact</h2>
          <p style={styles.p}>
            If you have questions about this Privacy Policy, please contact us at {siteConfig.contactEmail}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

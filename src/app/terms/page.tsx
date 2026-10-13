import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  alternates: { canonical: '/terms' },
  description: 'Terms of Service for Krynex Labs governing software access, licensing, and usage of our website and services.',
};

export default function TermsPage() {
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
  };

  return (
    <section className="section" style={styles.section} aria-labelledby="terms-heading">
      <div className="site-container" style={styles.prose}>
        <Reveal>
          <p className="section-label">Legal</p>
          <h1 id="terms-heading">Terms of Service</h1>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
            Last updated: October 2026
          </p>

          <h2 style={styles.h2}>1. Acceptance of Terms</h2>
          <p style={styles.p}>
            By accessing or using the website of {siteConfig.name} ({siteConfig.domain}) or inquiring about our software products,
            you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.
          </p>

          <h2 style={styles.h2}>2. Software Access &amp; Subscriptions</h2>
          <p style={styles.p}>
            {siteConfig.name} provides ready-made software products under subscription, licensing, or rental-style access.
            The specific terms of access, usage thresholds, SLAs, and fees are governed by the applicable software license
            or subscription agreement executed for each respective product.
          </p>

          <h2 style={styles.h2}>3. Intellectual Property</h2>
          <p style={styles.p}>
            All content on this website — including text, graphics, logos, and design — is the
            property of {siteConfig.name} or its licensors and is protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works without
            our express written consent.
          </p>

          <h2 style={styles.h2}>4. User Conduct</h2>
          <p style={styles.p}>
            You agree not to use this website for any unlawful purpose, to attempt to gain
            unauthorized access to our systems, or to interfere with the proper functioning of
            the website.
          </p>

          <h2 style={styles.h2}>5. Disclaimer of Warranties</h2>
          <p style={styles.p}>
            This website is provided &ldquo;as is&rdquo; without warranties of any kind, either express or
            implied. We do not warrant that the website will be uninterrupted, error-free, or free
            of harmful components.
          </p>

          <h2 style={styles.h2}>6. Limitation of Liability</h2>
          <p style={styles.p}>
            To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of or
            inability to use this website.
          </p>

          <h2 style={styles.h2}>7. Governing Law</h2>
          <p style={styles.p}>
            These Terms shall be governed by and construed in accordance with the laws of India,
            without regard to conflict of law principles.
          </p>

          <h2 style={styles.h2}>8. Changes to Terms</h2>
          <p style={styles.p}>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting to this page.
          </p>

          <h2 style={styles.h2}>9. Contact</h2>
          <p style={styles.p}>
            For questions about these Terms, please contact us at {siteConfig.contactEmail}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

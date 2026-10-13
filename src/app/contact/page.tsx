import type { Metadata } from 'next';
import { Mail, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site-data';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/animation/Reveal';
import styles from './Contact.module.css';

export const metadata: Metadata = {
  title: 'Contact Us | Business Software Inquiries',
  alternates: { canonical: '/contact' },
  description: 'Get in touch with Krynex Labs to explore software solutions, discuss operational workflows, or email our official support desk at support@krynexlabs.in.',
};

export default function ContactPage() {
  return (
    <>
      <section
        className="section"
        style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}
        aria-labelledby="contact-heading"
      >
        <div className="site-container" style={{ maxWidth: '54rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3.5rem',
            }}
          >
            {/* Header */}
            <Reveal>
              <div>
                <p className="section-label">Contact &amp; Support</p>
                <h1 id="contact-heading">Let&apos;s talk about your business.</h1>
                <p
                  style={{
                    marginTop: '1.25rem',
                    maxWidth: '46ch',
                    fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Looking to explore software solutions for your business? Submit an inquiry below or email our support desk directly.
                  We review every submission and respond within 1–2 business days.
                </p>

                {/* Official Public Support Email Card */}
                <div className={styles.emailCard}>
                  <div className={styles.emailMeta}>
                    <span className={styles.emailLabel}>Official Public Support &amp; Contact</span>
                    <a
                      href={`mailto:${siteConfig.supportEmail}`}
                      className={styles.emailLink}
                      aria-label={`Send email to ${siteConfig.supportEmail}`}
                    >
                      <Mail size={18} aria-hidden="true" />
                      <span>{siteConfig.supportEmail}</span>
                    </a>
                    <span className={styles.emailSubtitle}>
                      Direct destination for all business, licensing, and support inquiries.
                    </span>
                  </div>
                  <div className={styles.emailAction}>
                    <a
                      href={`mailto:${siteConfig.supportEmail}`}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      <span>Email Support</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={80}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-data';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/animation/Reveal';

export const metadata: Metadata = {
  title: 'Contact Us | Business Software Inquiries',
  alternates: { canonical: '/contact' },
  description: 'Get in touch with Krynex Labs to explore software solutions, discuss operational workflows, or start a conversation.',
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
                <p className="section-label">Contact</p>
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
                  Looking to explore software solutions for your business? Get in touch with Krynex Labs to start a conversation.
                  We review every inquiry and respond within 1–2 business days.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  <span>Direct inquiries: inquiries@{siteConfig.domain}</span>
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

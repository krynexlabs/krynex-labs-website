import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/animation/Reveal';
import styles from './CTA.module.css';

/**
 * SECTION 6 — FINAL CALL TO ACTION
 * Restrained animated background with direct contact link.
 */
export default function CTA() {
  return (
    <section className={styles.section} id="contact-cta" aria-labelledby="cta-heading">
      {/* Subtle glowing ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true">
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.concentricRing} />
      </div>

      <div className="site-container">
        <Reveal>
          <div className={styles.content}>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Start a Conversation</p>

            <h2 id="cta-heading" className={styles.heading}>
              Let&apos;s talk about your business.
            </h2>

            <p className={styles.body}>
              Looking to explore software solutions for your business? Get in touch with Krynex Labs to start a conversation.
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className="btn btn-primary">
                Contact Krynex Labs
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Discover Krynex Labs
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

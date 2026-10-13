import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroScene from '@/components/three/HeroScene';
import styles from './Hero.module.css';

/**
 * SECTION 1 — CINEMATIC HERO
 * Semantic HTML over WebGL Three.js procedural 3D scene.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.visual} aria-hidden="true">
        <HeroScene />
      </div>

      <div className="site-container">
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            KRYNEX LABS / BUSINESS SOFTWARE
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>Software built for</span>
            <span className={styles.titleAccent}>business.</span>
          </h1>

          <p className={styles.lead}>
            We build practical software products designed to simplify business operations, connect workflows, and make everyday work more effective.
          </p>

          <div className={styles.ctas}>
            <Link href="/contact" className="btn btn-primary">
              Talk to Our Team
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Discover Krynex Labs
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        Scroll to Explore
      </div>
    </section>
  );
}

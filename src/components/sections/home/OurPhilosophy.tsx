import { philosophy } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';
import styles from './OurPhilosophy.module.css';

/**
 * SECTION 5 — OUR PHILOSOPHY
 * Typography-led statement with structured core values.
 */
export default function OurPhilosophy() {
  return (
    <section className={styles.section} id="philosophy" aria-labelledby="philosophy-heading">
      <div className="site-container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <Reveal>
              <p className="section-label">Core Philosophy</p>
              <h2 id="philosophy-heading" className={styles.heading}>
                {philosophy.headline}
              </h2>
              <p className={styles.copy}>
                {philosophy.copy}
              </p>
            </Reveal>
          </div>

          <div className={styles.pillarsGrid}>
            {philosophy.pillars.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={idx * 70}>
                <div className={styles.pillarCard}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarDesc}>{pillar.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

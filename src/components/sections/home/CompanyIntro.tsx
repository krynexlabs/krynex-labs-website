import Reveal from '@/components/animation/Reveal';
import styles from './CompanyIntro.module.css';

/**
 * SECTION 2 — COMPANY INTRODUCTION
 * Concise editorial overview with modern typography.
 */
export default function CompanyIntro() {
  return (
    <section className={styles.section} id="intro" aria-labelledby="intro-heading">
      <div className="site-container">
        <div className={styles.inner}>
          <Reveal>
            <div className={styles.header}>
              <p className="section-label">Company Introduction</p>
              <h2 id="intro-heading" className={styles.heading}>
                Technology with a clear purpose.
              </h2>
            </div>

            <p className={styles.lead}>
              Krynex Labs focuses on building software products that address real business needs. We bring together thoughtful engineering, practical functionality, and modern technology to help businesses work more effectively.
            </p>

            <div className={styles.pillRow}>
              <div className={styles.pill}>
                <span className={styles.pillDot} aria-hidden="true" />
                <span>Thoughtful Engineering</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillDot} aria-hidden="true" />
                <span>Practical Functionality</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillDot} aria-hidden="true" />
                <span>Modern Technology</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillDot} aria-hidden="true" />
                <span>Business-First Purpose</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

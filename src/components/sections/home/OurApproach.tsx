import { Search, Compass, Sliders, RefreshCw } from 'lucide-react';
import { approachPrinciples } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';
import styles from './OurApproach.module.css';

const stepIcons = [Search, Compass, Sliders, RefreshCw];

/**
 * SECTION 4 — OUR APPROACH
 * Four guiding principles: Understand, Engineer, Refine, Evolve.
 */
export default function OurApproach() {
  return (
    <section className={styles.section} id="approach" aria-labelledby="approach-heading">
      <div className="site-container">
        <Reveal>
          <div className={styles.header}>
            <p className="section-label">Engineering Methodology</p>
            <h2 id="approach-heading" className={styles.heading}>
              Built with intention.
            </h2>
            <p className={styles.subtitle}>
              Our work is guided by a disciplined four-stage cycle that balances deep operational insight with rigorous technical execution.
            </p>
          </div>
        </Reveal>

        <div className={styles.timeline}>
          {approachPrinciples.map((step, idx) => {
            const Icon = stepIcons[idx] || Search;
            return (
              <Reveal key={step.number} delay={idx * 80}>
                <article className={styles.stepCard}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div className={styles.stepIconWrap}>
                      <Icon size={18} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepSummary}>{step.summary}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

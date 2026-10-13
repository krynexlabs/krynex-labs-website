import { Cloud, Layers, Cpu } from 'lucide-react';
import { focusAreas } from '@/data/site-data';
import Reveal from '@/components/animation/Reveal';
import styles from './WhatWeDoSection.module.css';

const areaIcons = [Cloud, Layers, Cpu];

/**
 * SECTION 3 — WHAT WE DO
 * Presents company capabilities & focus areas (not a product catalog or marketplace).
 */
export default function WhatWeDoSection() {
  return (
    <section className={styles.section} id="focus" aria-labelledby="focus-heading">
      <div className="site-container">
        <Reveal>
          <div className={styles.header}>
            <p className="section-label">Core Capabilities</p>
            <h2 id="focus-heading" className={styles.heading}>
              Our focus.
            </h2>
            <p className={styles.subtitle}>
              We channel our engineering and design capabilities into three primary areas of business technology.
            </p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {focusAreas.map((area, index) => {
            const Icon = areaIcons[index] || Cloud;
            return (
              <Reveal key={area.id} delay={index * 100}>
                <article className={styles.card}>
                  <div className={styles.cardIndex}>0{index + 1} {'//'} FOCUS</div>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className={styles.cardTitle}>{area.title}</h3>
                  <p className={styles.cardDesc}>{area.description}</p>
                  <ul className={styles.highlightList}>
                    {area.highlights.map((highlight) => (
                      <li key={highlight} className={styles.highlightItem}>
                        <span className={styles.checkDot} aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

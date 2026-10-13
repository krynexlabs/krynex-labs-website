'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

/**
 * Fades/slides its children in when scrolled into view.
 * Progressive enhancement: children are fully visible without JS or with reduced motion.
 */
export default function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const classes = [
    styles.reveal,
    direction !== 'none' ? styles[direction] : '',
    isVisible ? styles.visible : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

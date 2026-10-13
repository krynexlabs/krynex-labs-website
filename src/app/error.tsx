'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Runtime Boundary Caught Error]:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        paddingTop: 'calc(var(--nav-height) + 4rem)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '36rem',
          background: 'var(--color-surface)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-error)',
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-error)',
          }}
        >
          RUNTIME EXCEPTION CAUGHT
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: 'var(--color-text-primary)',
          }}
        >
          System Recovered Gracefully
        </h1>

        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}
        >
          An unexpected interface anomaly was isolated by our error boundary. No customer state or security boundaries have been compromised.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <RefreshCcw size={16} /> Reinitialize View
          </button>
          <Link href="/" className="btn btn-secondary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

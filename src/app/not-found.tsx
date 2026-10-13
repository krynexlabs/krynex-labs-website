import Link from 'next/link';
import { Home, Terminal } from 'lucide-react';

export default function NotFound() {
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
          border: '1px solid var(--color-border)',
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
            background: 'rgba(99, 229, 255, 0.08)',
            border: '1px solid rgba(99, 229, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent)',
          }}
        >
          <Terminal size={28} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        >
          ERROR 404 // ROUTE NOT RESOLVED
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: 'var(--color-text-primary)',
          }}
        >
          System Endpoint Not Found
        </h1>

        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}
        >
          The resource you requested does not exist or has been relocated within our architecture. Return to the primary experience or explore our capabilities.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link href="/what-we-do" className="btn btn-secondary">
            Explore Capabilities
          </Link>
        </div>
      </div>
    </div>
  );
}

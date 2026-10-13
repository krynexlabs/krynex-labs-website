'use client';

import { Suspense, lazy, useSyncExternalStore } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useScrollReveal';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

const noop = () => () => {};
const yes = () => true;
const no = () => false;

/**
 * Returns true only on the client (after hydration).
 * Uses useSyncExternalStore so there's no setState-in-effect,
 * and the ref isn't read during render.
 */
function useIsClient(): boolean {
  return useSyncExternalStore(noop, yes, no);
}

function LoadingPlaceholder() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loading-spinner" />
    </div>
  );
}

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,229,255,0.14), rgba(139,124,255,0.06), transparent)',
        }}
      />
      {[300, 400, 520].map((size, i) => (
        <div
          key={size}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(99,229,255,${0.2 - i * 0.05})`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroScene() {
  const isClient = useIsClient();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return <StaticFallback />;

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {isClient && (
        <Suspense fallback={<LoadingPlaceholder />}>
          <HeroCanvas />
        </Suspense>
      )}
    </div>
  );
}

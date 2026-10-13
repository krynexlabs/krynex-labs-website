'use client';

import { useSyncExternalStore } from 'react';

/**
 * Renders the current year on the client.
 * Under Cache Components (Next.js 16), `new Date()` during prerender is a build error.
 * We use useSyncExternalStore with a server snapshot of the fallback year and a client
 * snapshot that reads the real year — no useEffect / setState needed.
 */

const subscribe = () => () => {};
const getSnapshot = () => new Date().getFullYear();
const getServerSnapshot = () => 2026;

export default function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span>{year}</span>;
}

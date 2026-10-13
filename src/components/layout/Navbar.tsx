'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';
import { navItems, siteConfig } from '@/data/site-data';
import BrandMark from '@/components/ui/BrandMark';
import styles from './Navbar.module.css';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero → solid/blurred after scrolling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsMobileOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock scroll, Escape to close, focus trap while the mobile menu is open
  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;
      // Cycle focus between the toggle button and the menu's links
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && closeMenu(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [isMobileOpen, closeMenu]);

  return (
    <header className={`${styles.header} ${isScrolled || isMobileOpen ? styles.scrolled : ''}`}>
      <nav className={`site-container ${styles.inner}`} aria-label="Main">
        <Link href="/" className={styles.brand} aria-label="Krynex Labs — home">
          <BrandMark size={30} className={styles.brandMark} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>KRYNEX LABS</span>
            <span className={styles.brandParent}>Business Software</span>
          </span>
        </Link>

        <ul className={styles.links}>
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.linkActive : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta}>
            <span>Talk to Our Team</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            onClick={() => (isMobileOpen ? closeMenu() : setIsMobileOpen(true))}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMobileOpen}
        inert={!isMobileOpen}
      >
        <div className={styles.mobileInner}>
          <ul className={styles.mobileLinks}>
            {navItems.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} style={{ transitionDelay: isMobileOpen ? `${i * 45 + 80}ms` : '0ms' }}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${active ? styles.mobileLinkActive : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => closeMenu(false)}
                  >
                    <span className={styles.mobileNumber}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.mobileFooter}>
            <Link href="/contact" className="btn btn-primary" onClick={() => closeMenu(false)}>
              Talk to Our Team
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className={styles.mobileEmail}
              onClick={() => closeMenu(false)}
              aria-label={`Email support at ${siteConfig.supportEmail}`}
            >
              <Mail size={14} aria-hidden="true" />
              <span>{siteConfig.supportEmail}</span>
            </a>
            <p className={styles.mobileTag}>KRYNEX LABS / BUSINESS SOFTWARE</p>
          </div>
        </div>
      </div>
    </header>
  );
}

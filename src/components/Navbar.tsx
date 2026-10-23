"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

interface NavbarProps {
  onRequestDemo?: () => void;
}

export default function Navbar({ onRequestDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll and manage keyboard accessibility when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          hamburgerBtnRef.current?.focus();
          return;
        }

        if (e.key === "Tab" && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Our Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.9)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg p-1 -m-1"
              aria-label="Krynex Labs - Return to Home"
            >
              <KrynexLogo size="md" showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                      isActive
                        ? "text-white bg-white/[0.08] font-semibold"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              {onRequestDemo ? (
                <button
                  type="button"
                  onClick={() => {
                    import("./Analytics").then(({ trackConversionEvent }) => {
                      trackConversionEvent("demo_click", { location: "navbar_desktop" });
                    });
                    onRequestDemo();
                  }}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Book a Demo</span>
                </button>
              ) : (
                <Link
                  href="/contact"
                  onClick={() => {
                    import("./Analytics").then(({ trackConversionEvent }) => {
                      trackConversionEvent("demo_click", { location: "navbar_desktop" });
                    });
                  }}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Book a Demo</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerBtnRef}
              type="button"
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl lg:hidden pt-20 px-6 flex flex-col justify-between pb-8 animate-fade-in overflow-y-auto"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                KRYNEX LABS // NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  hamburgerBtnRef.current?.focus();
                }}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <div key={link.label} className="border-b border-white/[0.04] pb-2">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-1.5 transition-colors flex items-center justify-between ${
                      isActive ? "text-white font-semibold" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            {onRequestDemo ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  import("./Analytics").then(({ trackConversionEvent }) => {
                    trackConversionEvent("demo_click", { location: "navbar_mobile" });
                  });
                  onRequestDemo();
                }}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Book a Demo
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Book a Demo
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

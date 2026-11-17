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
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Technology", href: "/technology" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.9)] py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg p-1 -m-1"
              aria-label="Krynex Labs"
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
              <Link
                href="/products"
                className="bg-[#F5F5F5] text-[#050505] font-semibold hover:bg-white px-5 py-2.5 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 min-h-[40px]"
              >
                <span>Explore Products</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button with comfortable 44px tap target */}
            <button
              ref={hamburgerBtnRef}
              type="button"
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
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
          className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between animate-fade-in overflow-y-auto"
        >
          {/* Top Bar with Logo & Close Button */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="focus:outline-none"
              aria-label="Krynex Labs Home"
            >
              <KrynexLogo size="sm" showTagline={false} />
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                hamburgerBtnRef.current?.focus();
              }}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              aria-label="Close navigation drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links List */}
          <div className="px-6 py-6 flex flex-col gap-2 flex-1">
            <div className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
              NAVIGATION
            </div>

            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <div key={link.label} className="border-b border-white/[0.04]">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium py-3.5 transition-colors flex items-center justify-between min-h-[48px] ${
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
          <div className="p-6 border-t border-white/10 bg-black/40 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/products/solarops"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium text-xs hover:bg-white/[0.08] transition-colors text-center min-h-[44px] flex items-center justify-center"
              >
                SolarOps
              </Link>
              <Link
                href="/products/krynex-lawos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium text-xs hover:bg-white/[0.08] transition-colors text-center min-h-[44px] flex items-center justify-center"
              >
                Krynex LawOS
              </Link>
            </div>

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
                className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)] min-h-[48px] flex items-center justify-center"
              >
                Contact Krynex Labs
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)] min-h-[48px] flex items-center justify-center"
              >
                Contact Krynex Labs
              </Link>
            )}

            <div className="text-center text-[11px] font-mono text-zinc-500 pt-1">
              AHMEDABAD, INDIA &bull; SUPPORT@KRYNEXLABS.IN
            </div>
          </div>
        </div>
      )}
    </>
  );
}

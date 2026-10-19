"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

export default function Navbar() {
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
    { label: "Services", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Our Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#07090D]/85 backdrop-blur-xl border-b border-[#202630] shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]/40 rounded-lg p-1 -m-1"
              aria-label="Krynex Labs - Return to Home"
            >
              <KrynexLogo size="md" showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#0D1118]/85 border border-[#202630] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]/40 ${
                      isActive
                        ? "text-[#00E5FF] bg-[#111722] border border-[#202630] font-semibold"
                        : "text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#111722]/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Button: Make an Inquiry */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/contact"
                onClick={() => {
                  import("./Analytics").then(({ trackConversionEvent }) => {
                    trackConversionEvent("inquiry_click", { location: "navbar_desktop" });
                  });
                }}
                className="bg-[#00E5FF] text-[#07090D] font-semibold hover:bg-[#33ebff] px-5 py-2 rounded-xl transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.22)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
              >
                <span>Make an Inquiry</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerBtnRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#111722] border border-[#202630] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]/40"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[60] bg-[#07090D]/95 backdrop-blur-2xl lg:hidden pt-20 px-6 flex flex-col justify-between pb-8 animate-fade-in overflow-y-auto"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#202630]">
              <span className="text-[11px] font-mono tracking-widest text-[#929BAA] uppercase">
                KRYNEX LABS // NAVIGATION
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  hamburgerBtnRef.current?.focus();
                }}
                className="p-1 rounded-lg text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#111722] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]/40"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <div key={link.label} className="border-b border-[#202630]/50 pb-2">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-1.5 transition-colors flex items-center justify-between ${
                      isActive ? "text-[#00E5FF] font-semibold" : "text-[#929BAA] hover:text-[#F5F7FA]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#929BAA]" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-[#202630] flex flex-col gap-3">
            <div className="text-[11px] font-mono text-[#929BAA] flex items-center justify-between">
              <span>OFFICIAL WHATSAPP:</span>
              <a
                href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs%2C%20I%20would%20like%20to%20discuss%20an%20engineering%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  import("./Analytics").then(({ trackConversionEvent }) => {
                    trackConversionEvent("whatsapp_click", { location: "navbar_mobile" });
                  });
                }}
                className="text-[#F5F7FA] hover:underline flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>+91 9879418569</span>
              </a>
            </div>

            <Link
              href="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
                import("./Analytics").then(({ trackConversionEvent }) => {
                  trackConversionEvent("inquiry_click", { location: "navbar_mobile" });
                });
              }}
              className="w-full bg-[#00E5FF] text-[#07090D] font-semibold py-3 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-[#33ebff] transition-colors shadow-[0_0_20px_rgba(0,229,255,0.22)]"
            >
              Make an Inquiry
            </Link>

            <Link
              href="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#0D1118] border border-[#202630] text-[#F5F7FA] font-medium py-2.5 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-[#111722] transition-colors"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

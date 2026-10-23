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
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between h-14 px-4 sm:px-6 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              : "bg-black/40 backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Typographic Monogram Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-md"
            aria-label="Krynex Labs Home"
          >
            <KrynexLogo />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-white/10 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] group focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden fixed inset-x-4 top-20 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-white border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/[0.08]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

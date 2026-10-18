"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

interface NavbarProps {
  onRequestDemo: () => void;
}

export default function Navbar({ onRequestDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Vision", href: "#vision" },
    { label: "Methodology", href: "#methodology" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Industries", href: "#industries" },
    { label: "R&D Lab", href: "#console" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.9)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark - Clickable to Home / Top */}
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg p-1 -m-1"
              aria-label="Krynex Labs - Return to top"
            >
              <KrynexLogo size="md" showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#console"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#console");
                }}
                className="text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>R&amp;D Diagnostic</span>
              </a>

              {/* Contact CTA Button - Smooth scroll to #contact */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Contact</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/[0.08] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
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
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-fade-in"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                ENGINEERING NAVIGATION
              </span>
              <span className="text-[10px] font-mono text-zinc-400">AHMEDABAD DC-01</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-lg font-medium text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between border-b border-white/[0.04]"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600" />
              </a>
            ))}

            <a
              href="#console"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#console");
              }}
              className="text-sm font-mono text-zinc-400 hover:text-white py-2 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span>Launch R&amp;D Diagnostic Console</span>
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <span>Contact Corporate Engineering &rarr;</span>
            </a>
            <div className="text-center text-[10px] font-mono text-zinc-500 pt-2">
              KRYNEX LABS • APPLIED AI &amp; ENTERPRISE IT ENGINEERING
            </div>
          </div>
        </div>
      )}
    </>
  );
}

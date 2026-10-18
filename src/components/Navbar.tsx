"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

interface NavbarProps {
  onRequestDemo?: () => void;
}

export default function Navbar({ onRequestDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const pathname = usePathname();

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
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      href: "/solutions",
      badge: "Div A",
      hasDropdown: true,
      subItems: [
        { label: "Overview", href: "/solutions", desc: "Enterprise Engineering Matrix" },
        { label: "Applied AI & ML", href: "/solutions/ai-ml", desc: "Custom Neural Architectures & Edge Vision" },
        { label: "Enterprise Systems", href: "/solutions/enterprise-software", desc: "Legacy Modernization & Distributed Backbones" },
        { label: "Web & Mobile", href: "/solutions/web-mobile", desc: "High-Performance SSR & Offline Systems" },
        { label: "Cloud & Data", href: "/solutions/cloud-data", desc: "Zero-Trust Infrastructure & Real-Time Streaming" },
      ],
    },
    {
      label: "SaaS Products",
      href: "/products",
      badge: "Div B",
      hasDropdown: true,
      subItems: [
        { label: "Product Directory", href: "/products", desc: "Krynex Labs Software Portfolio" },
        { label: "Krynex Lexis", href: "/products/krynex-lexis", desc: "Regional AI Legal & Statutory Drafting SaaS" },
        { label: "Krynex Flow", href: "/products/krynex-flow", desc: "Enterprise Workflow & Legacy Integration Engine" },
        { label: "Krynex Vision", href: "/products/krynex-vision", desc: "Edge Industrial Computer Vision & QC Engine" },
      ],
    },
    { label: "Industries", href: "/industries" },
    { label: "R&D Lab", href: "/research" },
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

                if (link.hasDropdown) {
                  const isSolutions = link.label === "Solutions";
                  const isProducts = link.label === "SaaS Products";
                  const isOpen = isSolutions ? solutionsDropdown : productsDropdown;
                  const setOpen = isSolutions ? setSolutionsDropdown : setProductsDropdown;

                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                          isActive
                            ? "text-white bg-white/[0.08] font-semibold"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/[0.06] border border-white/10 text-zinc-400">
                            {link.badge}
                          </span>
                        )}
                        <ChevronDown className="w-3 h-3 text-zinc-500 transition-transform group-hover:rotate-180" />
                      </Link>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#080808] border border-white/10 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-fade-in z-50">
                          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-3 py-1.5 border-b border-white/[0.04] mb-1">
                            {link.label === "Solutions" ? "Division A // Engineering" : "Division B // SaaS Products"}
                          </div>
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            >
                              <div className="text-xs font-medium text-zinc-200 group-hover:text-white flex items-center justify-between">
                                <span>{sub.label}</span>
                                <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                              </div>
                              <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                                {sub.desc}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
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
                href="/research"
                className="text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>R&amp;D Diagnostic</span>
              </Link>

              {/* Consultation / Contact Button */}
              {onRequestDemo ? (
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Consultation</span>
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="bg-white text-black font-medium hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Contact</span>
                </Link>
              )}
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
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fade-in overflow-y-auto"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                KRYNEX UNIFIED DIRECTORY
              </span>
              <span className="text-[10px] font-mono text-zinc-400">AHMEDABAD DC-01</span>
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
                    <span className="flex items-center gap-2">
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/10 text-zinc-400">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {/* Mobile Submenu Items */}
                  {link.hasDropdown && link.subItems && (
                    <div className="pl-3 mt-1 space-y-1">
                      {link.subItems.slice(1).map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-zinc-400 hover:text-zinc-200 py-1"
                        >
                          &bull; {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>OFFICIAL WHATSAPP:</span>
              <a
                href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                +91 9879418569
              </a>
            </div>

            {onRequestDemo ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestDemo();
                }}
                className="w-full bg-white text-black font-medium py-3 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors"
              >
                Schedule Executive Consultation
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-white text-black font-medium py-3 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors"
              >
                Schedule Executive Consultation
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

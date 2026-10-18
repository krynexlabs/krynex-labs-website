"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import KrynexLogo from "./KrynexLogo";

interface NavbarProps {
  onRequestDemo?: () => void;
}

export default function Navbar({ onRequestDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
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
    {
      label: "Products",
      href: "/products",
      hasDropdown: true,
      subItems: [
        { label: "Product Directory", href: "/products", desc: "Overview of all software products & subscription tiers" },
        { label: "Krynex Lexis", href: "/products/krynex-lexis", desc: "Regional AI Legal & Statutory Drafting SaaS" },
        { label: "Krynex Flow", href: "/products/krynex-flow", desc: "Enterprise Workflow & Legacy Integration Engine" },
        { label: "Krynex Vision", href: "/products/krynex-vision", desc: "Edge Industrial Computer Vision & QC Engine" },
      ],
    },
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

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setProductsDropdown(true)}
                      onMouseLeave={() => setProductsDropdown(false)}
                      onFocus={() => setProductsDropdown(true)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setProductsDropdown(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setProductsDropdown(false);
                        }
                      }}
                    >
                      <Link
                        href={link.href}
                        aria-haspopup="true"
                        aria-expanded={productsDropdown}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                          isActive
                            ? "text-white bg-white/[0.08] font-semibold"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${productsDropdown ? "rotate-180 text-white" : ""}`} />
                      </Link>

                      {/* Dropdown Menu */}
                      {productsDropdown && (
                        <div
                          role="menu"
                          aria-label="Software Products Menu"
                          className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#080808] border border-white/10 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-fade-in z-50"
                        >
                          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-3 py-1.5 border-b border-white/[0.04] mb-1">
                            KRYNEX SOFTWARE PRODUCTS
                          </div>
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setProductsDropdown(false)}
                              className="block px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
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
                href="/products"
                className="text-xs font-medium text-zinc-400 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                <span>Explore Products</span>
              </Link>

              {/* Consultation / Contact Button */}
              {onRequestDemo ? (
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Get in Touch</span>
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="bg-white text-black font-semibold hover:bg-zinc-200 px-5 py-2 rounded-full transition-all text-xs tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Get in Touch</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={hamburgerBtnRef}
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
                className="w-full bg-white text-black font-semibold py-3 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors"
              >
                Explore Products &amp; Pricing
              </button>
            ) : (
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-white text-black font-semibold py-3 rounded-xl text-center text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors"
              >
                Explore Products &amp; Pricing
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  MapPin,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  CheckCircle2,
  Cpu,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import KrynexLogo from "./KrynexLogo";

interface FooterProps {
  onRequestDemo?: () => void;
  hideInquirySection?: boolean;
}

export default function Footer({ onRequestDemo, hideInquirySection = false }: FooterProps = {}) {
  const router = useRouter();
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryChallenge, setInquiryChallenge] = useState("");
  const [honeypot, setHoneypot] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!inquiryName.trim()) {
      newErrors.name = "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inquiryEmail.trim()) {
      newErrors.email = "Please enter your corporate email.";
    } else if (!emailRegex.test(inquiryEmail.trim())) {
      newErrors.email = "Please provide a valid corporate email.";
    }
    if (!inquiryCompany.trim()) {
      newErrors.company = "Please enter your company / industry.";
    }
    if (!inquiryChallenge.trim()) {
      newErrors.challenge = "Please describe how we can help you.";
    } else if (inquiryChallenge.trim().length < 10) {
      newErrors.challenge = "Please provide at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    // Bot honeypot filter
    if (honeypot) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFallbackMailto(null);
    const prevErrors = { ...errors };
    delete prevErrors.general;
    setErrors(prevErrors);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          company: inquiryCompany,
          challenge: inquiryChallenge,
          executiveName: inquiryName,
          corporateEmail: inquiryEmail,
          companySector: inquiryCompany,
          operationalFriction: inquiryChallenge,
          inquiryCategory: "Technical Architecture Consultation",
          websiteHoneypot: honeypot,
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success || result.ok)) {
        setTicketId(result.referenceId || `KRX-RD-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setSubmitted(true);

        // Pure Silver & White Confetti
        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#ffffff", "#d4d4d8", "#a1a1aa", "#71717a"],
          });
        } catch {
          // Non-blocking
        }
      } else {
        setIsSubmitting(false);
        if (result.fallbackMailto) {
          setFallbackMailto(result.fallbackMailto);
        }
        setErrors((prev) => ({
          ...prev,
          general: result.error || "Submission rejected by server. Please check your details.",
        }));
      }
    } catch {
      setIsSubmitting(false);
      setFallbackMailto("mailto:support@krynexlabs.in?subject=Technical%20Architecture%20Inquiry%20Fallback");
      setErrors((prev) => ({
        ...prev,
        general: "Network transmission error. Please reach out to support@krynexlabs.in directly.",
      }));
    }
  };

  return (
    <footer id="contact" className="relative bg-black border-t border-white/[0.08] overflow-hidden pt-16">
      {/* ======================================================== */}
      {/* EXECUTIVE R&D CONSULTATION & CORPORATE GOODWILL SECTION */}
      {/* ======================================================== */}
      {!hideInquirySection && (
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="relative rounded-3xl bg-[#090a0d] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.95)]">
            {/* Resend Silk Fabric Drapery Backdrop (Exact Resend brand background) */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
              <Image
                src="/static/background-auth.jpg"
                alt="Silk Drapery Ambience"
                fill
                quality={95}
                className="object-cover object-top opacity-55 sm:opacity-75"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.95)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Specular Top Line */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
              <p className="text-xs text-zinc-400 font-normal mb-3">
                Business Hours: 9:30 AM to 6:30 PM IST • Ahmedabad, India
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 leading-[1.1]">
                <span className="text-white block">Experience better</span>
                <span className="bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent block">software today</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Get personal, reliable support from people who know your setup and care about your success.
              </p>
            </div>

            {/* Interactive Corporate Inquiry Form */}
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="max-w-xl mx-auto p-8 rounded-2xl bg-black/80 border border-white/10 text-center animate-fade-in relative z-10 backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center mx-auto mb-4 text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Inquiry Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{inquiryName}</span>. Your inquiry has been received. Our engineering team in Ahmedabad will reach out to{" "}
                  <span className="text-white font-medium">{inquiryEmail}</span> within 1–2 business days.
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 mb-6">
                  Reference ID: <span className="font-bold text-white">{ticketId}</span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryChallenge("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} noValidate className="max-w-xl mx-auto space-y-4 relative z-10">
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="_security_honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {errors.general && (
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-red-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errors.general}</span>
                    </div>
                    {fallbackMailto && (
                      <div className="pt-1">
                        <a
                          href={fallbackMailto}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors border border-white/20"
                        >
                          Email Inquiry Directly (Pre-Filled) →
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label htmlFor="footer-inquiry-email" className="block text-xs sm:text-sm font-normal text-zinc-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="footer-inquiry-email"
                    type="email"
                    required
                    value={inquiryEmail}
                    maxLength={120}
                    onChange={(e) => {
                      setInquiryEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="Enter your email"
                    className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                      errors.email ? "border-red-400/80" : "border-white/10"
                    }`}
                  />
                  {errors.email && (
                    <div className="text-[11px] text-red-400 mt-1.5">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="footer-inquiry-name" className="block text-xs sm:text-sm font-normal text-zinc-300 mb-1.5">
                      Your name
                    </label>
                    <input
                      id="footer-inquiry-name"
                      type="text"
                      required
                      value={inquiryName}
                      maxLength={100}
                      onChange={(e) => {
                        setInquiryName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Enter your name"
                      className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                        errors.name ? "border-red-400/80" : "border-white/10"
                      }`}
                    />
                    {errors.name && (
                      <div className="text-[11px] text-red-400 mt-1.5">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="footer-inquiry-company" className="block text-xs sm:text-sm font-normal text-zinc-300 mb-1.5">
                      Company / Industry
                    </label>
                    <input
                      id="footer-inquiry-company"
                      type="text"
                      required
                      value={inquiryCompany}
                      maxLength={120}
                      onChange={(e) => {
                        setInquiryCompany(e.target.value);
                        if (errors.company) setErrors({ ...errors, company: "" });
                      }}
                      placeholder="Enter your company"
                      className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                        errors.company ? "border-red-400/80" : "border-white/10"
                      }`}
                    />
                    {errors.company && (
                      <div className="text-[11px] text-red-400 mt-1.5">
                        {errors.company}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="footer-inquiry-challenge" className="block text-xs sm:text-sm font-normal text-zinc-300 mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    id="footer-inquiry-challenge"
                    rows={4}
                    required
                    value={inquiryChallenge}
                    maxLength={1000}
                    onChange={(e) => {
                      setInquiryChallenge(e.target.value);
                      if (errors.challenge) setErrors({ ...errors, challenge: "" });
                    }}
                    placeholder="I'd like to know how Krynex Labs can help me with..."
                    className={`w-full bg-[#0f1013] border rounded-lg p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans resize-none ${
                      errors.challenge ? "border-red-400/80" : "border-white/10"
                    }`}
                  />
                  {errors.challenge && (
                    <div className="text-[11px] text-red-400 mt-1.5">
                      {errors.challenge}
                    </div>
                  )}
                </div>

                {/* Resend Style Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 cursor-pointer ${
                      inquiryEmail.trim() && inquiryChallenge.trim()
                        ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        : "bg-[#141518] border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-[#1a1c22]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Legal Notice */}
                <p className="text-[11px] text-zinc-500 pt-2 border-t border-white/[0.06]">
                  By submitting, you agree to our{" "}
                  <Link href="/terms" className="text-zinc-400 hover:text-white underline transition-colors">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-zinc-400 hover:text-white underline transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CORPORATE MULTI-COLUMN FOOTER */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Col 1: Brand Info */}
          <div className="col-span-2">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center mb-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg p-1 -m-1"
              aria-label="Krynex Labs - Return to top"
            >
              <KrynexLogo size="md" showTagline={true} />
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
              Researching real-world operational bottlenecks and engineering practical, subscription-based software products for compounding business utility.
            </p>

            <div className="space-y-2.5 text-xs text-zinc-400 font-mono mb-6">
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 text-xs font-mono font-medium tracking-wide">
                  Ahmedabad, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <a
                  href="mailto:support@krynexlabs.in"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  support@krynexlabs.in
                </a>
              </div>
            </div>

            {/* Direct Channel Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-300" />
                <span>Portal Inquiry</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Capabilities & Solutions */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Capabilities</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Overview &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-ml" className="hover:text-white transition-colors">
                  AI &amp; Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/solutions/cloud-data" className="hover:text-white transition-colors">
                  Cloud &amp; Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise-software" className="hover:text-white transition-colors">
                  Enterprise Software
                </Link>
              </li>
              <li>
                <Link href="/solutions/web-mobile" className="hover:text-white transition-colors">
                  Web &amp; Mobile Platforms
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries & Approach */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Industries &amp; Approach</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries &amp; Problems
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-white transition-colors">
                  Our Approach &amp; Lifecycle
                </Link>
              </li>
              <li>
                <Link href="/approach#business-model" className="hover:text-white transition-colors">
                  Rented Software Model
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  R&amp;D Diagnostic Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Governance */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              Company &amp; Governance
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About &amp; Methodology
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Capabilities &amp; Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Executive Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy &amp; Data Sovereignty
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service &amp; SLA
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("krynex_open_cookie_settings"));
                    }
                  }}
                  className="hover:text-white transition-colors text-left font-normal"
                  aria-label="Open Telemetry &amp; Cookie Consent Settings"
                >
                  Cookie Settings &amp; Consent
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* System Telemetry Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-zinc-300">DIAGNOSTIC STATUS: NOMINAL</span>
            <span>{"//"}</span>
            <span>AHMEDABAD LABS</span>
          </div>

          <div>
            &copy; 2026 KRYNEX LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Massive Subtle Background Wireframe Text (Decorative) */}
      <div aria-hidden="true" className="w-full flex justify-center pointer-events-none select-none overflow-hidden pb-4">
        <span aria-hidden="true" className="text-[15vw] font-black tracking-tighter text-white/[0.03] leading-none uppercase">
          KRYNEX
        </span>
      </div>
    </footer>
  );
}

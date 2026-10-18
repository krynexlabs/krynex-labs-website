"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  MapPin,
  Mail,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  CheckCircle2,
  Cpu,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import KrynexLogo from "./KrynexLogo";

interface FooterProps {
  onRequestDemo: () => void;
}

export default function Footer({ onRequestDemo }: FooterProps) {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!inquiryName.trim()) {
      newErrors.name = "Executive Name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inquiryEmail.trim()) {
      newErrors.email = "Corporate Email is required.";
    } else if (!emailRegex.test(inquiryEmail.trim())) {
      newErrors.email = "Please provide a valid corporate email.";
    }
    if (!inquiryCompany.trim()) {
      newErrors.company = "Company and sector are required.";
    }
    if (!inquiryChallenge.trim()) {
      newErrors.challenge = "Brief description of operational friction is required.";
    } else if (inquiryChallenge.trim().length < 15) {
      newErrors.challenge = "Please provide at least 15 characters describing the challenge.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bot honeypot filter
    if (honeypot) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
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
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setTicketId(result.referenceId || `KRX-RD-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setSubmitted(true);

        // Pure Silver & White Confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#ffffff", "#d4d4d8", "#a1a1aa", "#71717a"],
        });
      } else {
        setIsSubmitting(false);
        setErrors((prev) => ({
          ...prev,
          general: result.error || "Submission rejected by server. Please check your details.",
        }));
      }
    } catch {
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        general: "Network transmission error. Please reach out to support@krynexlabs.in directly.",
      }));
    }
  };

  return (
    <footer id="contact" className="relative bg-black border-t border-white/[0.08] overflow-hidden pt-20">
      {/* ======================================================== */}
      {/* EXECUTIVE R&D CONSULTATION & CORPORATE GOODWILL SECTION */}
      {/* ======================================================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-3xl bg-[#080808] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)]">
          {/* Specular Top Line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Resend-Style Horizon Glow in Pure White / Silver */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[340px] bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>03 // EXECUTIVE R&amp;D INQUIRY PORTAL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Have an Unsolved Industry Challenge?
            </h2>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
              Connect with Krynex Labs to architect custom AI/ML and enterprise IT ecosystems.
              Collaborate directly with our senior research and systems engineers at SBR, Ahmedabad.
            </p>
          </div>

          {/* Interactive Corporate Inquiry Form */}
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="max-w-xl mx-auto p-8 rounded-2xl bg-black border border-white/10 text-center animate-fade-in"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs font-mono text-zinc-300 mb-2">
                INQUIRY REGISTERED // {ticketId}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Inquiry Routed to Corporate Engineering
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Thank you, <span className="text-white font-medium">{inquiryName}</span>. Your technical inquiry has been securely registered under reference <span className="font-mono text-white">{ticketId}</span>. A Systems Architect will evaluate your operational brief and reach out to{" "}
                <span className="text-white font-medium">{inquiryEmail}</span> within 2 business hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/thank-you?ref=${encodeURIComponent(ticketId)}`}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                >
                  View Transmission Record &rarr;
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setInquiryChallenge("");
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 hover:bg-white/[0.08] text-xs transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} noValidate className="max-w-2xl mx-auto space-y-4">
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
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/20 border border-red-500/40 text-xs text-red-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="footer-inquiry-name" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Your Name *
                  </label>
                  <input
                    id="footer-inquiry-name"
                    type="text"
                    value={inquiryName}
                    maxLength={100}
                    onChange={(e) => {
                      setInquiryName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Vikramaditya Mehta"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                      errors.name ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="footer-inquiry-email" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Corporate Email *
                  </label>
                  <input
                    id="footer-inquiry-email"
                    type="email"
                    value={inquiryEmail}
                    maxLength={120}
                    onChange={(e) => {
                      setInquiryEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="v.mehta@enterprise.com"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                      errors.email ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="footer-inquiry-company" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                  Company / Industry Vertical *
                </label>
                <input
                  id="footer-inquiry-company"
                  type="text"
                  value={inquiryCompany}
                  maxLength={120}
                  onChange={(e) => {
                    setInquiryCompany(e.target.value);
                    if (errors.company) setErrors({ ...errors, company: "" });
                  }}
                  placeholder="e.g. Continental Logistics & Ports / Manufacturing"
                  className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                    errors.company ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                  }`}
                />
                {errors.company && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.company}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="footer-inquiry-challenge" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                  Describe the Operational Challenge *
                </label>
                <textarea
                  id="footer-inquiry-challenge"
                  rows={3}
                  value={inquiryChallenge}
                  maxLength={1000}
                  onChange={(e) => {
                    setInquiryChallenge(e.target.value);
                    if (errors.challenge) setErrors({ ...errors, challenge: "" });
                  }}
                  placeholder="Briefly outline your current technical friction, data bottleneck, or AI automation objective..."
                  className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 resize-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                    errors.challenge ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                  }`}
                />
                {errors.challenge && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.challenge}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isSubmitting ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-black" />
                      <span>Encrypting &amp; Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Initiate R&amp;D Inquiry &rarr;</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 pt-3">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-400" />
                  MNC-GRADE CONFIDENTIALITY &amp; NDA PROTECTED
                </span>
                <span>•</span>
                <span>SBR, AHM, GUJ // AHMEDABAD HQ</span>
              </div>
            </form>
          )}
        </div>
      </div>

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
              Engineering bespoke artificial intelligence models, cloud backbones, and mission-critical
              enterprise software for compounding operational acceleration.
            </p>

            <div className="space-y-2.5 text-xs text-zinc-400 font-mono mb-6">
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                <div className="text-zinc-400 text-sm leading-relaxed space-y-1">
                  <p className="font-semibold text-white">KRYNEX LABS HEADQUARTERS</p>
                  <p>Sindhu Bhavan Road (SBR)</p>
                  <p>Ahmedabad, Gujarat — 380054</p>
                  <p className="text-zinc-500 text-xs">INDIA</p>
                </div>
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
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <a
                  href="tel:+917940000000"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  +91 (079) 4000-0000
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Krynex GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Krynex Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Krynex LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Capabilities */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              Capabilities
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Applied AI &amp; Neural Nets
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Full-Stack Enterprise IT
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Industrial Edge Vision
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Data Intelligence &amp; SCADA
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Zero-Trust Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Architecture */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              R&amp;D Division
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">
                  Engineering Matrix
                </a>
              </li>
              <li>
                <a href="#console" className="hover:text-white transition-colors">
                  Diagnostic Console
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">
                  Deterministic Guardrails
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Model Quantization
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Telemetry Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Governance */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4">
              Governance &amp; Legal
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#vision" className="hover:text-white transition-colors">
                  Corporate Thesis
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">
                  Industry Focus
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy &amp; Data
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; 99.99% SLA
                </Link>
              </li>
              <li>
                <button
                  onClick={onRequestDemo}
                  className="hover:text-white transition-colors text-left"
                >
                  Request Security Whitepaper
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* System Telemetry Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-zinc-300">ALL SYSTEMS NOMINAL</span>
            <span>{"//"}</span>
            <span>AHMEDABAD CLOUD DC-01</span>
          </div>

          <div>
            &copy; 2026 KRYNEX LABS INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Massive Subtle Background Wireframe Text */}
      <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden pb-4">
        <span className="text-[15vw] font-black tracking-tighter text-white/[0.03] leading-none uppercase">
          KRYNEX
        </span>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  MapPin,
  Mail,
  CheckCircle2,
  Cpu,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import KrynexLogo from "./KrynexLogo";

export default function Footer() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = "Full Name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "Full Name must be at least 2 characters.";
    }

    const trimmedEmail = workEmail.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail) {
      newErrors.workEmail = "Work Email is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.workEmail = "Please provide a valid corporate email.";
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Please provide at least 10 characters describing your inquiry.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          fullName: fullName.trim(),
          workEmail: workEmail.trim(),
          companyName: companyName.trim(),
          inquiryType,
          message: message.trim(),
          websiteHoneypot: honeypot,
          // Backwards compatibility mappings
          name: fullName.trim(),
          email: workEmail.trim(),
          company: companyName.trim(),
          challenge: message.trim(),
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.ok || result.success)) {
        setTicketId(result.referenceId || `KL-REQ-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setSubmitted(true);

        try {
          confetti({
            particleCount: 70,
            spread: 55,
            origin: { y: 0.7 },
            colors: ["#ffffff", "#d4d4d8", "#a1a1aa", "#71717a"],
          });
        } catch {
          // Non-blocking
        }
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
              <span>EXECUTIVE INQUIRY &amp; CONSULTATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Better Software Starts with Better Questions.
            </h2>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6">
              Connect directly with our engineering team in Ahmedabad to discuss custom enterprise software, AI architectures, or operational automation challenges.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link
                href="/solutions"
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 font-medium text-xs transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Interactive Corporate Inquiry Form */}
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="max-w-xl mx-auto p-8 rounded-2xl bg-black border border-white/10 text-center animate-fade-in space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Thank you for contacting Krynex Labs.
              </h3>
              <p className="text-sm text-zinc-300">
                Your inquiry has been submitted successfully.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{fullName}</span>. Your technical inquiry has been securely registered under reference <span className="font-mono text-white">{ticketId}</span>. A Systems Architect will evaluate your brief and reach out to{" "}
                <span className="text-white font-medium">{workEmail}</span> promptly during business hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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
                    setMessage("");
                    setFullName("");
                    setWorkEmail("");
                    setCompanyName("");
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
              <div className="hidden" aria-hidden="true">
                <label htmlFor="footer-honeypot">Leave empty</label>
                <input
                  id="footer-honeypot"
                  type="text"
                  name="websiteHoneypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errors.general && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/20 border border-red-500/40 text-xs text-red-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* 1. Full Name & 2. Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="footer-inquiry-name" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Full Name *
                  </label>
                  <input
                    id="footer-inquiry-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    maxLength={100}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="e.g. Vikramaditya Mehta"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                      errors.fullName ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                    }`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="footer-inquiry-email" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Work Email *
                  </label>
                  <input
                    id="footer-inquiry-email"
                    name="workEmail"
                    type="email"
                    required
                    value={workEmail}
                    maxLength={120}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                      if (errors.workEmail) setErrors({ ...errors, workEmail: "" });
                    }}
                    placeholder="v.mehta@enterprise.com"
                    className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                      errors.workEmail ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                    }`}
                  />
                  {errors.workEmail && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.workEmail}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Company Name & 4. Inquiry Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="footer-inquiry-company" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Company Name <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="footer-inquiry-company"
                    name="companyName"
                    type="text"
                    value={companyName}
                    maxLength={120}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Continental Industrial Group"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 focus:border-white"
                  />
                </div>

                <div>
                  <label htmlFor="footer-inquiry-type" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                    Inquiry Type *
                  </label>
                  <select
                    id="footer-inquiry-type"
                    name="inquiryType"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none font-sans transition-colors focus-visible:ring-1 focus-visible:ring-white/40 focus:border-white cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Software Development">Software Development</option>
                    <option value="SaaS & Technology Services">SaaS &amp; Technology Services</option>
                    <option value="Business Partnership">Business Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* 5. Message */}
              <div>
                <label htmlFor="footer-inquiry-message" className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase cursor-pointer">
                  Message *
                </label>
                <textarea
                  id="footer-inquiry-message"
                  name="message"
                  rows={3}
                  required
                  value={message}
                  maxLength={3000}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Describe your technical challenge, software requirements, or partnership objective..."
                  className={`w-full px-4 py-3 rounded-xl bg-black border text-sm text-white focus:outline-none font-sans transition-colors placeholder:text-zinc-600 resize-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                    errors.message ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                  }`}
                />
                {errors.message && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Privacy Consent Notice */}
              <div className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                By submitting this inquiry, you agree to our{" "}
                <Link href="/privacy" className="text-white underline underline-offset-2 hover:text-zinc-300 transition-colors">
                  Privacy Policy
                </Link>
                . Your information is handled under strict corporate data isolation standards.
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
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 pt-3">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-zinc-400" />
                  ENTERPRISE PRIVACY &amp; DATA ISOLATION PROTECTED
                </span>
                <span>•</span>
                <span>AHMEDABAD (IN)</span>
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
              Researching real-world operational bottlenecks and engineering high-impact enterprise software, AI architectures, and cloud systems for compounding business utility.
            </p>

            <div className="space-y-2.5 text-xs text-zinc-400 font-mono mb-6">
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 text-xs font-mono font-medium tracking-wide">
                  Sindhu Bhavan Road (SBR), Ahmedabad, Gujarat — 380054, India
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
              <div className="flex items-start gap-2 pt-0.5">
                <a
                  href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20an%20industry%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-wrap items-center gap-2 text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded py-0.5"
                  aria-label="Direct Messaging (WhatsApp Business): +91 9879418569"
                >
                  <svg
                    className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="font-semibold text-white group-hover:text-zinc-200 underline underline-offset-2">
                    +91 9879418569
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400 group-hover:border-white/25 group-hover:text-zinc-300 transition-colors">
                    Direct Messaging (WhatsApp Business) • No Unsolicited Calls
                  </span>
                </a>
              </div>
            </div>

            {/* Direct Channel Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20an%20industry%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 hover:border-white/30 text-xs text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                aria-label="Direct Messaging (WhatsApp Business)"
              >
                <svg
                  className="w-4 h-4 text-zinc-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp Business</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-300" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Services & Engineering */}
          <div>
            <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Services &amp; Engineering</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Services Overview
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-ml" className="hover:text-white transition-colors">
                  Applied AI &amp; Neural Architectures
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise-software" className="hover:text-white transition-colors">
                  Custom Enterprise Software
                </Link>
              </li>
              <li>
                <Link href="/solutions/web-mobile" className="hover:text-white transition-colors">
                  Web &amp; Mobile Applications
                </Link>
              </li>
              <li>
                <Link href="/solutions/cloud-data" className="hover:text-white transition-colors">
                  Cloud Infrastructure &amp; Zero-Trust
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
                  Engineering Model
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
                <Link href="/industries" className="hover:text-white transition-colors">
                  Target Industries
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  R&amp;D Diagnostic Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
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
            </ul>
          </div>
        </div>

        {/* System Telemetry Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
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

      {/* Massive Subtle Background Wireframe Text */}
      <div className="w-full flex justify-center pointer-events-none select-none overflow-hidden pb-4">
        <span className="text-[15vw] font-black tracking-tighter text-white/[0.03] leading-none uppercase">
          KRYNEX
        </span>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "Custom Software Architecture",
    painPoint: "",
  });

  const resetAndClose = useCallback(() => {
    setIsSuccess(false);
    setFormErrors({});
    setFallbackMailto(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetAndClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const initialFocus = modalRef.current?.querySelector<HTMLElement>(
        'input:not([type="hidden"]), button'
      );
      initialFocus?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, resetAndClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (honeypot) return;

    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = "Please provide a valid work email.";
    }

    if (!formData.company.trim()) {
      errors.company = "Please enter your company.";
    }

    if (!formData.painPoint.trim() || formData.painPoint.trim().length < 10) {
      errors.painPoint = "Please provide at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFallbackMailto(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          executiveName: formData.name.trim(),
          corporateEmail: formData.email.trim(),
          companySector: formData.company.trim(),
          operationalFriction: formData.painPoint.trim(),
          inquiryCategory: formData.sector,
          websiteHoneypot: honeypot,
          // Backwards compatibility mappings
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          challenge: formData.painPoint.trim(),
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.ok || result.success)) {
        setRequestId(result.referenceId || `KL-REQ-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setIsSuccess(true);

        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
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
        setFormErrors({ general: result.error || "Submission rejected by server. Please verify your details." });
      }
    } catch {
      setIsSubmitting(false);
      setFallbackMailto("mailto:support@krynexlabs.in?subject=Direct%20Consultation%20Inquiry%20Fallback");
      setFormErrors({ general: "Network transmission error. Please email support@krynexlabs.in directly." });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-2xl bg-[#0c0c0e]/95 border border-white/10 p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl"
      >
        {/* Silk Drapery Backdrop Inside Modal */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <Image
            src="/static/background-auth.jpg"
            alt=""
            fill
            className="object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0e]/75 via-[#0c0c0e]/92 to-[#0c0c0e]" />
        </div>

        {/* Specular Top Rim */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-10" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none z-20"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          {isSuccess ? (
            <div role="status" aria-live="polite" className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 id="modal-headline" className="text-2xl font-bold text-white tracking-tight">
                Inquiry Dispatched
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your inquiry has been received. Our team in Ahmedabad will reach out to{" "}
                <span className="text-white font-medium">{formData.email}</span> within 1–2 business days.
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                Reference ID: <span className="font-bold text-white">{requestId}</span>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Top Header */}
              <p className="text-xs text-zinc-400 font-normal mb-3">
                Direct Technical Consultation • Ahmedabad, India
              </p>

              <h3 id="modal-headline" className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-[1.1]">
                <span className="text-white block">Experience better</span>
                <span className="bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent block">software today</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                Get personal, reliable support from people who know your setup and care about your success.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="websiteHoneypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {formErrors.general && (
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-red-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{formErrors.general}</span>
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
                  <label htmlFor="modal-inquiry-email" className="text-xs sm:text-sm font-normal text-zinc-300 mb-1.5 block">
                    Email address
                  </label>
                  <input
                    id="modal-inquiry-email"
                    name="corporateEmail"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formErrors.email) setFormErrors((prev) => { const n = { ...prev }; delete n.email; return n; });
                    }}
                    placeholder="Enter your email"
                    className={`w-full bg-[#0f1013] border rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                      formErrors.email ? "border-red-400/80" : "border-white/10"
                    }`}
                  />
                  {formErrors.email && (
                    <div className="text-[11px] text-red-400 mt-1">{formErrors.email}</div>
                  )}
                </div>

                {/* Two Column: Name and Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="modal-inquiry-name" className="text-xs sm:text-sm font-normal text-zinc-300 mb-1.5 block">
                      Your name
                    </label>
                    <input
                      id="modal-inquiry-name"
                      name="executiveName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors((prev) => { const n = { ...prev }; delete n.name; return n; });
                      }}
                      placeholder="Enter your name"
                      className={`w-full bg-[#0f1013] border rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                        formErrors.name ? "border-red-400/80" : "border-white/10"
                      }`}
                    />
                    {formErrors.name && (
                      <div className="text-[11px] text-red-400 mt-1">{formErrors.name}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="modal-inquiry-company" className="text-xs sm:text-sm font-normal text-zinc-300 mb-1.5 block">
                      Company / Organization
                    </label>
                    <input
                      id="modal-inquiry-company"
                      name="companySector"
                      type="text"
                      required
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (formErrors.company) setFormErrors((prev) => { const n = { ...prev }; delete n.company; return n; });
                      }}
                      placeholder="Enter your company"
                      className={`w-full bg-[#0f1013] border rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                        formErrors.company ? "border-red-400/80" : "border-white/10"
                      }`}
                    />
                    {formErrors.company && (
                      <div className="text-[11px] text-red-400 mt-1">{formErrors.company}</div>
                    )}
                  </div>
                </div>

                {/* How can we help? */}
                <div>
                  <label htmlFor="modal-inquiry-challenge" className="text-xs sm:text-sm font-normal text-zinc-300 mb-1.5 block">
                    How can we help?
                  </label>
                  <textarea
                    id="modal-inquiry-challenge"
                    name="operationalFriction"
                    rows={3}
                    required
                    value={formData.painPoint}
                    onChange={(e) => {
                      setFormData({ ...formData, painPoint: e.target.value });
                      if (formErrors.painPoint) setFormErrors((prev) => { const n = { ...prev }; delete n.painPoint; return n; });
                    }}
                    placeholder="I'd like to know how Krynex Labs can help me with..."
                    className={`w-full bg-[#0f1013] border rounded-lg p-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans resize-none ${
                      formErrors.painPoint ? "border-red-400/80" : "border-white/10"
                    }`}
                  />
                  {formErrors.painPoint && (
                    <div className="text-[11px] text-red-400 mt-1">{formErrors.painPoint}</div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 cursor-pointer ${
                      formData.email.trim() && formData.painPoint.trim()
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

                {/* Footer Legal Note */}
                <p className="text-[11px] text-zinc-500 pt-3 border-t border-white/[0.06]">
                  By submitting, you agree to our{" "}
                  <Link href="/terms" onClick={resetAndClose} className="text-zinc-400 hover:text-white underline transition-colors">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" onClick={resetAndClose} className="text-zinc-400 hover:text-white underline transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, CheckCircle2, ArrowRight, Shield, Cpu, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

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
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "Advanced Manufacturing & Supply Chain",
    modelPreference: "Bespoke Enterprise AI Architecture",
    painPoint: "",
  });

  const resetAndClose = useCallback(() => {
    setIsSuccess(false);
    onClose();
  }, [onClose]);

  // Keyboard accessibility: Escape key dismissal and focus trap (DEFECT-NEW-01)
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

    // Auto-focus first visible input or close button on open
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
    if (honeypot) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setEmailError("Please provide a valid corporate email.");
      return;
    }
    setEmailError("");

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || "Enterprise Executive",
          email: formData.email,
          company: formData.company || "Enterprise Client",
          challenge: `${formData.sector} // ${formData.modelPreference}: ${formData.painPoint || "General Enterprise Consultation"}`,
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setRequestId(result.referenceId || `KRYNEX-CORP-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setIsSuccess(true);

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#ffffff", "#d4d4d8", "#a1a1aa", "#71717a"],
        });
      } else {
        setIsSubmitting(false);
        setEmailError(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setIsSubmitting(false);
      setEmailError("Network transmission error. Please email support@krynexlabs.in directly.");
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
        className="relative w-full max-w-xl rounded-3xl bg-[#080808] border border-white/15 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Specular Top Line */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div
            role="status"
            aria-live="polite"
            className="py-6 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300 uppercase mb-3">
              <span>INQUIRY REGISTERED // {requestId}</span>
            </div>

            <h3 id="modal-headline" className="text-2xl font-bold text-white mb-2 tracking-tight">
              Inquiry Routed to Corporate Engineering
            </h3>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
              Your inquiry has been logged under docket <span className="font-mono text-white">{requestId}</span>. A Senior Systems Architect based at SBR, Ahmedabad HQ will review your parameters and follow up at{" "}
              <span className="text-white font-medium">{formData.email}</span> within 2 business hours.
            </p>

            <div className="w-full p-4 rounded-2xl bg-black border border-white/[0.08] text-left text-xs font-mono text-zinc-300 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-500">Enterprise:</span>
                <span className="text-white">{formData.company || "Enterprise Client"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Domain Vector:</span>
                <span className="text-white">{formData.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Engagement Scope:</span>
                <span className="text-zinc-300">{formData.modelPreference}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Link
                href={`/thank-you?ref=${encodeURIComponent(requestId)}`}
                onClick={resetAndClose}
                className="w-full sm:flex-1 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors text-center shadow-sm"
              >
                View Transmission Docket &rarr;
              </Link>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 hover:bg-white/[0.08] text-sm transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                EXECUTIVE INQUIRY INTAKE
              </span>
            </div>

            <h3 id="modal-headline" className="text-2xl font-bold text-white mb-1 tracking-tight">
              Initiate R&amp;D Technical Consultation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Connect directly with KRYNEX LABS research engineers to audit your operational bottlenecks and architect custom AI/IT solutions.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_security_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-inquiry-name" className="block text-xs font-mono text-zinc-400 mb-1 cursor-pointer">
                    YOUR NAME *
                  </label>
                  <input
                    id="modal-inquiry-name"
                    required
                    type="text"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Mehta"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>

                <div>
                  <label htmlFor="modal-inquiry-email" className="block text-xs font-mono text-zinc-400 mb-1 cursor-pointer">
                    WORK EMAIL *
                  </label>
                  <input
                    id="modal-inquiry-email"
                    required
                    type="email"
                    maxLength={120}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (emailError) setEmailError("");
                    }}
                    placeholder="v.mehta@enterprise.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black border text-sm text-white focus:outline-none transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40 ${
                      emailError ? "border-red-500/50 bg-red-950/10" : "border-white/15 focus:border-white"
                    }`}
                  />
                  {emailError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-inquiry-company" className="block text-xs font-mono text-zinc-400 mb-1 cursor-pointer">
                    ORGANIZATION / FIRM *
                  </label>
                  <input
                    id="modal-inquiry-company"
                    required
                    type="text"
                    maxLength={120}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Continental Industrial Group"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40"
                  />
                </div>

                <div>
                  <label htmlFor="modal-inquiry-sector" className="block text-xs font-mono text-zinc-400 mb-1 cursor-pointer">
                    INDUSTRY DOMAIN
                  </label>
                  <select
                    id="modal-inquiry-sector"
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors focus-visible:ring-1 focus-visible:ring-white/40 cursor-pointer"
                  >
                    <option value="Advanced Manufacturing & Supply Chain">
                      Advanced Manufacturing &amp; Supply Chain
                    </option>
                    <option value="Banking, FinTech & Capital Markets">
                      Banking, FinTech &amp; Capital Markets
                    </option>
                    <option value="Maritime Ports & Logistics">
                      Maritime Ports &amp; Logistics
                    </option>
                    <option value="Chemical, Energy & Process Engineering">
                      Chemical, Energy &amp; Process Engineering
                    </option>
                    <option value="Enterprise Workflow & Cognitive IT">
                      Enterprise Workflow &amp; Cognitive IT
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  ENGAGEMENT FOCUS
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Bespoke Enterprise AI Architecture",
                    "Full-Stack IT Modernization",
                    "Technical Audit",
                  ].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFormData({ ...formData, modelPreference: pref })}
                      className={`p-2 rounded-lg text-[11px] font-mono border text-center transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                        formData.modelPreference === pref
                          ? "bg-white text-black border-white font-bold shadow"
                          : "bg-black border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="modal-inquiry-bottleneck" className="block text-xs font-mono text-zinc-400 mb-1 cursor-pointer">
                  DESCRIBE THE OPERATIONAL BOTTLENECK *
                </label>
                <textarea
                  id="modal-inquiry-bottleneck"
                  required
                  rows={2}
                  maxLength={1000}
                  value={formData.painPoint}
                  onChange={(e) => setFormData({ ...formData, painPoint: e.target.value })}
                  placeholder="e.g. Inefficiencies in multi-plant data synchronization, high manual QC inspection delay, or custom machine learning pipeline needs..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/40"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {isSubmitting ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-black" />
                    <span>Encrypting &amp; Transmitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request to Corporate Engineering</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-2">
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>NDA &amp; STRICT ENTERPRISE CONFIDENTIALITY PROTECTED • SBR, AHM, GUJ</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

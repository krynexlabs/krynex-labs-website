"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormProps {
  initialProduct?: string;
}

export default function ContactForm({ initialProduct }: ContactFormProps) {
  // Map query parameter slug (e.g. "krynex-lexis") to dropdown option
  const getInitialInquiryType = (prod?: string) => {
    if (!prod) return "Krynex Lexis Inquiry";
    const p = prod.toLowerCase();
    if (p.includes("lexis")) return "Krynex Lexis Inquiry";
    if (p.includes("flow")) return "Krynex Flow Inquiry";
    if (p.includes("vision")) return "Krynex Vision Inquiry";
    return "Krynex Lexis Inquiry";
  };

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryChallenge, setInquiryChallenge] = useState("");
  const [inquiryType, setInquiryType] = useState(getInitialInquiryType(initialProduct));
  const [requestMeeting, setRequestMeeting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Update inquiry type if initialProduct prop changes
  useEffect(() => {
    if (initialProduct) {
      setInquiryType(getInitialInquiryType(initialProduct));
    }
  }, [initialProduct]);

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
    if (honeypot) return; // Silent bot rejection
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
          company: `${inquiryCompany} [${inquiryType}]${requestMeeting ? " [Requested Zoom/Meet Architecture Walkthrough]" : ""}`,
          challenge: inquiryChallenge,
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setTicketId(result.referenceId || `KRX-RD-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setSubmitted(true);

        try {
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
        setErrors((prev) => ({
          ...prev,
          general: result.error || "Submission rejected by server. Please verify your details.",
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
    <div className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {submitted ? (
        <div className="py-12 text-center animate-fade-in space-y-4">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Inquiry Dispatched to Engineering Docket
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Your inquiry has been logged for review by our engineering team within our 1–2 business day SLA window.
          </p>
          <div className="inline-block px-4 py-2 rounded-xl bg-black border border-white/10 font-mono text-xs text-white">
            Reference ID: <span className="font-bold">{ticketId}</span>
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setInquiryName("");
                setInquiryEmail("");
                setInquiryCompany("");
                setInquiryChallenge("");
                setRequestMeeting(false);
              }}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Submit another technical brief
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleInquirySubmit} className="space-y-4" noValidate>
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Project Specification Dossier
          </div>

          {/* Bot Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="security_honeypot_contact">Leave empty</label>
            <input
              id="security_honeypot_contact"
              type="text"
              name="_security_honeypot"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
            />
          </div>

          {errors.general && (
            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Inquiry Category Selector */}
          <div>
            <label htmlFor="inquiry-category" className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
              Inquiry Category *
            </label>
            <select
              id="inquiry-category"
              name="inquiryCategory"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <option value="Krynex Lexis Inquiry">
                Krynex Lexis // Legal &amp; Statutory AI Drafting SaaS
              </option>
              <option value="Krynex Flow Inquiry">
                Krynex Flow // Enterprise Workflow &amp; Middleware Engine
              </option>
              <option value="Krynex Vision Inquiry">
                Krynex Vision // Edge Industrial Computer Vision QC
              </option>
              <option value="Propose Industry Problem">
                Propose Industry Bottleneck // Suggest Problem for R&amp;D
              </option>
              <option value="Software Subscription &amp; Licensing">
                Software Subscription &amp; Licensing Inquiry
              </option>
              <option value="Corporate Partnership">
                General Corporate / Technology Partnership
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="executive-name" className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Executive Name *
              </label>
              <input
                id="executive-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="e.g. Vikram Mehta"
                className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  errors.name ? "border-red-400/80" : "border-white/10 focus:border-white/40"
                }`}
              />
              {errors.name && (
                <div id="name-error" className="text-[10px] text-zinc-300 font-mono mt-1">
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="corporate-email" className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Corporate Email *
              </label>
              <input
                id="corporate-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="v.mehta@enterprise.com"
                className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  errors.email ? "border-red-400/80" : "border-white/10 focus:border-white/40"
                }`}
              />
              {errors.email && (
                <div id="email-error" className="text-[10px] text-zinc-300 font-mono mt-1">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="company-sector" className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
              Company &amp; Industry Sector *
            </label>
            <input
              id="company-sector"
              name="company"
              type="text"
              required
              autoComplete="organization"
              value={inquiryCompany}
              onChange={(e) => setInquiryCompany(e.target.value)}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "company-error" : undefined}
              placeholder="e.g. Apex Industrial Corp / Heavy Manufacturing"
              className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                errors.company ? "border-red-400/80" : "border-white/10 focus:border-white/40"
              }`}
            />
            {errors.company && (
              <div id="company-error" className="text-[10px] text-zinc-300 font-mono mt-1">
                {errors.company}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="operational-friction" className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
              Operational Friction &amp; Project Scope *
            </label>
            <textarea
              id="operational-friction"
              name="challenge"
              rows={4}
              required
              value={inquiryChallenge}
              onChange={(e) => setInquiryChallenge(e.target.value)}
              aria-invalid={Boolean(errors.challenge)}
              aria-describedby={errors.challenge ? "challenge-error" : undefined}
              placeholder="Detail the technical bottleneck, current legacy systems, estimated data volumes, or desired software licensing scale..."
              className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 resize-none ${
                errors.challenge ? "border-red-400/80" : "border-white/10 focus:border-white/40"
              }`}
            />
            {errors.challenge && (
              <div id="challenge-error" className="text-[10px] text-zinc-300 font-mono mt-1">
                {errors.challenge}
              </div>
            )}
          </div>

          {/* Option to request scheduled Google Meet / Zoom walkthrough */}
          <div className="flex items-center gap-2 pt-1 pb-2">
            <input
              type="checkbox"
              id="request-meeting"
              name="requestMeeting"
              checked={requestMeeting}
              onChange={(e) => setRequestMeeting(e.target.checked)}
              className="w-4 h-4 rounded bg-black border-white/20 text-white focus:ring-1 focus:ring-white"
            />
            <label htmlFor="request-meeting" className="text-xs text-zinc-300 select-none cursor-pointer">
              Request scheduled Google Meet / Zoom architecture walkthrough
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold hover:bg-zinc-200 py-3 rounded-xl transition-all text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Dispatching Dossier...</span>
              </>
            ) : (
              <>
                <span>Submit Technical Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-[10px] font-mono text-zinc-400 text-center pt-2">
            Encrypted transmission &bull; Zero public model co-mingling &bull; 1–2 business day SLA response
          </div>
        </form>
      )}
    </div>
  );
}

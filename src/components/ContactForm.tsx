"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormProps {
  initialProduct?: string;
}

export default function ContactForm({ initialProduct }: ContactFormProps) {
  const getInitialInquiryType = (prod?: string) => {
    if (!prod) return "Custom Software & AI Architecture";
    const p = prod.toLowerCase();
    if (p.includes("ai") || p.includes("ml")) return "AI & Machine Learning Systems";
    if (p.includes("cloud") || p.includes("data")) return "Cloud & Data Infrastructure";
    if (p.includes("enterprise") || p.includes("erp")) return "Enterprise Software Integration";
    if (p.includes("web") || p.includes("mobile")) return "Custom Web & Mobile Platforms";
    return "Custom Software & AI Architecture";
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

  useEffect(() => {
    if (initialProduct) {
      setInquiryType(getInitialInquiryType(initialProduct));
    }
  }, [initialProduct]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!inquiryName.trim()) {
      newErrors.name = "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inquiryEmail.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(inquiryEmail.trim())) {
      newErrors.email = "Please provide a valid corporate email.";
    }
    if (!inquiryCompany.trim()) {
      newErrors.company = "Please enter your company or industry.";
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
          inquiryCategory: inquiryType,
          executiveName: inquiryName,
          corporateEmail: inquiryEmail,
          companySector: inquiryCompany,
          operationalFriction: inquiryChallenge,
          requestWalkthrough: requestMeeting,
          websiteHoneypot: honeypot,
          // Backwards compatibility mappings
          name: inquiryName,
          email: inquiryEmail,
          company: `${inquiryCompany} [${inquiryType}]${requestMeeting ? " [Requested Architecture Walkthrough]" : ""}`,
          challenge: inquiryChallenge,
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
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors((prev) => ({
            ...prev,
            general: result.error || "Submission rejected by server. Please verify your details.",
          }));
        }
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
    <div className="w-full max-w-xl mx-auto relative">
      {submitted ? (
        <div className="py-12 text-center animate-fade-in space-y-4 rounded-2xl bg-[#0c0c0e]/80 border border-white/10 p-8 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Thank you for reaching out
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Your inquiry has been received. Our engineering team in Ahmedabad will review your details and respond within 1–2 business days.
          </p>
          <div className="inline-block px-4 py-2 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
            Reference ID: <span className="font-bold text-white">{ticketId}</span>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <a
              href={`mailto:support@krynexlabs.in?subject=${encodeURIComponent(
                `Inquiry Docket ${ticketId} - ${inquiryCompany}`
              )}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <span>Send direct email to support@krynexlabs.in</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setInquiryName("");
                setInquiryEmail("");
                setInquiryCompany("");
                setInquiryChallenge("");
                setRequestMeeting(false);
              }}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 focus:outline-none"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleInquirySubmit} className="space-y-6" noValidate>
          {/* Bot Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="security_honeypot_contact">Leave empty</label>
            <input
              id="security_honeypot_contact"
              type="text"
              name="websiteHoneypot"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
            />
          </div>

          {errors.general && (
            <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Email Address Field (Exact Resend placement) */}
          <div>
            <label htmlFor="corporate-email" className="text-xs sm:text-sm font-normal text-zinc-300 mb-2 block">
              Email address
            </label>
            <input
              id="corporate-email"
              name="corporateEmail"
              type="email"
              required
              autoComplete="email"
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              aria-invalid={Boolean(errors.corporateEmail || errors.email)}
              placeholder="Enter your email"
              className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                errors.corporateEmail || errors.email ? "border-red-400/80" : "border-white/10"
              }`}
            />
            {(errors.corporateEmail || errors.email) && (
              <div className="text-[11px] text-red-400 mt-1.5">
                {errors.corporateEmail || errors.email}
              </div>
            )}
          </div>

          {/* Two-Column: Name & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="executive-name" className="text-xs sm:text-sm font-normal text-zinc-300 mb-2 block">
                Your name
              </label>
              <input
                id="executive-name"
                name="executiveName"
                type="text"
                required
                autoComplete="name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                aria-invalid={Boolean(errors.executiveName || errors.name)}
                placeholder="Enter your name"
                className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                  errors.executiveName || errors.name ? "border-red-400/80" : "border-white/10"
                }`}
              />
              {(errors.executiveName || errors.name) && (
                <div className="text-[11px] text-red-400 mt-1.5">
                  {errors.executiveName || errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="company-sector" className="text-xs sm:text-sm font-normal text-zinc-300 mb-2 block">
                Company / Industry
              </label>
              <input
                id="company-sector"
                name="companySector"
                type="text"
                required
                autoComplete="organization"
                value={inquiryCompany}
                onChange={(e) => setInquiryCompany(e.target.value)}
                aria-invalid={Boolean(errors.companySector || errors.company)}
                placeholder="Enter your company"
                className={`w-full bg-[#0f1013] border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans ${
                  errors.companySector || errors.company ? "border-red-400/80" : "border-white/10"
                }`}
              />
              {(errors.companySector || errors.company) && (
                <div className="text-[11px] text-red-400 mt-1.5">
                  {errors.companySector || errors.company}
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Category (Hidden default for API contract) */}
          <input type="hidden" name="inquiryCategory" value={inquiryType} />

          {/* How can we help? Textarea (Exact Resend layout) */}
          <div>
            <label htmlFor="operational-friction" className="text-xs sm:text-sm font-normal text-zinc-300 mb-2 block">
              How can we help?
            </label>
            <textarea
              id="operational-friction"
              name="operationalFriction"
              rows={5}
              required
              value={inquiryChallenge}
              onChange={(e) => setInquiryChallenge(e.target.value)}
              aria-invalid={Boolean(errors.operationalFriction || errors.challenge)}
              placeholder="I'd like to know how Krynex Labs can help me with..."
              className={`w-full bg-[#0f1013] border rounded-lg p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all font-sans resize-none ${
                errors.operationalFriction || errors.challenge ? "border-red-400/80" : "border-white/10"
              }`}
            />
            {(errors.operationalFriction || errors.challenge) && (
              <div className="text-[11px] text-red-400 mt-1.5">
                {errors.operationalFriction || errors.challenge}
              </div>
            )}
          </div>

          {/* Optional walkthrough checkbox */}
          <div className="flex items-center gap-2.5 pt-0.5">
            <input
              type="checkbox"
              id="request-meeting"
              name="requestWalkthrough"
              checked={requestMeeting}
              onChange={(e) => setRequestMeeting(e.target.checked)}
              className="w-4 h-4 rounded bg-[#0f1013] border-white/20 text-white focus:ring-1 focus:ring-white accent-white cursor-pointer"
            />
            <label htmlFor="request-meeting" className="text-xs text-zinc-400 select-none cursor-pointer">
              Schedule Google Meet / Zoom technical walkthrough
            </label>
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
  );
}

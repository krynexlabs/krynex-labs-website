"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, Shield, Mail, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormProps {
  initialInquiryType?: string;
}

export default function ContactForm({ initialInquiryType }: ContactFormProps) {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [inquiryType, setInquiryType] = useState(initialInquiryType || "General Inquiry");
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
    } else if (trimmedName.length > 100) {
      newErrors.fullName = "Full Name must not exceed 100 characters.";
    }

    const trimmedEmail = workEmail.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail) {
      newErrors.workEmail = "Work Email is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.workEmail = "Please provide a valid work or corporate email.";
    } else if (trimmedEmail.length > 120) {
      newErrors.workEmail = "Email must not exceed 120 characters.";
    }

    if (companyName.trim().length > 120) {
      newErrors.companyName = "Company Name must not exceed 120 characters.";
    }

    const validInquiryTypes = [
      "General Inquiry",
      "Software Development",
      "SaaS & Technology Services",
      "Business Partnership",
      "Other",
    ];
    if (!validInquiryTypes.includes(inquiryType)) {
      newErrors.inquiryType = "Please select a valid inquiry type.";
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Please provide at least 10 characters describing your inquiry.";
    } else if (trimmedMessage.length > 3000) {
      newErrors.message = "Message must not exceed 3000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent anti-spam rejection

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
          // Backwards compatibility mappings for older handlers
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
            origin: { y: 0.65 },
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
            general: result.error || "Submission rejected by server. Please check your details and try again.",
          }));
        }
      }
    } catch {
      setIsSubmitting(false);
      setErrors((prev) => ({
        ...prev,
        general: "Network transmission error. Please email support@krynexlabs.in or reach out via WhatsApp.",
      }));
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {submitted ? (
        <div className="py-8 text-center animate-fade-in space-y-5" role="status" aria-live="polite">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-white">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight">
            Thank you for contacting Krynex Labs.
          </h3>

          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Your inquiry has been submitted successfully.
          </p>

          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Our engineering team in Ahmedabad will review your inquiry and follow up at{" "}
            <span className="text-white font-medium">{workEmail}</span> within 1–2 business days.
          </p>

          <div className="inline-block px-4 py-2 rounded-xl bg-black border border-white/10 font-mono text-xs text-white">
            Reference ID: <span className="font-bold text-zinc-200">{ticketId}</span>
          </div>

          {/* Direct Escalation Fallbacks */}
          <div className="pt-4 border-t border-white/[0.08] max-w-md mx-auto">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
              Direct Contact Channels
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/919879418569?text=${encodeURIComponent(
                  `Hello Krynex Labs, I have submitted inquiry ticket ${ticketId}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors"
              >
                <span>WhatsApp (+91 9879418569)</span>
              </a>
              <a
                href={`mailto:support@krynexlabs.in?subject=${encodeURIComponent(
                  `Inquiry ${ticketId} - ${fullName}`
                )}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-white transition-colors"
              >
                <span>support@krynexlabs.in</span>
              </a>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFullName("");
                setWorkEmail("");
                setCompanyName("");
                setMessage("");
                setInquiryType("General Inquiry");
                setErrors({});
              }}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Corporate Inquiry Form
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              * Required fields
            </span>
          </div>

          {/* Anti-spam Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteHoneypot">Do not fill this field</label>
            <input
              id="websiteHoneypot"
              type="text"
              name="websiteHoneypot"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
            />
          </div>

          {errors.general && (
            <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-white shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* 1. Full Name & 2. Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inquiry-full-name" className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                Full Name *
              </label>
              <input
                id="inquiry-full-name"
                name="fullName"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullname-error" : undefined}
                placeholder="e.g. Vikram Mehta"
                className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors ${
                  errors.fullName ? "border-red-400/80" : "border-white/10 focus:border-white/40"
                }`}
              />
              {errors.fullName && (
                <div id="fullname-error" className="text-[10px] text-zinc-300 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                  <span>{errors.fullName}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-work-email" className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                Work Email *
              </label>
              <input
                id="inquiry-work-email"
                name="workEmail"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                value={workEmail}
                onChange={(e) => {
                  setWorkEmail(e.target.value);
                  if (errors.workEmail) setErrors((prev) => ({ ...prev, workEmail: "" }));
                }}
                aria-invalid={Boolean(errors.workEmail)}
                aria-describedby={errors.workEmail ? "email-error" : undefined}
                placeholder="v.mehta@company.com"
                className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors ${
                  errors.workEmail ? "border-red-400/80" : "border-white/10 focus:border-white/40"
                }`}
              />
              {errors.workEmail && (
                <div id="email-error" className="text-[10px] text-zinc-300 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                  <span>{errors.workEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Company Name (Optional) & 4. Inquiry Type (Required) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inquiry-company-name" className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                Company Name <span className="text-zinc-600 font-normal">(Optional)</span>
              </label>
              <input
                id="inquiry-company-name"
                name="companyName"
                type="text"
                maxLength={120}
                autoComplete="organization"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: "" }));
                }}
                aria-invalid={Boolean(errors.companyName)}
                placeholder="e.g. Acme Industrial Corp"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white/40 transition-colors"
              />
              {errors.companyName && (
                <div className="text-[10px] text-zinc-300 font-mono mt-1">
                  {errors.companyName}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-type" className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                Inquiry Type *
              </label>
              <select
                id="inquiry-type"
                name="inquiryType"
                required
                value={inquiryType}
                onChange={(e) => {
                  setInquiryType(e.target.value);
                  if (errors.inquiryType) setErrors((prev) => ({ ...prev, inquiryType: "" }));
                }}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40 focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Software Development">Software Development</option>
                <option value="SaaS & Technology Services">SaaS &amp; Technology Services</option>
                <option value="Business Partnership">Business Partnership</option>
                <option value="Other">Other</option>
              </select>
              {errors.inquiryType && (
                <div className="text-[10px] text-zinc-300 font-mono mt-1">
                  {errors.inquiryType}
                </div>
              )}
            </div>
          </div>

          {/* 5. Message (Required) */}
          <div>
            <label htmlFor="inquiry-message" className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
              Message *
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              required
              maxLength={3000}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
              }}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Please describe your project, technical inquiry, operational challenge, or partnership objective..."
              className={`w-full bg-black border rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 resize-none transition-colors ${
                errors.message ? "border-red-400/80" : "border-white/10 focus:border-white/40"
              }`}
            />
            {errors.message && (
              <div id="message-error" className="text-[10px] text-zinc-300 font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* Privacy Consent Notice */}
          <div className="text-[11px] text-zinc-400 leading-relaxed pt-1">
            By submitting this inquiry, you agree to our{" "}
            <Link
              href="/privacy"
              className="text-white underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              Privacy Policy
            </Link>
            . We process inquiries with zero-retention data isolation.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold hover:bg-zinc-200 py-3 rounded-xl transition-all text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span>Send Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-[10px] font-mono text-zinc-500 text-center pt-2">
            Encrypted transmission &bull; Ahmedabad Headquarters &bull; 1–2 business day SLA response
          </div>
        </form>
      )}
    </div>
  );
}

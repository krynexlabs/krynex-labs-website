"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, MessageSquare, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import { trackConversionEvent } from "./Analytics";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    executiveName: "",
    corporateEmail: "",
    companySector: "",
    operationalFriction: "",
    websiteHoneypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.executiveName.trim()) {
      newErrors.executiveName = "Your name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.corporateEmail.trim()) {
      newErrors.corporateEmail = "Work email is required.";
    } else if (!emailRegex.test(formData.corporateEmail.trim())) {
      newErrors.corporateEmail = "Please enter a valid work email address.";
    }
    if (!formData.operationalFriction.trim()) {
      newErrors.operationalFriction = "Please tell us how we can help you.";
    } else if (formData.operationalFriction.trim().length < 10) {
      newErrors.operationalFriction = "Please provide at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          companySector: formData.companySector.trim() || "Independent / General",
          inquiryCategory: "General Engineering Inquiry",
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success || data.ok)) {
        setSubmitted(true);
        const refId = data.referenceId || `KL-${Date.now().toString(36).toUpperCase()}`;
        setTicketId(refId);

        trackConversionEvent("contact_form_submit", {
          referenceId: refId,
        });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#ffffff", "#caecff", "#02fcef"],
          });
        } catch {
          // Graceful fallback
        }
      } else {
        setServerError(data.error || "Submission failed. Please email support@krynexlabs.in directly.");
      }
    } catch {
      setServerError("Network error. Please email support@krynexlabs.in or reach out via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-[#09090b] border border-white/10 p-8 sm:p-10 space-y-6 text-center animate-in fade-in duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/20 flex items-center justify-center mx-auto text-white">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Message Dispatched Successfully.
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Our engineering team in Ahmedabad will review your project details and get back to you within 1 business day.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-black border border-white/[0.08] inline-block font-mono text-xs text-zinc-400">
          Reference ID: <span className="text-white font-semibold">{ticketId}</span>
        </div>

        <div className="pt-2">
          <Link
            href={`/thank-you?ref=${encodeURIComponent(ticketId)}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4"
          >
            <span>View executive docket →</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-[#09090b] border border-white/[0.08] p-8 sm:p-10 space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Hidden Anti-Spam Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Do not fill this</label>
        <input
          id="websiteHoneypot"
          type="text"
          name="websiteHoneypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.websiteHoneypot}
          onChange={handleChange}
        />
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Your Name */}
      <div className="space-y-2">
        <label
          htmlFor="executiveName"
          className="block text-xs font-mono font-medium text-zinc-300"
        >
          Your Name <span className="text-zinc-500">*</span>
        </label>
        <input
          id="executiveName"
          type="text"
          name="executiveName"
          required
          placeholder="e.g. Rahul Mehta"
          value={formData.executiveName}
          onChange={handleChange}
          className={`w-full h-11 px-4 rounded-xl bg-black border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
            errors.executiveName
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-white/30"
          }`}
        />
        {errors.executiveName && (
          <p className="text-xs text-red-400 font-mono">{errors.executiveName}</p>
        )}
      </div>

      {/* Work Email */}
      <div className="space-y-2">
        <label
          htmlFor="corporateEmail"
          className="block text-xs font-mono font-medium text-zinc-300"
        >
          Work Email <span className="text-zinc-500">*</span>
        </label>
        <input
          id="corporateEmail"
          type="email"
          name="corporateEmail"
          required
          placeholder="name@company.com"
          value={formData.corporateEmail}
          onChange={handleChange}
          className={`w-full h-11 px-4 rounded-xl bg-black border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
            errors.corporateEmail
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-white/30"
          }`}
        />
        {errors.corporateEmail && (
          <p className="text-xs text-red-400 font-mono">{errors.corporateEmail}</p>
        )}
      </div>

      {/* Company / Industry */}
      <div className="space-y-2">
        <label
          htmlFor="companySector"
          className="block text-xs font-mono font-medium text-zinc-300"
        >
          Company / Industry <span className="text-zinc-600">(Optional)</span>
        </label>
        <input
          id="companySector"
          type="text"
          name="companySector"
          placeholder="e.g. Apex Manufacturing // Industrial"
          value={formData.companySector}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl bg-black border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      {/* How can we help you? */}
      <div className="space-y-2">
        <label
          htmlFor="operationalFriction"
          className="block text-xs font-mono font-medium text-zinc-300"
        >
          How can we help you? <span className="text-zinc-500">*</span>
        </label>
        <textarea
          id="operationalFriction"
          name="operationalFriction"
          required
          rows={4}
          placeholder="Describe your technical challenges, custom software requirements, or AI integration goals..."
          value={formData.operationalFriction}
          onChange={handleChange}
          className={`w-full p-4 rounded-xl bg-black border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none ${
            errors.operationalFriction
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-white/30"
          }`}
        />
        {errors.operationalFriction && (
          <p className="text-xs text-red-400 font-mono">
            {errors.operationalFriction}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Direct Fallback Links */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
        <a
          href="mailto:support@krynexlabs.in"
          className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>support@krynexlabs.in</span>
        </a>
        <a
          href="https://wa.me/919879418569"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300 transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </form>
  );
}

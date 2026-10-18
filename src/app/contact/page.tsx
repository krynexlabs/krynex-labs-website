"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryChallenge, setInquiryChallenge] = useState("");
  const [inquiryType, setInquiryType] = useState("Krynex Lexis Inquiry");
  const [honeypot, setHoneypot] = useState("");

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
      newErrors.challenge = "Brief description of operational challenge is required.";
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
          company: `${inquiryCompany} [${inquiryType}]`,
          challenge: inquiryChallenge,
          _security_honeypot: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setTicketId(result.referenceId || `KRX-RD-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setSubmitted(true);

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
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
            <span>PRODUCT &amp; PARTNERSHIP INQUIRIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Initiate Product Dialogue.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl">
            Whether you are evaluating a software product trial, exploring subscription onboarding, or submitting an unsolved industry problem for our R&amp;D team to investigate, our software architects respond within 48 business hours.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-20 bg-[#030303]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-[#080808] border border-white/[0.08] space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Official WhatsApp
                  </div>
                  <a
                    href="https://wa.me/919879418569?text=Hello%20Krynex%20Labs,%20I%20would%20like%20to%20discuss%20an%20industry%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors group"
                  >
                    <span className="font-mono font-bold text-lg group-hover:underline">
                      +91 9879418569
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-zinc-400">
                      WhatsApp Only &bull; No Calls
                    </span>
                  </a>
                  <p className="text-xs text-zinc-400 mt-2">
                    Direct executive chat for urgent technical inquiries and project briefs.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Corporate Email
                  </div>
                  <a
                    href="mailto:support@krynexlabs.in"
                    className="font-mono text-sm text-white hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span>support@krynexlabs.in</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Engineering Headquarters
                  </div>
                  <div className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Krynex Labs</div>
                      <div>SBR (Sindhu Bhavan Road)</div>
                      <div>Ahmedabad, Gujarat 380054, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidentiality & Review Standards Card */}
              <div className="p-6 rounded-3xl bg-[#080808] border border-white/[0.08] space-y-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-white" />
                  <span>Confidentiality &amp; Data Privacy</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  Inquiries and operational challenges submitted through this portal are treated as strictly confidential business communications under our Privacy Policy. Formal bilateral NDAs are executed prior to deep architectural discovery or pilot deployment.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>Standard Response Window: 1-2 Business Days</span>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Consultation Form */}
            <div className="lg:col-span-7">
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
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                      Your technical inquiry has been routed to our Ahmedabad engineering architects.
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
                        }}
                        className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                      >
                        Submit another technical brief
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Project Specification Dossier
                    </div>

                    {/* Bot Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
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
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Inquiry Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white/40"
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
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Executive Name *
                        </label>
                        <input
                          type="text"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Vikram Mehta"
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                        />
                        {errors.name && (
                          <div className="text-[10px] text-zinc-400 mt-1">{errors.name}</div>
                        )}
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="v.mehta@enterprise.com"
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                        />
                        {errors.email && (
                          <div className="text-[10px] text-zinc-400 mt-1">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Company &amp; Industry Sector *
                      </label>
                      <input
                        type="text"
                        value={inquiryCompany}
                        onChange={(e) => setInquiryCompany(e.target.value)}
                        placeholder="e.g. Apex Industrial Corp / Heavy Manufacturing"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                      />
                      {errors.company && (
                        <div className="text-[10px] text-zinc-400 mt-1">{errors.company}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Operational Friction &amp; Project Scope *
                      </label>
                      <textarea
                        rows={4}
                        value={inquiryChallenge}
                        onChange={(e) => setInquiryChallenge(e.target.value)}
                        placeholder="Detail the technical bottleneck, current legacy systems, estimated data volumes, or desired software licensing scale..."
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 resize-none"
                      />
                      {errors.challenge && (
                        <div className="text-[10px] text-zinc-400 mt-1">{errors.challenge}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black font-semibold hover:bg-zinc-200 py-3 rounded-xl transition-all text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Dispatching Dossier..." : "Submit Technical Dossier"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="text-[10px] font-mono text-zinc-400 text-center pt-2">
                      Encrypted transmission &bull; Zero public model co-mingling &bull; 48hr SLA response
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

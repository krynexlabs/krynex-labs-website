import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import DraftingDemo from "@/components/DraftingDemo";
import {
  Terminal,
  Cpu,
  Activity,
  Layers,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "R&D Lab & Engineering Research",
  description:
    "Explore Krynex Labs R&D telemetry, model quantization experiments, deterministic mathematical guardrails, and our architectural simulation diagnostic console.",
  alternates: {
    canonical: "https://www.krynexlabs.in/research",
  },
};

export default function ResearchPage() {
  const telemetryBars = [
    35, 45, 60, 40, 75, 90, 65, 80, 55, 70, 85, 95, 60, 50, 65, 80,
    90, 75, 85, 60, 45, 70, 80, 65, 90, 85, 70, 55, 75, 85, 65, 50,
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300 uppercase mb-5">
              <span>EXPERIMENTAL ENGINEERING // AHMEDABAD DC-01</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              Empirical Research &amp; Architectural Envelopes.
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8">
              At Krynex Labs, we maintain an active R&amp;D division dedicated to pushing the performance
              boundaries of applied neural networks, hardware-level model quantization, deterministic
              language grammars, and ultra-high-frequency distributed streaming backbones.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Sub-15ms Inference Targets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Deterministic Grammar Decoders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero-Trust HSM Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Benchmark & Telemetry Envelope */}
      <section className="py-20 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#080808] border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-2 mb-8 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="tracking-wider uppercase font-semibold">
                  ARCHITECTURE BENCHMARK ENVELOPE // AHMEDABAD R&amp;D CLUSTER
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded bg-white/[0.04] text-zinc-400 border border-white/10">
                DISTRIBUTED TELEMETRY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div className="p-5 rounded-2xl bg-black border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Target Ingestion Throughput</div>
                <div className="text-3xl font-bold font-mono text-white tracking-tight mt-1 mb-1">
                  1.4M req/s
                </div>
                <div className="text-xs text-zinc-400">
                  Modeled across distributed Kafka &amp; Flink ingestion clusters
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-black border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Mathematical Guardrails Target</div>
                <div className="text-3xl font-bold font-mono text-white tracking-tight mt-1 mb-1">
                  99.98%
                </div>
                <div className="text-xs text-zinc-400">
                  Deterministic AST grammar verification to minimize generative drift and schema divergence
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-black border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Micro-Kernel Latency Objective</div>
                <div className="text-3xl font-bold font-mono text-white tracking-tight mt-1 mb-1">
                  &lt; 0.4ms
                </div>
                <div className="text-xs text-zinc-400">
                  Optimized C++/Rust runtime on edge TensorRT hardware
                </div>
              </div>
            </div>

            {/* Visualizer Waveform */}
            <div className="pt-4 border-t border-white/[0.06]">
              <div className="flex items-end justify-between gap-1 h-14 px-1">
                {telemetryBars.map((height, bIdx) => (
                  <div
                    key={bIdx}
                    style={{ height: `${height}%` }}
                    className="flex-1 bg-gradient-to-t from-white/20 via-zinc-400 to-white rounded-t-sm transition-all duration-500 opacity-80 hover:opacity-100"
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 text-[10px] font-mono text-zinc-400">
              * Design specifications and theoretical performance envelopes modeled for enterprise neural pipelines and custom zero-trust micro-services.
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Enterprise Diagnostic Console */}
      <div id="console">
        <DraftingDemo />
      </div>

      <SectionDivider />

      {/* 3 Active R&D Initiatives */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
              ACTIVE EXPERIMENTAL VECTORS
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Active Research Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/[0.08] relative">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-3">01 // QUANTIZATION</div>
              <h3 className="text-xl font-bold text-white mb-2">Edge INT4/INT8 Quantization</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Developing post-training weight quantization harnesses that compress 7B and 14B parameter
                models to run at full fidelity on edge industrial gateways with under 8GB VRAM.
              </p>
              <div className="text-[11px] font-mono text-zinc-300">Target: 3.8x memory footprint reduction</div>
            </div>

            <div className="p-8 rounded-3xl bg-[#080808] border border-white/[0.08] relative">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-3">02 // VERIFIABILITY</div>
              <h3 className="text-xl font-bold text-white mb-2">Deterministic Grammar Decoders</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Enforcing context-free grammars (CFGs) directly at the logit-sampling layer to guarantee
                that generated legal covenants and ERP payloads are mathematically incapable of syntax errors.
              </p>
              <div className="text-[11px] font-mono text-zinc-300">Target: Zero syntax or schema violations</div>
            </div>

            <div className="p-8 rounded-3xl bg-[#080808] border border-white/[0.08] relative">
              <div className="text-xs font-mono text-zinc-400 uppercase mb-3">03 // STREAMING</div>
              <h3 className="text-xl font-bold text-white mb-2">Sub-5ms Graph Convolution Networks</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Real-time topological fraud pattern detection across financial transaction graphs using
                custom GPU-accelerated sparse matrix multiplication kernels.
              </p>
              <div className="text-[11px] font-mono text-zinc-300">Target: &gt;85,000 tx/sec throughput</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

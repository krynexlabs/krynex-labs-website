export interface SolutionDetail {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  overview: string;
  keyProblemsSolved: string[];
  capabilities: {
    title: string;
    description: string;
    metrics?: string;
  }[];
  architectureHighlights: {
    title: string;
    detail: string;
  }[];
  deliverables: string[];
  ctaText: string;
}

export const SOLUTIONS_DATA: Record<string, SolutionDetail> = {
  "ai-ml": {
    slug: "ai-ml",
    title: "Applied AI & Neural Architectures",
    tagline: "Custom Neural Pipelines Engineered for Zero-Error Industrial Execution",
    category: "Division A // Applied AI & Enterprise Engineering",
    badge: "NEURAL ENGINEERING",
    overview:
      "We engineer bespoke neural networks, domain-adapted large language models, and high-frequency edge computer vision systems tailored to complex enterprise workflows. Unlike off-the-shelf consumer wrappers, our models operate under strict deterministic guardrails, zero-retention data sovereignty, and optimized micro-kernel execution.",
    keyProblemsSolved: [
      "Minimization of LLM hallucinations via deterministic AST verification and constrained grammar decoding.",
      "High-latency inference bottlenecks overcome with TensorRT quantization on local edge hardware (edge line speed).",
      "Protection of sensitive intellectual property with zero-retention private VPC and on-premise neural cluster deployments.",
      "Fragmented unstructured document processing transformed into verified JSON schemas with high-precision validation.",
    ],
    capabilities: [
      {
        title: "Domain-Adapted Foundation Models",
        description:
          "Targeted fine-tuning of open-weights models (Llama 3, Mistral, Gemma) on proprietary enterprise corpora using LoRA/QLoRA with rigorous benchmark evaluation.",
        metrics: "Targeted schema adherence",
      },
      {
        title: "Deterministic RAG & Clause Validation",
        description:
          "Hybrid sparse-dense retrieval architectures augmented with AST (Abstract Syntax Tree) verification and statutory rule enforcement engines.",
        metrics: "Sub-second retrieval latency target",
      },
      {
        title: "High-Speed Edge Computer Vision",
        description:
          "Industrial defect detection and SCADA telemetry correlation operating at high frame rates on edge NVIDIA Jetson and TensorRT runtime nodes.",
        metrics: "Minimized defect escape objective",
      },
      {
        title: "Predictive Analytics & Anomaly Detection",
        description:
          "Temporal Convolutional Networks (TCN) and Graph Neural Networks for predictive maintenance, fraud mitigation, and demand forecasting.",
        metrics: "Predictive maintenance cost reduction target",
      },
    ],
    architectureHighlights: [
      {
        title: "Mathematical Guardrails Layer",
        detail:
          "Every neural generation passes through a deterministic grammar parser before reaching enterprise storage, preventing malformed outputs.",
      },
      {
        title: "Hardware-Optimized Quantization",
        detail:
          "Custom ONNX Runtime and TensorRT kernels tuned for sub-second execution across heterogenous compute clusters.",
      },
      {
        title: "Air-Gapped Sovereign Hosting",
        detail:
          "Zero telemetry leaves your private network. Complete operational isolation compliant with defense and banking confidentiality.",
      },
    ],
    deliverables: [
      "Production-Ready Containerized Inference Service (Docker / K8s)",
      "Automated Continuous Evaluation & Drift Monitoring Harness",
      "Comprehensive Architecture Documentation & Benchmark Telemetry",
      "Full IP Transfer & On-Premise Deployment Runbooks",
    ],
    ctaText: "Architect Your Neural Pipeline",
  },
  "enterprise-software": {
    slug: "enterprise-software",
    title: "Custom Enterprise Software & Modernization",
    tagline: "Resilient Distributed Systems Built for Mission-Critical Corporate Velocity",
    category: "Division A // Applied AI & Enterprise Engineering",
    badge: "SYSTEMS ARCHITECTURE",
    overview:
      "We design, build, and modernize enterprise software backbones that support millions of daily transactions. From decomposing monolithic legacy databases to engineering event-driven microservices with high service availability, we deliver software that eliminates operational friction and scales predictably.",
    keyProblemsSolved: [
      "Fragile monolithic legacy codebases causing operational downtime and slow feature release cycles.",
      "High data synchronization latency between disparate ERP, CRM, and supply chain databases.",
      "Expensive software licensing lock-in with inflexible off-the-shelf enterprise suites.",
      "Manual data re-entry across disconnected internal applications creating human error.",
    ],
    capabilities: [
      {
        title: "Event-Driven Microservices Architecture",
        description:
          "Distributed systems built on Go, Node.js, and Java utilizing Apache Kafka and RabbitMQ for asynchronous, non-blocking transaction throughput.",
        metrics: "High-throughput capacity target",
      },
      {
        title: "Legacy Monolith Modernization",
        description:
          "Surgical strangler-fig pattern refactoring to migrate mission-critical legacy COBOL, .NET, and PHP systems without business interruption.",
        metrics: "Zero unplanned migration downtime objective",
      },
      {
        title: "Custom ERP & Operations Platforms",
        description:
          "Bespoke manufacturing execution systems (MES), multi-plant inventory control, and enterprise financial reconciliation portals.",
        metrics: "Accelerated workflow execution target",
      },
      {
        title: "High-Availability Database Engineering",
        description:
          "Multi-master PostgreSQL, distributed ClickHouse OLAP clusters, and low-latency Redis caching layers with automated failover.",
        metrics: "High availability target",
      },
    ],
    architectureHighlights: [
      {
        title: "Zero-Trust Service Mesh",
        detail:
          "mTLS encrypted inter-service communication with automated cryptographic certificate rotation and role-based access control.",
      },
      {
        title: "Stateless Cloud Orchestration",
        detail:
          "Kubernetes clusters configured with Horizontal Pod Autoscalers (HPA) and automated blue-green zero-downtime deployments.",
      },
      {
        title: "Immutable Event Sourcing",
        detail:
          "Cryptographically verifiable audit trails ensuring full compliance with regulatory audit standards and legal discovery.",
      },
    ],
    deliverables: [
      "Turnkey Production Application & Microservices Cluster",
      "Automated CI/CD Deployment Pipelines (GitHub Actions / ArgoCD)",
      "Disaster Recovery & Multi-Region Failover Runbooks",
      "Full Source Code Ownership with Zero Vendor Lock-in",
    ],
    ctaText: "Engineer Your Enterprise Backbone",
  },
  "web-mobile": {
    slug: "web-mobile",
    title: "Web & Mobile Application Engineering",
    tagline: "High-Performance Digital Products Engineered for Instant Responsiveness",
    category: "Division A // Applied AI & Enterprise Engineering",
    badge: "FULL-STACK ENGINEERING",
    overview:
      "We build modern, resilient web applications and native cross-platform mobile experiences that combine fluid responsive interfaces with industrial-grade reliability. Leveraging Next.js, React, React Native, and WebAssembly, we engineer customer-facing and internal portals that load instantly and operate reliably even under spotty network conditions.",
    keyProblemsSolved: [
      "Sluggish web interfaces causing high customer drop-off and diminished user productivity.",
      "Mobile applications that fail or lose data when field personnel work in offline or low-bandwidth environments.",
      "Inconsistent user experience across web, iOS, and Android platforms due to fragmented codebases.",
      "Complex analytical dashboards that freeze when rendering high-volume enterprise datasets.",
    ],
    capabilities: [
      {
        title: "Next.js & React Full-Stack Platforms",
        description:
          "Server-side rendered (SSR) and edge-computed web applications optimized for Rapid First Contentful Paint and exceptional Core Web Vitals.",
        metrics: "Rapid Edge FCP Target",
      },
      {
        title: "Offline-First Mobile Systems",
        description:
          "React Native and Flutter mobile applications engineered with local SQLite/WatermelonDB caching and automatic background conflict resolution.",
        metrics: "Offline data integrity architecture",
      },
      {
        title: "High-Density Data Visualizations",
        description:
          "Interactive WebGL, Canvas, and SVG visualization engines capable of smoothly rendering live enterprise datasets.",
        metrics: "Smooth fluid rendering target",
      },
      {
        title: "Enterprise Design Systems & PWA",
        description:
          "Accessible, keyboard-navigable component libraries aligned with WCAG 2.1 AA standards, progressive web app offline caching, and PWA installation.",
        metrics: "WCAG 2.1 AA accessibility alignment",
      },
    ],
    architectureHighlights: [
      {
        title: "Edge Compute & ISR Caching",
        detail:
          "Incremental Static Regeneration (ISR) and Anycast CDN caching ensure global sub-second page delivery.",
      },
      {
        title: "Optimistic UI & Background Sync",
        detail:
          "Instant client-side UI feedback with queued background synchronization that gracefully absorbs network dropouts.",
      },
      {
        title: "End-to-End Cryptographic Security",
        detail:
          "Client-side encryption for sensitive inputs before network transmission, combined with strict CSP and HTTP security headers.",
      },
    ],
    deliverables: [
      "Responsive Web Application & Multi-Platform Mobile Apps (iOS/Android)",
      "Living Design System & Component Library (Storybook / Figma Tokens)",
      "Automated End-to-End Test Suite (Playwright / Cypress)",
      "Production Cloud Hosting Configuration with Global CDN",
    ],
    ctaText: "Build Your Digital Product",
  },
  "cloud-data": {
    slug: "cloud-data",
    title: "Cloud Infrastructure, Data & Zero-Trust Security",
    tagline: "Scalable Cloud Foundations Engineered for Sovereign Data Isolation",
    category: "Division A // Applied AI & Enterprise Engineering",
    badge: "CLOUD & DATA INFRASTRUCTURE",
    overview:
      "We engineer enterprise cloud foundations, high-throughput real-time streaming pipelines, and zero-trust security postures across AWS, GCP, Azure, and private datacenter infrastructure. We ensure your corporate data is encrypted, compliant, and instantly accessible to analytics and AI pipelines without latency bottlenecks.",
    keyProblemsSolved: [
      "Uncontrolled cloud infrastructure expenditures driven by misconfigured auto-scaling and unoptimized compute instances.",
      "Data silos preventing cross-departmental business intelligence and training of proprietary AI models.",
      "Vulnerability to ransomware, insider threats, and compliance violations due to perimeter-only security models.",
      "Batch data processing lags preventing real-time operational decision making.",
    ],
    capabilities: [
      {
        title: "Zero-Trust Cloud Architecture",
        description:
          "Identity-aware proxying, least-privilege IAM policies, automated KMS cryptographic key rotation, and isolated VPC networks.",
        metrics: "Zero perimeter vulnerabilities objective",
      },
      {
        title: "Real-Time Streaming Data Pipelines",
        description:
          "High-throughput data ingestion using Apache Kafka, Apache Flink, and dbt to process millions of events per second with sub-second analytics.",
        metrics: "High-throughput streaming target",
      },
      {
        title: "Infrastructure as Code (IaC)",
        description:
          "Repeatable, audited infrastructure provisioning using Terraform and Pulumi with automated drift detection and compliance auditing.",
        metrics: "Codified infrastructure architecture",
      },
      {
        title: "FinOps & Cloud Cost Optimization",
        description:
          "Deep architectural auditing, spot instance orchestration, and workload rightsizing that systematically slashes infrastructure bills.",
        metrics: "Targeted cloud infrastructure cost reduction",
      },
    ],
    architectureHighlights: [
      {
        title: "Enterprise Key Management (KMS)",
        detail:
          "All cryptographic keys and data at rest are safeguarded via KMS-managed AES-256 envelope encryption.",
      },
      {
        title: "Multi-Cloud & Hybrid Disaster Recovery",
        detail:
          "Continuous automated database replication across multiple geographic regions with rapid recovery point objectives (RPO).",
      },
      {
        title: "Observability & Anomaly Telemetry",
        detail:
          "Centralized Prometheus, OpenTelemetry, and Grafana monitoring stacks providing deep visibility into every distributed request.",
      },
    ],
    deliverables: [
      "Complete Infrastructure as Code Repository (Terraform / Pulumi)",
      "Zero-Trust Security Posture & Compliance Audit Report",
      "Real-Time Data Lakehouse & Streaming Pipeline Configuration",
      "24/7 Monitoring Dashboard & Automated Alerting Matrix",
    ],
    ctaText: "Scale Your Cloud Infrastructure",
  },
};

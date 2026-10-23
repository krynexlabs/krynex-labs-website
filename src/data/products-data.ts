export interface PricingTier {
  name: string;
  price: string;
  usdPrice?: string;
  period: string;
  description: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
}

export interface ProductDetail {
  slug: string;
  name: string;
  shortTagline: string;
  fullTagline: string;
  category: string;
  division: string;
  status: "Live" | "In Development" | "Concept";
  summary: string;
  startingPrice: {
    inr: string;
    usd: string;
    period: string;
  };
  theProblem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  theSolution: {
    title: string;
    description: string;
    keyBenefits: string[];
  };
  features: {
    title: string;
    description: string;
    specs: string;
  }[];
  architecture: {
    title: string;
    description: string;
    specs: string[];
  };
  demoPreview: {
    title: string;
    subtitle: string;
    type: "legal-drafting" | "workflow-engine" | "edge-vision";
    sampleData: Record<string, string>;
  };
  pricingTiers: PricingTier[];
  documentationLinks: {
    label: string;
    href: string;
  }[];
}

export const PRODUCTS_DATA: Record<string, ProductDetail> = {
  "krynex-lexis": {
    slug: "krynex-lexis",
    name: "Krynex Lexis",
    shortTagline: "Regional AI Legal & Statutory Drafting System",
    fullTagline:
      "Deterministic Bilingual Drafting & Automated Title Clearance for Indian Statutory Jurisdictions",
    category: "LegalTech & Enterprise Compliance",
    division: "Krynex Software Products // Recurring SaaS",
    status: "Live",
    summary:
      "Bilingual legal drafting engine compiling verified statutory deeds and title clearance documentation against Gujarat revenue codes deterministically.",
    startingPrice: {
      inr: "₹1,499",
      usd: "$19",
      period: "/ month",
    },
    theProblem: {
      title: "The Manual Drafting Bottleneck in Indian Statutory Practice",
      description:
        "Drafting real estate deeds, title clearance dockets, sale agreements, and legal notices in India has remained a painful, slow manual bottleneck for decades.",
      painPoints: [
        "Advocates and corporate legal departments spend hours per document manually copying boilerplate clauses, risking omitted statutory covenants.",
        "Regional bilingual requirements (Gujarati & English) require clumsy manual translation, often introducing severe legal ambiguities in property schedules.",
        "Title search dockets across sub-registrar records (Index-II) require manual chronological indexing and indexing error auditing.",
        "Frequent statutory updates (Indian Stamp Act, Registration Act 1908, Gujarat Revenue Code) are easily missed in static Word templates.",
      ],
    },
    theSolution: {
      title: "Deterministic Clause Synthesis with Mathematical Verification",
      description:
        "Krynex Lexis replaces static templates with an intelligent, deterministic clause compiler that drafts, cross-references, and validates property covenants in real time.",
      keyBenefits: [
        "Target compilation speed: Designed for rapid bilingual Sale Deed (વેચાણ દસ્તાવેજ) and Title Report draft generation with deterministic statutory guardrails.",
        "Bilingual statutory precision: Full native vernacular support for Gujarati legal vocabulary (e.g., ખેતીની જમીન, બિનખેતી, બોજા મુક્ત પ્રમાણપત્ર) alongside high-standard English jurisprudence.",
        "Deterministic statutory guardrails: Automated calculations of stamp duty, registration fees, and mandatory statutory covenants.",
        "Client data sovereignty: Client case files and draft covenants are protected via AES-256 KMS encryption and never used to train public models.",
      ],
    },
    features: [
      {
        title: "Bilingual Clause Synthesis Engine",
        description:
          "Draft deeds simultaneously in Gujarati and English with parallel side-by-side covenant alignment, preserving exact statutory meaning.",
        specs: "Rapid AST compilation target",
      },
      {
        title: "Title Search & Index-II Triage",
        description:
          "Ingest revenue records (Village Form 7/12, 8A, 6 Haq Patrak, and Index-II sub-registrar dockets) to generate automated chain-of-title chronologies.",
        specs: "Automated encumbrance detection",
      },
      {
        title: "Statutory Stamp Duty & Fee Calculator",
        description:
          "Real-time calculation of Gujarat and national stamp duty rates, male/female concession rebates, and sub-registrar registration fees.",
        specs: "Updated to current statutory revenue guidelines",
      },
      {
        title: "Clause Bank & Redlining Audit Ledger",
        description:
          "Maintain your firm's private library of battle-tested dispute clauses, indemnity covenants, and arbitration clauses with automated change tracking.",
        specs: "Cryptographically signed audit logs",
      },
    ],
    architecture: {
      title: "Zero-Trust Private Legal Cloud Architecture",
      description:
        "Engineered to satisfy the highest standards of client-attorney privilege and data sovereignty.",
      specs: [
        "Client documents encrypted at rest with per-tenant AES-256 keys",
        "Isolated private VPC or on-premise offline deployment option",
        "Zero-retention inference: Inputs flushed immediately post-compilation",
        "Deterministic grammar decoder constrains generative drift to statutory templates",
      ],
    },
    demoPreview: {
      title: "Live Drafting Preview",
      subtitle: "Experience deterministic regional deed compilation",
      type: "legal-drafting",
      sampleData: {
        deedType: "Deed of Absolute Sale (વેચાણ દસ્તાવેજ)",
        jurisdiction: "Sub-Registrar Office, Ahmedabad-04 (Sanand)",
        landClassification: "Non-Agricultural Industrial (NA)",
        covenants: "Indemnity, Clear Title, Encumbrance Free",
        outputFormat: "Bilingual (Gujarati & English DOCX/PDF)",
      },
    },
    pricingTiers: [
      {
        name: "Advocate Starter",
        price: "₹1,499",
        usdPrice: "$19",
        period: "per month",
        description: "Ideal for individual advocates and boutique legal practitioners.",
        features: [
          "High-volume document dockets per month",
          "Full bilingual support (Gujarati & English)",
          "Standard deed & notice templates (Sale, Lease, POA, Notice)",
          "Gujarat Stamp Duty & Registration fee calculator",
          "Export to watermarked Word (.docx) and PDF",
          "Standard email engineering support",
        ],
        ctaText: "Start Starter Plan",
      },
      {
        name: "Professional MSME",
        price: "₹4,999",
        usdPrice: "$59",
        period: "per month",
        badge: "MOST POPULAR",
        highlighted: true,
        description: "For established law firms, real estate developers, and corporate legal departments.",
        features: [
          "Unlimited document compilation dockets",
          "Advanced Title Search & Index-II triage",
          "Custom firm clause bank & custom branding",
          "Multi-user team collaboration with dedicated seats",
          "OCR document ingestion for 7/12 & Haq Patrak",
          "Export unbranded print-ready legal parchment documents",
          "Priority engineering email support",
        ],
        ctaText: "Get Professional License",
      },
      {
        name: "Enterprise Custom",
        price: "Bespoke",
        usdPrice: "Custom",
        period: "annual licensing",
        description: "For large enterprise developers, banking legal panels, and statutory authorities.",
        features: [
          "Dedicated private VPC or on-premise deployment",
          "Custom ERP/DMS integration (SAP, Oracle, iManage)",
          "Unlimited seats with role-based access control (RBAC)",
          "Hardware Security Module (HSM) dedicated key vaults or KMS envelope encryption",
          "Custom fine-tuned statutory models on your historic contracts",
          "High availability architecture target with dedicated solutions architect",
          "Dedicated priority support via corporate email channel",
        ],
        ctaText: "Request Enterprise Consultation",
      },
    ],
    documentationLinks: [
      { label: "Technical Architecture Overview", href: "/products/krynex-lexis#architecture" },
      { label: "Bilingual Gujarati Vocabulary Guide", href: "/products/krynex-lexis#architecture" },
      { label: "Statutory Compliance Whitepaper", href: "/contact?subject=lexis-compliance" },
    ],
  },
  "krynex-flow": {
    slug: "krynex-flow",
    name: "Krynex Flow",
    shortTagline: "Enterprise Workflow & Legacy Integration Engine",
    fullTagline:
      "Event-Driven Process Orchestration Connecting Disparate Systems with Autonomous Triage",
    category: "Enterprise Automation & Middleware",
    division: "Krynex Software Products // Recurring SaaS",
    status: "In Development",
    summary:
      "An enterprise orchestration middleware platform built to bridge legacy on-premise databases, modern cloud APIs, and autonomous approval workflows.",
    startingPrice: {
      inr: "₹7,999",
      usd: "$99",
      period: "/ month",
    },
    theProblem: {
      title: "The Friction of Disparate Enterprise Systems",
      description:
        "Modern enterprises operate dozens of disconnected software tools—legacy ERPs, SQL databases, ticketing systems, and customer portals—forcing knowledge workers into manual glue work.",
      painPoints: [
        "Manual data re-entry between ERPs (SAP, Tally, Oracle) and modern SaaS apps creates costly reconciliation errors.",
        "Slow multi-departmental approval chains that stall purchase orders, vendor invoices, and compliance sign-offs for days.",
        "Lack of real-time visibility: Executives have no unified operational telemetry across disparate business units.",
        "Fragile point-to-point webhook scripts that break silently when API schemas change.",
      ],
    },
    theSolution: {
      title: "Resilient Event-Driven Middleware with Built-in AI Triage",
      description:
        "Krynex Flow provides a high-throughput distributed pipeline that ingests events, executes automated validation rules, orchestrates AI decision agents, and synchronizes backends seamlessly.",
      keyBenefits: [
        "Workflow acceleration target: Designed to streamline end-to-end invoice and approval lifecycles into an automated sequence.",
        "Autonomous document triage: Automatically classify, extract, and reconcile incoming PDF invoices, POs, and logistics waybills.",
        "Bi-directional legacy connectors: Pre-built zero-trust agents that integrate with on-premise SQL, SAP, and Tally without opening inbound firewall ports.",
        "Guaranteed message delivery: Distributed Kafka-backed queuing with automatic retry backoff and dead-letter queue auditing.",
      ],
    },
    features: [
      {
        title: "Visual Workflow Canvas & State Machine",
        description:
          "Define complex conditional routing, human-in-the-loop approvals, and parallel microservice executions without writing boilerplate code.",
        specs: "Deterministic state engine",
      },
      {
        title: "Autonomous AI Document Parsing",
        description:
          "Ingest scanned invoices, delivery receipts, and customs manifests; extract line items with high-precision validation; and match against purchase orders.",
        specs: "3-way ERP reconciliation target",
      },
      {
        title: "Outbound Webhook & Reverse-ETL Gateway",
        description:
          "Push processed and enriched event streams back into PostgreSQL, Snowflake, ClickHouse, or legacy on-prem systems in real time.",
        specs: "High-throughput design target",
      },
      {
        title: "Enterprise Role-Based Access & Audit Ledger",
        description:
          "Immutable, timestamped audit log of every state change, document approval, and API transmission for regulatory compliance.",
        specs: "Designed in alignment with SOC 2 & ISO 27001 security guidelines",
      },
    ],
    architecture: {
      title: "High-Availability Distributed Engine Architecture",
      description:
        "Constructed for resilience with zero single point of failure and stateless horizontal scaling.",
      specs: [
        "High-performance Go and Rust event-processing core",
        "Kafka-backed event streaming with at-least-once delivery and deterministic idempotent deduplication",
        "Outbound-only reverse proxy tunnels for secure on-premise database sync",
        "Multi-tenant cryptographic tenant isolation",
      ],
    },
    demoPreview: {
      title: "Live Orchestration Telemetry",
      subtitle: "Simulated enterprise multi-system dispatch",
      type: "workflow-engine",
      sampleData: {
        trigger: "Inbound Vendor Invoice (PDF)",
        parser: "AI Extraction Engine: High-confidence field matching",
        validation: "Match Verified against SAP Purchase Order",
        action: "Payment Drafted in Banking Portal + ERP Ledger Synced",
        totalTime: "Automated simulation runtime",
      },
    },
    pricingTiers: [
      {
        name: "Team Engine",
        price: "₹7,999",
        usdPrice: "$99",
        period: "per month",
        description: "For mid-sized companies seeking to automate internal operational workflows.",
        features: [
          "Up to 250,000 processed workflow events / month",
          "Up to 15 active automated workflow pipelines",
          "Standard connectors (REST, Webhooks, SQL, Tally, Sheets)",
          "AI Document Parser included",
          "Immutable audit log history",
          "Standard email engineering support",
        ],
        ctaText: "Start Team Engine",
      },
      {
        name: "Enterprise Fleet",
        price: "₹24,999",
        usdPrice: "$299",
        period: "per month",
        badge: "ENTERPRISE GRADE",
        highlighted: true,
        description: "For multi-plant enterprises with high-throughput transaction pipelines.",
        features: [
          "Up to 2,500,000 processed workflow events / month",
          "Unlimited automated workflow pipelines",
          "Advanced SAP, Oracle, and SCADA bi-directional connectors",
          "High-volume AI Document Parser included",
          "Extended compliance audit log retention",
          "Dedicated VPC deployment option",
          "High availability architecture target with priority emergency escalation",
        ],
        ctaText: "Deploy Enterprise Fleet",
      },
      {
        name: "Custom Cluster",
        price: "Bespoke",
        usdPrice: "Custom",
        period: "annual licensing",
        description: "For large enterprises requiring private air-gapped infrastructure.",
        features: [
          "Unlimited event throughput with custom Kubernetes clustering",
          "Air-gapped on-premise installation option",
          "Custom protocol connectors (OPC-UA, Modbus, proprietary legacy APIs)",
          "Dedicated cryptographic key management and enterprise data isolation",
          "High availability uptime architecture with dedicated engineering escalation",
        ],
        ctaText: "Consult Enterprise Architects",
      },
    ],
    documentationLinks: [
      { label: "Flow Architecture Overview", href: "/products/krynex-flow#architecture" },
      { label: "ERP Connector Specifications", href: "/products/krynex-flow#features" },
      { label: "Enterprise Security Dossier", href: "/contact?subject=flow-security" },
    ],
  },
  "krynex-vision": {
    slug: "krynex-vision",
    name: "Krynex Vision",
    shortTagline: "Edge Industrial Computer Vision & QC Engine",
    fullTagline: "Edge Surface Defect Detection & SCADA Correlation for High-Speed Production",
    category: "Industrial IoT & Edge AI",
    division: "Krynex Software Products // Recurring SaaS",
    status: "In Development",
    summary:
      "An edge-native industrial computer vision software platform engineered for continuous manufacturing, pharmaceuticals, and precision quality control.",
    startingPrice: {
      inr: "₹18,500",
      usd: "$229",
      period: "/ station / mo",
    },
    theProblem: {
      title: "The Unreliability of Manual Quality Control",
      description:
        "Human visual inspection on high-speed factory lines suffers from fatigue, subjective criteria, and slow throughput, allowing costly defects to escape to customers.",
      painPoints: [
        "Manual inspection error rates typically hover at elevated levels, leading to expensive customer warranty claims and product recalls.",
        "High-speed production lines (continuous lines) cannot be physically inspected by human operators in real time.",
        "Cloud-dependent AI systems introduce network latency and fail completely during factory internet outages.",
        "Lack of automatic correlation between detected visual defects and upstream machinery telemetry (temperatures, vibrations).",
      ],
    },
    theSolution: {
      title: "Edge TensorRT Vision Models with SCADA Feedback",
      description:
        "Krynex Vision deploys lightweight, quantized neural networks directly onto factory-floor edge gateways, triggering pneumatic reject actuators in real time.",
      keyBenefits: [
        "Target defect escape objective: Modeled to significantly reduce defect escapes compared to manual visual inspection baselines.",
        "Edge inference target: Modeled for high-speed continuous line inspection.",
        "100% offline edge autonomy: The system runs uninterrupted 24/7 without requiring external internet connectivity.",
        "Closed-loop PLC actuation: Direct digital output designed to trigger pneumatic air-blast reject mechanisms at line speed.",
      ],
    },
    features: [
      {
        title: "Multi-Camera Edge Orchestration",
        description:
          "Connect multiple industrial vision cameras (GigE or USB3 Vision) to a single edge gateway (NVIDIA Jetson / Industrial PC) with synchronized hardware strobe triggers.",
        specs: "Synchronized sub-millisecond triggering",
      },
      {
        title: "Defect Classification & Semantic Segmentation",
        description:
          "Identify scratches, micro-cracks, color variations, burrs, missing components, and barcode reading errors with sub-millimeter precision.",
        specs: "High-resolution optical target",
      },
      {
        title: "OPC-UA & Modbus PLC Gateway",
        description:
          "Direct integration with Siemens, Allen-Bradley, and Mitsubishi PLCs to correlate defect spikes with machinery vibration and temperature sensors.",
        specs: "Direct industrial bus communication",
      },
      {
        title: "Local Production Analytics Dashboard",
        description:
          "Touchscreen-optimized factory floor display showing real-time reject rates, yield analytics, Pareto charts, and defect image galleries.",
        specs: "Zero-latency local web UI",
      },
    ],
    architecture: {
      title: "Hardened Edge Factory Network Architecture",
      description:
        "Engineered for harsh industrial environments with physical isolation and zero-trust LAN protection.",
      specs: [
        "Edge computing on NVIDIA Jetson Orin / Industrial PC running Ubuntu Core",
        "Quantized INT8/FP16 TensorRT inference runtime",
        "Air-gapped operation with encrypted local SSD storage",
        "Optional scheduled synchronization with corporate cloud lakehouse",
      ],
    },
    demoPreview: {
      title: "Edge Vision Telemetry",
      subtitle: "Simulated industrial defect detection line",
      type: "edge-vision",
      sampleData: {
        lineSpeed: "Continuous conveyor speed",
        inferenceTime: "TensorRT INT8 runtime",
        defectType: "Micro-surface fracture detected on flange seal",
        actuatorStatus: "Pneumatic reject valve triggered",
        operationalYield: "High clean line yield objective",
      },
    },
    pricingTiers: [
      {
        name: "Single Inspection Station",
        price: "₹18,500",
        usdPrice: "$229",
        period: "per station / mo",
        description: "For single-line inspection and operational evaluation.",
        features: [
          "Supports 1 inspection station with dual industrial cameras",
          "Standard surface defect & dimensional models",
          "Edge inference runtime license",
          "Local touchscreen operator dashboard",
          "PLC reject trigger integration (Modbus/OPC-UA)",
          "Remote engineer onboarding & calibration",
        ],
        ctaText: "Inquire About Station",
      },
      {
        name: "Multi-Plant Fleet",
        price: "Custom",
        usdPrice: "Custom",
        period: "annual licensing",
        badge: "INDUSTRIAL SCALE",
        highlighted: true,
        description: "For manufacturing plants deploying automated vision across multiple lines.",
        features: [
          "Supports unlimited inspection lines & camera feeds",
          "Custom neural model training on your historic scrap parts",
          "Centralized plant-wide telemetry and multi-site dashboard",
          "Automated SCADA/MES bidirectional sync",
          "On-site factory calibration & lighting optimization by engineers",
          "Priority emergency incident escalation and remote support",
        ],
        ctaText: "Schedule Plant Audit",
      },
    ],
    documentationLinks: [
      { label: "Industrial Camera Hardware Guide", href: "/products/krynex-vision#architecture" },
      { label: "Edge PLC Wiring Specifications", href: "/products/krynex-vision#features" },
      { label: "Inquire About Plant Deployment", href: "/contact?subject=vision-inspection" },
    ],
  },
};

export interface PricingTier {
  name: string;
  price: string;
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
  status: "GA (General Availability)" | "Enterprise Pilot" | "Early Access";
  version: string;
  summary: string;
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
    division: "Division B // SaaS Products & Software Solutions",
    status: "GA (General Availability)",
    version: "v3.8.4",
    summary:
      "Krynex Lexis is India's premier bilingual legal drafting and title clearance intelligence platform. Purpose-built for corporate legal counsel, title advocates, and enterprise compliance teams in Gujarat and across India, Lexis eliminates dozens of hours of manual legal drafting by compiling legally binding deeds, agreements, and statutory notices in seconds—in both Gujarati and English—while strictly adhering to Indian statutory acts.",
    theProblem: {
      title: "The Manual Drafting Bottleneck in Indian Statutory Practice",
      description:
        "Drafting real estate deeds, title clearance dockets, sale agreements, and legal notices in India has remained a painful, slow manual bottleneck for decades.",
      painPoints: [
        "Advocates and corporate legal departments spend 4 to 8 hours per document manually copying boilerplate clauses, risking omitted statutory covenants.",
        "Regional bilingual requirements (Gujarati & English) require clumsy manual translation, often introducing severe legal ambiguities in property schedules.",
        "Title search dockets across 30 years of sub-registrar records (Index-II) require manual chronological indexing and indexing error auditing.",
        "Frequent statutory updates (Indian Stamp Act, Registration Act 1908, Gujarat Revenue Code) are easily missed in static Word templates.",
      ],
    },
    theSolution: {
      title: "Deterministic Clause Synthesis with Mathematical Verification",
      description:
        "Krynex Lexis replaces static templates with an intelligent, deterministic clause compiler that drafts, cross-references, and validates property covenants in real time.",
      keyBenefits: [
        "Sub-second compilation: Complete 18-page bilingual Sale Deed (વેચાણ કરાર) or Title Report compiled in under 1.2 seconds.",
        "Bilingual statutory precision: Full native vernacular support for Gujarati legal vocabulary (e.g., ખેતીની જમીન, બિનખેતી, બોજા મુક્ત પ્રમાણપત્ર) alongside high-standard English jurisprudence.",
        "Deterministic statutory guardrails: Automated calculations of stamp duty, registration fees, and mandatory statutory covenants.",
        "Zero data leakage: Client case files and draft covenants are encrypted using AES-256 HSM keys and never used to train public models.",
      ],
    },
    features: [
      {
        title: "Bilingual Clause Synthesis Engine",
        description:
          "Draft deeds simultaneously in Gujarati and English with parallel side-by-side covenant alignment, preserving exact statutory meaning.",
        specs: "Sub-second AST compilation",
      },
      {
        title: "30-Year Title Search & Index-II Triage",
        description:
          "Ingest revenue records (Village Form 7/12, 8A, 6 Haq Patrak, and Index-II sub-registrar dockets) to generate automated chain-of-title chronologies.",
        specs: "Automated encumbrance detection",
      },
      {
        title: "Statutory Stamp Duty & Fee Calculator",
        description:
          "Real-time calculation of Gujarat and national stamp duty rates, male/female concession rebates, and sub-registrar registration fees.",
        specs: "Updated to 2026 revenue guidelines",
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
        "Air-gapped VPC hosting option for corporate legal departments",
        "Zero-retention inference: Inputs flushed immediately post-compilation",
        "Deterministic grammar decoder prevents LLM hallucinations",
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
        period: "per month",
        description: "Ideal for individual advocates and boutique legal practitioners.",
        features: [
          "Up to 60 document dockets per month",
          "Full bilingual support (Gujarati & English)",
          "Standard deed & notice templates (Sale, Lease, POA, Notice)",
          "Gujarat Stamp Duty & Registration fee calculator",
          "Export to watermarked Word (.docx) and PDF",
          "Email & WhatsApp standard support",
        ],
        ctaText: "Start Starter Plan",
      },
      {
        name: "Professional MSME",
        price: "₹4,999",
        period: "per month",
        badge: "MOST POPULAR",
        highlighted: true,
        description: "For established law firms, real estate developers, and corporate legal departments.",
        features: [
          "Unlimited document compilation dockets",
          "Advanced 30-Year Title Search & Index-II triage",
          "Custom firm clause bank & custom branding",
          "Multi-user team collaboration (up to 5 seats)",
          "OCR document ingestion for 7/12 & Haq Patrak",
          "Export unbranded print-ready legal parchment documents",
          "Priority 1-hour SLA WhatsApp & direct phone support",
        ],
        ctaText: "Get Professional License",
      },
      {
        name: "Enterprise Custom",
        price: "Bespoke",
        period: "annual licensing",
        description: "For large enterprise developers, banking legal panels, and statutory authorities.",
        features: [
          "Dedicated private VPC or on-premise deployment",
          "Custom ERP/DMS integration (SAP, Oracle, iManage)",
          "Unlimited seats with role-based access control (RBAC)",
          "Hardware Security Module (HSM) dedicated key vaults",
          "Custom fine-tuned statutory models on your historic contracts",
          "99.99% uptime SLA with dedicated solutions architect",
          "24/7 dedicated telephone & on-site support",
        ],
        ctaText: "Request Enterprise Consultation",
      },
    ],
    documentationLinks: [
      { label: "Drafting Quickstart Guide", href: "/products/krynex-lexis#demo" },
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
    division: "Division B // SaaS Products & Software Solutions",
    status: "GA (General Availability)",
    version: "v2.6.0",
    summary:
      "Krynex Flow is an enterprise orchestration middleware platform designed to bridge the chasm between legacy on-premise databases, modern cloud APIs, and autonomous AI triage agents. It enables organizations to automate complex, multi-system operational workflows with zero human re-keying, sub-second latency, and mathematical audit verification.",
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
        "10x workflow acceleration: Reduce end-to-end invoice and approval lifecycles from 3 days to under 4 minutes.",
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
          "Ingest scanned invoices, delivery receipts, and customs manifests; extract line items with 99.8% precision; and match against purchase orders.",
        specs: "3-way ERP reconciliation",
      },
      {
        title: "Outbound Webhook & Reverse-ETL Gateway",
        description:
          "Push processed and enriched event streams back into PostgreSQL, Snowflake, ClickHouse, or legacy on-prem systems in real time.",
        specs: ">50k events/sec capacity",
      },
      {
        title: "Enterprise Role-Based Access & Audit Ledger",
        description:
          "Immutable, timestamped audit log of every state change, document approval, and API transmission for regulatory compliance.",
        specs: "SOC 2 & ISO 27001 aligned",
      },
    ],
    architecture: {
      title: "High-Availability Distributed Engine Architecture",
      description:
        "Constructed for resilience with zero single point of failure and stateless horizontal scaling.",
      specs: [
        "High-performance Go and Rust event-processing core",
        "Kafka-backed event streaming with exactly-once delivery guarantees",
        "Outbound-only reverse proxy tunnels for secure on-premise database sync",
        "Multi-tenant cryptographic tenant isolation",
      ],
    },
    demoPreview: {
      title: "Live Orchestration Telemetry",
      subtitle: "Simulated enterprise multi-system dispatch",
      type: "workflow-engine",
      sampleData: {
        trigger: "Inbound Vendor Invoice (PDF - ₹4,85,000)",
        parser: "AI Extraction Engine: 100% field confidence",
        validation: "3-Way Match Verified against SAP PO #88921",
        action: "Payment Drafted in Banking Portal + ERP Ledger Synced",
        totalTime: "1.8 seconds (vs 48 hrs manual)",
      },
    },
    pricingTiers: [
      {
        name: "Team Engine",
        price: "₹7,999",
        period: "per month",
        description: "For mid-sized companies seeking to automate internal operational workflows.",
        features: [
          "Up to 100,000 processed workflow events per month",
          "Up to 15 active automated workflow pipelines",
          "Standard connectors (REST, Webhooks, SQL, Tally, Sheets)",
          "AI Document Parser (up to 1,000 pages/mo)",
          "30-day immutable audit log history",
          "Standard email & WhatsApp engineering support",
        ],
        ctaText: "Start Team Engine",
      },
      {
        name: "Enterprise Fleet",
        price: "₹24,999",
        period: "per month",
        badge: "ENTERPRISE GRADE",
        highlighted: true,
        description: "For multi-plant enterprises with high-throughput transaction pipelines.",
        features: [
          "Up to 1,000,000 processed workflow events per month",
          "Unlimited automated workflow pipelines",
          "Advanced SAP, Oracle, and SCADA bi-directional connectors",
          "AI Document Parser (up to 15,000 pages/mo)",
          "1-year compliance audit log retention",
          "Dedicated VPC deployment option",
          "99.95% uptime SLA with 2-hour emergency escalation",
        ],
        ctaText: "Deploy Enterprise Fleet",
      },
      {
        name: "Custom Cluster",
        price: "Bespoke",
        period: "annual licensing",
        description: "For Fortune 500 conglomerates requiring private air-gapped infrastructure.",
        features: [
          "Unlimited event throughput with custom Kubernetes clustering",
          "Air-gapped on-premise installation option",
          "Custom protocol connectors (OPC-UA, Modbus, proprietary legacy APIs)",
          "Dedicated HSM key management and data sovereignty guarantees",
          "99.99% uptime SLA with round-the-clock dedicated engineers",
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
    fullTagline: "Sub-15ms Surface Defect Detection & SCADA Correlation for High-Speed Production",
    category: "Industrial IoT & Edge AI",
    division: "Division B // SaaS Products & Software Solutions",
    status: "Enterprise Pilot",
    version: "v1.4.2",
    summary:
      "Krynex Vision is an edge-native industrial computer vision software platform designed for continuous manufacturing, pharmaceuticals, and precision engineering plants. It interfaces directly with high-speed industrial cameras and SCADA PLCs to identify microscopic surface defects, dimensional anomalies, and assembly omissions in under 15 milliseconds per unit—operating entirely on-premises without dependency on cloud internet connections.",
    theProblem: {
      title: "The Unreliability of Manual Quality Control",
      description:
        "Human visual inspection on high-speed factory lines suffers from fatigue, subjective criteria, and slow throughput, allowing costly defects to escape to customers.",
      painPoints: [
        "Manual inspection error rates typically hover between 3% to 6%, leading to expensive customer warranty claims and product recalls.",
        "High-speed production lines (500+ parts/minute) cannot be physically inspected by human operators in real time.",
        "Cloud-dependent AI systems introduce network latency (200ms+) and fail completely during factory internet outages.",
        "Lack of automatic correlation between detected visual defects and upstream machinery telemetry (temperatures, vibrations).",
      ],
    },
    theSolution: {
      title: "Sub-15ms Edge TensorRT Vision Models with SCADA Feedback",
      description:
        "Krynex Vision deploys lightweight, quantized neural networks directly onto factory-floor edge gateways, triggering pneumatic reject actuators in real time.",
      keyBenefits: [
        "0.02% defect escape rate: Down from baseline 4.2% human manual inspection error.",
        "Sub-15ms edge inference: Real-time inspection capable of tracking lines moving up to 1,200 units per minute.",
        "100% offline edge autonomy: The system runs uninterrupted 24/7 without requiring external internet connectivity.",
        "Closed-loop PLC actuation: Direct digital output triggering pneumatic air-blast reject mechanisms within 20 milliseconds.",
      ],
    },
    features: [
      {
        title: "Multi-Camera Edge Orchestration",
        description:
          "Connect up to 8 GigE or USB3 Vision cameras to a single edge gateway (NVIDIA Jetson / Industrial PC) with synchronized hardware strobe triggers.",
        specs: "Synchronized sub-millisecond triggering",
      },
      {
        title: "Defect Classification & Semantic Segmentation",
        description:
          "Identify scratches, micro-cracks, color variations, burrs, missing components, and barcode reading errors with sub-millimeter precision.",
        specs: "0.1mm dimensional resolution",
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
        lineSpeed: "720 units/min",
        inferenceTime: "11.4 ms (TensorRT INT8)",
        defectType: "Micro-surface crack on high-pressure seal #A2",
        actuatorStatus: "Pneumatic reject valve triggered (Output #4)",
        operationalYield: "99.98% clean line yield",
      },
    },
    pricingTiers: [
      {
        name: "Pilot Line Station",
        price: "₹18,500",
        period: "per station / mo",
        description: "For single-line pilot validation and ROI assessment.",
        features: [
          "Supports 1 inspection station (up to 2 cameras)",
          "Standard surface defect & dimensional models",
          "Sub-15ms edge inference runtime license",
          "Local touchscreen operator dashboard",
          "PLC reject trigger integration (Modbus/OPC-UA)",
          "Remote engineer onboarding & calibration",
        ],
        ctaText: "Start Plant Pilot",
      },
      {
        name: "Multi-Plant Fleet",
        price: "Custom",
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
          "24/7 priority emergency industrial SLA support",
        ],
        ctaText: "Schedule Plant Audit",
      },
    ],
    documentationLinks: [
      { label: "Industrial Camera Hardware Guide", href: "/products/krynex-vision#architecture" },
      { label: "Edge PLC Wiring Specifications", href: "/products/krynex-vision#features" },
      { label: "Request On-Site Plant Pilot", href: "/contact?subject=vision-pilot" },
    ],
  },
};

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
  status: "Live" | "In Development" | "Concept" | "Private Beta" | "Early Pilot";
  badge?: string;
  summary: string;
  targetCustomers: string[];
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
    type: "legal-drafting" | "solar-ops" | "document-automation";
    sampleData: Record<string, string>;
  };
  pricingTiers: PricingTier[];
  documentationLinks: {
    label: string;
    href: string;
  }[];
}

export const PRODUCTS_DATA: Record<string, ProductDetail> = {
  "krynex-lawos": {
    slug: "krynex-lawos",
    name: "Krynex LawOS",
    shortTagline: "Legal Document Automation & Statutory Compliance Platform",
    fullTagline:
      "Deterministic Bilingual Deed Compilation, Automated Title Search & Stamp Verification for Indian Practice",
    category: "LegalTech & Document Automation",
    division: "Krynex Software Products // Recurring SaaS",
    status: "Private Beta",
    badge: "LEGALTECH OS",
    summary:
      "Bilingual legal document automation platform compiling verified statutory deeds and title clearance documentation against regional revenue codes deterministically.",
    targetCustomers: [
      "Individual Advocates & Boutique Practices",
      "Real Estate Developers & Land Promoters",
      "Corporate Legal Counsel & Compliance Teams",
      "Title Search Examiners & Conveyancing Panels",
    ],
    startingPrice: {
      inr: "₹1,499",
      usd: "$19",
      period: "/ month",
    },
    theProblem: {
      title: "The Clerical Bottleneck in Indian Statutory Conveyancing",
      description:
        "Drafting real estate deeds, title clearance dockets, sale agreements, and legal notices in India has remained a slow, manual administrative bottleneck prone to typographical errors.",
      painPoints: [
        "Advocates and corporate legal departments spend hours per document manually copying boilerplate clauses, risking omitted statutory covenants.",
        "Regional bilingual requirements (Gujarati & English) require clumsy manual translation, often introducing severe legal ambiguities in property schedules.",
        "Title search dockets across sub-registrar records (Index-II) require manual chronological indexing and encumbrance auditing.",
        "Frequent statutory updates (Indian Stamp Act, Registration Act 1908, Gujarat Revenue Code) are easily missed in static Word templates.",
      ],
    },
    theSolution: {
      title: "Deterministic Clause Synthesis with Mathematical Verification",
      description:
        "Krynex LawOS replaces static templates with an intelligent, deterministic clause compiler that drafts, cross-references, and validates property covenants in real time.",
      keyBenefits: [
        "Rapid compilation target: Designed for rapid bilingual Sale Deed (વેચાણ દસ્તાવેજ) and Title Report draft generation with deterministic statutory guardrails.",
        "Bilingual statutory precision: Full native vernacular support for Gujarati legal vocabulary alongside high-standard English jurisprudence.",
        "Deterministic statutory guardrails: Automated calculations of stamp duty, registration fees, and mandatory statutory covenants.",
        "Client data sovereignty: Client case files and draft covenants are protected via AES-256 KMS encryption and never used to train public models.",
      ],
    },
    features: [
      {
        title: "Bilingual Clause Synthesis Engine",
        description:
          "Draft deeds simultaneously in Gujarati and English with parallel side-by-side covenant alignment, preserving exact statutory meaning across languages.",
        specs: "Deterministic AST compilation engine",
      },
      {
        title: "Title Search & Index-II Triage",
        description:
          "Ingest revenue records (Village Form 7/12, 8A, 6 Haq Patrak, and Index-II sub-registrar dockets) to generate automated chain-of-title chronologies.",
        specs: "Automated encumbrance timeline mapping",
      },
      {
        title: "Statutory Stamp Duty & Fee Calculator",
        description:
          "Real-time calculation of Gujarat and national stamp duty rates, male/female concession rebates, and sub-registrar registration fees.",
        specs: "Updated to current statutory revenue guidelines",
      },
      {
        title: "Firm Clause Bank & Audit Ledger",
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
          "Export to clean Word (.docx) and PDF",
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
          "KMS envelope encryption with customer-managed keys (CMEK) and logical tenant isolation",
          "Custom fine-tuned statutory models on your historic contracts",
          "High availability architecture target with dedicated solutions architect",
          "Dedicated priority support via corporate email channel",
        ],
        ctaText: "Request Enterprise Consultation",
      },
    ],
    documentationLinks: [
      { label: "Technical Architecture Overview", href: "/products/krynex-lawos#architecture" },
      { label: "Bilingual Statutory Guide", href: "/products/krynex-lawos#features" },
      { label: "Request LawOS Walkthrough", href: "/contact?product=krynex-lawos" },
    ],
  },
  "solarops": {
    slug: "solarops",
    name: "SolarOps",
    shortTagline: "Solar Business Management & Project Execution Software",
    fullTagline:
      "End-to-End Solar Project Management, BOM Tracking & DISCOM Compliance for EPC Contractors",
    category: "CleanTech & Solar Business Management",
    division: "Krynex Software Products // Recurring SaaS",
    status: "In Development",
    badge: "CLEANTECH OS",
    summary:
      "Operations software platform for solar EPC contractors and rooftop installers to manage site feasibility surveys, quotation generation, DISCOM approvals, and telemetry monitoring.",
    targetCustomers: [
      "Solar EPC Contractors & Turnkey Developers",
      "Rooftop Solar Installation Teams",
      "Commercial & Industrial Solar Integrators",
      "Solar Asset Operations & Maintenance (O&M) Teams",
    ],
    startingPrice: {
      inr: "₹2,999",
      usd: "$39",
      period: "/ month",
    },
    theProblem: {
      title: "Operational Friction in Rooftop & Commercial Solar Delivery",
      description:
        "Solar EPC contractors struggle with disconnected spreadsheets, inaccurate shadow loss estimations, delayed DISCOM net-metering approvals, and procurement inventory leakage.",
      painPoints: [
        "Field site survey measurements recorded on paper lead to miscalculated system sizing and wrong inverter configurations.",
        "Quotation generation takes days, causing customer loss to faster competitors during commercial procurement windows.",
        "DISCOM net-metering documentation and government subsidy workflows are trapped in disorganized WhatsApp messages and email folders.",
        "Post-commissioning generation monitoring requires logging into multiple inverter portals with zero centralized telemetry.",
      ],
    },
    theSolution: {
      title: "Unified Solar Execution Engine from Survey to Grid Commissioning",
      description:
        "SolarOps unifies site feasibility modeling, automated bill-of-materials generation, DISCOM approval tracking, and IoT generation telemetry in one cohesive platform.",
      keyBenefits: [
        "Rapid quotation turnaround: Generate accurate system proposals with financial payback models in minutes.",
        "Accurate Balance of System (BOM): Automated calculations for panels, inverter capacities, structure tilt, and DC/AC cable schedules.",
        "DISCOM statutory tracker: Milestone-driven checklist for net-metering applications, inspection readiness, and subsidy releases.",
        "Unified inverter telemetry: Centralized performance monitoring across Growatt, Sungrow, Solis, and Huawei inverters.",
      ],
    },
    features: [
      {
        title: "Automated Solar Sizing & Financial Modeler",
        description:
          "Calculate solar PV capacity based on roof area, electricity tariff slabs, and solar irradiance, outputting automated ROI and payback schedules.",
        specs: "Granular solar irradiance simulation target",
      },
      {
        title: "Dynamic Bill of Materials (BOM) & Costing",
        description:
          "Automatically compile hardware components—modules, inverters, structures, lightning arrestors, and earthing pits—with live vendor catalog pricing.",
        specs: "Real-time procurement cost calculation",
      },
      {
        title: "DISCOM Net-Metering & Subsidy Lifecycle Tracker",
        description:
          "Track step-by-step statutory progress across DISCOM approval phases: feasibility consent, work completion report (WCR), meter installation, and commissioning.",
        specs: "Automated document docket generation",
      },
      {
        title: "Field Crew Dispatch & Installation Milestones",
        description:
          "Mobile-friendly daily installation logging, site photo uploads, and technician dispatch to eliminate project delivery delays.",
        specs: "Offline-capable mobile field logging",
      },
    ],
    architecture: {
      title: "Cloud-Native Solar Operations Architecture",
      description:
        "Built for real-time field synchronization, telemetry ingestion, and offline mobile resilience.",
      specs: [
        "Event-driven cloud microservices with sub-second API responses",
        "Offline-first mobile synchronization for remote installation sites",
        "MQTT/HTTP IoT inverter telemetry ingestion pipeline",
        "Role-based access control for surveyors, project managers, and finance officers",
      ],
    },
    demoPreview: {
      title: "SolarOps Project Console",
      subtitle: "Simulated rooftop solar engineering workflow",
      type: "solar-ops",
      sampleData: {
        siteLocation: "Sanand Industrial Estate, Ahmedabad",
        systemCapacity: "120 kWp Rooftop Grid-Tied PV",
        estimatedYield: "175,000 kWh / Year",
        estimatedPayback: "3.2 Years Projected",
        discomStage: "Work Completion Report (WCR) Submitted",
      },
    },
    pricingTiers: [
      {
        name: "Installer Base",
        price: "₹2,999",
        usdPrice: "$39",
        period: "per month",
        description: "For boutique residential rooftop installers managing up to 10 active sites monthly.",
        features: [
          "Up to 10 active solar projects simultaneously",
          "Automated solar sizing & proposal generation",
          "Standard BOM bill of materials export",
          "DISCOM milestone tracking checklist",
          "PDF quotation generator with your branding",
          "Standard email engineering support",
        ],
        ctaText: "Start Installer Plan",
      },
      {
        name: "EPC Fleet",
        price: "₹8,999",
        usdPrice: "$109",
        period: "per month",
        badge: "MOST POPULAR",
        highlighted: true,
        description: "For active commercial & industrial solar EPC contractors managing multiple installation crews.",
        features: [
          "Unlimited active solar projects and site surveys",
          "Advanced dynamic BOM costing with vendor margins",
          "Mobile technician dispatch & photo punch-lists",
          "DISCOM net-metering document repository",
          "IoT inverter telemetry dashboard integration",
          "Multi-user role permissions (Sales, EPC, Accounts)",
          "Priority engineering email support",
        ],
        ctaText: "Deploy EPC Fleet",
      },
      {
        name: "Developer Enterprise",
        price: "Bespoke",
        usdPrice: "Custom",
        period: "annual licensing",
        description: "For utility-scale solar developers and multi-megawatt portfolio asset managers.",
        features: [
          "Multi-site SCADA and centralized telemetry gateway",
          "Custom ERP integration (SAP, Tally, Zoho Books)",
          "Automated O&M maintenance ticketing & degradation alerts",
          "Dedicated cloud tenant with KMS envelope encryption",
          "High availability uptime architecture target",
          "Dedicated technical onboarding manager",
        ],
        ctaText: "Consult Enterprise Solutions",
      },
    ],
    documentationLinks: [
      { label: "SolarOps System Sizing Guide", href: "/products/solarops#features" },
      { label: "DISCOM Compliance Whitepaper", href: "/products/solarops#architecture" },
      { label: "Inquire About SolarOps Early Pilot", href: "/contact?product=solarops" },
    ],
  },
};



export interface IndustryDetail {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  targetWorkflow: string;
  bottlenecks: string[];
  whyExistingInadequate: string;
  krynexSolution: string;
  architectureDetails: string[];
  beneficiaries: string;
  statusLabel: string;
  quantifiedImpact: {
    metric: string;
    label: string;
    sublabel: string;
  }[];
  caseDossier: {
    clientType: string;
    deployedSystem: string;
    result: string;
  };
}

export const INDUSTRIES_DATA: IndustryDetail[] = [
  {
    slug: "legal-real-estate",
    name: "Legal and Real Estate",
    badge: "LEGALTECH & PROPERTY CONVEYANCING",
    tagline: "Deterministic Bilingual Document Synthesis & Title Search Automation",
    overview:
      "Corporate legal counsel, title advocates, and real estate developers in India face severe operational backlogs manually drafting deeds, search dockets, and statutory notices across Gujarati and English revenue records. We research conveyancing bottlenecks and engineer deterministic drafting software to eliminate manual typing and legal ambiguity.",
    targetWorkflow:
      "Real estate conveyancing, sub-registrar Index-II searches, revenue record title clearance, and bilingual statutory notice generation.",
    bottlenecks: [
      "Advocates and legal officers spend hours per document manually copying boilerplate clauses, risking omitted statutory covenants.",
      "Regional bilingual requirements (Gujarati & English) require clumsy manual translation, introducing severe legal ambiguities in property schedules.",
      "Manual multi-decade sub-registrar searches (Index-II) risk overlooked encumbrances, bank mortgages, and costly title disputes.",
    ],
    whyExistingInadequate:
      "Generic word processors and consumer AI chat tools lack statutory revenue grammar guardrails, hallucinate non-existent legal citations, and compromise confidentiality when private property dockets are uploaded to public cloud servers.",
    krynexSolution:
      "Krynex LawOS: A bilingual legal document automation platform compiling verified draft deeds and title clearance dockets in minutes with deterministic statutory verification against regional revenue guidelines.",
    architectureDetails: [
      "Bilingual Gujarati and English statutory vocabulary grammar compiler",
      "Automated revenue record ingestion (Village Form 7/12, 8A, Index-II)",
      "Dedicated KMS envelope encryption with zero public model training retention",
    ],
    beneficiaries:
      "Corporate legal counsel, conveyancing advocates, real estate developers, and statutory compliance officers.",
    statusLabel: "Enterprise Software Solution (Private Beta)",
    quantifiedImpact: [
      { metric: "Rapid", label: "Drafting Turnaround", sublabel: "Target acceleration over manual copying" },
      { metric: "Native", label: "Bilingual Precision", sublabel: "Parallel Gujarati & English statutory alignment" },
      { metric: "Zero-Retention", label: "Client Sovereignty", sublabel: "KMS envelope encryption for case dockets" },
    ],
    caseDossier: {
      clientType: "Real Estate Developers & Legal Firm Title Teams",
      deployedSystem: "Krynex LawOS Bilingual Drafting Engine",
      result: "Automated bilingual deed compilation with instant stamp duty and registration fee calculations.",
    },
  },
  {
    slug: "solar-energy",
    name: "Solar Energy",
    badge: "CLEANTECH & EPC PROJECT OPERATIONS",
    tagline: "Unified Project Lifecycle Management & DISCOM Compliance for Solar EPCs",
    overview:
      "Rooftop and commercial solar EPC contractors lose substantial margins to dislocated project data: inaccurate site survey measurements, delayed DISCOM net-metering approvals, inventory leakage in balance-of-system procurement, and fragmented post-installation inverter monitoring.",
    targetWorkflow:
      "Solar site survey feasibility, dynamic bill of materials (BOM) sizing, DISCOM net-metering statutory milestone tracking, and installation dispatch.",
    bottlenecks: [
      "Field site measurements recorded manually on paper lead to miscalculated system sizing and incorrect inverter selections.",
      "DISCOM net-metering documentation and government subsidy workflows are trapped in disorganized spreadsheets and message threads, dragging projects out for months.",
      "Lack of real-time visibility between warehouse inventory, procurement purchase orders, and on-site balance-of-system consumption.",
    ],
    whyExistingInadequate:
      "Generic CRM and project management tools lack solar engineering domain logic—they cannot compute solar irradiance tilt losses, compile electrical single-line diagrams (SLD), or track Indian state DISCOM compliance stages.",
    krynexSolution:
      "SolarOps: An end-to-end solar business management platform connecting site survey feasibility modeling, automated quotation generation, DISCOM approval checklists, and centralized inverter IoT telemetry.",
    architectureDetails: [
      "Solar PV capacity and generation yield estimation engine",
      "Dynamic multi-tier Bill of Materials (BOM) generator with live cost indexing",
      "Milestone-driven DISCOM net-metering statutory tracker with document docket compiler",
    ],
    beneficiaries:
      "Solar EPC contractors, rooftop installers, renewable energy project managers, and solar asset O&M technicians.",
    statusLabel: "Operations Platform (In Active Development)",
    quantifiedImpact: [
      { metric: "Minutes", label: "Quotation Generation", sublabel: "Automated proposal & financial model target" },
      { metric: "Milestone", label: "DISCOM Compliance", sublabel: "Step-by-step net-metering stage tracking" },
      { metric: "Centralized", label: "BOM Inventory", sublabel: "Real-time balance-of-system cost accounting" },
    ],
    caseDossier: {
      clientType: "Commercial & Industrial Rooftop Solar Installers",
      deployedSystem: "SolarOps EPC Management Console",
      result: "Streamlined customer proposal turnaround and structured DISCOM milestone tracking.",
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    badge: "INDUSTRIAL IOT & QUALITY CONTROL",
    tagline: "Edge Computer Vision & Anomaly Telemetry for Continuous Production Lines",
    overview:
      "Continuous manufacturing facilities face severe margin erosion from microscopic surface defects escaping on fast-moving lines, uncalibrated machinery vibrations causing sudden breakdown downtime, and delayed production logging.",
    targetWorkflow:
      "Continuous component assembly, optical quality inspection, shop-floor SCADA telemetry correlation, and automatic reject actuation.",
    bottlenecks: [
      "Manual visual inspection error rates allowing microscopic defects to escape to downstream automotive and industrial buyers.",
      "High-speed production lines running too fast for reliable human visual inspection.",
      "Cloud-dependent inspection software introducing network latency and failing during factory internet outages.",
    ],
    whyExistingInadequate:
      "Legacy machine vision boxes require rigid proprietary hardware, cost tens of lakhs in upfront capex, and fail to correlate detected defects with upstream PLC temperature, pressure, and motor vibration telemetry.",
    krynexSolution:
      "Edge-native computer vision software deploying quantized TensorRT neural models directly onto factory floor industrial PCs, triggering pneumatic reject actuators at line speed with 100% offline autonomy.",
    architectureDetails: [
      "Edge inference on NVIDIA Jetson / Industrial PCs running Ubuntu Core",
      "Air-gapped operation with local PLC actuation (Modbus / OPC-UA)",
      "Automated bidirectional ERP & MES synchronization",
    ],
    beneficiaries:
      "Plant operations managers, quality control engineers, precision component fabricators, and discrete manufacturers.",
    statusLabel: "Industrial Edge Software (In Active Development)",
    quantifiedImpact: [
      { metric: "Offline", label: "Edge Autonomy", sublabel: "Zero reliance on external internet for line inspection" },
      { metric: "Sub-Second", label: "Defect Detection", sublabel: "Real-time optical inference on conveyor lines" },
      { metric: "Closed-Loop", label: "PLC Actuation", sublabel: "Direct pneumatic valve trigger at line speed" },
    ],
    caseDossier: {
      clientType: "Precision Component & Continuous Manufacturing Facilities",
      deployedSystem: "Edge Computer Vision Inspection Station",
      result: "Automated surface defect identification and real-time reject triggering without cloud latency.",
    },
  },
  {
    slug: "logistics",
    name: "Logistics",
    badge: "TELEMATICS & MULTIMODAL SUPPLY CHAIN",
    tagline: "Automated Waybill Processing & Gate Telematics for Freight Hubs",
    overview:
      "Freight forwarders, container terminal depots, and fleet logistics hubs lose extensive time and capital to manual paperwork verification at gate check-ins, customs invoice discrepancies, and disconnected transport management systems.",
    targetWorkflow:
      "Inbound container gate processing, multilingual shipping waybill extraction, customs document reconciliation, and fleet handoff logging.",
    bottlenecks: [
      "Truck turn-around times delayed by manual clerical extraction from printed manifests and consignee notes.",
      "Waybill typographical discrepancies resulting in detention penalties and yard congestion.",
      "Disconnected transport databases requiring dispatchers to re-key consignment details repeatedly.",
    ],
    whyExistingInadequate:
      "Generic desktop OCR tools fail on low-resolution scanned documents and lack automated validation hooks to cross-reconcile weights, GST numbers, and container identifiers against transport management systems.",
    krynexSolution:
      "High-throughput document ingestion and telematics pipeline that extracts, validates, and reconciles shipping waybills in seconds, synchronizing yard management systems in real time.",
    architectureDetails: [
      "Multilingual shipping manifest and bill-of-lading optical extraction",
      "Sub-second event synchronization with inland container depot databases",
      "Distributed event pipeline with guaranteed at-least-once message delivery",
    ],
    beneficiaries:
      "Container terminal operators, freight forwarders, fleet dispatchers, and intermodal transport hubs.",
    statusLabel: "Streaming Data Architecture (In Active Development)",
    quantifiedImpact: [
      { metric: "Rapid", label: "Gate Clearance Target", sublabel: "Simulated manifest triage window objective" },
      { metric: "Automated", label: "Ingestion Speed", sublabel: "Modeled EDI processing vs manual key-in" },
      { metric: "Reconciled", label: "Waybill Integrity", sublabel: "Automated 3-way consignment matching" },
    ],
    caseDossier: {
      clientType: "Container Freight Stations & Intermodal Transport Fleets",
      deployedSystem: "Waybill Telematics & Ingestion Gateway",
      result: "High-throughput document extraction and yard management ledger synchronization.",
    },
  },
  {
    slug: "enterprise-automation",
    name: "Enterprise Automation",
    badge: "WORKFLOW & DOCUMENT ORCHESTRATION",
    tagline: "Deterministic Document Processing & Multi-System Workflow Orchestration",
    overview:
      "Mid-market and enterprise organizations operate dozens of disconnected software applications—legacy ERPs, SQL databases, ticketing systems, and document portals—forcing knowledge workers into manual, repetitive data re-entry.",
    targetWorkflow:
      "Cross-departmental invoice approval, KYC document verification, purchase order reconciliation, and reverse-ETL database synchronization.",
    bottlenecks: [
      "Manual data re-entry between legacy ERPs (SAP, Tally) and modern SaaS tools creating costly reconciliation delays.",
      "Multi-day administrative approval lags for purchase orders and vendor invoices due to manual sign-off chains.",
      "Lack of centralized operational telemetry: Leadership lacks real-time insight into transaction bottlenecks.",
    ],
    whyExistingInadequate:
      "Rigid traditional integration platforms charge exorbitant multi-lakh implementation fees and break silently whenever an API or document schema changes.",
    krynexSolution:
      "Krynex Workflow & Document Engine: Resilient document parsing and event-driven orchestration middleware that ingests business documents, executes automated validation rules, and synchronizes backends seamlessly.",
    architectureDetails: [
      "Deterministic business rule state machine with audit trails",
      "Multilingual optical extraction pipeline for invoices and contracts",
      "Bidirectional connectors for SAP, Tally, SQL, and REST APIs",
    ],
    beneficiaries:
      "Finance directors, chief operating officers, IT integration teams, and shared service center managers.",
    statusLabel: "Workflow Middleware (In Active Development)",
    quantifiedImpact: [
      { metric: "Sub-Second", label: "Document Validation", sublabel: "Automated mathematical syntax checking" },
      { metric: "Zero Capex", label: "Software Rental", sublabel: "Flat subscription access without upfront fees" },
      { metric: "Immutable", label: "Audit Ledger", sublabel: "Cryptographically verified state transitions" },
    ],
    caseDossier: {
      clientType: "Multi-Entity Enterprises & Shared Services Hubs",
      deployedSystem: "Enterprise Document & Workflow Orchestrator",
      result: "Automated multi-system document parsing and ERP database synchronization.",
    },
  },
];

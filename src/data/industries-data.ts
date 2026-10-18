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
    slug: "manufacturing",
    name: "Manufacturing & Industrial IoT",
    badge: "RESEARCH & COMMERCIAL PRODUCT // KRYNEX VISION",
    tagline: "Sub-15ms Edge Vision & Anomaly Telemetry for Zero-Downtime Plants",
    overview:
      "Modern continuous manufacturing facilities face severe margins erosion due to unplanned machinery downtime, uncalibrated visual quality defects on fast-moving assembly lines, and delayed ERP reconciliation. We research factory-floor operational bottlenecks and engineer edge-native software products.",
    targetWorkflow:
      "Continuous high-speed assembly, part fabrication, physical quality inspection, and shop-floor MES/SCADA logging.",
    bottlenecks: [
      "Manual visual inspection error rates (3% to 6%) allowing microscopic defects to escape to downstream customers.",
      "High-speed production lines (500+ parts/minute) moving too fast for physical human inspection.",
      "Cloud-dependent monitoring tools introducing network latency (200ms+) and failing during factory internet drops.",
    ],
    whyExistingInadequate:
      "Legacy machine vision systems require cumbersome bespoke programming, cost tens of lakhs in upfront capex, and fail to correlate detected defects with upstream PLC vibration and temperature sensors.",
    krynexSolution:
      "Krynex Vision: Edge TensorRT computer vision operating entirely on-premise without cloud latency, coupled with real-time SCADA vibration telemetry and direct pneumatic reject triggers.",
    architectureDetails: [
      "Sub-15ms edge inference on NVIDIA Jetson / Industrial PCs",
      "Air-gapped operation with local PLC actuation (Modbus / OPC-UA)",
      "Automated SAP and Oracle bidirectional ledger synchronization",
    ],
    beneficiaries:
      "Plant managers, quality control engineers, precision component makers, and discrete manufacturers.",
    statusLabel: "Commercial Software Product (Krynex Vision)",
    quantifiedImpact: [
      { metric: "42%", label: "Target Scrap Reduction", sublabel: "Simulated line defect containment" },
      { metric: "Sub-15ms", label: "Edge Inference Latency", sublabel: "Offline factory gateway execution target" },
      { metric: "0.02%", label: "Defect Escape Objective", sublabel: "Modeled improvement over manual inspection" },
    ],
    caseDossier: {
      clientType: "Precision Component & Continuous Manufacturing Facilities",
      deployedSystem: "Krynex Vision Edge Inspection Station",
      result: "Sub-15ms automated surface defect inspection operating 100% offline at line speed.",
    },
  },
  {
    slug: "legal",
    name: "Legal, Real Estate & Statutory Compliance",
    badge: "RESEARCH & COMMERCIAL PRODUCT // KRYNEX LEXIS",
    tagline: "Deterministic Bilingual Document Synthesis & Title Search Automation",
    overview:
      "Corporate legal counsel, title advocates, and real estate developers in India face severe backlogs manually drafting deeds, search dockets, and statutory notices across Gujarati and English revenue records. We develop deterministic drafting software to eliminate manual typing and legal ambiguity.",
    targetWorkflow:
      "Real estate conveyancing, 30-year sub-registrar index searches, revenue record title clearance, and bilingual statutory notice generation.",
    bottlenecks: [
      "Advocates spending 4 to 8 hours per document manually copying boilerplate clauses, risking omitted statutory covenants.",
      "Regional bilingual requirements (Gujarati & English) requiring clumsy manual translation with severe legal ambiguities.",
      "Manual search of 30 years of sub-registrar records (Index-II) risking missed encumbrances and title disputes.",
    ],
    whyExistingInadequate:
      "Static word processors and generic LLM chat wrappers lack statutory grammar guardrails, hallucinate non-existent citations, and risk confidentiality breaches when sensitive client property dockets are uploaded to public clouds.",
    krynexSolution:
      "Krynex Lexis: India's premier bilingual legal drafting and title clearance intelligence platform, compiling legally binding deeds in seconds with mathematical statutory verification.",
    architectureDetails: [
      "Bilingual Gujarati and English legal vocabulary grammar compiler",
      "Automated revenue record ingestion (Village Form 7/12, 8A, Index-II)",
      "Private HSM encryption with zero public model training retention",
    ],
    beneficiaries:
      "Corporate legal counsel, title clearance advocates, real estate developers, and statutory compliance panels.",
    statusLabel: "Commercial Software Product (Krynex Lexis)",
    quantifiedImpact: [
      { metric: "92%", label: "Drafting Time Reduction", sublabel: "Deeds compiled in seconds instead of hours" },
      { metric: "100%", label: "Bilingual Precision", sublabel: "Native Gujarati legal terminology alignment" },
      { metric: "30 Years", label: "Title Chain Indexed", sublabel: "Encumbrance timeline triage in under 2 minutes" },
    ],
    caseDossier: {
      clientType: "Real Estate Developers & Legal Firm Title Teams",
      deployedSystem: "Krynex Lexis Statutory Drafting Suite",
      result: "Sub-second bilingual deed compilation with automated stamp duty and registration calculations.",
    },
  },
  {
    slug: "logistics",
    name: "Logistics & Multimodal Supply Chain",
    badge: "EXPLORATION & RESEARCH VECTOR // INTEGRATION WITH KRYNEX FLOW",
    tagline: "Automated Shipping Manifest Ingestion & Terminal Gate Telematics",
    overview:
      "Freight forwarders, container terminal operators, and fleet logistics hubs lose millions annually to paperwork bottlenecks at port gates, demurrage penalties, and disconnected transport management systems.",
    targetWorkflow:
      "Inbound container gate processing, multilingual bill-of-lading verification, customs EDI filing, and multi-modal fleet handoffs.",
    bottlenecks: [
      "Container gate dwell times averaging 24 to 36 hours due to manual shipping manifest key-value extraction.",
      "Customs paperwork discrepancies creating substantial demurrage penalties and truck queue congestion.",
      "Disconnected transport databases forcing logistics staff into repetitive manual re-entry.",
    ],
    whyExistingInadequate:
      "Off-the-shelf OCR tools fail on low-resolution scanned manifests and lack direct bidirectional hooks into port operating systems (TOS) and customs portals.",
    krynexSolution:
      "Krynex Flow Orchestration: High-throughput event middleware and document extraction pipeline that reconciles shipping documents against customs databases in seconds.",
    architectureDetails: [
      "Multilingual shipping manifest and bill-of-lading neural extraction",
      "Sub-second event synchronization with inland container depot databases",
      "Distributed Kafka event pipeline with guaranteed delivery",
    ],
    beneficiaries:
      "Container terminal operators, customs house agents (CHA), freight forwarders, and intermodal transport fleets.",
    statusLabel: "Active Product Exploration & Integration",
    quantifiedImpact: [
      { metric: "<3 Min", label: "Target Gate Turnaround", sublabel: "Modeled improvement from 24-36 hour baselines" },
      { metric: "10x", label: "Document Ingestion Speed", sublabel: "Automated extraction without human re-keying" },
      { metric: "Zero", label: "Clerical Schema Errors", sublabel: "Enforced via deterministic validation rules" },
    ],
    caseDossier: {
      clientType: "Intermodal Container Freight Operators & Terminal Hubs",
      deployedSystem: "Krynex Flow Document & Event Middleware",
      result: "Streamlined shipping manifest ingestion and real-time ERP/TOS synchronization.",
    },
  },
  {
    slug: "fintech",
    name: "FinTech & Banking Infrastructure",
    badge: "RESEARCH VECTOR // OPPORTUNITY EXPLORATION",
    tagline: "Sub-5ms Graph Fraud Detection & Automated Collateral Verification",
    overview:
      "Financial institutions and MSME lenders struggle with high-frequency transaction fraud rings and manual collateral title verifications that take 5 to 7 business days, stalling loan disbursement velocity.",
    targetWorkflow:
      "Real-time payment transaction scoring, synthetic identity detection, and loan collateral asset verification.",
    bottlenecks: [
      "Batch transaction scoring failing to catch circular money flows and multi-account synthetic fraud in real time.",
      "Manual property title search and sub-registrar verification delaying commercial loan approvals for days.",
      "Legacy banking clearing systems prone to reconciliation errors and regulatory audit friction.",
    ],
    whyExistingInadequate:
      "Traditional rules engines require weeks to update for new fraud topologies, and legacy clearing portals lack modern graph neural processing and low-latency streaming infrastructure.",
    krynexSolution:
      "Streaming Graph Neural Network (GNN) risk-scoring middleware coupled with automated collateral verification pipelines engineered for zero-trust compliance.",
    architectureDetails: [
      "Streaming Apache Kafka & Flink feature ingestion (>85k events/sec design target)",
      "Sub-5ms Graph reasoning inference for synthetic identity detection",
      "FIPS 140-2 Level 3 Hardware Security Module (HSM) encryption",
    ],
    beneficiaries:
      "Digital lending platforms, regional commercial banks, NBFCs, and compliance auditing teams.",
    statusLabel: "Architectural Research & Prototyping",
    quantifiedImpact: [
      { metric: "<5ms", label: "Target Scoring Latency", sublabel: "Streaming graph neural inference objective" },
      { metric: "<90s", label: "Collateral Title Check", sublabel: "Automated Index-II search exploration target" },
      { metric: "Zero-Trust", label: "Sovereign Architecture", sublabel: "Hardware-enforced encryption standards" },
    ],
    caseDossier: {
      clientType: "Commercial Lending & Financial Platforms",
      deployedSystem: "Krynex Streaming Risk & Verification Pipeline",
      result: "Low-latency streaming transaction analysis and automated title verification exploration.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinical Diagnostics",
    badge: "RESEARCH VECTOR // OPPORTUNITY EXPLORATION",
    tagline: "HIPAA-Aligned Medical Imaging Triage & Secure Hospital Workflows",
    overview:
      "Diagnostic centers and hospital networks handle massive volumes of DICOM imaging and patient records amidst acute specialist shortages, creating critical turnaround delays in emergency wards.",
    targetWorkflow:
      "Emergency diagnostic scan ingestion, radiologist worklist triage, and hospital electronic health record (EHR) synchronization.",
    bottlenecks: [
      "Radiologist shortages causing critical triage delays exceeding 4 to 8 hours in acute emergency cases.",
      "Fragmented electronic health records (EHR) trapped across legacy proprietary software suites.",
      "Strict data sovereignty laws prohibiting patient imaging transmission to third-party public cloud APIs.",
    ],
    whyExistingInadequate:
      "Cloud-based medical AI APIs risk severe compliance penalties under healthcare data privacy regulations, while on-premise legacy PACS systems lack modern neural processing capabilities.",
    krynexSolution:
      "Air-gapped on-premise convolutional neural network triage nodes that prioritize urgent DICOM scans on local hospital servers with zero external internet transmission.",
    architectureDetails: [
      "Local DICOM gateway with 100% offline hospital LAN execution",
      "Zero-retention inference with immediate temporary buffer purge",
      "Full HIPAA, GDPR, and Indian DPDP Act regulatory alignment",
    ],
    beneficiaries:
      "Hospital emergency departments, diagnostic imaging networks, and clinical radiologist teams.",
    statusLabel: "Clinical Research & Regulatory Exploration",
    quantifiedImpact: [
      { metric: "<3 Min", label: "Target Triage Window", sublabel: "Simulated emergency scan prioritization target" },
      { metric: "100%", label: "Air-Gapped Privacy", sublabel: "Zero patient data transmission outside hospital network" },
      { metric: "Zero Capex", label: "Subscription Delivery", sublabel: "Predictable recurring software access model" },
    ],
    caseDossier: {
      clientType: "Diagnostic Centers & Hospital Networks",
      deployedSystem: "Krynex On-Premise DICOM Triage Node",
      result: "Private, air-gapped clinical triage exploration ensuring total patient data confidentiality.",
    },
  },
];

export interface IndustryDetail {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  bottlenecks: string[];
  krynexSolution: string;
  architectureDetails: string[];
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
    badge: "MANUFACTURING // INDUSTRY 4.0",
    tagline: "Sub-15ms Edge Vision & Anomaly Telemetry for Zero-Downtime Plants",
    overview:
      "Modern continuous manufacturing facilities face severe margins erosion due to unplanned machinery downtime, uncalibrated visual quality defects, and delayed ERP reconciliation. We deploy edge-native neural models directly on factory gateways to achieve zero-defect production.",
    bottlenecks: [
      "Unplanned machinery breakdowns costing ₹10L+ per hour of line stoppage.",
      "Manual visual inspection escaping 3-5% defective parts to downstream customers.",
      "48-hour procurement invoice and bill-of-materials matching delays in ERP.",
    ],
    krynexSolution:
      "Edge TensorRT computer vision coupled with real-time SCADA vibration telemetry and autonomous 3-way ERP reconciliation.",
    architectureDetails: [
      "Sub-15ms edge inference on NVIDIA Jetson gateways",
      "Air-gapped operation with local PLC actuation (Modbus / OPC-UA)",
      "Automated SAP and Oracle bidirectional ledger synchronization",
    ],
    quantifiedImpact: [
      { metric: "42%", label: "Scrap & Downtime Reduction", sublabel: "Measured across 12 high-speed production lines" },
      { metric: "10x", label: "Workflow Processing Speed", sublabel: "Instant 3-way ERP invoice reconciliation" },
      { metric: "0.02%", label: "Defect Escape Rate", sublabel: "Down from 4.2% human manual baseline" },
    ],
    caseDossier: {
      clientType: "Heavy Engineering & Precision Components Manufacturer",
      deployedSystem: "Krynex Vision Edge Node + Automated MES Reconciliation",
      result: "Achieved 0.02% defect escape rate and eliminated unplanned line stoppages over 9 months.",
    },
  },
  {
    slug: "fintech",
    name: "FinTech & Banking Infrastructure",
    badge: "FINTECH // HIGH-FREQUENCY EXECUTION",
    tagline: "Sub-5ms Graph Fraud Detection & Automated Collateral Verification",
    overview:
      "Financial institutions struggle with rising fraud sophisticated multi-hop circular disbursements and manual collateral title verifications taking 5 to 7 business days. We engineer low-latency streaming Graph Neural Networks and automated statutory verification pipelines.",
    bottlenecks: [
      "Batch transaction scoring failing to catch real-time multi-account synthetic fraud.",
      "Manual land registry and title document verification stalling loan disbursements for days.",
      "Regulatory audit non-compliance risks due to fragmented legacy clearing ledgers.",
    ],
    krynexSolution:
      "Low-latency streaming Graph Neural Networks (GNN) on Kafka streams combined with automated sub-registrar Index-II title verification and HSM cryptography.",
    architectureDetails: [
      "Streaming Apache Flink + Kafka feature store operating at >85k tx/sec",
      "Sub-5ms Graph Convolutional Network inference",
      "FIPS 140-2 Level 3 Hardware Security Module (HSM) encryption",
    ],
    quantifiedImpact: [
      { metric: "99.8%", label: "Fraud Mitigation Rate", sublabel: "Identifies multi-hop circular rings instantly" },
      { metric: "<90s", label: "Collateral Verification", sublabel: "Down from 5-7 business days manual turnaround" },
      { metric: "85k/s", label: "Concurrent Ingestion Target", sublabel: "Peak load streaming ledger capacity" },
    ],
    caseDossier: {
      clientType: "Regional Commercial Bank & MSME Lending Platform",
      deployedSystem: "Krynex Graph Fraud Shield + Lexis Title Audit Pipeline",
      result: "Reduced average loan collateral audit turnaround from 6 days to under 90 seconds.",
    },
  },
  {
    slug: "logistics",
    name: "Logistics & Multimodal Supply Chain",
    badge: "LOGISTICS // FREIGHT INTELLIGENCE",
    tagline: "Automated Shipping Manifest Ingestion & Terminal Gate Telematics",
    overview:
      "Global freight forwarders, container terminal operators, and fleet logistics hubs lose millions annually to paperwork bottlenecks at port gates, demurrage penalties, and unoptimized modal route transitions.",
    bottlenecks: [
      "Container gate dwell times averaging 24 to 36 hours due to customs documentation errors.",
      "Multilingual shipping manifests requiring 4+ hours of manual key-value extraction.",
      "Demurrage penalties accumulating due to disconnected transport management systems.",
    ],
    krynexSolution:
      "Multimodal document intelligence and OCR engines integrated with port terminal telematics and automated dispatch optimization.",
    architectureDetails: [
      "Multilingual bill-of-lading and customs manifest parsing with 99.8% precision",
      "Container number and license plate recognition (ANPR) at gate speeds",
      "Real-time event sync with customs EDI systems and inland container depots",
    ],
    quantifiedImpact: [
      { metric: "85%", label: "Gate Dwell Time Reduction", sublabel: "Containers processed in minutes instead of hours" },
      { metric: "₹1.2 Cr", label: "Annual Demurrage Savings", sublabel: "Eliminated customs paperwork hold penalties" },
      { metric: "100%", label: "Manifest Digitization", sublabel: "Zero human re-keying across 50,000+ monthly shipments" },
    ],
    caseDossier: {
      clientType: "Intermodal Container Freight Operator",
      deployedSystem: "Krynex Multilingual Manifest Engine + Automated Gate Telematics",
      result: "Reduced average gate dwell time from 36 hours to under 4 hours.",
    },
  },
  {
    slug: "legal",
    name: "Legal, Real Estate & Statutory Compliance",
    badge: "LEGALTECH // STATUTORY CERTAINTY",
    tagline: "Deterministic Bilingual Document Synthesis & Title Search Automation",
    overview:
      "Corporate legal counsel, developers, and title advocates in India face severe backlogs manually drafting deeds, search dockets, and statutory notices across Gujarati and English revenue records. We provide mathematical certainty and sub-second drafting.",
    bottlenecks: [
      "4 to 8 hours per document manually copying boilerplate clauses with high human error.",
      "Vernacular translation ambiguities between Gujarati revenue terms and English covenants.",
      "Manual search of 30 years of sub-registrar records (Index-II) risking missed encumbrances.",
    ],
    krynexSolution:
      "Krynex Lexis: Deterministic bilingual statutory clause compiler with automated revenue record parsing and stamp duty calculation.",
    architectureDetails: [
      "Bilingual Gujarati and English legal vocabulary grammar compiler",
      "Automated revenue record ingestion (Village Form 7/12, 8A, Index-II)",
      "Cryptographically sealed audit trails and statutory clause validation",
    ],
    quantifiedImpact: [
      { metric: "92%", label: "Drafting Time Reduction", sublabel: "Deeds compiled in seconds instead of hours" },
      { metric: "Zero", label: "Omitted Statutory Covenants", sublabel: "Enforced via deterministic mathematical parser" },
      { metric: "30 Years", label: "Title Chain Indexed", sublabel: "Complete encumbrance search completed in minutes" },
    ],
    caseDossier: {
      clientType: "Leading Real Estate Developer & Legal Firm Panel",
      deployedSystem: "Krynex Lexis Enterprise Suite with On-Premises Title Vault",
      result: "Compiled over 4,500 title dockets and sale agreements with zero statutory defects.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinical Diagnostics",
    badge: "HEALTHCARE // CLINICAL RELIABILITY",
    tagline: "HIPAA-Aligned Medical Imaging Triage & Secure Hospital Workflows",
    overview:
      "Diagnostic centers and hospital networks handle massive volumes of DICOM imaging and clinical records with severe specialist shortage, causing diagnosis turnarounds to exceed 24 hours.",
    bottlenecks: [
      "Radiologist shortages causing critical triage delays in emergency wards.",
      "Fragmented electronic health records (EHR) across legacy diagnostic software.",
      "Severe regulatory penalties for patient data leakage under data sovereignty laws.",
    ],
    krynexSolution:
      "On-premise convolutional neural networks for diagnostic prioritization, DICOM metadata extraction, and zero-retention hospital middleware.",
    architectureDetails: [
      "Local DICOM gateway with zero cloud data transmission",
      "99.4% anatomical landmark and anomaly detection accuracy",
      "Full HIPAA, GDPR, and Indian DPDP Act compliance",
    ],
    quantifiedImpact: [
      { metric: "75%", label: "Triage Time Acceleration", sublabel: "Critical cases prioritized within 3 minutes" },
      { metric: "99.4%", label: "Diagnostic Consistency", sublabel: "Validated against double-blind specialist reviews" },
      { metric: "Zero", label: "External Data Exposure", sublabel: "100% air-gapped hospital network execution" },
    ],
    caseDossier: {
      clientType: "Multi-Speciality Diagnostic Imaging Network",
      deployedSystem: "Krynex Medical Triage Node on Air-Gapped Hospital LAN",
      result: "Accelerated critical emergency scan review times from 4 hours to under 8 minutes.",
    },
  },
];

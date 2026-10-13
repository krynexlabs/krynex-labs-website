import { NavItem, FocusArea, ApproachPrinciple } from '@/types';

export const siteConfig = {
  name: 'Krynex Labs',
  legalName: 'Krynex Labs',
  category: 'SaaS Software Products & Business Software',
  headline: 'SOFTWARE BUILT FOR BUSINESS.',
  tagline: 'SOFTWARE BUILT FOR BUSINESS.',
  supportingStatement:
    'Krynex Labs develops practical software products that help businesses simplify operations, improve workflows, and move forward with technology.',
  description:
    'Krynex Labs develops SaaS products and industry-specific software to help businesses improve workflows, streamline operations, and grow with technology.',
  // Single canonical hostname for the website (apex krynexlabs.in redirects here via Vercel).
  url: 'https://www.krynexlabs.in',
  // Bare domain, used for email addresses only (not for website URLs).
  domain: 'krynexlabs.in',
  contactEmail: 'support@krynexlabs.in',
  supportEmail: 'support@krynexlabs.in',
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Contact', href: '/contact' },
];

export const focusAreas: FocusArea[] = [
  {
    id: 'saas-products',
    title: 'SaaS Product Development',
    tagline: 'Recurring access and licensing models engineered for modern businesses',
    description:
      'Developing software products designed to serve business needs through recurring access and licensing models.',
    highlights: [
      'Multi-tenant cloud architecture',
      'Continuous feature updates and patches',
      'Predictable subscription and licensing options',
      'High-availability data pipelines',
    ],
  },
  {
    id: 'business-software',
    title: 'Business Software',
    tagline: 'Practical digital systems that simplify daily workflows and operations',
    description:
      'Building practical digital systems that help businesses organize operations and manage everyday workflows.',
    highlights: [
      'Operational workflow orchestration',
      'Centralized operational information',
      'Standardized business processes',
      'Reduced repetitive manual overhead',
    ],
  },
  {
    id: 'intelligent-technology',
    title: 'Intelligent Technology',
    tagline: 'Modern engineering and AI applied where practical utility matters',
    description:
      'Applying modern software engineering and AI capabilities where they provide meaningful practical value.',
    highlights: [
      'Targeted AI and automation modules',
      'Context-aware data parsing',
      'Robust API and webhook integrations',
      'Measurable efficiency improvements',
    ],
  },
];

export const approachPrinciples: ApproachPrinciple[] = [
  {
    number: '01',
    title: 'Understand',
    summary: 'Start with the business problem and the people who need to solve it.',
    detail:
      'We examine operational constraints, existing workflows, and user habits before designing architecture, ensuring the software solves genuine friction rather than perceived requirements.',
  },
  {
    number: '02',
    title: 'Engineer',
    summary: 'Build software around clear requirements, thoughtful architecture, and practical functionality.',
    detail:
      'We prioritize clean architecture, predictable data schemas, and resilient engineering over unnecessary complexity or superficial feature bloat.',
  },
  {
    number: '03',
    title: 'Refine',
    summary: 'Pay attention to usability, reliability, maintainability, and quality.',
    detail:
      'We focus on user experience details that compound daily: fast interaction times, clear typographic hierarchies, resilient error handling, and stable performance.',
  },
  {
    number: '04',
    title: 'Evolve',
    summary: 'Improve software over time as needs, technology, and workflows change.',
    detail:
      'Software is living infrastructure. We maintain a continuous release cycle to adapt to emerging technologies, platform shifts, and expanding operational needs.',
  },
];

export const philosophy = {
  headline: 'GOOD SOFTWARE SHOULD MAKE WORK SIMPLER.',
  copy: 'We believe technology should solve meaningful problems, reduce unnecessary complexity, and give businesses tools they can depend on. Our focus is on creating software with a clear purpose and room to evolve.',
  pillars: [
    {
      title: 'Meaningful Problems',
      description: 'Addressing genuine operational bottlenecks that drain team hours and cause friction.',
    },
    {
      title: 'Reduced Complexity',
      description: 'Replacing cumbersome manual workarounds with intuitive, dependable software tools.',
    },
    {
      title: 'Dependable Foundation',
      description: 'Engineering systems with robust reliability and predictable, transparent behavior.',
    },
    {
      title: 'Room to Evolve',
      description: 'Building modular software architectures designed to grow alongside business demands.',
    },
  ],
};

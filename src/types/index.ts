// Site-wide types for Krynex Labs — Company Marketing Website

export interface NavItem {
  label: string;
  href: string;
}

export interface FocusArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  message: string;
  hp_field?: string;
}

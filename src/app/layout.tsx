import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/data/site-data';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Krynex Labs — Powering Businesses with Purpose-Built Software',
    template: '%s — Krynex Labs',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Krynex Labs — SaaS Products & Business Software',
    description: siteConfig.description,
    url: '/',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krynex Labs — SaaS Products & Business Software',
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#07090D',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  knowsAbout: [
    'SaaS Products',
    'Business Software',
    'Workflow Automation',
    'Software Licensing',
    'Enterprise Software Solutions',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}

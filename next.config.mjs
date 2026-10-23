/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';",
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '0',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'krynexlabs.in',
          },
        ],
        destination: 'https://www.krynexlabs.in/:path*',
        permanent: true,
      },
      {
        source: '/legal/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/legal/terms',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/approach',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/solutions/:slug',
        destination: '/solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

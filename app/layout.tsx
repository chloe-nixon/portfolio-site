import type { Metadata, Viewport } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://chloenixon.com'),
  title: {
    default: 'Chloe Nixon: Australian Website Developer & Designer',
    template: '%s | Chloe Nixon',
  },
  description:
    'Chloe Nixon is an Australian website developer and designer based in Queensland, building polished, considered sites with Webflow, Astro, and Next.js for design-conscious brands worldwide.',
  keywords: [
    'Australian website developer',
    'Australian web developer',
    'web developer Queensland',
    'Astro developer Australia',
    'Webflow developer Australia',
    'Next.js developer Australia',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://chloenixon.com',
    siteName: 'Chloe Nixon',
    title: 'Chloe Nixon: Australian Website Developer & Designer',
    description:
      'Chloe Nixon is an Australian website developer and designer based in Queensland, building polished, considered sites with Webflow, Astro, and Next.js for design-conscious brands worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chloe Nixon: Australian Website Developer & Designer',
    description:
      'Chloe Nixon is an Australian website developer and designer based in Queensland, building polished, considered sites with Webflow, Astro, and Next.js for design-conscious brands worldwide.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0202',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chloe Nixon',
  jobTitle: 'Website Developer & Designer',
  url: 'https://chloenixon.com',
  email: 'mailto:hello@chloenixon.com',
  nationality: 'Australian',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Queensland',
    addressCountry: 'AU',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Chloe Nixon',
  },
  knowsAbout: ['Webflow', 'Astro', 'Next.js', 'TypeScript', 'React', 'Figma', 'Web Design'],
  sameAs: ['https://www.linkedin.com/in/chloe-nixon-9278442b2'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LenisProvider />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

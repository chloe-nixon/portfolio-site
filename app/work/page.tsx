import type { Metadata } from 'next';
import WorkPageContent from './WorkPageContent';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Recent Webflow, Astro, and Next.js builds: hand-coded sites, custom CMS structures, and product design work for design-conscious brands.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Selected Work | Chloe Nixon',
    description:
      'Recent Webflow, Astro, and Next.js builds: hand-coded sites, custom CMS structures, and product design work for design-conscious brands.',
    url: 'https://chloenixon.com/work',
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}

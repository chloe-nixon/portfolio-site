import type { Metadata } from 'next';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import PlaceholderImage from '@/components/PlaceholderImage';
import { works } from '@/lib/work-data';

export const metadata: Metadata = {
  title: 'Webflow Development',
  description:
    'Custom Webflow development for design-conscious brands: CMS structuring, custom interactions, Finsweet attributes, and builds that scale, based in Queensland, Australia.',
  alternates: { canonical: '/webflow-development' },
  openGraph: {
    title: 'Webflow Development | Chloe Nixon',
    description:
      'Custom Webflow development for design-conscious brands: CMS structuring, custom interactions, and builds that scale.',
    url: 'https://chloenixon.com/webflow-development',
  },
};

const webflowProjects = works.filter((w) => w.tags.includes('Webflow'));

const features = [
  {
    title: 'Custom interactions & code',
    body: 'Custom JavaScript, clip-path visuals, and Finsweet attributes for filtering, sliders, and pagination that off-the-shelf components can\'t do on their own.',
  },
  {
    title: 'A CMS that actually holds up',
    body: 'Content modelled so your team can add pages, projects, and posts themselves without breaking the design or needing a developer for routine updates.',
  },
  {
    title: 'Built to scale',
    body: "Component systems that stay consistent whether you're publishing 10 pages or 100.",
  },
];

export default function WebflowDevelopmentPage() {
  return (
    <div className="work-page service-page">
      <TopBar activeWork />

      <section className="page-header">
        <div className="page-header-row">
          <span className="eyebrow">Service · Webflow</span>
          <h1>
            <span className="accent">Webflow</span> development.
          </h1>
        </div>
        <p className="page-intro">
          Custom Webflow builds for brands who want a fully coded site's polish with a
          CMS's editability, from complex filtering systems to enterprise-scale content
          structures.
        </p>
      </section>

      <section className="service-features">
        {features.map((f) => (
          <div key={f.title} className="service-feature">
            <h2>{f.title}</h2>
            <p>{f.body}</p>
          </div>
        ))}
      </section>

      <section className="service-work">
        <div className="service-work-header">
          <span className="label">Recent Webflow builds</span>
        </div>
        <div className="service-work-grid">
          {webflowProjects.map((w) => (
            <Link key={w.slug} href={`/work/${w.slug}`} className="service-work-card">
              <PlaceholderImage label={w.title.join('')} aspect="4 / 3" />
              <span className="service-work-card-title">{w.title.join('')}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-cta">
        <h2>Have a Webflow project in mind?</h2>
        <Link href="/contact" className="work-visit">
          <span>Get in touch</span>
          <span className="work-visit-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13,6 19,12 13,18" />
            </svg>
          </span>
        </Link>
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/#top">↑ Back to home</Link>
      </footer>
    </div>
  );
}

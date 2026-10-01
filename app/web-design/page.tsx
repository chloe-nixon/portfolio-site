import type { Metadata } from 'next';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import PlaceholderImage from '@/components/PlaceholderImage';
import { works } from '@/lib/work-data';

export const metadata: Metadata = {
  title: 'Web Design',
  description:
    'Website design for design-conscious brands: Figma product design, UI systems, and visual design that developers can build from directly.',
  alternates: { canonical: '/web-design' },
  openGraph: {
    title: 'Web Design | Chloe Nixon',
    description:
      'Website design for design-conscious brands: Figma product design, UI systems, and visual design that developers can build from directly.',
    url: 'https://chloenixon.com/web-design',
  },
};

const designProjects = works.filter((w) => w.category === 'Design' || w.category === 'Design & Development');

const features = [
  {
    title: 'Designed in Figma, built by me',
    body: 'I design and build the same project, so decisions get made with the actual build in mind, not handed off and reinterpreted by someone else later.',
  },
  {
    title: 'Files an engineer can actually use',
    body: 'Components, states, and specs set up properly, so whoever builds it (me or your own team) isn\'t left guessing what happens on hover or on mobile.',
  },
  {
    title: 'No default templates',
    body: "Typography and layout chosen for your brand specifically, not whatever's trending on Dribbble this month.",
  },
];

export default function WebDesignPage() {
  return (
    <div className="work-page service-page">
      <TopBar activeWork />

      <section className="page-header">
        <div className="page-header-row">
          <span className="eyebrow">Service · Design</span>
          <h1>
            <span className="accent">web</span> design.
          </h1>
        </div>
        <p className="page-intro">
          Product and marketing site design, from full product-design systems in Figma
          through to visual direction for a coded build.
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
          <span className="label">Recent design work</span>
        </div>
        <div className="service-work-grid">
          {designProjects.length > 0
            ? designProjects.map((w) => (
                <Link key={w.slug} href={`/work/${w.slug}`} className="service-work-card">
                  <PlaceholderImage label={w.title.join('')} aspect="4 / 3" />
                  <span className="service-work-card-title">{w.title.join('')}</span>
                </Link>
              ))
            : (
                <Link href="/work" className="service-work-card">
                  <PlaceholderImage label="See all work" aspect="4 / 3" />
                  <span className="service-work-card-title">See all work</span>
                </Link>
              )}
        </div>
      </section>

      <section className="service-cta">
        <h2>Have a design project in mind?</h2>
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

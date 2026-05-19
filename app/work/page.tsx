'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const works = [
  {
    n: '01',
    title: ['Global Tax Consulting — international tax, made ', 'clear', '.'] as const,
    body: 'A custom Webflow build for an international tax practice serving expats and globally mobile professionals navigating UK rules across 50+ countries. Editable case studies, downloadable guides, and an interactive index tool — all on a CMS the team can update themselves.',
    tags: ['Webflow', 'CMS', '2025'],
    laptop: '/images/gtc.webp',
    mobile: '/images/gtcmobile.webp',
    url: 'https://www.globaltaxconsulting.co.uk/',
  },
  {
    n: '02',
    title: ['TidyHQ — club management, ', 'simplified', '.'] as const,
    body: 'A full product-design system in Figma for an all-in-one membership platform that replaces spreadsheets and stitched-together tools. Covers dashboards, marketing surfaces, and onboarding flows — handed off to their in-house engineering team.',
    tags: ['Figma', 'Product design', '2026'],
    laptop: '/images/tidyhqnew.webp',
    mobile: '/images/tidyhqmobile.webp',
    url: 'https://tidyhq.com/',
  },
  {
    n: '03',
    title: ['Parts Portal — heavy-duty parts, ', 'online', '.'] as const,
    body: 'A custom Webflow build for an industrial auto-electrical supplier serving mining and earthmoving operators. Structured catalogue, custom wiring-harness enquiries, and a clean CMS the team can run themselves.',
    tags: ['Webflow', 'Custom', '2025'],
    laptop: '/images/parts-portal.png',
    mobile: '/images/partsportalmobile.png',
    url: 'https://www.partsportal.com.au/',
  },
  {
    n: '04',
    title: ["Slacker Apps — an app studio's ", 'home', '.'] as const,
    body: "A heavily customised Webflow template with bespoke components — built to showcase an immersive-tech studio's apps, VR, AR, and AI work for brands and venues. Easy to update in-house, with the complexity of a fully custom build.",
    tags: ['Webflow', 'Custom build', '2025'],
    laptop: '/images/slackerapps.png',
    mobile: '/images/slackermobile.webp',
    url: 'https://www.slackerapps.co.jp/',
  },
  {
    n: '05',
    title: ['Turba Media — an AI marketing platform, ', 'scaled', '.'] as const,
    body: 'An enterprise Webflow build for an AI-powered audience intelligence and ad-automation platform. Custom modules for case studies, integrations, and live demos — built to scale across dozens of pages, fully editable by their team.',
    tags: ['Webflow', 'Enterprise', '2025'],
    laptop: '/images/turba-media.png',
    mobile: '/images/turbamediamobile.png',
    url: 'https://www.turbamedia.io/',
  },
  {
    n: '06',
    title: ["Micky Dollimore — designer & developer's ", 'portfolio', '.'] as const,
    body: 'A fully custom design and build for an independent designer and software developer — bespoke typography system, considered interactions, and a flexible case-study structure. Launching soon.',
    tags: ['Custom build', 'Portfolio', '2026'],
    laptop: '/images/micky-project.png',
    mobile: '/images/mickmobile.webp',
    url: '#',
  },
];

import TopBar from '@/components/TopBar';

export default function WorkPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -25% 0px' }
    );
    root.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="work-page">
      <TopBar activeWork />

      <section className="page-header">
        <div className="page-header-row">
          <span className="eyebrow">All Work · 2024 — 2026</span>
          <h1>
            <span className="accent">selected</span> work.
          </h1>
        </div>
        <p className="page-intro">
          A running record of recent builds. Hand-coded sites, Webflow projects, and the occasional custom interaction system. Click through to see them live.
        </p>
      </section>

      <section className="work" ref={sectionRef}>
        {works.map((w) => (
          <article key={w.n} className="work-project" data-reveal>
            <div className="work-meta">
              <span className="work-number">({w.n})</span>
              <div className="work-year-tags">
                {w.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="work-headline">
              <h2 className="work-title">
                {w.title[0]}
                <span className="accent">{w.title[1]}</span>
                {w.title[2]}
              </h2>
              <div className="work-desc-col">
                <p className="work-desc">{w.body}</p>
                <a className="work-visit" href={w.url} target="_blank" rel="noopener">
                  <span>Visit site</span>
                  <span className="work-visit-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="13,6 19,12 13,18" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="work-images">
              <div className="img-laptop">
                <Image className="laptop" src={w.laptop} alt={`${w.title.join('')} — laptop`} width={1800} height={1200} sizes="(max-width: 768px) 100vw, 70vw" />
              </div>
              <div className="img-mobile">
                <Image className="mobile" src={w.mobile} alt={`${w.title.join('')} — mobile`} fill sizes="(max-width: 768px) 55vw, 30vw" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/#top">↑ Back to home</Link>
      </footer>
    </div>
  );
}

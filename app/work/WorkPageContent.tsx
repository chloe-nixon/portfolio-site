'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import { works } from '@/lib/work-data';

export default function WorkPageContent() {
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

      <section className="page-header split-header">
        <div className="page-header-row">
          <h1>
            <span className="accent">selected</span> work.
          </h1>
          <p className="page-intro">
            A running record of recent builds. Hand-coded sites, Webflow projects, and the occasional custom interaction system. Click through for the full case study.
          </p>
        </div>
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
                <div className="work-links">
                  <Link className="work-visit" href={`/work/${w.slug}`}>
                    <span>Read case study</span>
                    <span className="work-visit-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="13,6 19,12 13,18" />
                      </svg>
                    </span>
                  </Link>
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
            </div>
            <div className="work-images">
              <div className="img-laptop">
                <Image className="laptop" src={w.laptop} alt={`${w.title.join('')} laptop mockup`} width={1800} height={1200} sizes="(max-width: 768px) 100vw, 70vw" />
              </div>
              <div className="img-mobile">
                <Image className="mobile" src={w.mobile} alt={`${w.title.join('')} mobile mockup`} fill sizes="(max-width: 768px) 55vw, 30vw" />
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

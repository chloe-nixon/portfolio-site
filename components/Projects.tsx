'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    n: '01',
    title: ["Slacker Apps — an app studio's ", 'home', '.'] as const,
    body: "A heavily customised Webflow template with bespoke components — built to showcase an immersive-tech studio's apps, VR, AR, and AI work for brands and venues. Easy to update in-house, with the complexity of a fully custom build.",
    tags: ['Webflow', 'Custom build', '2025'],
    image: '/images/slackerapps.png',
  },
  {
    n: '02',
    title: ['TidyHQ — club management, ', 'simplified', '.'] as const,
    body: 'A full product-design system in Figma for an all-in-one membership platform that replaces spreadsheets and stitched-together tools. Covers dashboards, marketing surfaces, and onboarding flows — handed off to their in-house engineering team.',
    tags: ['Figma', 'Product design', '2026'],
    image: '/images/tidyhqnew.webp',
  },
  {
    n: '03',
    title: ['Parts Portal — heavy-duty parts, ', 'online', '.'] as const,
    body: 'A custom Webflow build for an industrial auto-electrical supplier serving mining and earthmoving operators. Structured catalogue, custom wiring-harness enquiries, and a clean CMS the team can run themselves.',
    tags: ['Webflow', 'Custom', '2025'],
    image: '/images/parts-portal.png',
  },
  {
    n: '04',
    title: ["Micky Dollimore — designer & developer's ", 'portfolio', '.'] as const,
    body: 'A fully custom design and build for an independent designer and software developer — bespoke typography system, considered interactions, and a flexible case-study structure. Launching soon.',
    tags: ['Custom build', 'Portfolio', '2026'],
    image: '/images/micky-project.png',
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -35% 0px' }
    );
    container.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects" ref={containerRef}>
      <div className="projects-header">
        <span className="label">Featured Work · 2024 – 2026</span>
        <div className="title-group">
          <Link className="projects-all-link" href="/work">
            <span className="projects-all-text">View all</span>
            <span className="arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13,6 19,12 13,18" />
              </svg>
            </span>
          </Link>
          <h2>Featured projects</h2>
        </div>
      </div>

      {projects.map((p) => (
        <article key={p.n} className="project">
          <div className="project-text">
            <span className="project-number">({p.n})</span>
            <h3>
              {p.title[0]}
              <span className="accent">{p.title[1]}</span>
              {p.title[2]}
            </h3>
            <p>{p.body}</p>
            <div className="project-meta">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="project-image" data-reveal>
            <div className="clip">
              <Image src={p.image} alt={`Project ${p.n}`} width={1800} height={1200} sizes="(max-width: 768px) 100vw, 66vw" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

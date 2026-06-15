'use client';

import { useEffect, useRef } from 'react';

type MapItem = {
  n: string;
  title: readonly [string, string, string];
  body: string;
  tags: readonly string[];
  embedUrl: string;
  liveUrl: string;
  host: string;
};

const maps: MapItem[] = [
  {
    n: '01',
    title: ['CometWatch — tracking the night ', 'sky', '.'],
    body: 'An interactive map for following comet activity in real time. Built with a custom data pipeline and a lean, fast front-end so visitors can scan the sky from anywhere in the world.',
    tags: ['Maps', 'Custom build', '2026'],
    embedUrl: 'https://commetwatch.com/?embed=1',
    liveUrl: 'https://commetwatch.com',
    host: 'commetwatch.com',
  },
];

export default function Maps() {
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
    <section id="maps" className="maps" ref={containerRef}>
      <div className="maps-header">
        <span className="label">Maps · 2026</span>
        <div className="title-group">
          <h2>Interactive maps</h2>
        </div>
      </div>

      {maps.map((m) => (
        <article key={m.n} className="map-card">
          <div className="map-text">
            <span className="project-number">({m.n})</span>
            <h3>
              {m.title[0]}
              <span className="accent">{m.title[1]}</span>
              {m.title[2]}
            </h3>
            <p>{m.body}</p>
            <div className="project-meta">
              {m.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a className="map-live-link" href={m.liveUrl} target="_blank" rel="noopener noreferrer">
              <span>Open live</span>
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13,6 19,12 13,18" />
                </svg>
              </span>
            </a>
          </div>

          <div className="map-frame" data-reveal>
            <div className="clip">
              <div className="map-frame-chrome">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="map-frame-url">{m.host}</span>
              </div>
              <div className="map-frame-body">
                <iframe
                  src={m.embedUrl}
                  title={`${m.host} preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

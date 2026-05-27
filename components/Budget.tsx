'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Tier = {
  title: { before: string; accent: string; after: string };
  description: string;
  features: string[];
};

const TIER_VALUES = [500, 1000, 2000, 3000, 5000];
const MIN_VALUE = TIER_VALUES[0];
const MAX_VALUE = TIER_VALUES[TIER_VALUES.length - 1];

const tiers: Record<number, Tier> = {
  500: {
    title: { before: 'A ', accent: 'simple', after: ' coded landing page.' },
    description:
      'A clean, hand-coded single-page landing site. Fast to load, easy to own. One round of revisions to dial it in.',
    features: ['1 page', 'Hand-coded', '1 revision'],
  },
  1000: {
    title: { before: 'A more ', accent: 'complex', after: ' coded landing page.' },
    description:
      'A more design-led, hand-coded landing page with richer interactions and a tighter design system. Built to stand out.',
    features: ['Hand-coded', 'Interactions', '2 revisions'],
  },
  2000: {
    title: { before: 'A ', accent: 'simple', after: ' Webflow customisation or 3-page coded site.' },
    description:
      'Either a light customisation of an existing Webflow template ready for your team to take over, or a 3-page hand-coded site with a considered design system.',
    features: ['Webflow or coded', 'Up to 3 pages', 'Editable'],
  },
  3000: {
    title: { before: 'A custom coded site or Webflow ', accent: 'CMS', after: ' build.' },
    description:
      'A fully custom hand-coded website, or a Webflow template built out with CMS integration — perfect for blogs, case studies, or content you want to update without a developer.',
    features: ['Custom build', 'CMS integration', 'Production-ready'],
  },
  5000: {
    title: { before: 'A ', accent: 'custom', after: ' Webflow build.' },
    description:
      "A fully custom Webflow build with bespoke design, multiple CMS integrations, and any other complexity your team needs. Built to scale and fully editable. Let's talk.",
    features: ['Bespoke Webflow', 'Multi-CMS', 'Scaled'],
  },
};

const indexOfTier = (v: number) => Math.max(0, TIER_VALUES.indexOf(v));


export default function Budget() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<number>(MIN_VALUE);
  const [transitioning, setTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Live slider position as a float index in [0, TIER_VALUES.length - 1]
  const liveIndexRef = useRef<number>(0);
  const [livePercent, setLivePercent] = useState(0);

  const applyIndex = useCallback((floatIdx: number) => {
    floatIdx = Math.max(0, Math.min(TIER_VALUES.length - 1, floatIdx));
    liveIndexRef.current = floatIdx;
    setLivePercent((floatIdx / (TIER_VALUES.length - 1)) * 100);
    const snapped = TIER_VALUES[Math.round(floatIdx)];
    if (snapped !== activeTier) {
      setTransitioning(true);
      window.setTimeout(() => {
        setActiveTier(snapped);
        setTransitioning(false);
      }, 180);
    }
  }, [activeTier]);

  const indexFromPointer = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return ratio * (TIER_VALUES.length - 1);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onDown = (e: PointerEvent) => {
      setIsDragging(true);
      slider.setPointerCapture(e.pointerId);
      applyIndex(indexFromPointer(e.clientX));
      e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      applyIndex(indexFromPointer(e.clientX));
    };
    const onUp = (e: PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      try { slider.releasePointerCapture(e.pointerId); } catch {}
      applyIndex(Math.round(liveIndexRef.current));
    };

    slider.addEventListener('pointerdown', onDown);
    slider.addEventListener('pointermove', onMove);
    slider.addEventListener('pointerup', onUp);
    slider.addEventListener('pointercancel', onUp);

    return () => {
      slider.removeEventListener('pointerdown', onDown);
      slider.removeEventListener('pointermove', onMove);
      slider.removeEventListener('pointerup', onUp);
      slider.removeEventListener('pointercancel', onUp);
    };
  }, [applyIndex, indexFromPointer, isDragging]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = indexOfTier(activeTier);
    let next = idx;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(0, idx - 1);
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(TIER_VALUES.length - 1, idx + 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TIER_VALUES.length - 1;
    else return;
    e.preventDefault();
    applyIndex(next);
  };

  const tier = tiers[activeTier];
  const suffix = activeTier === MAX_VALUE ? '+' : '';
  const displayAmount = `$${activeTier.toLocaleString()}${suffix}`;
  const sliderClass = `budget-slider${isDragging ? ' dragging' : ''}`;
  const currentIdx = Math.round(liveIndexRef.current);

  return (
    <section id="budget" className="budget">
      <div className="budget-header">
        <span className="label">Pricing · 2026</span>
        <h2>What's your budget?</h2>
      </div>
      <div className="budget-content">
        <div className="budget-slider-wrap">
          <div className="budget-current">
            <span className="budget-amount">{displayAmount}</span>
            <span className="budget-context">— let's see what that gets you.</span>
          </div>
          <div
            ref={sliderRef}
            className={sliderClass}
            role="slider"
            tabIndex={0}
            aria-valuemin={MIN_VALUE}
            aria-valuemax={MAX_VALUE}
            aria-valuenow={activeTier}
            aria-label="Budget slider"
            onKeyDown={onKeyDown}
          >
            <div className="budget-track" ref={trackRef}>
              <div className="budget-fill" style={{ width: `${livePercent}%` }} />
              {TIER_VALUES.map((v, i) => (
                <span
                  key={v}
                  className={`budget-tick${currentIdx >= i ? ' passed' : ''}`}
                  data-tick={v}
                  style={{ left: `${(i / (TIER_VALUES.length - 1)) * 100}%` }}
                />
              ))}
              <div className="budget-thumb" style={{ left: `${livePercent}%` }} />
            </div>
          </div>
          <div className="budget-tiers">
            {TIER_VALUES.map((v) => (
              <button
                key={v}
                type="button"
                className={`tier${activeTier === v ? ' active' : ''}`}
                data-value={v}
                onClick={() => applyIndex(indexOfTier(v))}
              >
                ${v.toLocaleString()}{v === MAX_VALUE ? '+' : ''}
              </button>
            ))}
          </div>
          <p className="budget-hint">Drag the dot · or tap a tier</p>
        </div>
        <div className={`budget-result${transitioning ? ' transitioning' : ''}`}>
          <span className="result-eyebrow">For your budget</span>
          <h3 className="result-title">
            {tier.title.before}
            <span className="accent">{tier.title.accent}</span>
            {tier.title.after}
          </h3>
          <p className="result-description">{tier.description}</p>
          <div className="result-features">
            {tier.features.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <div className="result-cta">
            <a className="work-visit" href="#contact">
              <span>Get in touch</span>
              <span className="work-visit-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13,6 19,12 13,18" />
                </svg>
              </span>
            </a>
            <a className="work-visit" href="https://calendly.com/hello-chloenixon/30min" target="_blank" rel="noopener">
              <span>Book a call</span>
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
    </section>
  );
}

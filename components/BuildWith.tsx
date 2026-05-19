'use client';

import { useEffect, useRef, useState } from 'react';

type Tool = { name: string; blurb: string; code: string; img: string };

const tools: Tool[] = [
  { code: 'WF', name: 'Webflow',       img: '/tools/webflow.png',       blurb: 'My production tool for marketing sites and CMS-driven content. Fast launches, clean handoff to in-house teams, and a familiar editor for non-technical clients.' },
  { code: 'NX', name: 'Next.js',       img: '/tools/next.webp',         blurb: 'When a portfolio or marketing site needs real interactivity and a tight performance budget. Server components, static rendering, and an opinionated structure I trust.' },
  { code: 'TS', name: 'TypeScript',    img: '/tools/typescript.png',    blurb: 'My default for any code that lives longer than a sketch. Catches bugs at the keyboard and makes refactors painless six months later.' },
  { code: 'DO', name: 'Digital Ocean', img: '/tools/digital-ocean.webp',blurb: 'Where finished sites ship from. Predictable pricing, a clean dashboard, and reliable infrastructure for everything from static landing pages to Next.js deployments.' },
  { code: 'FG', name: 'Figma',         img: '/tools/figma.webp',        blurb: 'Where every page starts. Components, auto-layout, and a shared file with the client so design happens in conversation, not over walls.' },
  { code: 'RE', name: 'React',         img: '/tools/react.jpg',         blurb: 'When a project needs interactive components beyond what static markup allows. Server components when I can, client components when I must.' },
];

const DESCEND_END = 0.25;
const CONVERGE_END = 0.55;
const REVEAL_AT = 0.58;

const PAUSE_MS = 5000;
const ROTATION_MS = 1200;
const FADE_MS = 350;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function phase(p: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}

export default function BuildWith() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const spokeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [toolIdx, setToolIdx] = useState(0);
  const autoRotateActiveRef = useRef(false);
  const totalStepsRef = useRef(0);
  const cycleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const info = infoRef.current;
    const header = headerRef.current;
    const caption = captionRef.current;
    if (!section || !stage || !info || !header || !caption) return;

    const spokes = spokeRefs.current.filter(Boolean) as HTMLDivElement[];

    function setActiveSpoke(idx: number) {
      spokes.forEach((s, i) => s.classList.toggle('active', i === idx));
    }
    function showTool(idx: number) {
      const tool = tools[idx];
      const name = info!.querySelector('.tool-name');
      const blurb = info!.querySelector('.tool-blurb');
      if (name) name.textContent = tool.name;
      if (blurb) blurb.textContent = tool.blurb;
      info!.classList.add('show');
      setActiveSpoke(idx);
    }
    function hideTool() {
      info!.classList.remove('show');
    }

    function nextStep() {
      if (!autoRotateActiveRef.current) return;
      hideTool();
      spokes.forEach((s) => s.classList.remove('active'));

      cycleTimerRef.current = window.setTimeout(() => {
        if (!autoRotateActiveRef.current) return;
        totalStepsRef.current += 1;
        const ti = totalStepsRef.current % tools.length;
        stage!.style.setProperty('--rotation', `${-60 * totalStepsRef.current}deg`);
        stage!.style.setProperty('--counter-rotation', `${60 * totalStepsRef.current}deg`);

        cycleTimerRef.current = window.setTimeout(() => {
          if (!autoRotateActiveRef.current) return;
          showTool(ti);
          cycleTimerRef.current = window.setTimeout(nextStep, PAUSE_MS);
        }, ROTATION_MS);
      }, FADE_MS);
    }

    function startAutoRotate() {
      if (autoRotateActiveRef.current) return;
      autoRotateActiveRef.current = true;
      totalStepsRef.current = 0;
      stage!.style.setProperty('--rotation', '0deg');
      stage!.style.setProperty('--counter-rotation', '0deg');
      cycleTimerRef.current = window.setTimeout(() => {
        if (!autoRotateActiveRef.current) return;
        showTool(0);
        cycleTimerRef.current = window.setTimeout(nextStep, PAUSE_MS);
      }, 500);
    }
    function stopAutoRotate() {
      if (!autoRotateActiveRef.current && totalStepsRef.current === 0) return;
      autoRotateActiveRef.current = false;
      if (cycleTimerRef.current) window.clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
      totalStepsRef.current = 0;
      stage!.classList.add('no-transition');
      stage!.style.setProperty('--rotation', '0deg');
      stage!.style.setProperty('--counter-rotation', '0deg');
      // Force reflow
      void stage!.offsetHeight;
      stage!.classList.remove('no-transition');
      hideTool();
      spokes.forEach((s) => s.classList.remove('active'));
    }

    function update() {
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      let progress = -rect.top / total;
      progress = Math.max(0, Math.min(1, progress));

      const stageW = stage!.offsetWidth;
      const stageH = stage!.offsetHeight;
      const isNarrow = stageW < 900;
      const cx = isNarrow ? stageW * 0.5 : stageW * 0.32;
      const cy = isNarrow ? stageH * 0.42 : stageH * 0.57;
      const radius = isNarrow
        ? Math.min(stageW * 0.5, stageH) * 0.42
        : Math.min(stageW * 0.5, stageH) * 0.32;

      stage!.style.setProperty('--pivot-x', `${cx}px`);
      stage!.style.setProperty('--pivot-y', `${cy}px`);

      const p1 = easeInOutCubic(phase(progress, 0, DESCEND_END));
      const p2 = easeInOutCubic(phase(progress, DESCEND_END, CONVERGE_END));
      const SWIRL_OFFSET = radius * 0.6;

      spokes.forEach((spoke, i) => {
        const colX = ((i + 0.5) / spokes.length) * stageW;
        const finalAngleDeg = -30 + i * 60;
        const finalAngleRad = (finalAngleDeg * Math.PI) / 180;
        const finalEndX = cx + Math.cos(finalAngleRad) * radius;
        const finalEndY = cy + Math.sin(finalAngleRad) * radius;
        const tangent = finalAngleRad + Math.PI / 2;
        const finalAnchorX = cx + Math.cos(tangent) * SWIRL_OFFSET;
        const finalAnchorY = cy + Math.sin(tangent) * SWIRL_OFFSET;

        const phase1AnchorY = -stageH + stageH * p1;
        const phase1AnchorX = colX;
        const phase1EndX = colX;
        const phase1EndY = phase1AnchorY + stageH;

        const anchorX = phase1AnchorX + (finalAnchorX - phase1AnchorX) * p2;
        const anchorY = phase1AnchorY + (finalAnchorY - phase1AnchorY) * p2;
        const endX = phase1EndX + (finalEndX - phase1EndX) * p2;
        const endY = phase1EndY + (finalEndY - phase1EndY) * p2;

        const dx = endX - anchorX;
        const dy = endY - anchorY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lineRot = (Math.atan2(dy, dx) * 180) / Math.PI - 90;

        const line = spoke.querySelector('.line') as HTMLElement | null;
        if (line) {
          line.style.left = `${anchorX}px`;
          line.style.top = `${anchorY}px`;
          line.style.height = `${dist}px`;
          line.style.transform = `rotate(${lineRot}deg)`;
        }

        const logo = spoke.querySelector('.logo') as HTMLElement | null;
        if (logo) {
          logo.style.transform = `translate(${endX - 36}px, ${endY - 36}px)`;
          logo.classList.toggle('shown', progress >= REVEAL_AT);
        }
      });

      if (progress >= REVEAL_AT) {
        header!.classList.add('show');
        caption!.classList.add('show');
        startAutoRotate();
      } else {
        header!.classList.remove('show');
        caption!.classList.remove('show');
        stopAutoRotate();
      }
    }

    let ticking = false;
    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    }
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (cycleTimerRef.current) window.clearTimeout(cycleTimerRef.current);
    };
  }, []);

  return (
    <section id="builds-with" className="builds-with" ref={sectionRef}>
      <div className="bw-sticky">
        <header className="bw-header" ref={headerRef}>
          <span className="label">Toolkit · 2026</span>
          <h2>What I build with</h2>
        </header>

        <div className="bw-stage" id="bw-stage" ref={stageRef}>
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className="spoke"
              data-tool={tool.name}
              ref={(el) => {
                spokeRefs.current[i] = el;
              }}
            >
              <div className="line" />
              <div className="logo">
                <div className="logo-shell">
                  <span className="logo-text">
                    <img className="logo-img" src={tool.img} alt={tool.name} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bw-info" id="bw-info" ref={infoRef}>
          <span className="tool-label">Now showing</span>
          <span className="tool-name">{tools[0].name}</span>
          <p className="tool-blurb">{tools[0].blurb}</p>
        </div>

        <div className="bw-caption" ref={captionRef}>
          <span>Six tools, one workflow</span>
          <span>Scroll to converge ↓</span>
        </div>
      </div>
    </section>
  );
}

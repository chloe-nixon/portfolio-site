'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const BLIND_COUNT = 12;
const STAGGER_MS = 35;
const CLOSE_MS = 800;
const OPEN_MS = 900;
const TOTAL_CLOSE_MS = (BLIND_COUNT - 1) * STAGGER_MS + CLOSE_MS;
const TOTAL_OPEN_MS = (BLIND_COUNT - 1) * STAGGER_MS + OPEN_MS;

type Stage = 'idle' | 'closing' | 'opening';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('idle');
  const stageRef = useRef<Stage>('idle');
  const pendingHref = useRef<string | null>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => { stageRef.current = stage; }, [stage]);

  // Intercept internal-route link clicks so we can play "closing" before navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (stageRef.current !== 'idle') return;
      // Only plain left-clicks; let cmd/ctrl/shift open new tabs etc.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const a = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      if (a.target === '_blank') return;
      // Skip in-page anchors, external URLs, and mailto/tel
      if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      // Skip same path
      const dest = href.split('#')[0] || '/';
      if (dest === pathname) return;

      e.preventDefault();
      pendingHref.current = href;
      setStage('closing');
    };
    // Capture phase so we run before Lenis's bubble-phase smooth-scroll handler
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  // When the close animation completes, push the route
  useEffect(() => {
    if (stage !== 'closing') return;
    const t = window.setTimeout(() => {
      if (pendingHref.current) {
        router.push(pendingHref.current);
        pendingHref.current = null;
      }
    }, TOTAL_CLOSE_MS);
    return () => window.clearTimeout(t);
  }, [stage, router]);

  // When the new route's pathname lands, swap closing → opening, then idle
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
    setStage('opening');
    const t = window.setTimeout(() => setStage('idle'), TOTAL_OPEN_MS);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div>
      {children}
      {stage !== 'idle' && (
        <div className="page-blinds" aria-hidden="true">
          {Array.from({ length: BLIND_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`page-blind page-blind-${stage}`}
              style={{ animationDelay: `${i * STAGGER_MS}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type TopBarProps = {
  activeWork?: boolean;
  activeContact?: boolean;
};

export default function TopBar({ activeWork = false, activeContact = false }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll + close on Esc while menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`topbar${menuOpen ? ' menu-open' : ''}`}>
      <Link className="brand" href="/" aria-label="Chloe Nixon — home" onClick={closeMenu}>
        Chloe Nixon
      </Link>
      <nav className="topbar-nav">
        <Link href="/work" data-text="Work" className={activeWork ? 'active' : undefined} onClick={closeMenu}>
          <span>Work</span>
        </Link>
        <Link href="/contact" data-text="Contact" className={activeContact ? 'active' : undefined} onClick={closeMenu}>
          <span>Contact</span>
        </Link>
        <Link href="/contact" className="nav-cta" aria-label="Get in touch" onClick={closeMenu}>
          <span className="nav-cta-text">Get in touch</span>
          <span className="nav-cta-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13,6 19,12 13,18" />
            </svg>
          </span>
        </Link>
      </nav>
      <button
        type="button"
        className="topbar-burger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

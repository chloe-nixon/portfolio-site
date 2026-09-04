'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, ValidationError } from '@formspree/react';
import TopBar from '@/components/TopBar';

export default function ContactPage() {
  const [formState, handleSubmit] = useForm('meenydng');

  // Load Calendly script if needed, then explicitly initialize the widget.
  // The auto-scan only fires on first script load — if the script was already
  // loaded from a previous visit, the new widget element on this mount won't
  // be picked up. Calling initInlineWidget directly fixes that.
  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js';

    const initWidgets = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const C = (window as any).Calendly;
      if (!C?.initInlineWidget) return;
      document.querySelectorAll<HTMLElement>('.calendly-inline-widget').forEach((el) => {
        if (el.children.length > 0) return;
        const url = el.getAttribute('data-url');
        if (url) C.initInlineWidget({ url, parentElement: el });
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).Calendly) initWidgets();
      else existing.addEventListener('load', initWidgets, { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = initWidgets;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="contact-page work-page">
      <TopBar activeContact />

      <section className="page-header">
        <div className="page-header-row">
          <span className="eyebrow">Get in touch · 2026</span>
          <h1>
            let's <span className="accent">talk</span>.
          </h1>
        </div>
        <p className="page-intro">
          Two ways to start: drop me a message about your project, or book a 30-minute call
          to talk through it live. I reply within one business day.
        </p>
      </section>

      <section className="contact-page-block">
        <div className="contact-page-form-grid">
          <div className="contact-page-form-col">
            <div className="contact-page-block-header">
              <span className="contact-page-step">01</span>
              <div>
                <span className="label">Send a message</span>
                <h2>Tell me about the project.</h2>
              </div>
            </div>
        {formState.succeeded ? (
          <div className="contact-success" role="status" aria-live="polite">
            <h3>Thanks — message sent.</h3>
            <p>I&apos;ll reply within one business day.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cp-name">Name</label>
                <input id="cp-name" name="name" type="text" placeholder="Your name" required />
                <ValidationError prefix="Name" field="name" errors={formState.errors} className="form-error" />
              </div>
              <div className="form-field">
                <label htmlFor="cp-email">Email</label>
                <input id="cp-email" name="email" type="email" placeholder="you@example.com" required />
                <ValidationError prefix="Email" field="email" errors={formState.errors} className="form-error" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cp-project">Project type</label>
                <select id="cp-project" name="project" defaultValue="">
                  <option value="">Choose…</option>
                  <option value="webflow">Webflow build / customisation</option>
                  <option value="coded">Hand-coded site</option>
                  <option value="cms">Coded site with CMS</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="cp-budget">Budget (AUD)</label>
                <div className="form-input-prefix">
                  <span className="form-input-prefix-symbol" aria-hidden="true">$</span>
                  <input
                    id="cp-budget"
                    name="budget"
                    type="text"
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="cp-message">Tell me about the project</label>
              <textarea
                id="cp-message"
                name="message"
                placeholder="A few sentences about what you're building, who it's for, and any links to existing brand/work."
              />
              <ValidationError prefix="Message" field="message" errors={formState.errors} className="form-error" />
            </div>
            <ValidationError errors={formState.errors} className="form-error" />
            <div className="form-footer">
              <p className="form-disclaimer">
                I reply within one business day. Quick scope check before any quote.
              </p>
              <button className="contact-submit" type="submit" disabled={formState.submitting}>
                <span className="contact-submit-text">{formState.submitting ? 'Sending…' : 'Send message'}</span>
                <span className="contact-submit-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13,6 19,12 13,18" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        )}
          </div>
          <div className="contact-page-photo">
            <Image
              src="/images/chloecontact.webp"
              alt="Chloe Nixon"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="contact-page-block">
        <div className="contact-page-block-header">
          <span className="contact-page-step">02</span>
          <div>
            <span className="label">Book a call</span>
            <h2>Pick a time that works.</h2>
          </div>
        </div>
        <div className="calendly-wrap">
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/hello-chloenixon/30min"
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/#top">↑ Back to home</Link>
      </footer>
    </div>
  );
}

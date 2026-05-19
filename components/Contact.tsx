'use client';

import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [formState, handleSubmit] = useForm('meenydng');

  // Load Calendly script if needed, then explicitly initialize the widget.
  // Calendly's auto-scan only fires once on first script load — without an
  // explicit init, the widget element can be missed on subsequent navigations.
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

  // Sync active tab to URL hash (handles direct loads + back/forward nav)
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#book-a-call') setActiveTab('calendar');
      else if (window.location.hash === '#contact') setActiveTab('form');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Switch tab immediately when an in-page link to #contact / #book-a-call is clicked,
  // so the right tab is already open by the time the scroll arrives.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#book-a-call') setActiveTab('calendar');
      else if (href === '#contact') setActiveTab('form');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <section id="contact" className="contact">
      <span id="book-a-call" aria-hidden="true" />
      <div className="contact-header">
        <span className="label">Get in touch · 2026</span>
        <h2>Let's talk</h2>
      </div>
      <div className="contact-inner">
        <div className="contact-tabs" role="tablist">
          <button
            type="button"
            className={`contact-tab${activeTab === 'form' ? ' active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'form'}
            onClick={() => setActiveTab('form')}
          >
            Send a message
          </button>
          <button
            type="button"
            className={`contact-tab${activeTab === 'calendar' ? ' active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'calendar'}
            onClick={() => setActiveTab('calendar')}
          >
            Book a call
          </button>
        </div>

        <div className={`contact-panel${activeTab === 'form' ? ' active' : ''}`} role="tabpanel">
          {formState.succeeded ? (
            <div className="contact-success" role="status" aria-live="polite">
              <h3>Thanks — message sent.</h3>
              <p>I'll reply within one business day.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" placeholder="Your name" required />
                  <ValidationError prefix="Name" field="name" errors={formState.errors} className="form-error" />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} className="form-error" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-project">Project type</label>
                  <select id="contact-project" name="project" defaultValue="">
                    <option value="">Choose…</option>
                    <option value="webflow">Webflow build / customisation</option>
                    <option value="coded">Hand-coded site</option>
                    <option value="cms">Coded site with CMS</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-budget">Budget</label>
                  <select id="contact-budget" name="budget" defaultValue="">
                    <option value="">Choose…</option>
                    <option value="500">$500</option>
                    <option value="1000">$1,000</option>
                    <option value="1500">$1,500</option>
                    <option value="2000">$2,000</option>
                    <option value="2500">$2,500</option>
                    <option value="3000">$3,000</option>
                    <option value="5000">$5,000+</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Tell me about the project</label>
                <textarea
                  id="contact-message"
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

        <div className={`contact-panel${activeTab === 'calendar' ? ' active' : ''}`} role="tabpanel">
          <div className="calendly-wrap">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/hello-chloenixon/30min"
              style={{ minWidth: 320, height: 700 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

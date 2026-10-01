'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [formState, handleSubmit] = useForm('meenydng');

  return (
    <section id="contact" className="contact">
      <div className="contact-header">
        <span className="label">Get in touch · 2026</span>
        <h2>Let's talk</h2>
      </div>
      <div className="contact-inner">
        <div className="contact-panel active" role="tabpanel">
          {formState.succeeded ? (
            <div className="contact-success" role="status" aria-live="polite">
              <h3>Thanks, message sent.</h3>
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
                  <label htmlFor="contact-budget">Budget (AUD)</label>
                  <div className="form-input-prefix">
                    <span className="form-input-prefix-symbol" aria-hidden="true">$</span>
                    <input
                      id="contact-budget"
                      name="budget"
                      type="text"
                      inputMode="numeric"
                    />
                  </div>
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
      </div>
    </section>
  );
}

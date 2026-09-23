'use client';

import { useState } from 'react';

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: 'Where are you based?',
    a: 'I’m an independent website developer and designer based in Queensland, Australia, working entirely remote with brands locally and internationally.',
  },
  {
    q: 'Do you accept clients outside Australia?',
    a: 'Yes — I accept clients from all around the globe. I’ve worked with clients worldwide, across the UK, US, Japan, and beyond, all managed remotely with clear async communication.',
  },
  {
    q: 'Do you build websites with Astro?',
    a: 'Yes. Astro is one of my core tools for content-heavy marketing sites that need to load fast — it ships near-zero JavaScript by default and I add interactive islands only where they’re actually needed.',
  },
  {
    q: 'What platforms do you build with?',
    a: 'Webflow, Astro, and Next.js, depending on the project. Webflow for CMS-driven marketing sites and easy client handoff, Astro for fast content sites, and Next.js/React when a project needs real interactivity.',
  },
  {
    q: 'Do you handle design as well as development?',
    a: 'Yes. Every project starts in Figma, where I design the full site with you before writing a line of code — so there’s no handoff gap between design and build, and no surprises when it comes to life on the web.',
  },
  {
    q: 'Do you build custom websites or use templates?',
    a: 'Both, depending on your budget and timeline. Most projects start from a blank canvas in Figma and are built fully custom to your brand — but I also work from templates, heavily customised with bespoke components and code so they still feel tailored rather than off-the-shelf.',
  },
  {
    q: 'How much does a website cost?',
    a: 'It depends on scope — a marketing site is priced differently to a full product-design system or a custom-coded build. Get in touch with your goals and I’ll send through a proposal with clear pricing.',
  },
  {
    q: 'How long does a website take to build?',
    a: 'Projects can run anywhere from a few weeks to a few months, depending on scope, urgency, and how much content and feedback turnaround is involved. I’ll give you a realistic timeline once we’ve scoped the project together.',
  },
  {
    q: 'Can I edit the website myself after it’s live?',
    a: 'Yes — Webflow and CMS-driven builds are handed off with a clean, editable structure your team can run day-to-day. For fully custom code builds, I’ll set you up with whatever level of editability you need.',
  },
  {
    q: 'Do you offer support after the site launches?',
    a: 'Yes. I’m available for post-launch fixes, updates, and ongoing maintenance — just reach out whenever something needs attention.',
  },
  {
    q: 'What makes you different from other web developers?',
    a: 'I design and build — every site is designed in Figma and developed by me personally, so there’s no handoff gap between design and code. That means pixel-accurate builds, fast turnaround, and a single point of contact from first sketch to launch.',
  },
  {
    q: 'How do I get started on a project?',
    a: 'Book a call or send an email — both are linked in the contact section below. I’ll ask about your goals, timeline, and budget, then follow up with a proposal.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="faq-header">
        <span className="label">FAQ</span>
        <h2>Common questions</h2>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <div className={`faq-item${open ? ' open' : ''}`} key={f.q}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
              >
                <span>{f.q}</span>
                <span className={`faq-icon${open ? ' open' : ''}`} aria-hidden="true" />
              </button>
              {open && <p className="faq-answer">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

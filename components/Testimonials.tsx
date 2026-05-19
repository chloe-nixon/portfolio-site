'use client';

type Testimonial = {
  name: string;
  role: string;
  img: string | null;
  initials: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  { name: 'Jake Slacker',      role: 'CEO, Slacker Apps',                    img: '/images/Jake.png',     initials: 'JS', quote: 'Her work was of high quality, she was swift with her updates and communication, she was flexible and solution orientated and the website was successfully completed inline with our vision on time, on budget, with zero friction. Fully deserving of a bonus and we hope to work with her again.' },
  { name: 'Cameron Young',     role: 'CEO, National Digital',                img: '/images/Cameron.png',  initials: 'CY', quote: "Chloe is an absolutely outstanding graphic artist. From the first interaction, it was clear they immediately understood the brief — not just the words, but the intent behind them. The work was creative, polished, and perfectly aligned with the brand, with a level of thought and restraint that's hard to find. If you want a designer who feels more like a creative partner than a supplier, this is someone I'd recommend without hesitation." },
  { name: 'Declan Flaherty',   role: 'CEO, Soone Agency',                    img: '/images/declan.png',   initials: 'DF', quote: 'Chloe was excellent to work with — very proficient in Webflow and great prompt communication!' },
  { name: 'Marc Goodwin',      role: 'Growth & Marketing, Chilled Creative', img: null,                   initials: 'MG', quote: 'Well done Chloe! Great working with you — you were very responsive and built a quality product as per the design.' },
  { name: 'Matt Bonner',       role: 'Director & Co-Founder, Turba Media',   img: '/images/matt.png',     initials: 'MB', quote: 'Turba Media engaged Chloe to help build our website on Webflow. Chloe was professional, available, easy to work with and has a lovely demeanour. The quality of her work was excellent. I will happily recommend her.' },
  { name: 'Micky Dollimore',   role: 'Co-Founder, HVDC World',               img: '/images/micky.avif',   initials: 'MD', quote: 'Working with Chloe has been an absolute pleasure. Her ability to combine stunning visual design with clean, efficient code has transformed our digital presence. Her attention to detail and understanding of modern design principles have resulted in a website that perfectly represents our brand while providing an exceptional user experience.' },
  { name: 'Michelle Williams', role: 'Founder, The Remix',                   img: '/images/michelle.avif',initials: 'MW', quote: "I've worked with Chloe Nixon on building The Remix website, and she's been the most reliable and technically capable Webflow developer I've worked with. She brings a deep understanding of Webflow, from CMS structuring to resolving finicky bugs and implementing custom interactions. She's fast, dependable, and communicates clearly, even when working with complex or evolving design briefs. If you're looking for someone who can bring order to chaos and make the most of what Webflow can do, she's a fantastic asset." },
  { name: 'Emma Mcdermott',    role: 'Founder, Global Tax Consulting',       img: '/images/emma.avif',    initials: 'EM', quote: 'Chloe is an exceptional Webflow developer. She implemented complex Figma designs pixel by pixel. She is detail orientated, easy to work with, super responsive and delivers projects on time. If you are looking for an expert Webflow developer, look no further!' },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <article className="t-card">
      <div className="t-card-header">
        <div className="t-card-avatar">
          {t.img ? <img src={t.img} alt={t.name} /> : t.initials}
        </div>
        <div className="t-card-meta">
          <span className="t-card-name">{t.name}</span>
          <span className="t-card-role">{t.role}</span>
        </div>
      </div>
      <p className="t-card-quote">{t.quote}</p>
    </article>
  );
}

function Row({ order, reverse }: { order: number[]; reverse?: boolean }) {
  const items = order.map((i) => testimonials[i]);
  return (
    <div className={`t-row${reverse ? ' reverse' : ''}`} data-row={reverse ? 'bottom' : 'top'}>
      {[...items, ...items].map((t, idx) => (
        <Card key={`${t.name}-${idx}`} t={t} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-header">
        <span className="label">Testimonials · 2024 – 2026</span>
        <h2>Some kind words</h2>
      </div>
      <div className="testimonials-marquee" id="testimonials-marquee">
        <Row order={[0, 2, 4, 6, 1, 3, 5, 7]} />
        <Row order={[1, 3, 5, 7, 0, 2, 4, 6]} reverse />
      </div>
      <p className="testimonials-hint">Hover to pause</p>
    </section>
  );
}

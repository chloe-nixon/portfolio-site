import Image from 'next/image';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="glow-stage">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      <div className="headline">
        <h1>
          Fast websites, built <span className="accent">right</span>.
        </h1>
        <p className="hero-about">
          Independent designer & developer making polished, considered sites for design-conscious brands. Webflow native, now writing code too.
        </p>
        <div className="meta">
          <span>Webflow → Code</span>
          <span>2026</span>
        </div>
      </div>

      <div className="portrait">
        <Image src="/images/portrait.png" alt="Chloe Nixon" width={200} height={244} priority />
      </div>
    </section>
  );
}

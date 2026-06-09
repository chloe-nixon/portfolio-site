export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <span className="footer-status">
        <span className="dot" />
        Available for projects · Spring 2026
      </span>

      <div className="footer-top">
        <div className="footer-brand">
          <h3 className="footer-name">
            chloe <span className="accent">nixon</span>.
          </h3>
          <p className="footer-tagline">
            Independent designer & developer making polished, considered sites for design-conscious brands.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <span className="footer-label">Site</span>
            <a href="/#projects">Work</a>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#contact">Contact</a>
          </div>
          <div className="footer-column">
            <span className="footer-label">Elsewhere</span>
            <a
              href="https://www.linkedin.com/in/chloe-nixon-9278442b2"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </div>
          <div className="footer-column">
            <span className="footer-label">Get in touch</span>
            <a href="mailto:hello@chloenixon.com">hello@chloenixon.com</a>
            <a href="https://calendly.com/hello-chloenixon/30min" target="_blank" rel="noopener">
              Book a call
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Chloe Nixon</span>
        <span className="footer-built">
          Built with <span className="heart">♥</span> in Next.js + TypeScript
        </span>
        <a href="#top">↑ Back to top</a>
      </div>
    </footer>
  );
}

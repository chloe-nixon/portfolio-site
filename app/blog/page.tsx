import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import PlaceholderImage from '@/components/PlaceholderImage';
import { posts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on Webflow, Astro, and Next.js development, process, and the trade-offs behind building considered websites.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Chloe Nixon',
    description:
      'Notes on Webflow, Astro, and Next.js development, process, and the trade-offs behind building considered websites.',
    url: 'https://chloenixon.com/blog',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="work-page blog-page">
      <TopBar activeBlog />

      <section className="page-header split-header">
        <div className="page-header-row">
          <h1>
            the <span className="accent">blog</span>.
          </h1>
          <p className="page-intro">
            Notes on process, tooling trade-offs, and how I approach building websites.
          </p>
        </div>
      </section>

      <section className="blog-list">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-list-item">
            {p.coverImage ? (
              <div className="blog-list-item-image">
                <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 768px) 100vw, 260px" />
              </div>
            ) : (
              <PlaceholderImage label={p.title} aspect="16 / 10" />
            )}
            <div className="blog-list-item-body">
              <span className="blog-list-item-meta">
                {new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' · '}
                {p.readTime}
              </span>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/#top">↑ Back to home</Link>
      </footer>
    </div>
  );
}

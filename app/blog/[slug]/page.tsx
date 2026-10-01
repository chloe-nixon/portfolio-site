import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import PlaceholderImage from '@/components/PlaceholderImage';
import { posts, getPostBySlug } from '@/lib/blog-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Chloe Nixon`,
      description: post.metaDescription,
      url: `https://chloenixon.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="work-page blog-page blog-post-page">
      <TopBar activeBlog />

      <section className="page-header blog-post-header">
        <div className="page-header-row">
          <span className="eyebrow">
            {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}
            {post.readTime}
          </span>
          <h1>{post.title}</h1>
        </div>
      </section>

      <section className="blog-post-hero">
        {post.coverImage ? (
          <div className="blog-post-hero-image">
            <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 900px) 100vw, 1200px" priority />
          </div>
        ) : (
          <PlaceholderImage label={post.title} aspect="21 / 9" />
        )}
      </section>

      <section className="blog-post-body">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/blog">↑ Back to blog</Link>
      </footer>
    </div>
  );
}

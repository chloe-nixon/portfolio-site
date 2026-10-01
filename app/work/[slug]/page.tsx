import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import { works, getWorkBySlug } from '@/lib/work-data';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return {};

  return {
    title: project.metaTitle.replace(' | Chloe Nixon', ''),
    description: project.metaDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `https://chloenixon.com/work/${project.slug}`,
      images: [{ url: project.laptop }],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const currentIndex = works.findIndex((w) => w.slug === slug);
  const next = works[(currentIndex + 1) % works.length];

  return (
    <div className="work-page case-study-page">
      <TopBar activeWork />

      <section className="page-header case-study-header">
        <div className="page-header-row">
          <span className="eyebrow">Case study · {project.category}</span>
          <h1>
            {project.title[0]}
            <span className="accent">{project.title[1]}</span>
            {project.title[2]}
          </h1>
        </div>
        <p className="page-intro">{project.overview}</p>
      </section>

      <section className="case-study-body">
        <div className="work-images case-study-images">
          <div className="img-laptop">
            <Image
              className="laptop"
              src={project.laptop}
              alt={`${project.title.join('')} laptop mockup`}
              width={1800}
              height={1200}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>
          <div className="img-mobile">
            <Image
              className="mobile"
              src={project.mobile}
              alt={`${project.title.join('')} mobile mockup`}
              fill
              sizes="(max-width: 768px) 55vw, 30vw"
            />
          </div>
        </div>

        <div className="case-study-columns">
          <div className="case-study-col">
            <span className="label">The approach</span>
            <ul className="case-study-list">
              {project.approach.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="case-study-col">
            <span className="label">The result</span>
            <p className="case-study-result">{project.result}</p>
            <a className="work-visit" href={project.url} target="_blank" rel="noopener">
              <span>Visit live site</span>
              <span className="work-visit-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13,6 19,12 13,18" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="case-study-next">
        <Link href={`/work/${next.slug}`} className="case-study-next-link">
          <span className="label">Next case study</span>
          <h2>
            {next.title[0]}
            <span className="accent">{next.title[1]}</span>
            {next.title[2]}
          </h2>
        </Link>
      </section>

      <footer className="work-footer">
        <span>© 2026 Chloe Nixon</span>
        <span>Built in Next.js + TypeScript</span>
        <Link href="/work">↑ Back to all work</Link>
      </footer>
    </div>
  );
}

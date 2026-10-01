import type { MetadataRoute } from 'next';
import { works } from '@/lib/work-data';
import { posts } from '@/lib/blog-data';

export const dynamic = 'force-static';

const BASE_URL = 'https://chloenixon.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/work`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/webflow-development`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/web-design`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE_URL}/work/${w.slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}

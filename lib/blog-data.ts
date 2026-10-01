export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  metaDescription: string;
  readTime: string;
  content: string[];
  coverImage?: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'webflow-vs-astro-vs-nextjs',
    title: 'Webflow, Astro, or Next.js: which one suits you?',
    date: '2026-09-01',
    readTime: '6 min read',
    coverImage: '/images/blog/webflow-vs-astro-vs-nextjs.jpg',
    excerpt:
      "It depends on who's updating the site after launch, not which tool is trendiest. Here's how to work out which one fits your project.",
    metaDescription:
      'A practical comparison of Webflow, Astro, and Next.js. Which one fits your project, and how to tell.',
    content: [
      "If you're planning a new site, the first real decision isn't a color palette, it's whether the site should be Webflow, or coded, and if it's coded, Astro or Next.js. There isn't a universally right answer. It comes down to who's going to be updating the site after launch and what it actually needs to do.",
      "Webflow is usually the right call for marketing sites, agency sites, and anything where you or your team want to update copy, images, and blog posts without needing a developer on call. A well-built Webflow site with a proper CMS behind it looks and feels like a custom build. Visitors won't guess it's Webflow. Where it falls short is genuinely complex application logic.",
      "Astro suits you if your site is mostly content, and either you're happy for a developer to manage ongoing updates or the content just doesn't change much. It ships almost no JavaScript by default, so pages load fast, with interactive bits added only where they're actually needed. It's a strong fit for portfolios, documentation, and marketing pages that need to be genuinely fast, not just look fast.",
      "Next.js is worth it once you need real application logic: user accounts, dashboards, data that needs fetching and processing, integrations with other tools. It's also the right call if the site is going to keep growing into something closer to a product than a page.",
      "The mistake I see most often is choosing based on what's trendy rather than what the project needs. A SaaS marketing site doesn't need a custom React build just because the product itself is coded. And a tool with real data logic behind it shouldn't be squeezed into a page builder just because it launches faster.",
      "A quick way to check which one suits you: if your day-to-day changes will be content, Webflow usually pays off long term, since it gives you independence. If changes will be rare and speed matters most, Astro. If changes will be features and logic, it needs to be code, most likely Next.js.",
      "If you're still not sure which side your project falls on, that's usually the first thing worth figuring out before any design work starts. Get in touch and we can talk it through.",
    ],
  },
  {
    slug: 'how-i-approach-a-new-website-build',
    title: 'How I actually run a website project',
    date: '2026-08-10',
    readTime: '5 min read',
    coverImage: '/images/blog/how-i-approach-a-new-website-build.jpg',
    excerpt:
      'What actually happens between the first call and launch, and why I lock in scope before any design work starts.',
    metaDescription:
      'A look at how a website project actually runs from first call to launch, and why scope gets locked in before design starts.',
    content: [
      "Every project starts with a conversation about what the site needs to do, not what it should look like. If design decisions get made before scope is clear, they tend to get expensive to unwind later. So that's the first thing I lock in.",
      "From there it's roughly: scope and structure (site map, content, whether it's Webflow, Astro, or custom code), then design in Figma, reviewed in rounds until it's right, then build.",
      "During build, I work in chunks you can actually see rather than disappearing for a few weeks and reappearing with a finished site. You watch it take shape section by section, which makes feedback cheaper to act on than one big reveal at the end.",
      "Before anything goes live, I check the things that are easy to skip under deadline pressure: page speed, how it behaves on mobile, whether the forms actually work, and the SEO basics like unique page titles, meta descriptions, and a submitted sitemap. A site that looks great but that Google can't read properly isn't actually finished.",
      "Once it's live, I walk the team through anything they'll manage themselves: the CMS structure, how to add a new page, where the content lives. So the site keeps working for you well after the project wraps, not just on launch day.",
      "If that's the kind of process you want for your next build, let's talk about your project.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

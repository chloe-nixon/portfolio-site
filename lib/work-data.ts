export type WorkProject = {
  n: string;
  slug: string;
  title: readonly [string, string, string];
  category: 'Development' | 'Design' | 'Design & Development';
  body: string;
  tags: string[];
  laptop: string;
  mobile: string;
  url: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  approach: string[];
  result: string;
};

export const works: WorkProject[] = [
  {
    n: '01',
    slug: 'zone-34',
    title: ['Zone 34: physiotherapy, made ', 'easy to find', '.'],
    category: 'Development',
    body: "A large-scale Webflow build for a physiotherapy clinic, delivered in partnership with Multiply Digital. Heavy custom code throughout, including a multi-category filtering system that lets visitors quickly find the right practitioner, built with Finsweet attributes and custom JavaScript. Signature cut-edge visuals use custom clip-path styling to stay crisp at every breakpoint, alongside a structured CMS, horizontal scroll sliders and custom pagination.",
    tags: ['Webflow', 'Custom code', '2026'],
    laptop: '/zone34-laptop.jpeg',
    mobile: '/zone34-iphone.jpeg',
    url: 'https://zone34.com.au/',
    metaTitle: 'Zone 34: Webflow Development Case Study | Chloe Nixon',
    metaDescription:
      'How a practitioner-filtering system, custom clip-path visuals, and a structured CMS came together in a large-scale Webflow build for physiotherapy clinic Zone 34.',
    overview:
      "Zone 34 is a physiotherapy clinic, and this was a large-scale Webflow build delivered in partnership with Multiply Digital. The brief called for heavy custom code throughout rather than a standard template site, starting with a multi-category filtering system that lets visitors quickly find the right practitioner.",
    approach: [
      "A multi-category filtering system, built with Finsweet attributes and custom JavaScript, so visitors can narrow practitioners down by specialty instead of scrolling through a full list.",
      "Signature cut-edge visuals, built with custom clip-path styling, engineered to stay crisp at every breakpoint rather than just at the design mockup size.",
      "A structured CMS behind the whole site, so the clinic can update practitioners and content without needing a developer.",
      "Horizontal scroll sliders and custom pagination, built to handle the amount of content on the site without it turning into one long scroll.",
    ],
    result:
      "A large-scale, heavily custom Webflow build that gives Zone 34 a fast, distinctive site. Delivered in partnership with Multiply Digital.",
  },
  {
    n: '02',
    slug: 'global-tax-consulting',
    title: ['Global Tax Consulting: international tax, made ', 'clear', '.'],
    category: 'Development',
    body: 'A custom Webflow build for an international tax practice serving expats and globally mobile professionals navigating UK rules across 50+ countries. Editable case studies, downloadable guides, and an interactive index tool, all on a CMS the team can update themselves.',
    tags: ['Webflow', 'CMS', '2025'],
    laptop: '/images/gtc.webp',
    mobile: '/images/gtcmobile.webp',
    url: 'https://www.globaltaxconsulting.co.uk/',
    metaTitle: 'Global Tax Consulting: Webflow CMS Case Study | Chloe Nixon',
    metaDescription:
      'A custom Webflow build for an international tax practice: editable case studies, downloadable guides, and an interactive index tool, all on a CMS the team runs themselves.',
    overview:
      "Global Tax Consulting advises expats and globally mobile professionals on UK tax rules across more than 50 countries. That's a genuinely complicated subject, and the site needed to make it feel navigable instead of intimidating.",
    approach: [
      "Structured the CMS around case studies and guides so the team publishes new content themselves, without needing me involved.",
      "Built an interactive index tool that helps visitors work out which service actually applies to their situation.",
      "Made every guide downloadable, so the site works as a real resource, not just a brochure with a contact form at the bottom.",
      "Kept the visual language calm and understated, which matched the level of trust this kind of advice needs.",
    ],
    result:
      "The team runs the site themselves day to day, and the content structure is built to keep growing as they add more guides and case studies.",
  },
  {
    n: '03',
    slug: 'tidyhq',
    title: ['TidyHQ: club management, ', 'simplified', '.'],
    category: 'Design',
    body: 'A full product-design system in Figma for an all-in-one membership platform that replaces spreadsheets and stitched-together tools. Covers dashboards, marketing surfaces, and onboarding flows, handed off to their in-house engineering team.',
    tags: ['Figma', 'Product design', '2026'],
    laptop: '/images/tidyhqnew.webp',
    mobile: '/images/tidyhqmobile.webp',
    url: 'https://tidyhq.com/',
    metaTitle: 'TidyHQ: Product Design Case Study | Chloe Nixon',
    metaDescription:
      'A full product-design system in Figma for membership platform TidyHQ: dashboards, marketing surfaces, and onboarding flows, handed off to an in-house engineering team.',
    overview:
      "TidyHQ replaces the spreadsheets and stitched-together tools that clubs and associations usually end up relying on. This one was design only, no build: the job was to get the file precise enough that an in-house engineering team could work from it directly.",
    approach: [
      "Designed dashboard layouts for managing membership, payments, and communication from a single view.",
      "Built out marketing surfaces that match the product's own visual language, so the site and the product feel like the same thing.",
      "Mapped the onboarding flow end to end, cutting the steps between signing up and actually getting value from the platform.",
      "Delivered a structured Figma handoff (components, states, specs) so engineering could build from it without back-and-forth.",
    ],
    result:
      "A design file precise enough to hand straight to engineering, covering everything from onboarding through to daily use of the product.",
  },
  {
    n: '04',
    slug: 'parts-portal',
    title: ['Parts Portal: heavy-duty parts, ', 'online', '.'],
    category: 'Development',
    body: 'A custom Webflow build for an industrial auto-electrical supplier serving mining and earthmoving operators. Structured catalogue, custom wiring-harness enquiries, and a clean CMS the team can run themselves.',
    tags: ['Webflow', 'Custom', '2025'],
    laptop: '/images/parts-portal.png',
    mobile: '/images/partsportalmobile.png',
    url: 'https://www.partsportal.com.au/',
    metaTitle: 'Parts Portal: Webflow Development Case Study | Chloe Nixon',
    metaDescription:
      'A custom Webflow build for an industrial auto-electrical supplier: a structured parts catalogue, custom wiring-harness enquiries, and a CMS the team runs themselves.',
    overview:
      "Parts Portal supplies auto-electrical parts to mining and earthmoving operators. Their customers know exactly what part they need and want to find it fast, not browse a lifestyle catalogue.",
    approach: [
      "Structured the catalogue for quick, specific lookups rather than the usual browse-and-discover e-commerce pattern.",
      "Built a custom wiring-harness enquiry flow so customers with non-standard requirements can request a quote instead of picking up the phone.",
      "Set up the CMS so the operations team maintains stock, categories, and specs on their own.",
    ],
    result:
      "A working tool for an industrial buyer rather than a marketing site pretending to be one, quick to search and simple for the team to keep current.",
  },
  {
    n: '05',
    slug: 'slacker-apps',
    title: ["Slacker Apps: an app studio's ", 'home', '.'],
    category: 'Development',
    body: "A heavily customised Webflow template with bespoke components, built to showcase an immersive-tech studio's apps, VR, AR, and AI work for brands and venues. Easy to update in-house, with the complexity of a fully custom build.",
    tags: ['Webflow', 'Custom build', '2025'],
    laptop: '/images/slackerapps.png',
    mobile: '/images/slackermobile.webp',
    url: 'https://www.slackerapps.co.jp/',
    metaTitle: 'Slacker Apps: Webflow Custom Build Case Study | Chloe Nixon',
    metaDescription:
      "A heavily customised Webflow build with bespoke components, showcasing an immersive-tech studio's apps, VR, AR, and AI work for brands and venues.",
    overview:
      "Slacker Apps builds VR, AR, and AI experiences for brands and venues, work that's visually rich and genuinely hard to represent well on a static page.",
    approach: [
      "Started from a Webflow template and rebuilt the components until it was effectively bespoke.",
      "Designed layouts that let motion-heavy, immersive work still read clearly as static images and video.",
      "Kept the CMS simple enough for the studio to add new projects themselves without losing the custom feel.",
    ],
    result:
      "A site that looks fully custom but stays as easy to update as Webflow, built to keep pace with a studio that ships new work often.",
  },
  {
    n: '06',
    slug: 'turba-media',
    title: ['Turba Media: an AI marketing platform, ', 'scaled', '.'],
    category: 'Design & Development',
    body: 'An enterprise Webflow build for an AI-powered audience intelligence and ad-automation platform. Custom modules for case studies, integrations, and live demos, built to scale across dozens of pages, fully editable by their team.',
    tags: ['Webflow', 'Enterprise', '2025'],
    laptop: '/images/turba-media.png',
    mobile: '/images/turbamediamobile.png',
    url: 'https://www.turbamedia.io/',
    metaTitle: 'Turba Media: Enterprise Webflow Build Case Study | Chloe Nixon',
    metaDescription:
      'An enterprise Webflow build for an AI-powered ad-automation platform, with custom modules for case studies, integrations, and live demos, built to scale across dozens of pages.',
    overview:
      "Turba Media is an AI-powered audience intelligence and ad-automation platform with a lot of content to manage: case studies, integration pages, demos, all of it needing to multiply cleanly rather than just work once at launch.",
    approach: [
      "Built custom modules for case studies, integrations, and live demos designed to be duplicated across dozens of pages without drifting apart visually.",
      "Structured the CMS and components so the team adds new integration and case-study pages without needing a developer.",
      "Optimised for consistency at scale: the same modules need to look right whether the team publishes 10 pages or 100.",
    ],
    result:
      "A build made to scale with the business rather than just launch day, fully editable by the Turba Media team as their content library grows.",
  },
  {
    n: '07',
    slug: 'tuckbox',
    title: ['Tuckbox: custom cabinetry, built to ', 'showcase', '.'],
    category: 'Development',
    body: "A Webflow build for a custom cabinetry business, delivered in partnership with Multiply Digital. Heavy custom code throughout, with signature cut-edge visuals created using custom clip-path styling that stays crisp at every breakpoint, alongside a structured CMS, horizontal scroll sliders and custom pagination, a fast, scalable site the team can manage with ease.",
    tags: ['Webflow', 'Custom code', '2026'],
    laptop: '/tuckbox-laptop.jpeg',
    mobile: '/tuckbox-iphone.jpeg',
    url: 'https://www.tuckbox.com.au/',
    metaTitle: 'Tuckbox: Webflow Development Case Study | Chloe Nixon',
    metaDescription:
      'A Webflow build for a custom cabinetry business, with signature cut-edge clip-path visuals, a structured CMS, and horizontal scroll sliders, fast and easy for the team to manage.',
    overview:
      "Tuckbox is a custom cabinetry business whose actual work is craft-led and precise. The site needed to carry that same feeling. This one was delivered in partnership with Multiply Digital.",
    approach: [
      "Built the signature cut-edge visuals with custom clip-path styling, tested to stay crisp at every breakpoint rather than just the design mockup size.",
      "Structured the CMS so the team adds projects and updates content without needing a developer.",
      "Added horizontal scroll sliders and custom pagination so cabinetry work can be browsed like a gallery rather than a static grid.",
    ],
    result:
      "A fast, scalable site that reads as fully custom at every screen size, and stays simple for the team to manage day to day.",
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((w) => w.slug === slug);
}

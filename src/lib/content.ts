export const site = {
  name: "Serene Sheikhalard",
  shortName: "S. Sheikhalard",
  email: "serenesheikh23@gmail.com",
  linkedin: "https://www.linkedin.com/in/serene-sheikhalard",
  github: "https://github.com/serenesheikh23",
  cv: "/Serene_Sheikhalard_Software_Engineer.pdf",
  cvName: "Serene_Sheikhalard_Software_Engineer.pdf",
  location: "Irving, Texas",
  market: "Dallas–Fort Worth",
  availability: "Entry-level software engineer · Dallas–Fort Worth · Open to relocation",
  education: "BS Information Technology, graduated June 2026",
  school: "International University of Science and Technology",
  languages: "Arabic (native) · English (native)",
  url: "https://serene-sheikhalard-portfolio.vercel.app",
  description:
    "Entry-level software engineer building fast, accessible React and Next.js interfaces with Laravel backends. Based in Dallas–Fort Worth, open to relocation. Selected work: Marketly, Ismail Cosmetics, Code Craft, and drama.gov.sy.",
};

export type ProjectVisual = "marketly" | "ismail" | "codecraft" | "madfox" | "light";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  metric: string;
  liveUrl: string;
  caseStudyId?: string;
  visual: ProjectVisual;
};

export const projects: Project[] = [
  {
    slug: "marketly",
    index: "01",
    title: "Marketly",
    subtitle: "Multi-role digital services store",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    summary:
      "A multi-role store with three payment gateways and webhooks that stay idempotent when a provider retries.",
    stack: ["Laravel 13", "React 19", "TypeScript", "MySQL", "Redis", "Docker"],
    metric: "86 API routes · 3 gateways · 66 PHPUnit tests",
    liveUrl: "https://marketlly.store",
    caseStudyId: "marketly",
    visual: "marketly",
  },
  {
    slug: "ismail",
    index: "02",
    title: "Ismail Cosmetics",
    subtitle: "One front end, two languages",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    summary:
      "An Arabic/English, RTL storefront and back office: 110 API routes, a 38-page React SPA, and mobile-wallet payments.",
    stack: ["Laravel", "React 19", "Redux Toolkit", "i18next", "Docker"],
    metric: "110 API routes · 38-page SPA · 24 models",
    liveUrl: "https://ismailcosmetics.com",
    caseStudyId: "ismail",
    visual: "ismail",
  },
  {
    slug: "codecraft",
    index: "03",
    title: "Code Craft",
    subtitle: "Agency site with a full CMS",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    summary:
      "A Next.js agency site with a 56-handler admin CMS, 36 pages, and a mobile LCP cut from 5.3s to 2.4s.",
    stack: ["Next.js 15", "TypeScript", "Prisma", "Turso", "NextAuth", "Vercel"],
    metric: "56 API handlers · 36 pages · LCP 5.3s → 2.4s",
    liveUrl: "https://codeeecrafttt.vercel.app",
    caseStudyId: "codecraft",
    visual: "codecraft",
  },
  {
    slug: "drama",
    index: "04",
    title: "drama.gov.sy",
    subtitle: "Government institutional CMS",
    role: "Front-End Developer Trainee at Mad Fox",
    period: "May 2025 – Mar 2026",
    summary:
      "The all-Arabic RTL CMS behind a live government site, with an admin dashboard covering every section and content field.",
    stack: ["Laravel", "Blade", "Tailwind", "RTL"],
    metric: "Live government CMS · Full admin dashboard",
    liveUrl: "https://drama.gov.sy/",
    caseStudyId: "madfox",
    visual: "madfox",
  },
  {
    slug: "light",
    index: "05",
    title: "Light Promo",
    subtitle: "Built independently at Mad Fox",
    role: "Independent build at Mad Fox",
    period: "May 2025 – Mar 2026",
    summary:
      "Built and launched independently from concept to live deployment, including its full admin dashboard.",
    stack: [],
    metric: "Concept → live · Full admin dashboard",
    liveUrl: "https://light-promo.com/",
    visual: "light",
  },
];

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  problem: string;
  decisions: string[];
  stack: string[];
  results: { value: string; label: string }[];
  liveUrl: string;
  visual: ProjectVisual;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "marketly",
    index: "01",
    title: "Marketly",
    subtitle: "Three gateways, one order lifecycle",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    problem:
      "A multi-role digital services store needed three payment routes that could fail independently. A webhook that arrives twice must not pay an order twice.",
    decisions: [
      "Designed a pluggable PaymentGatewayInterface so Binance Pay, USDT BEP-20, and a regional mobile wallet share one order lifecycle.",
      "Built idempotent webhook handlers around the interface, then covered auth, order lifecycle, VIP logic, webhooks, the partner API, and upstream integration with tests.",
      "Dockerized php-fpm, nginx, MySQL, Redis, and Reverb WebSockets, with GitHub Actions CI and a code-split React SPA.",
    ],
    stack: ["Laravel 13", "React 19", "TypeScript", "MySQL", "Redis", "Docker", "GitHub Actions"],
    results: [
      { value: "86", label: "API routes" },
      { value: "3", label: "payment gateways" },
      { value: "66", label: "PHPUnit test cases" },
      { value: "1,233", label: "lines across 11 feature files" },
    ],
    liveUrl: "https://marketlly.store",
    visual: "marketly",
  },
  {
    id: "ismail",
    index: "02",
    title: "Ismail Cosmetics",
    subtitle: "A bilingual store without two front ends",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    problem:
      "A cosmetics store needed a complete Arabic/English, RTL storefront and back office without maintaining a second front end.",
    decisions: [
      "Used i18next for locale switching and Redux Toolkit for cart, wishlist, and checkout state across a 38-page React SPA.",
      "Modeled the catalog and operations in 24 Eloquent models and 30 migrations, exposed through 110 API routes.",
      "Integrated ShamCash mobile-wallet payments server-side, keeping API credentials in config and handling the webhook callback.",
    ],
    stack: ["Laravel", "React 19", "Redux Toolkit", "i18next", "MySQL", "Docker"],
    results: [
      { value: "110", label: "API routes" },
      { value: "38", label: "page React SPA" },
      { value: "24", label: "Eloquent models" },
      { value: "30", label: "migrations" },
    ],
    liveUrl: "https://ismailcosmetics.com",
    visual: "ismail",
  },
  {
    id: "codecraft",
    index: "03",
    title: "Code Craft",
    subtitle: "An agency site its team can edit",
    role: "Freelance full-stack developer",
    period: "Apr 2026 – present",
    problem:
      "An agency needed to update its own site without a developer, while keeping the public pages fast on a phone.",
    decisions: [
      "Built a 56-handler admin CMS on 12 Prisma models, with JWT session auth through NextAuth and Resend for enquiries.",
      "Split the public site into 36 pages and 30 components, then tested the route handlers with 8 Vitest tests.",
      "Cut mobile LCP from 5.3s to 2.4s by converting images to WebP and loading the hero with priority.",
    ],
    stack: ["Next.js 15", "TypeScript", "Prisma", "Turso", "NextAuth", "Vitest", "Vercel"],
    results: [
      { value: "98 / 99", label: "Lighthouse performance, mobile / desktop" },
      { value: "2.4s", label: "mobile LCP, down from 5.3s" },
      { value: "56", label: "API handlers" },
      { value: "97", label: "mobile accessibility" },
    ],
    liveUrl: "https://codeeecrafttt.vercel.app",
    visual: "codecraft",
  },
  {
    id: "madfox",
    index: "04",
    title: "drama.gov.sy",
    subtitle: "An institutional CMS in Arabic, end to end",
    role: "Front-End Developer Trainee at Mad Fox",
    period: "May 2025 – Mar 2026",
    problem:
      "A government institution needed staff to manage every section and content field of an all-Arabic site.",
    decisions: [
      "Built the Laravel system end to end: Blade front end, controllers, Eloquent models, and full database CRUD.",
      "Delivered the all-Arabic RTL CMS with an admin dashboard covering every section and content field.",
      "Reviewed peer PRs before merge, fixed bugs, and improved system performance across the platform.",
    ],
    stack: ["Laravel", "Blade", "Tailwind", "HTML/CSS", "RTL"],
    results: [
      { value: "Live", label: "at drama.gov.sy" },
      { value: "Full", label: "admin dashboard" },
      { value: "RTL", label: "Arabic interface" },
      { value: "CMS", label: "full CRUD, no code" },
    ],
    liveUrl: "https://drama.gov.sy/",
    visual: "madfox",
  },
];

export const craft = [
  {
    id: "performance",
    title: "Performance",
    proof: "98 / 99",
    proofLabel: "Lighthouse performance, mobile / desktop",
    detail:
      "Code Craft ships at 98 mobile and 99 desktop. I cut mobile LCP from 5.3s to 2.4s by converting images to WebP and loading the hero with priority.",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    proof: "97",
    proofLabel: "mobile accessibility on Code Craft",
    detail:
      "Semantic structure, keyboard-operable controls, and visible focus are part of the build, not a pass at the end. Code Craft also scored 100 for best practices.",
  },
  {
    id: "responsive",
    title: "Responsive design",
    proof: "38",
    proofLabel: "pages in the Ismail Cosmetics React SPA",
    detail:
      "Ismail Cosmetics is a 38-page SPA with an Arabic/English RTL interface. Code Craft adds 36 Next.js pages. Both are built to reflow from a 360px phone to a wide desktop.",
  },
  {
    id: "state",
    title: "State management",
    proof: "Redux",
    proofLabel: "Toolkit + i18next across a 38-page SPA",
    detail:
      "Marketly and Ismail Cosmetics use React 19 and TypeScript. Ismail adds Redux Toolkit for cart, wishlist, and checkout state, with i18next handling locale switching.",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Test the parts that can break money",
    text: "Marketly carries 66 PHPUnit test cases across 11 feature files, covering auth, order lifecycle, VIP logic, webhooks, the partner API, and upstream integration.",
  },
  {
    num: "02",
    title: "Make the pipeline boring",
    text: "Dockerized php-fpm, nginx, MySQL, Redis, and Reverb, with GitHub Actions CI. Code Craft adds 8 Vitest route tests on top.",
  },
  {
    num: "03",
    title: "Review before merge",
    text: "At Mad Fox I reviewed peer PRs before merge, fixed bugs, and improved system performance across the platform.",
  },
  {
    num: "04",
    title: "Ship it, then keep it live",
    text: "Marketly, Ismail Cosmetics, Code Craft, the live drama.gov.sy CMS, and light-promo.com, deployed with Docker, Nginx, Vercel, and Railway.",
  },
];

export const stackGroups = [
  {
    title: "Interfaces",
    note: "The layer I want to keep doing.",
    items: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Vite",
      "i18next",
      "HTML/CSS",
    ],
  },
  {
    title: "APIs & data",
    note: "The layer that has to hold.",
    items: [
      "Laravel 13",
      "PHP",
      "Node.js",
      "REST APIs",
      "Sanctum",
      "NextAuth.js",
      "RBAC",
      "Eloquent",
      "Prisma",
      "MySQL",
      "Turso",
      "Redis",
      "WebSockets",
    ],
  },
  {
    title: "Shipping & quality",
    note: "How it gets out the door.",
    items: [
      "Docker",
      "Nginx",
      "GitHub Actions",
      "Vercel",
      "Railway",
      "Git",
      "PHPUnit",
      "Vitest",
      "Code review",
    ],
  },
  {
    title: "Foundations",
    note: "The vocabulary underneath.",
    items: [
      "SQL",
      "Blade",
      "MVC",
      "OOP",
      "Authentication",
      "REST/JSON",
      "Unit & feature testing",
      "CI/CD",
    ],
  },
];

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#case-studies", label: "Case studies" },
  { href: "#craft", label: "Craft" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const sectionLinks = [
  { id: "work", label: "Selected work", num: "01" },
  { id: "case-studies", label: "Case studies", num: "02" },
  { id: "craft", label: "Front-end craft", num: "03" },
  { id: "process", label: "How I work", num: "04" },
  { id: "stack", label: "Stack", num: "05" },
  { id: "about", label: "About", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
];

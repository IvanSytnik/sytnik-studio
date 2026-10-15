import type { Project } from "./types";

/**
 * Project registry — single source of truth for facts about my work.
 *
 * Copy (titles, summaries, case study text) lives in messages/*.json.
 * Media goes to /public/projects/<slug>/ once screenshots are ready;
 * until then `cover` stays undefined and the UI renders a neutral fallback.
 */
export const projects = [
  {
    slug: "restaurant-crm",
    tier: "flagship",
    status: "live",
    kind: "product",
    order: 1,
    published: true,
    links: {
      live: "https://restaurant-crm-ten.vercel.app/",
      repo: "https://github.com/IvanSytnik/restaurant-crm",
    },
    stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "next-intl",
      "Tailwind CSS",
      "Vercel",
    ],
    services: ["crm-systems", "business-websites"],
    media: {
      cover: "/projects/restaurant-crm/cover.webp",
      coverLight: "/projects/restaurant-crm/cover-light.webp",
      gallery: [
        {
          src: "/projects/restaurant-crm/floor-plan.webp",
          width: 1600,
          height: 1000,
        },
        {
          src: "/projects/restaurant-crm/booking.webp",
          width: 1600,
          height: 1000,
        },
      ],
    },
  },
  {
    slug: "dealradar",
    tier: "flagship",
    status: "live",
    kind: "product",
    order: 2,
    published: true,
    links: {
      live: "https://t.me/dealradar_austria_bot",
      repo: "https://github.com/IvanSytnik/dealradar",
    },
    stack: [
      "TypeScript",
      "Claude API",
      "AWS",
      "Terraform",
      "grammY",
      "SQLite",
      "Vitest",
      "Docker",
    ],
    services: ["bots-automation", "ai-integrations"],
    media: {
      cover: "/projects/dealradar/cover.webp",
      coverKind: "phones",
      phones: [
        "/projects/dealradar/phone-filter.webp",
        "/projects/dealradar/phone-analysis.webp",
        "/projects/dealradar/phone-report.webp",
      ],
      gallery: [
        {
          src: "/projects/dealradar/report-list.webp",
          width: 645,
          height: 1398,
        },
        {
          src: "/projects/dealradar/report-filters.webp",
          width: 645,
          height: 1398,
        },
      ],
    },
  },
  {
    slug: "styleme",
    tier: "flagship",
    status: "live",
    kind: "product",
    order: 3,
    published: true,
    links: {
      live: "https://styleme-second-v-web.vercel.app/",
      repo: "https://github.com/IvanSytnik/styleme",
    },
    stack: [
      "Next.js 16",
      "Replicate",
      "Express",
      "TypeScript",
      "Supabase",
      "Upstash Redis",
      "TanStack Query",
      "Playwright",
    ],
    services: ["ai-integrations"],
    media: {
      cover: "/projects/styleme/cover.webp",
      gallery: [
        { src: "/projects/styleme/upload.webp", width: 1600, height: 1000 },
      ],
    },
  },
  {
    slug: "englishlearn",
    tier: "flagship",
    status: "pre-launch",
    kind: "product",
    order: 4,
    published: true,
    links: {
      live: "https://english-learn-web-two.vercel.app/",
      repo: "https://github.com/IvanSytnik/english-learn",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Turborepo",
    ],
    services: ["ai-integrations"],
    media: {
      cover: "/projects/englishlearn/cover.webp",
      gallery: [],
    },
  },
  {
    // Neutral slug on purpose: presented as an engineering case,
    // never as a downloader service. No public bot link on this site,
    // even while the bot itself is in beta.
    slug: "media-processing-platform",
    tier: "compact",
    status: "beta",
    kind: "product",
    order: 3,
    published: true,
    links: {
      repo: "https://github.com/IvanSytnik/Universal-Media-Downloader",
      // video: add once the screen recording is uploaded
    },
    stack: [
      "Python",
      "aiogram",
      "Redis",
      "PostgreSQL",
      "arq",
      "SQLAlchemy",
      "FFmpeg",
      "Docker",
    ],
    services: ["bots-automation"],
    media: { gallery: [] },
  },
  {
    slug: "medconsult",
    tier: "compact",
    status: "delivered",
    kind: "client",
    order: 1,
    published: true,
    links: {
      live: "https://medconsult-pro.vercel.app/",
      repo: "https://github.com/IvanSytnik/medconsult-pro",
    },
    // TODO(ivan): verify — GitHub reports the repo as JavaScript.
    stack: ["React", "Node.js", "Tailwind CSS", "Telegram Bot API"],
    services: ["landing-pages"],
    media: { gallery: [] },
  },
  {
    slug: "shopsmart-ai",
    tier: "compact",
    status: "pre-launch",
    kind: "product",
    order: 4,
    published: true,
    links: {
      repo: "https://github.com/IvanSytnik/shopsmart-ai",
    },
    stack: ["React", "TypeScript", "FastAPI", "OpenAI API", "Docker"],
    services: ["ai-integrations"],
    media: { gallery: [] },
  },
  {
    slug: "pallet-sales",
    tier: "compact",
    status: "live",
    kind: "client",
    order: 2,
    // TODO(ivan): add live URL, repo and stack, then set published: true.
    published: false,
    links: {},
    stack: ["Telegram Bot API"],
    services: ["landing-pages", "bots-automation"],
    media: { gallery: [] },
  },
] as const satisfies readonly Project[];

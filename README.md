# Ivan Sytnik — Independent Web Studio

Portfolio & lead-generation site. Personal brand wrapped as a small independent studio.

## Current state — Pack #14 (Launch prep)

Foundation + site shell:

- Configs, design tokens, i18n (4 locales), Drizzle/Neon, Resend, Analytics, fonts
- **Header** — sticky, transparent at top, off-white/dark with blur on scroll
- **Footer** — brand + sections + social (auto-hides empty links)
- **Theme switcher** — Light / Dark / System (dropdown, sun/moon trigger)
- **Language switcher** — EN / DE / UK / RU (dropdown with locale-aware router)
- **Mobile sheet** — hamburger → slide-in panel with nav, CTA, switchers
- **Landing placeholders** — `#projects`, `#services`, `#process`, `#contact` so nav scrolls somewhere until real sections ship

Pack #3:

- **CI** — GitHub Actions: typecheck, lint, build on push/PR to `main`
- **robots.txt + sitemap.xml** — sitemap with hreflang alternates for all locales
- **Indexing gate** — site is noindex (meta + robots.txt) until `NEXT_PUBLIC_ALLOW_INDEXING=true`

Pre-Pack #4 fixes (see `docs/STATUS.md`):

- `next` 15.5.26 (security advisories), `drizzle-orm` 0.45.2 / `drizzle-kit` 0.31.10 (security advisory)
- `next-intl` v4 (open-redirect advisory); messages inherited by `NextIntlClientProvider`, typed locales via `src/types/next-intl.d.ts`
- Locale pages statically prerendered (`setRequestLocale` in the locale layout)
- Real feature folders under `src/features/`

Pack #4 — projects data layer (no UI yet):

- `src/features/projects/` — `types.ts`, `data.ts` (registry), `queries.ts` (read API used by all sections/pages)
- Project copy in `messages/*.json` under `projects.items.<slug>`; slugs are typed from `en.json`, so a project without copy fails typecheck
- English fallback for untranslated keys in DE/UK/RU (`src/i18n/request.ts` + `src/lib/deep-merge.ts`)
- Only client-used namespaces (`nav`, `theme`, `language`) are serialized to the browser
- Service ids shared in `src/types/service.ts`; GitHub + LinkedIn filled in `brand.ts`

Pack #5 — Hero:

- `src/features/hero/` — typographic hero, Server Components only (no client JS); stats computed from the project registry and locales
- Hero copy in all four locales (ICU plurals for stat labels)
- CTA contrast fixed: `--accent-foreground` is graphite in light theme (6.3:1)

Pack #6 — Projects section:

- `src/features/projects/` — flagship rows (cover + story, alternating sides) and a compact "More work" list; Server Components
- Covers in `public/projects/<slug>/` (16:10 WebP); projects without a screenshot get a typographic cover
- Flagships are typed to require full case-study copy (`CaseStudySlug`)

Pack #7 — Case study pages:

- `/projects/[slug]` for flagships only (`dynamicParams = false` → other slugs 404), statically prerendered for all locales
- Context → problem → what I built → engineering highlights, sticky role/stack column, screenshot gallery, next project, contact CTA
- Per-page metadata: canonical, hreflang + x-default, Open Graph cover, CreativeWork JSON-LD; pages added to the sitemap

Pack #8 — About:

- `src/features/about/` — bio, facts (location, languages, education, clients), six reasons to work with me; copy in all four locales
- Portrait at `public/images/ivan-sytnik.webp` (4:5; replace the file to change the photo)

Pack #9 — Services:

- `src/features/services/` — five services with pitch, what's included and typical timeline; copy in all four locales
- Proof links come from the project registry (`getProjectsForService`): flagships link to their case study, smaller work to its live site

Pack #10 — Process + FAQ:

- `src/features/process/` — six numbered steps from intro call to 60 days of support
- `src/features/faq/` — eight questions on native `<details>` (no JS), FAQPage JSON-LD

Pack #11 — Contact form:

- Server Action `src/actions/contact.ts` + shared Zod schema; works without JavaScript
- Delivery to every configured channel in parallel (Neon, Resend email, Telegram); succeeds if at least one accepts the lead
- Spam protection: honeypot, minimum fill time, per-IP rate limit (best effort)
- All section placeholders are gone — the landing page is complete
- Setup: see `docs/CONTACT_SETUP.md`

Pack #12 — Contact brief (replaces the planned estimator):

- Three steps: what you need (chips + free text), budget & timeline (optional), preferred channel (email, Telegram, WhatsApp, phone) with per-channel validation
- Chips are real checkboxes/radios styled with `has-[:checked]` — works without JS, choices survive a failed submit
- Telegram notification includes a one-tap link to reply (t.me / wa.me)
- DB: `contact_method`, `contact_value` columns, brief stored in `estimator` jsonb — run `npm run db:push`

Pack #13 — Legal pages and conversion:

- `/impressum` and `/datenschutz` (German binding, English for other locales); details in `src/lib/legal.ts`, trade-licence fields appear once filled in
- Direct channels (Telegram, WhatsApp) in `brand.contact`: hero, contact section, footer, mid-page CTAs
- Mobile: sticky contact bar between hero and contact section, compact CTA in the header
- Section order: Services → Projects → Process → About → FAQ → Contact, with CTAs after Services and Projects
- Project covers and gallery in CSS device frames (`src/components/devices/`): laptop for web apps, phones for mobile/Telegram (`coverKind: "phones"` + `phones[]`)
- Footer: tagline, sections, contacts with visible handles, profiles, legal links and language

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. EN at `/`, others at `/de`, `/uk`, `/ru`.

## Verifying Pack #2

- [ ] Page loads at `/`, no 404
- [ ] Header visible: monogram `IS` + name + studio (sm+); 4 nav links (md+); language + theme + accent CTA
- [ ] Mobile (resize narrow): nav collapses to hamburger → slide-in sheet
- [ ] Scroll page → header gets a subtle border + blur
- [ ] Click nav `Services` / `Process` / etc → smooth-scrolls to the matching placeholder section
- [ ] Theme switcher: Light / Dark / System work, icon flips
- [ ] Language switcher: changing to DE goes to `/de`; from `/de` back to EN goes to `/`
- [ ] Footer: brand + tagline + Sections column; "Elsewhere" hidden because all social URLs are empty
- [ ] No errors in console or terminal

## Stack

Next.js 15.5.26 · React 19.2.6 · TypeScript strict · Tailwind 3 · next-intl 4 · next-themes · Drizzle ORM + Neon Postgres · Resend · Vercel Analytics · Inter + JetBrains Mono · react-icons · framer-motion · react-hook-form + zod

## Folder structure

```
src/
  app/
    [locale]/
      layout.tsx               # html, fonts, header + main + footer
      page.tsx                 # landing skeleton + section placeholders
      projects/[slug]/         # reserved for project case studies
    globals.css                # design tokens
    icon.svg                   # IS monogram favicon
  components/
    layout/
      container.tsx            # max-width + gutters
      brand-mark.tsx           # logo: IS monogram + wordmark
      site-header.tsx          # sticky header
      site-footer.tsx          # footer (3 zones, hides empty social)
      mobile-nav.tsx           # hamburger + sheet
      theme-switcher.tsx
      language-switcher.tsx
    providers/theme-provider.tsx
    ui/                        # button, dropdown-menu, sheet
  features/                    # hero, services, ... — reserved for future packs
  lib/
    brand.ts                   # SSOT for identity
    nav.ts                     # nav items registry
    env.ts utils.ts
  db/
    schema.ts client.ts        # Drizzle + Neon
  i18n/
    routing.ts request.ts
  middleware.ts                # i18n locale routing
messages/
  en.json de.json uk.json ru.json
```

## Branding rules

This is a **hybrid** product — solo developer wrapped as a studio. Never present as a multi-person team. Copy is first-person ("I"). Studio name is a brand wrapper only. Configured centrally in `src/lib/brand.ts`.

## Scripts

| Script               | What it does                |
| -------------------- | --------------------------- |
| `npm run dev`        | Dev server                  |
| `npm run build`      | Production build            |
| `npm run start`      | Serve production build      |
| `npm run lint`       | ESLint                      |
| `npm run typecheck`  | `tsc --noEmit`              |
| `npm run format`     | Prettier write              |
| `npm run db:push`    | Push schema to Neon         |
| `npm run db:studio`  | Open Drizzle Studio         |

Pack #14 — Launch prep:

- Localized `title`/`description` per locale (`messages/*.json → meta`), canonical + hreflang on every page
- Open Graph images generated at build time with `next/og` (home per locale, every case study); Inter with Cyrillic bundled in `src/assets/fonts`
- Homepage JSON-LD (`Person` + `ProfessionalService`, Graz address)
- Localized 404 (`[locale]/not-found.tsx` + catch-all route)
- Lint: ESLint CLI with flat config (`eslint.config.mjs`), `next lint` removed
- Lighthouse (mobile, local): Performance 90+, Accessibility 100, Best Practices 96; SEO is 100 once indexing is enabled

Pack #15 — Business set up as a Ukrainian sole proprietorship (FOP):

- `src/lib/legal.ts` holds the FOP details (register number, address, tax group); `isLegalComplete` must be true before enabling indexing
- Legal notice (`/impressum`) and privacy policy in Ukrainian, German and English; Russian shows English
- Copy no longer names a city: "remote, Europe"; invoices in EUR/USD, reverse charge for EU B2B mentioned in the FAQ
- Visitors from Ukraine (Vercel `x-vercel-ip-country`) get `/uk` by default on first visit (Law "On the State Language", art. 27)

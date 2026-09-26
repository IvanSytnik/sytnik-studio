# Ivan Sytnik — Independent Web Studio

Portfolio & lead-generation site. Personal brand wrapped as a small independent studio.

## Current state — Pack #4 (Projects data layer)

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

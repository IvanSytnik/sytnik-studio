# Repository status — audit 2026-09-26

Audited at commit `5eb46c0` (only commit on `main`, working tree clean). Node 22.23.1 / npm 10.9.8 locally; CI uses Node 20.

## 1. Summary

- **Real state:** Packs #1–#3 are done in substance (skeleton, shell, CI, robots, sitemap, indexing gate), all in one commit. Pack #4+ has not started: no project data, no feature sections, `/projects/[slug]` is an empty folder, no `docs/ROADMAP.md`.
- **Health:** `npm ci`, typecheck, lint and build all pass, with no warnings from the project's own code.
- **Risk 1:** `next@15.5.18` has a **critical** advisory set. It includes RCE in the image optimizer when AVIF is enabled, which `next.config.ts` enables, and a Server Actions DoS, which matters for the planned contact form. A same-minor patch (`15.5.26`) fixes it.
- **Risk 2:** `next-intl@3.26.5` has an open-redirect advisory (fixed only in v4). `drizzle-orm@0.36.4` has a high SQL-identifier injection advisory (fixed in 0.45.2). Both should be settled before the DB and contact work.
- **Risk 3:** No Impressum or Datenschutz yet (required for an AT/DE commercial site). The light-theme accent CTA fails WCAG AA contrast (2.94:1). The mis-created literal `{…}` folders mean the `src/features/*` structure doesn't exist yet.

## 2. Pack checklist

| Pack | Planned scope | Actual state | Evidence |
|---|---|---|---|
| #1 Skeleton | Next 15, TS strict, Tailwind, i18n, themes, Drizzle/Neon, Resend, Analytics | **done** (Resend installed but unused so far) | `package.json`, `tsconfig.json`, `src/i18n/*`, `src/db/*`, `src/app/[locale]/layout.tsx:116` |
| #2 Site shell | Header, footer, mobile sheet, theme and language switchers | **done** | `src/components/layout/*`, `src/components/ui/*` |
| #3 CI + robots + sitemap + indexing gate | GH Actions typecheck/lint/build, `robots.ts`, `sitemap.ts`, noindex gate | **done** | `.github/workflows/ci.yml`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/env.ts:18` |
| #4 Projects data layer | Typed project data and content source | **missing** | `src/data/` holds only `.gitkeep`; `src/types/` holds only `.gitkeep` |
| Hero | Real hero section | **missing** (skeleton placeholder) | `src/app/[locale]/page.tsx:28` |
| Projects section | Featured projects grid | **missing** | placeholder only, `page.tsx:60` |
| Case studies `/projects/[slug]` | Dynamic route + metadata | **missing** | folder has only `.gitkeep` |
| About / Services / Process + FAQ | Sections | **missing** | placeholders for services/process only; no about/faq |
| Contact | Server Action + Resend + Neon + Telegram | **missing** (schema only) | `src/actions/.gitkeep`, `src/db/schema.ts` |
| Estimator | Form + persistence | **missing** (a `jsonb` column only) | `src/db/schema.ts:16` |
| Legal | Impressum / Datenschutz | **missing** | no routes under `src/app/[locale]/` |
| Polish & launch | OG image, perf, a11y, indexing on | **missing** | `public/` is empty |

`README.md:5` still says "Current state — Pack #2"; Pack #3 work isn't reflected there.

## 3. Command results

| Command | Result | First error / note |
|---|---|---|
| `npm ci` | pass | 14 advisories over the full tree (6 moderate, 7 high, 1 critical) |
| `npm run typecheck` | pass (exit 0) | — |
| `npm run lint` | pass | "No ESLint warnings or errors". `next lint` prints a notice that it is deprecated and will be removed in Next 16 |
| `npm run build` | pass | 10 static pages generated; middleware 89.5 kB; shared first-load JS 103 kB. Note: `/[locale]` is listed as ● SSG, but `.next/prerender-manifest.json` contains no `/en`, `/de`, … entries and no locale HTML was emitted (see issues) |
| `npm audit --omit=dev` | **fail**: 6 vulnerabilities (1 critical, 4 high, 1 moderate) | `next` (critical), `postcss`, `sharp`, `nanoid` (high, transitive), `drizzle-orm` (high), `next-intl` (moderate) |
| `npm outdated` | informational | Patch/minor updates are available for Radix, react-hook-form, postcss and prettier. Majors are available (next 16, next-intl 4, zod 4, tailwind 4, …); none is needed except next-intl 4 for its security fix |

Security notes on the core packages:
- **next 15.5.18:** GHSA-2xp9-vwfh-vxw4 (RCE in the image optimizer with AVIF; `next.config.ts:10` enables `image/avif`), GHSA-m99w-x7hq-7vfj (Server Actions DoS), SSRF and cache-confusion advisories, among others. `npm audit` names `next@15.5.26` as the fix. The version is pinned exactly in `package.json`, so the pin has to be bumped by hand; same for `eslint-config-next`.
- **react 19.2.6:** no advisories reported by `npm audit`.
- **next-intl 3.26.5:** GHSA-8f24-v5vv-gm5j (open redirect). It affects `<=4.9.1`, so there is no 3.x fix. This is a concrete reason to plan a v4 migration.

## 4. Issues

| Sev | Area | File:line | Problem | Suggested fix |
|---|---|---|---|---|
| blocker | Security | `package.json:30` | `next@15.5.18` has a critical advisory set, including AVIF-optimizer RCE (AVIF is enabled) and Server Actions DoS, before the Server Action contact form ships | Bump `next` and `eslint-config-next` to 15.5.26 or later on the 15.5 line. |
| high | Security | `package.json:31` | `next-intl@3.26.5` open redirect (GHSA-8f24-v5vv-gm5j); fix exists only in v4 | Schedule the next-intl v4 migration (small surface: `routing.ts`, `request.ts`, `middleware.ts`) before launch. |
| high | Security / Data | `package.json:28` | `drizzle-orm@0.36.4` has a high SQL-injection advisory (fix in 0.45.2, pre-1.0 breaking) | Upgrade `drizzle-orm` and `drizzle-kit` together before writing the first queries. |
| high | Legal | `src/app/[locale]/` | No Impressum (§5 DDG / §5 ECG) and no Datenschutz page. No consent text exists for the planned forms | Add a Legal pack before any public (indexable) launch; link both from the footer. |
| high | Structure | `src/features/{hero,…,footer}/.gitkeep` | Literal brace-named directory is committed (shell brace expansion didn't run). No real feature folders exist | Delete it and create the real `src/features/<name>/` folders. |
| medium | Structure | `src/components/{ui,providers,layout}` | Empty literal brace-named directory (untracked, local only) | Delete it. |
| medium | Rendering | `src/app/[locale]/layout.tsx:99` | The layout calls `getMessages()` without `setRequestLocale(locale)`. Locale pages are absent from the prerender manifest, so they are likely rendered dynamically | Call `setRequestLocale(locale)` in the layout before any next-intl server API, then re-check the manifest. |
| medium | A11y | `src/app/globals.css:20-21` | Light theme: accent-foreground on accent is 2.94:1 (CTA text fails AA 4.5:1). The accent focus ring on the background is 2.94:1 (< 3:1) | Darken the light `--accent`, or use dark text on the accent. |
| medium | SEO | `src/app/[locale]/layout.tsx:43` | Metadata is static English: no `alternates.canonical`, no hreflang `alternates.languages`, no `x-default`, not localized per locale | Switch to `generateMetadata({ params })` with localized title/description and alternates. |
| medium | SEO | `src/lib/brand.ts:20`, `public/` | `ogImage: "/og.png"` is defined but not used in metadata, and the file doesn't exist. No OG or Twitter image is served | Add `opengraph-image` (file or route) and reference it. |
| medium | Config | `src/lib/env.ts:2` | `siteUrl` silently falls back to `http://localhost:3000`, so a production deploy missing the var yields localhost canonical URLs, sitemap and `metadataBase` | Fail the build (or warn) when `NEXT_PUBLIC_SITE_URL` is unset in production. |
| medium | Config | `src/lib/env.ts:1` | No validation of env vars (zod is installed). `NEXT_PUBLIC_ALLOW_INDEXING` is read outside the `env` object. `.env.local` lacks `NEXT_PUBLIC_ALLOW_INDEXING` (the default noindex is safe) | Validate env with a zod schema that includes the indexing flag. |
| medium | Data | `src/db/schema.ts:10` | No `status` field for the lead workflow, no consent flag or timestamp, no index on `created_at`/`email`, no spam/honeypot marker | Add `status`, `consentAt` and a `created_at` index when building Contact. |
| medium | i18n | `src/app/[locale]/page.tsx:38,81`; `src/components/layout/site-header.tsx:55`; `src/components/ui/sheet.tsx:58` | Hard-coded English: "skeleton", "Placeholder…", `aria-label="Main"`, `aria-label="Close"` | Move them to messages (`nav.closeMenu` already exists but is unused). |
| medium | Tooling | `package.json:11`, `.eslintrc.json` | `next lint` is deprecated (removed in Next 16), and the config is legacy eslintrc on ESLint 9 | Migrate to the ESLint CLI with a flat config (`@next/codemod next-lint-to-eslint-cli`) when convenient. |
| low | Architecture | `src/components/layout/site-header.tsx:1` | The whole header is a Client Component only for the `scrolled` flag, which pulls `BrandMark`, `Container` and nav links into the client bundle | Split into a server header plus a small client scroll-state wrapper. |
| low | A11y | `src/app/[locale]/layout.tsx:108` | No skip-to-content link. Radix handles focus in the mobile sheet | Add a skip link targeting `<main id>`. |
| low | A11y / UX | `src/components/layout/site-header.tsx:82`, `mobile-nav.tsx:68` | On mobile, `ThemeSwitcher` appears both in the header and inside the sheet | Keep one. |
| low | SEO | `src/app/robots.ts:14` | `host` is given as a full URL (expects a hostname); non-standard and ignored by Google | Drop `host` or pass the bare hostname. |
| low | SEO | `src/app/sitemap.ts:17` | `lastModified: new Date()` changes on every build | Use content dates once projects exist. |
| low | i18n | `messages/*.json` | Keys match across all 4 locales (no missing or extra). Unused keys: `brand.name`, `brand.studio`, `nav.closeMenu` | Use them or remove them. |
| low | Docs | `README.md:5` | README says Pack #2; `docs/ROADMAP.md` doesn't exist | Update the README and add the roadmap file. |
| low | CI | `.github/workflows/ci.yml:33` | CI runs Node 20 while local is 22; there is no audit or format check step | Align the Node version; consider `npm audit --omit=dev --audit-level=high`. |

## 5. Ready for Pack #4?

**Yes, conditionally.** Pack #4 (data layer) doesn't depend on the open issues, but do these first (all small):
1. Bump `next` and `eslint-config-next` to the patched 15.5.x (critical advisory; AVIF optimizer is enabled).
2. Remove the literal `{…}` directories and create the real `src/features/*` folders that Pack #4+ will populate.
3. Add `setRequestLocale` in `[locale]/layout.tsx` and confirm the locale pages prerender, before adding `/projects/[slug]` with `generateStaticParams`.
4. Decide on the drizzle-orm and next-intl v4 upgrades now, rather than after the contact and DB code is written against the old APIs.

## 6. Unverified

- **Runtime behaviour** (dev server not started, per the read-only scope): the language switcher round trip with `localePrefix: "as-needed"` (e.g. `/de` → EN lands on `/` and isn't redirected back by the `NEXT_LOCALE` cookie), header scroll state, and sheet focus trap/return.
- **Why the locale pages are missing from the prerender manifest:** the missing `setRequestLocale` is the most likely cause but wasn't confirmed by testing a fix.
- **Vercel Analytics data collection:** from the package's public documentation it is cookieless and collects page views, referrer, country and device/browser. Not verified against the deployed project settings or Vercel dashboard.
- **Vercel production env vars** (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING`): not accessible.
- **CI run history on GitHub:** not queried.
- **Contrast** was computed from the HSL tokens (WCAG formula), not measured in a browser. Dark theme passes (fg/bg 18.1, muted 7.65, accent 7.09).
- **Heading order** was checked statically on the home page only: h1 hero → h2 placeholders → h2 footer. The `_not-found` page renders Next's default `<html>` without `lang` (there is no root layout or `[locale]/not-found.tsx`).

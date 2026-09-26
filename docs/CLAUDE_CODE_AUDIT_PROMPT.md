# Claude Code — status audit prompt

Paste everything below the line into Claude Code, run from the repo root (`sytnik-studio/`).
It is read-only except for one report file.

---

You are a senior Next.js engineer auditing this repository to establish exactly what state it is in
before the next development pack. Be factual: every claim must come from a file you read or a command
you ran. If you cannot verify something, write "unverified".

## Hard rules
- READ-ONLY. Do not modify, create, delete, format or commit any file, except writing the final report to `docs/STATUS.md`.
- Do not install new packages. `npm ci` is allowed.
- Do not run `db:push` or anything that touches a remote database or sends email.
- Do not "fix while you're there". List problems; don't solve them.

## Context
- Portfolio + lead-generation site: "Ivan Sytnik — Independent Web Studio". Solo developer presented as a small studio; copy is always first person, never a team.
- Stack: Next.js 15 App Router, React 19, TypeScript strict, Tailwind 3, next-intl (en default without prefix, de/uk/ru), next-themes, Drizzle + Neon, Resend, Vercel Analytics, framer-motion, react-hook-form + zod.
- Work is delivered in "packs". Packs #1–#3 are believed done: skeleton, site shell, CI + robots + sitemap + indexing gate.
- Planned next: Pack #4 projects data layer, then Hero, Projects section, case study pages `/projects/[slug]`, About, Services, Process + FAQ, Contact (Server Action + Resend + Neon + Telegram), Estimator, Legal (Impressum/Datenschutz), Polish & launch.
- Read `docs/ROADMAP.md` if it exists and compare the repo against it.

## Steps
1. Inventory: `git log --oneline -20`, `git status`, tree of `src/`, `messages/`, `public/`. Note empty or placeholder folders and anything that looks mis-created (e.g. literal `{a,b,c}` directory names).
2. Health: run `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`. Record pass/fail and the exact first error of each failure.
3. Dependencies: `npm outdated` and `npm audit --omit=dev`. For `next`, `react`, `next-intl`, check whether the installed version has known security advisories. Flag only what matters; don't recommend major upgrades without a concrete reason.
4. Config review: `tsconfig.json` (strict flags), `next.config.ts`, `tailwind.config.ts`, `.eslintrc.json`, `middleware.ts` location and matcher, `.github/workflows/ci.yml`, `.env.example` vs `src/lib/env.ts`.
5. Architecture: Server vs Client Components — list every `"use client"` file and whether it needs to be one. Check the `src/features` / `components` / `lib` split matches the feature-based structure.
6. i18n: compare keys across `messages/*.json` (missing/extra keys per locale), hard-coded user-facing strings in components, `lang` attribute, locale switcher behaviour with `localePrefix: "as-needed"`.
7. SEO: metadata in `app/[locale]/layout.tsx`, `robots.ts`, `sitemap.ts`, hreflang, canonical, OG/Twitter images (do referenced files exist in `public/`?), `brand.ts` values.
8. Accessibility (static review): landmarks, heading order, `aria-*` on header/menu/switchers, focus handling in the mobile sheet, colour tokens contrast in `globals.css` (light and dark).
9. Legal/compliance for an AT/DE commercial site: presence of Impressum, Datenschutz, form consent; what data Analytics collects.
10. Data layer: `src/db/schema.ts` vs the planned contact + estimator forms. Is anything missing (e.g. status/lead fields, indexes)? Keep it minimal.

## Output — write `docs/STATUS.md` with exactly these sections
1. **Summary** — 5 lines max: which pack the repo is really at, whether it builds, top 3 risks.
2. **Pack checklist** — table: Pack · planned scope · actual state (done / partial / missing) · evidence (file path or command).
3. **Command results** — typecheck, lint, build, audit: pass/fail + first error.
4. **Issues** — table: severity (blocker / high / medium / low) · area · file:line · problem · suggested fix in one sentence. Sort by severity.
5. **Ready for Pack #4?** — yes/no + the minimal list of things to fix first.
6. **Unverified** — anything you could not check and why.

Keep the report under ~200 lines. No code patches in the report. When done, print the Summary section in the terminal as well.

# Roadmap — Ivan Sytnik · Independent Web Studio

> Living document. Update the status column after every pack.
> Workflow: one pack = one logical feature, approved before the next starts (see `WORKFLOW.md`).

## 1. Current state (verified against `main` @ `5eb46c0`, 2026-06-25)

| Pack | Scope | Status |
|---|---|---|
| #1 | Skeleton: Next.js 15.5, React 19, TS strict, Tailwind tokens, next-intl (EN/DE/UK/RU), next-themes, Drizzle + Neon, Resend, Vercel Analytics, fonts, brand layer | ✅ done |
| #2 | Site shell: sticky header, footer, theme + language switchers, mobile sheet, UI primitives, section placeholders | ✅ done |
| #3 | CI (typecheck · lint · build), `robots.ts`, `sitemap.ts` with hreflang, `NEXT_PUBLIC_ALLOW_INDEXING` gate | ✅ done |

Live on Vercel under `noindex`. Landing page still shows the "Skeleton is up" placeholder.

### Issues found in the repo (fix in Pack #4 as housekeeping)

1. **Broken feature folders.** `src/features/` contains one literal directory named
   `{hero,why-work-with-me,featured-projects,services,process,testimonials,contact,footer}` —
   shell brace expansion never ran. Delete it; each feature folder gets created by the pack that ships it.
2. **README is stale** — says "Pack #2", but CI/robots/sitemap from Pack #3 are already in.
3. **`/og.png` is referenced in `brand.ts` but `public/` is empty** → broken social previews.
4. **`brand.social` is empty** → footer "Elsewhere" block hidden. Fill GitHub + LinkedIn now.
5. **`brand.url = https://ivansytnik.com`** — confirm the domain is actually owned, otherwise canonical/OG URLs are wrong.
6. **`env.ts` has no validation** — missing Resend/DB keys silently become `""`. Add a Zod-validated server env when the contact pack lands (not earlier — no consumer yet).
7. **No Impressum / Datenschutzerklärung.** Mandatory for a commercial site targeting AT/DE
   (AT: §5 ECG + §25 MedienG; DE: §5 DDG) and for GDPR once the contact form stores data. Blocks launch.
8. **No spam protection planned** for the contact/estimator forms.

## 2. Pack plan to MVP launch

Order is deliberate: data before UI that depends on it; legal before indexing.

| # | Pack | Key deliverables | Depends on |
|---|---|---|---|
| 4 | **Projects data layer + housekeeping** | `src/features/projects/` types + registry (`slug`, `tier: flagship \| compact`, `status: live \| delivered \| pre-launch \| demo-video`, links, stack, cover asset paths), EN content keys, asset folder convention `public/projects/<slug>/`, fixes 1–5 above | — |
| 5 | **Hero** | Headline, value prop, 2 CTAs (Start a project / See work), photo slot, honest stat cards derived from the registry (project count, locales shipped, etc.) | 4 |
| 6 | **Featured Projects section** | Flagship cards (large, image, status badge, 3 tags, "Read case study") + compact "Client work" grid; Server Components only; `next/image` | 4 |
| 7 | **Case study pages** `/projects/[slug]` | Template: context → problem → what I built → engineering highlights → result → stack → links; `generateStaticParams`, per-page metadata, OG image, JSON-LD (`CreativeWork`), sitemap entries, prev/next navigation, CTA to contact | 4, 6 |
| 8 | **About + Why work with me** | Short first-person bio, 6 feature cards (direct communication, ownership, DACH timezone, etc.) | 5 |
| 9 | **Services** | 4–5 service cards, each linking to the matching case study as proof | 7 |
| 10 | **Process + FAQ** | 6-step timeline; FAQ with `FAQPage` JSON-LD | — |
| 11 | **Contact form** | Server Action, React Hook Form + Zod (shared schema), Resend email, Neon insert (`contact_submissions`), Telegram notification to my group via bot, honeypot + per-IP rate limit, loading/success/error states, validated server env | — |
| 12 | **Project estimator** | Multi-step questionnaire (type, timeline, budget, features, notes) writing into the existing `estimator` jsonb column; reuses Pack 11 pipeline | 11 |
| 13 | **Legal** | `/impressum`, `/datenschutz` (EN + DE), footer links, form consent line | 11 |
| 14 | **Polish & launch** | DE copy review, OG images, Lighthouse ≥95 on mobile, a11y pass (keyboard, contrast, reduced motion), 404 page, flip `NEXT_PUBLIC_ALLOW_INDEXING=true`, Google Search Console + sitemap submit | all |

Framer Motion enters in Pack 5 and stays limited to entrance/scroll reveals, all behind `prefers-reduced-motion`.

### After launch
- UK + RU translations (until then: recommended to hide them from the switcher, see open questions).
- Testimonials section — renders only when the testimonials array is non-empty; no fake placeholders.
- Blog / notes, CMS, lead dashboard — only if there is a real need.

## 3. Content track (runs in parallel with code packs)

Code is not the bottleneck — content is. Each project needs, before Pack 7:

- [ ] 1 cover image 1600×1000 (WebP) + 2–4 screenshots, desktop and mobile
- [ ] Case study copy (drafts in `docs/PROJECTS_CONTENT.md`)
- [ ] At least one verifiable result or number
- [ ] Links checked: live demo opens, repo is public and has a README with screenshots
- [ ] For UMD: 30–60 s screen recording (MP4/WebM, own or CC-licensed test content)

## 4. Definition of done (every pack)

- `npm run typecheck && npm run lint && npm run build` green; CI green
- Works in light/dark, EN/DE, 360 px → 1440 px
- No new client component without a reason stated in the pack
- No new dependency without a reason stated in the pack
- README "Current state" updated

## 5. Open questions

1. Launch with EN + DE only and hide UK/RU until translated? (Recommended: yes — a half-translated locale hurts more than a missing one.)
2. Is `ivansytnik.com` registered? If not: which domain?
3. Restaurant CRM — OK to say publicly that it runs in my own restaurant?
4. Pallet site — live URL, repo, stack, client or own project?
5. Telegram notification for new leads — same bot as the pallet site, or a new one?

# Projects & marketing content

Source copy for the Projects section, case study pages, services and hero proof points.
EN is the master; DE is translated from it in Pack 14. Everything marked `TODO` must be confirmed
before it ships — never publish a number or claim that cannot be backed up.

---

## 1. Positioning

**One-liner (hero):**
> I build websites and web apps that bring in customers — from landing pages to booking systems and AI features.

**Sub-line:**
> Independent developer based in Graz, Austria. You work directly with me — no account managers, no handoffs. Next.js, TypeScript, AI integrations.

**Who reads what:**

| Visitor | Wants to see | Proof on the site |
|---|---|---|
| Small business / restaurant (AT/DE) | "Will this bring me customers, and can I trust him?" | Restaurant CRM, pallet site, MedConsult, Impressum, German copy |
| Startup / Upwork client | Speed, product thinking, AI | StyleMe, EnglishLearn |
| Recruiter / tech lead | Code quality, architecture, testing | Case studies with engineering highlights + GitHub links, UMD |

**Copy rules**
- First person ("I built"), never "we" or "our team". Studio name is branding only.
- Business result first, engineering second. Tags and stack go at the end.
- Honest status on every project: `Live`, `Delivered`, `Pre-launch`, `Demo video`.
- No invented numbers, no "trusted by", no fake testimonials.

---

## 2. How the Projects section is structured

```
Home #projects
├── Section header: "Selected work" + one line
├── Flagship cards (4) — large, cover image, status badge, 1-line result, 3 tags, [Case study →]
│     Restaurant CRM · StyleMe · EnglishLearn · UMD
└── "Client & smaller work" grid (2+) — compact, no case study page, [Live] [Code]
      MedConsult Pro · Pallet sales site · (future work)

/projects/[slug]  (flagships only)
  Hero: title, one-line result, status, links, cover
  1. Context        — who it's for
  2. Problem        — what was broken or missing
  3. What I built   — features in plain language
  4. Engineering highlights — 3–5 bullets for technical readers
  5. Result         — honest outcome, numbers where verified
  6. My role · Stack · Timeline
  CTA: "Need something similar? Let's talk →"  + next/prev project
```

**Order of flagships:** Restaurant CRM (closest to paying clients) → StyleMe (live AI) → EnglishLearn → UMD.

**Registry fields (spec for Pack 4):** `slug`, `tier`, `status`, `year`, `role`, `liveUrl?`, `repoUrl?`, `videoUrl?`,
`stack[]`, `tags[]` (max 3 on card), `cover`, `gallery[]`, `services[]` (links a project to the services it proves).
All text lives in `messages/*.json` under `projects.<slug>.*`, not in the registry.

---

## 3. Flagship projects

### 3.1 Restaurant CRM & Booking Platform
- **slug:** `restaurant-crm` · **status:** Live · **services:** Business websites, CRM systems
- **Links:** live https://restaurant-crm-hwdr.vercel.app/de · repo https://github.com/IvanSytnik/restaurant-crm
- **Card:** *Booking system and CRM running daily in a restaurant in Graz.*
- **Tags:** Next.js · PostgreSQL · Booking

**Context.** A small restaurant with five tables needed online reservations, an editable menu and one place to manage guests — without paying a monthly SaaS fee and giving guest data to a third party.

**Problem.** Phone and ad-hoc bookings led to double-booked tables and no overview of the day. `TODO: confirm/adjust — was a paid booking tool replaced?`

**What I built.**
- Public website in German, English and Ukrainian: menu, promotions, gallery, online booking.
- Booking engine that picks the best-fitting table for the group size, respects visit length and a turnover buffer, and prevents conflicts.
- Admin CRM: reservations by day, table plan, menu and content editing, role-based access.

**Engineering highlights.**
- Allocation rules modelled explicitly: table capacities, 60/90-minute visits by group size, 15-minute buffers, last-slot cutoff.
- Credentials auth with JWT sessions; access checks enforced per protected page.
- next-intl with German as the mandatory source language and fallbacks for EN/UK.

**Result.** In daily use at the restaurant. `TODO: one real number — bookings per week / month, or share of online vs phone bookings.`

**Role:** sole developer and product owner · **Stack:** Next.js 15, TypeScript, Prisma, PostgreSQL (Neon), NextAuth, next-intl, Tailwind, Vercel

**SEO** — title: `Restaurant booking system & CRM — case study` · description: `How I built an online booking system, menu and CRM for a restaurant in Graz with Next.js and PostgreSQL.`

---

### 3.2 StyleMe — AI hairstyle try-on
- **slug:** `styleme` · **status:** Live (MVP) · **services:** AI integrations
- **Links:** live https://styleme-second-v-web.vercel.app/ · repo https://github.com/IvanSytnik/styleme-second_v
- **Card:** *Upload a selfie, see yourself with a new hairstyle in seconds.*
- **Tags:** AI · Next.js · SaaS

**Context.** People want to see a haircut on themselves before committing to it. A consumer AI product needs to be cheap per request and hard to abuse.

**What I built.** A full-stack web app: upload a photo, pick one of 40 preset styles, describe one in free text or upload a reference photo, get a generated result. Free daily quota plus extra credits earned by watching an ad.

**Engineering highlights.**
- Image generation via Replicate (Google's nano-banana model), with unit cost around $0.04 per generation built into the quota design.
- Quotas and rate limits enforced on the server (per IP and per user) in Redis — nothing trusted from the browser.
- Rewarded-ad credits protected against fraud: server-issued single-use nonce, minimum watch time, atomic redemption, and a calculated worst-case cost ceiling.
- Monorepo with a shared package as the single source of truth for types, Zod schemas and machine-readable error codes.
- Unit, contract and Playwright end-to-end tests in CI; 12 architecture decision records.

**Result.** First MVP is live and publicly usable. `TODO: any usage number if you have it; otherwise leave as is.`

**Role:** solo — product, full-stack, architecture, DevOps, security · **Stack:** Next.js 16, React 19, TypeScript, TanStack Query, Express, Supabase (Postgres + RLS), Upstash Redis, Replicate, Vercel, Railway

**SEO** — title: `StyleMe — AI hairstyle try-on app, case study` · description: `A full-stack AI image app with server-side quotas and fraud-resistant rewarded credits, built with Next.js and Replicate.`

---

### 3.3 EnglishLearn — adaptive learning platform
- **slug:** `englishlearn` · **status:** Pre-launch · **services:** AI integrations
- **Links:** repo https://github.com/IvanSytnik/english-learn · no live demo — screenshots only
- **Card:** *An English course that decides what you should practise next — based on a model of what you actually know.*
- **Tags:** EdTech · AI · TypeScript

**Context.** Most language apps show everyone the same sequence. I'm building a platform that adapts to each learner.

**What I'm building.** A learner model that estimates what the student knows, predicts what they're about to forget, and chooses the next exercise accordingly. Planned: AI tutor and diagnostic placement test.

**Engineering highlights.**
- Learner model combining Bayesian Knowledge Tracing, Item Response Theory, FSRS spaced repetition and Thompson Sampling.
- Turborepo monorepo, Prisma + PostgreSQL, Auth.js, four UI languages.
- Engine covered by an automated test suite (`TODO: current test count — last known 183`).

**Status (say it plainly on the page).** Pre-launch. The learning engine is built and tested; the student-facing app is in progress.

**Role:** technical co-founder, sole developer · **Stack:** Next.js, TypeScript, Prisma, PostgreSQL (Neon), Auth.js, Turborepo

⚠️ Never write "users", "launched" or "live" for this project.

---

### 3.4 Universal Media Downloader
- **slug:** `media-processing-platform` (neutral slug) · **status:** Demo video · **services:** Bots & automation
- **Links:** repo https://github.com/IvanSytnik/Universal-Media-Downloader · video `TODO` · **no public bot link**
- **Card:** *An asynchronous media-processing backend with a Telegram bot as its first client.*
- **Tags:** Python · Telegram · Architecture

**Context.** A Telegram bot that takes a link and sends back the processed media file — designed from day one as the core of a platform, not a one-off script.

**What I built.** Send a link → see live progress → receive the file in the chat, including files over 1 GB. Two interface languages.

**Engineering highlights.**
- Clean Architecture with ports & adapters: Telegram is just one adapter; a web or REST client can be added without touching the core.
- Heavy jobs run in a separate OS process that can be killed on timeout, so the bot never freezes.
- Live progress streamed through Redis pub/sub — the processing layer knows nothing about Telegram.
- Files up to 2 GB via a self-hosted Telegram Bot API server instead of the 50 MB public limit.
- Security by default: domain allowlist, no shell execution, sliding-window rate limiting. 181 tests, mypy strict.

**Role:** solo · **Stack:** Python 3.13, aiogram 3, arq, PostgreSQL, SQLAlchemy 2, Redis, FFmpeg, Docker Compose, GitHub Actions

⚠️ Wording guardrails: no platform names or logos (YouTube, TikTok, Instagram) in text, images or video; record the demo with your own or CC-licensed content; present it as an engineering case, not a service.

---

## 4. Client & smaller work (compact cards)

### MedConsult Pro
- **status:** Delivered · live https://medconsult-pro.vercel.app/ · repo https://github.com/IvanSytnik/medconsult-pro
- **Card:** *Service catalogue and multi-step consultation request flow for a medical tourism agency. Leads go straight to the agency's messaging channels.*
- **Tags:** Landing page · Lead funnel · Telegram
- `TODO: verify stack — GitHub shows the repo as JavaScript, so "TypeScript" may be wrong.` Don't write "live" or mention traffic.

### Pallet sales website
- **status:** `TODO` · live `TODO` · repo `TODO`
- **Draft card:** *Sales website for a pallet supplier. Every inquiry lands instantly in the team's Telegram group through a custom bot — no lead gets lost in an inbox.*
- **Tags:** Landing page · Telegram bot · Leads
- `TODO: client or own project? Is this nordpal-logistik-site? Stack? Any number (inquiries per month)?`

---

## 5. Services (each links to its proof)

| Service | Pitch (card text) | Proof |
|---|---|---|
| Landing pages | A fast one-pager that turns visitors into inquiries — delivered to your email and Telegram. | Pallet site, MedConsult |
| Business websites | Multilingual site with menu, booking or catalogue that you can edit yourself. | Restaurant CRM (public site) |
| CRM & booking systems | Replace spreadsheets and paid tools with a system built around how you actually work. | Restaurant CRM |
| AI integrations | Add image generation, assistants or smart recommendations to your product — with costs under control. | StyleMe, EnglishLearn |
| Bots & automation *(optional 5th)* | Telegram bots that notify, process and automate the boring parts. | UMD, pallet site |

## 6. Hero stat cards (honest only)

Derived from the registry, not hard-coded:
- `6` shipped projects
- `2` products live in production · `TODO` confirm
- `4` languages across my projects (DE / EN / UK / RU)
- `Graz, AT` · replies within 24 h

Avoid "years of experience", client counts and satisfaction rates until they're real.

## 7. Asset checklist per project

| Project | Cover | Screens | Video | Number | Repo README |
|---|---|---|---|---|---|
| Restaurant CRM | ☐ | ☐ public + admin | — | ☐ | ☐ |
| StyleMe | ☐ | ☐ before/after | ☐ optional | ☐ | ☐ |
| EnglishLearn | ☐ | ☐ | — | — | ☐ |
| UMD | ☐ | ☐ | ☐ required | — | ✅ |
| MedConsult | ☐ | ☐ | — | — | ☐ |
| Pallet site | ☐ | ☐ | — | ☐ | ☐ |

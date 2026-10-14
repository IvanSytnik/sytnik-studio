# Contact form — setup

Every channel is optional. The form delivers to whichever channels are configured
and reports success if at least one of them accepted the lead. With nothing
configured, development prints the lead to the terminal and production shows an error.

Set the variables in `.env.local` for development and in
**Vercel → Project → Settings → Environment Variables** (Production + Preview) for deploys.
Redeploy after changing them.

## 1. Telegram (instant notification)

1. Telegram → **@BotFather** → `/newbot` → pick a name and a username ending in `bot`.
   Copy the token → `TELEGRAM_BOT_TOKEN`.
2. Create a group (e.g. "Sytnik Studio — Leads"), add the bot to it.
3. Send any message in the group, then open
   `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser.
   Find `"chat":{"id":-100…}` → `TELEGRAM_CHAT_ID` (keep the minus sign).
   If the result is empty: BotFather → `/setprivacy` → your bot → **Disable**, then send a message again.

## 2. Resend (email)

1. resend.com → API Keys → create a key → `RESEND_API_KEY`.
2. Without a verified domain:
   `RESEND_FROM_EMAIL=onboarding@resend.dev` and `RESEND_TO_EMAIL` = **the email of your Resend account**
   (the test sender only delivers to that address).
3. Once the domain is bought: Resend → Domains → add it, set the DNS records,
   then `RESEND_FROM_EMAIL=hello@yourdomain.com` and any `RESEND_TO_EMAIL`.

Replying to a lead email replies to the visitor (`replyTo` is their address).

## 3. Neon (lead history, optional)

1. Vercel → Storage → **Create Database → Neon** (free tier), connect it to this project.
   Vercel adds `DATABASE_URL` automatically. Copy it into `.env.local` too.
2. Create the table once, from your machine:
   ```bash
   npm run db:push
   ```
3. Leads are in the `contact_submissions` table (`npm run db:studio` to browse).

## Test

```bash
npm run dev
```
Open `/#contact`, wait a few seconds (the form rejects submissions faster than 3 s),
send a message. You should get the Telegram notification and/or the email.

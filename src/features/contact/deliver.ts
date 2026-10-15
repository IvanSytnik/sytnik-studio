import { Resend } from "resend";

import { leadChannels } from "@/lib/server-env";
import type { ContactInput } from "./schema";

type Lead = ContactInput & { locale: string };

/**
 * Sends a lead to every configured channel in parallel. Succeeds if at
 * least one channel accepted it — a Telegram outage must not lose a lead
 * that already landed in the inbox, and vice versa.
 */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const jobs: Promise<unknown>[] = [];

  if (process.env.NODE_ENV !== "production") {
    const names = Object.entries(leadChannels)
      .filter(([, cfg]) => cfg)
      .map(([name]) => name);
    console.info(`[contact] channels: ${names.join(", ") || "none"}`);
  }

  if (leadChannels.database) jobs.push(saveToDatabase(lead));
  if (leadChannels.email) jobs.push(sendEmail(lead, leadChannels.email));
  if (leadChannels.telegram)
    jobs.push(sendTelegram(lead, leadChannels.telegram));

  if (jobs.length === 0) {
    // Nothing configured. In development, print the lead so the form can
    // be tested; in production, fail loudly without logging personal data.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] No delivery channel configured. Lead:", lead);
      return true;
    }
    console.error(
      "[contact] No delivery channel configured — lead not delivered."
    );
    return false;
  }

  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === "rejected")
      console.error("[contact] channel failed:", r.reason);
  });
  return results.some((r) => r.status === "fulfilled");
}

async function saveToDatabase(lead: Lead) {
  // Imported lazily so builds without DATABASE_URL never touch the driver.
  const { getDb, schema } = await import("@/db/client");
  await getDb()
    .insert(schema.contactSubmissions)
    .values({
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      message: lead.message,
      locale: lead.locale,
      source: "website",
    });
}

async function sendEmail(
  lead: Lead,
  cfg: { apiKey: string; from: string; to: string }
) {
  const resend = new Resend(cfg.apiKey);
  // Plain text only: visitor input never ends up as HTML in an inbox.
  const { error } = await resend.emails.send({
    from: cfg.from,
    to: cfg.to,
    replyTo: lead.email,
    subject: `New inquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      lead.company ? `Company: ${lead.company}` : null,
      `Language: ${lead.locale}`,
      "",
      lead.message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sendTelegram(
  lead: Lead,
  cfg: { token: string; chatId: string }
) {
  const text = [
    "<b>New inquiry</b>",
    `👤 ${escapeHtml(lead.name)}${lead.company ? ` · ${escapeHtml(lead.company)}` : ""}`,
    `✉️ ${escapeHtml(lead.email)}`,
    `🌐 ${lead.locale}`,
    "",
    escapeHtml(lead.message.slice(0, 3500)),
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${cfg.token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: cfg.chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    }
  );
  if (!res.ok) throw new Error(`Telegram: ${res.status} ${await res.text()}`);
}

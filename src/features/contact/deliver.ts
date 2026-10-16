import { Resend } from "resend";

import en from "../../../messages/en.json";
import { leadChannels } from "@/lib/server-env";
import type { ContactMethod } from "./options";
import type { ContactInput } from "./schema";

export type Lead = ContactInput & { locale: string };

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

const METHOD_LABEL: Record<ContactMethod, string> = {
  email: "Email",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  phone: "Phone",
};

/** Normalised handle and, where possible, a one-tap link to reply. */
function contactLink(method: ContactMethod, value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  switch (method) {
    case "telegram": {
      const handle = value.replace(/^@/, "");
      return { display: `@${handle}`, url: `https://t.me/${handle}` };
    }
    case "whatsapp":
      return { display: value, url: `https://wa.me/${digits}` };
    case "phone":
      return { display: value, url: null };
    default:
      return { display: value, url: `mailto:${value}` };
  }
}

/**
 * Human-readable labels for the brief, taken from the English copy so the
 * notification says "Not sure yet" instead of the internal id "notSure".
 */
const labels = en.contact.options;
const needsText = (lead: Lead) =>
  lead.needs.map((n) => labels.needs[n]).join(", ");
const budgetText = (lead: Lead) =>
  lead.budget ? labels.budget[lead.budget] : null;
const timelineText = (lead: Lead) =>
  lead.timeline ? labels.timeline[lead.timeline] : null;

/** Plain-text summary for the email. */
function summary(lead: Lead) {
  const { display, url } = contactLink(lead.method, lead.contact);
  return [
    `Name: ${lead.name}`,
    lead.company ? `Company: ${lead.company}` : null,
    `Contact via ${METHOD_LABEL[lead.method]}: ${display}`,
    url && !url.startsWith("mailto:") ? `Open: ${url}` : null,
    lead.needs.length ? `Needs: ${needsText(lead)}` : null,
    lead.budget ? `Budget: ${budgetText(lead)}` : null,
    lead.timeline ? `Timeline: ${timelineText(lead)}` : null,
    `Language: ${lead.locale}`,
    lead.message ? `\n${lead.message}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

async function saveToDatabase(lead: Lead) {
  // Imported lazily so builds without DATABASE_URL never touch the driver.
  const { getDb, schema } = await import("@/db/client");
  await getDb()
    .insert(schema.contactSubmissions)
    .values({
      name: lead.name,
      email: lead.method === "email" ? lead.contact : null,
      contactMethod: lead.method,
      contactValue: lead.contact,
      company: lead.company || null,
      message: lead.message,
      estimator: {
        needs: lead.needs,
        budget: lead.budget,
        timeline: lead.timeline,
      },
      locale: lead.locale,
      source: "website",
    });
}

function leadSubject(lead: Lead) {
  const { display } = contactLink(lead.method, lead.contact);
  const what = lead.needs.length ? needsText(lead) : "Inquiry";
  const time = new Date().toISOString().slice(11, 16);
  return `[Lead] ${what} · ${lead.name} (${display}) · ${lead.locale.toUpperCase()} · ${time} UTC`;
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
    ...(lead.method === "email" ? { replyTo: lead.contact } : {}),
    // Unique per lead (contact + time), so Gmail never folds new leads into
    // an older conversation thread where they are easy to miss.
    subject: leadSubject(lead),
    text: summary(lead),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function sendTelegram(
  lead: Lead,
  cfg: { token: string; chatId: string }
) {
  const { display, url } = contactLink(lead.method, lead.contact);
  const contactLine =
    url && !url.startsWith("mailto:")
      ? `<a href="${escapeHtml(url)}">${escapeHtml(display)}</a>`
      : escapeHtml(display);

  const text = [
    "<b>New inquiry</b>",
    `👤 ${escapeHtml(lead.name)}${lead.company ? ` · ${escapeHtml(lead.company)}` : ""}`,
    `💬 ${METHOD_LABEL[lead.method]}: ${contactLine}`,
    lead.needs.length ? `🧩 ${escapeHtml(needsText(lead))}` : null,
    lead.budget ? `💶 ${escapeHtml(budgetText(lead) ?? "")}` : null,
    lead.timeline ? `⏱ ${escapeHtml(timelineText(lead) ?? "")}` : null,
    `🌐 ${lead.locale}`,
    lead.message ? `\n${escapeHtml(lead.message.slice(0, 3000))}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

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

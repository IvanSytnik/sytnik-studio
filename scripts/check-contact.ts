/**
 * Contact-form delivery health check. Tests each lead channel on its own
 * and prints a summary table. Never prints secret values.
 *
 *   npx tsx scripts/check-contact.ts
 *
 * Sends one real Telegram message and one real email, and inserts +
 * deletes one row (source='healthcheck') in contact_submissions.
 */
import { loadEnvConfig } from "@next/env";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

loadEnvConfig(process.cwd(), true, { info: () => {}, error: console.error });

type Row = {
  channel: string;
  configured: string;
  result: "OK" | "FAIL" | "SKIP";
  error: string;
};

const env = (k: string) => {
  const v = process.env[k];
  return v === undefined || v === "" ? undefined : v;
};

const SECRETS = [
  "TELEGRAM_BOT_TOKEN",
  "RESEND_API_KEY",
  "DATABASE_URL",
].flatMap((k) => (env(k) ? [env(k)!] : []));

/** Removes any secret value that might appear inside an error message. */
const redact = (s: string) =>
  SECRETS.reduce((acc, secret) => acc.split(secret).join("<redacted>"), s);

const errText = (e: unknown) =>
  redact(e instanceof Error ? `${e.name}: ${e.message}` : String(e));

const configured = (keys: string[]) =>
  keys.every((k) => env(k))
    ? "yes"
    : `no (missing ${keys.filter((k) => !env(k)).join(", ")})`;

async function checkTelegram(): Promise<Row> {
  const keys = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];
  const row: Row = { channel: "telegram", configured: configured(keys), result: "SKIP", error: "" };
  if (row.configured !== "yes") return row;

  const token = env("TELEGRAM_BOT_TOKEN")!;
  const chatId = env("TELEGRAM_CHAT_ID")!;
  const api = (method: string) => `https://api.telegram.org/bot${token}/${method}`;

  try {
    const me = await fetch(api("getMe"), { signal: AbortSignal.timeout(8000) });
    const meBody = (await me.json()) as {
      ok: boolean;
      description?: string;
      result?: { username: string; can_read_all_group_messages: boolean };
    };
    if (!meBody.ok) {
      row.result = "FAIL";
      row.error = `getMe ${me.status}: ${meBody.description} — token is invalid or revoked; get a new one from @BotFather`;
      return row;
    }
    const bot = `@${meBody.result!.username}`;

    const res = await fetch(api("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: "Test from sytnik-studio" }),
      signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json()) as {
      ok: boolean;
      description?: string;
      parameters?: { migrate_to_chat_id?: number };
    };
    if (body.ok) {
      row.result = "OK";
      row.error = `bot ${bot}`;
      return row;
    }

    row.result = "FAIL";
    const desc = body.description ?? "";
    let hint = "";
    if (body.parameters?.migrate_to_chat_id) {
      hint = `group was upgraded to a supergroup — set TELEGRAM_CHAT_ID=${body.parameters.migrate_to_chat_id}`;
    } else if (/chat not found/i.test(desc)) {
      hint = `wrong chat id, or ${bot} was never added to that chat (groups: negative id; supergroups: -100…; DMs: you must /start the bot first)`;
    } else if (/kicked|not a member|bot was blocked/i.test(desc)) {
      hint = `${bot} is not in the chat (removed or blocked) — add it back to the group`;
    } else if (/not enough rights|have no rights/i.test(desc)) {
      hint = `${bot} lacks permission to post — in a channel make it admin; in a group allow members to send messages`;
    } else if (res.status === 403) {
      hint = `${bot} cannot write to this chat — re-add it to the group`;
    } else if (res.status === 400) {
      hint = "check TELEGRAM_CHAT_ID format";
    }
    if (meBody.result && !meBody.result.can_read_all_group_messages) {
      // Privacy mode only affects *reading* messages, not sending.
      hint += " (privacy mode is on — irrelevant for sending)";
    }
    row.error = `sendMessage ${res.status}: ${desc}${hint ? ` → ${hint}` : ""}`;
  } catch (e) {
    row.result = "FAIL";
    row.error = errText(e);
  }
  return row;
}

async function checkResend(): Promise<Row> {
  const keys = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "RESEND_TO_EMAIL"];
  const row: Row = { channel: "email (resend)", configured: configured(keys), result: "SKIP", error: "" };
  if (row.configured !== "yes") return row;

  try {
    const resend = new Resend(env("RESEND_API_KEY")!);
    const { data, error } = await resend.emails.send({
      from: env("RESEND_FROM_EMAIL")!,
      to: env("RESEND_TO_EMAIL")!,
      subject: "Test from sytnik-studio",
      text: "Contact-form delivery health check (scripts/check-contact.ts).",
    });
    if (error) {
      row.result = "FAIL";
      row.error = redact(`${error.name}: ${error.message}`);
    } else {
      row.result = "OK";
      row.error = `id ${data?.id} (check inbox and spam folder)`;
    }
  } catch (e) {
    row.result = "FAIL";
    row.error = errText(e);
  }
  return row;
}

async function checkDatabase(): Promise<Row> {
  const row: Row = { channel: "database (neon)", configured: configured(["DATABASE_URL"]), result: "SKIP", error: "" };
  if (row.configured !== "yes") return row;

  try {
    const sql = neon(env("DATABASE_URL")!);
    const inserted = (await sql`
      insert into contact_submissions (name, email, message, locale, source)
      values ('Healthcheck', 'healthcheck@example.com', 'check-contact.ts', 'en', 'healthcheck')
      returning id`) as { id: number }[];
    const id = inserted[0]!.id;
    const read = (await sql`select source from contact_submissions where id = ${id}`) as { source: string }[];
    await sql`delete from contact_submissions where id = ${id}`;
    if (read[0]?.source !== "healthcheck") throw new Error(`row ${id} not read back`);
    row.result = "OK";
    row.error = `insert/read/delete of row ${id}`;
  } catch (e) {
    row.result = "FAIL";
    row.error = errText(e);
  }
  return row;
}

async function main() {
  const rows = await Promise.all([checkDatabase(), checkResend(), checkTelegram()]);
  console.table(rows);
  process.exitCode = rows.some((r) => r.result === "FAIL") ? 1 : 0;
}

void main();

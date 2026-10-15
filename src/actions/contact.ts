"use server";

import { headers } from "next/headers";

import { deliverLead } from "@/features/contact/deliver";
import { isRateLimited } from "@/features/contact/rate-limit";
import {
  contactSchema,
  type ContactField,
  type ContactState,
} from "@/features/contact/schema";
import { routing } from "@/i18n/routing";

/** Humans need more than this to fill in the form; bots usually don't. */
const MIN_FILL_MS = 3000;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "");
const opt = (fd: FormData, key: string) => str(fd, key) || undefined;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: invisible to people, irresistible to bots. Pretend success.
  if (str(formData, "website").length > 0) return { status: "success" };

  const values = {
    message: str(formData, "message"),
    name: str(formData, "name"),
    contact: str(formData, "contact"),
    company: str(formData, "company"),
    needs: formData.getAll("needs").map(String),
    budget: opt(formData, "budget"),
    timeline: opt(formData, "timeline"),
    method: str(formData, "method") || "email",
  };

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", formError: "tooFast", values };
  }

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", fieldErrors, values };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip))
    return { status: "error", formError: "rateLimited", values };

  const requested = str(formData, "locale");
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? requested
    : routing.defaultLocale;

  const delivered = await deliverLead({ ...parsed.data, locale });
  return delivered
    ? { status: "success" }
    : { status: "error", formError: "deliveryFailed", values };
}

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

/** Humans need more than this to fill in a message; bots usually don't. */
const MIN_FILL_MS = 3000;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: invisible to people, irresistible to bots. Pretend success.
  if (String(formData.get("website") ?? "").length > 0)
    return { status: "success" };

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", formError: "tooFast", values: raw };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", fieldErrors, values: raw };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip))
    return { status: "error", formError: "rateLimited", values: raw };

  const requested = String(formData.get("locale") ?? "");
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? requested
    : routing.defaultLocale;

  const delivered = await deliverLead({ ...parsed.data, locale });
  return delivered
    ? { status: "success" }
    : { status: "error", formError: "deliveryFailed", values: raw };
}

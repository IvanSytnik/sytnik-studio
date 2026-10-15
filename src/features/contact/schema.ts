import { z } from "zod";

import { BUDGETS, CONTACT_METHODS, NEEDS, TIMELINES } from "./options";

export { BUDGETS, CONTACT_METHODS, NEEDS, TIMELINES };
export type { ContactMethod, Need } from "./options";

/**
 * Contact form contract, used by the Server Action. The form imports only
 * the types from here (no zod in the client bundle).
 * Error messages are translation keys under `contact.errors.*`.
 */
const TELEGRAM_RE = /^@?[A-Za-z0-9_]{5,32}$/;
const PHONE_RE = /^\+?[0-9][0-9 ()-]{6,19}$/;

export const contactSchema = z
  .object({
    needs: z.array(z.enum(NEEDS)).max(NEEDS.length),
    message: z.string().trim().max(4000, "message"),
    budget: z.enum(BUDGETS).optional(),
    timeline: z.enum(TIMELINES).optional(),
    name: z.string().trim().min(2, "name").max(120, "name"),
    method: z.enum(CONTACT_METHODS),
    contact: z.string().trim().max(254),
    company: z.string().trim().max(160, "company"),
  })
  .superRefine((v, ctx) => {
    if (v.needs.length === 0 && v.message.length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "needsOrMessage",
      });
    }
    const valid =
      v.method === "email"
        ? z.string().email().safeParse(v.contact).success
        : v.method === "telegram"
          ? TELEGRAM_RE.test(v.contact)
          : PHONE_RE.test(v.contact);
    if (!valid) {
      ctx.addIssue({
        code: "custom",
        path: ["contact"],
        message:
          v.method === "email"
            ? "contactEmail"
            : v.method === "telegram"
              ? "contactTelegram"
              : "contactPhone",
      });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "message" | "name" | "contact" | "company";

/** What the visitor entered, echoed back on error so nothing is lost. */
export type ContactValues = Partial<Record<ContactField, string>> & {
  needs?: string[];
  budget?: string;
  timeline?: string;
  method?: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      /** Translation key under contact.errors.* for a form-level message. */
      formError?: "rateLimited" | "deliveryFailed" | "tooFast";
      /** Field → translation key under contact.errors.* */
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: ContactValues;
    };

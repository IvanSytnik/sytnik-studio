import { z } from "zod";

/**
 * Contact form contract, shared by the Server Action and the form.
 * Error messages are translation keys under `contact.errors.*`, so the
 * server never returns user-facing text in one fixed language.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "name"),
  email: z.string().trim().email("email").max(254, "email"),
  company: z.string().trim().max(160, "company").optional().or(z.literal("")),
  message: z.string().trim().min(20, "message").max(4000, "message"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      /** Translation key under contact.errors.* for a form-level message. */
      formError?: "rateLimited" | "deliveryFailed" | "tooFast";
      /** Field → translation key under contact.errors.* */
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Echo of what the visitor typed, so nothing is lost on error. */
      values?: Partial<ContactInput>;
    };

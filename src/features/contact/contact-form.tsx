"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

import { submitContact } from "@/actions/contact";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BUDGETS,
  CONTACT_METHODS,
  NEEDS,
  TIMELINES,
  type ContactMethod,
} from "./options";
import type { ContactField, ContactState } from "./schema";

const initial: ContactState = { status: "idle" };

const INPUT_TYPE: Record<
  ContactMethod,
  { type: string; autoComplete: string; inputMode?: "tel" | "email" | "text" }
> = {
  email: { type: "email", autoComplete: "email", inputMode: "email" },
  telegram: { type: "text", autoComplete: "off", inputMode: "text" },
  whatsapp: { type: "tel", autoComplete: "tel", inputMode: "tel" },
  phone: { type: "tel", autoComplete: "tel", inputMode: "tel" },
};

/**
 * A short brief instead of a bare "email + message" box:
 * 1) what you need (chips + free text), 2) budget & timeline (optional),
 * 3) how to reach you (email, Telegram, WhatsApp or phone).
 *
 * Chips are real checkboxes/radios styled as pills, so the form still
 * submits without JavaScript; JS adds live input hints and inline errors.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitContact, initial);
  const [startedAt, setStartedAt] = useState("0");
  // Only the contact method needs React state (it changes the input below).
  // Chips are uncontrolled: their checked state lives in the DOM and is
  // restored from the echoed values after a failed submit.
  const [method, setMethod] = useState<ContactMethod>("email");
  const statusRef = useRef<HTMLDivElement>(null);

  // Set on mount (not during render) so server and client markup match.
  useEffect(() => setStartedAt(String(Date.now())), []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
    if (state.status === "error" && state.values?.method) {
      setMethod(state.values.method as ContactMethod);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-border bg-card p-8 focus:outline-none"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <FiCheck aria-hidden className="h-5 w-5" />
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          {t("success.title")}
        </h3>
        <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
          {t(`success.text.${method}`)}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const formError = state.status === "error" ? state.formError : undefined;

  const inputClass = (name: ContactField) =>
    cn(
      "mt-2 w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      errors[name] ? "border-destructive" : "border-input"
    );

  const a11y = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const error = (name: ContactField) =>
    errors[name] ? (
      <p
        id={`contact-${name}-error`}
        className="mt-1.5 text-sm text-destructive"
      >
        {t(`errors.${errors[name]}` as "errors.name")}
      </p>
    ) : null;

  return (
    <form action={action} noValidate className="space-y-10">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot — hidden from people and assistive tech. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 1 — What do you need? */}
      <Step n={1} title={t("steps.needs")} hint={t("steps.needsHint")}>
        <div
          role="group"
          aria-label={t("steps.needs")}
          className="flex flex-wrap gap-2"
        >
          {NEEDS.map((id) => (
            <Chip
              key={id}
              type="checkbox"
              name="needs"
              value={id}
              defaultChecked={values.needs?.includes(id)}
            >
              {t(`options.needs.${id}`)}
            </Chip>
          ))}
        </div>
        <label
          htmlFor="contact-message"
          className="mt-6 block text-sm font-medium"
        >
          {t("fields.message")}
        </label>
        <textarea
          {...a11y("message")}
          rows={4}
          placeholder={t("messagePlaceholder")}
          className={inputClass("message")}
        />
        {error("message")}
      </Step>

      {/* 2 — Budget & timeline (optional) */}
      <Step n={2} title={t("steps.budget")} hint={t("optional")}>
        <fieldset>
          <legend className="text-sm font-medium">{t("fields.budget")}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {BUDGETS.map((id) => (
              <Chip
                key={id}
                type="radio"
                name="budget"
                value={id}
                defaultChecked={values.budget === id}
              >
                {t(`options.budget.${id}`)}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="text-sm font-medium">
            {t("fields.timeline")}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TIMELINES.map((id) => (
              <Chip
                key={id}
                type="radio"
                name="timeline"
                value={id}
                defaultChecked={values.timeline === id}
              >
                {t(`options.timeline.${id}`)}
              </Chip>
            ))}
          </div>
        </fieldset>
      </Step>

      {/* 3 — How can I reach you? */}
      <Step n={3} title={t("steps.contact")}>
        <fieldset>
          <legend className="text-sm font-medium">{t("fields.method")}</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CONTACT_METHODS.map((id) => (
              <Chip
                key={id}
                type="radio"
                name="method"
                value={id}
                defaultChecked={(values.method ?? "email") === id}
                onChange={() => setMethod(id)}
                className="justify-center"
              >
                {t(`options.method.${id}`)}
              </Chip>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">
              {t("fields.name")}
            </label>
            <input
              {...a11y("name")}
              type="text"
              autoComplete="name"
              required
              className={inputClass("name")}
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="contact-contact" className="text-sm font-medium">
              {t(`contactLabel.${method}`)}
            </label>
            <input
              {...a11y("contact")}
              key={method}
              {...INPUT_TYPE[method]}
              required
              placeholder={t(`contactPlaceholder.${method}`)}
              className={inputClass("contact")}
            />
            {error("contact")}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="contact-company" className="text-sm font-medium">
            {t("fields.company")}
            <span className="ml-1 font-normal text-muted-foreground">
              {t("optional")}
            </span>
          </label>
          <input
            {...a11y("company")}
            type="text"
            autoComplete="organization"
            className={inputClass("company")}
          />
          {error("company")}
        </div>
      </Step>

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="focus:outline-none"
      >
        {formError && (
          <p
            role="alert"
            className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm"
          >
            {t(`errors.${formError}`)}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {t.rich("privacy", {
            link: (chunks) => (
              <Link
                href="/datenschutz"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
        <button
          type="submit"
          disabled={pending}
          className={buttonVariants({
            variant: "accent",
            size: "lg",
            className: "shrink-0",
          })}
        >
          {pending ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}

function Step({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {String(n).padStart(2, "0")}
        </span>
        <h3 className="font-semibold tracking-tight">{title}</h3>
        {hint && <span className="text-sm text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

/**
 * A checkbox or radio that looks like a pill. The input stays real and
 * uncontrolled; the selected look comes from CSS (`has-[:checked]`), so it
 * works the same with or without JavaScript.
 */
function Chip({
  type,
  name,
  value,
  defaultChecked,
  onChange,
  className,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  defaultChecked?: boolean;
  onChange?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "group inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-foreground/40 hover:bg-muted has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
        className
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="peer sr-only"
      />
      {type === "checkbox" && (
        <FiCheck
          aria-hidden
          className="hidden h-3.5 w-3.5 peer-checked:block"
        />
      )}
      {children}
    </label>
  );
}

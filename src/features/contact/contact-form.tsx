"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";

import { submitContact } from "@/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContactField, ContactState } from "./schema";

const initial: ContactState = { status: "idle" };

/**
 * The only interactive piece of the landing page. Works without
 * JavaScript too (plain form POST to the Server Action); with JS it shows
 * pending state and inline errors without a reload.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitContact, initial);
  const [startedAt, setStartedAt] = useState("0");
  const statusRef = useRef<HTMLDivElement>(null);

  // Set on mount (not during render) so server and client markup match.
  useEffect(() => setStartedAt(String(Date.now())), []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
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
          {t("success.text")}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const formError = state.status === "error" ? state.formError : undefined;

  const field = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: cn(
      "mt-2 w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      errors[name] ? "border-destructive" : "border-input"
    ),
  });

  const label = (name: ContactField, optional = false) => (
    <label htmlFor={`contact-${name}`} className="text-sm font-medium">
      {t(`fields.${name}`)}
      {optional && (
        <span className="ml-1 font-normal text-muted-foreground">
          {t("optional")}
        </span>
      )}
    </label>
  );

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
    <form action={action} noValidate className="space-y-5">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name")}
          <input {...field("name")} type="text" autoComplete="name" required />
          {error("name")}
        </div>
        <div>
          {label("email")}
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            required
          />
          {error("email")}
        </div>
      </div>

      <div>
        {label("company", true)}
        <input {...field("company")} type="text" autoComplete="organization" />
        {error("company")}
      </div>

      <div>
        {label("message")}
        <textarea
          {...field("message")}
          rows={6}
          required
          placeholder={t("messagePlaceholder")}
        />
        {error("message")}
      </div>

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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{t("privacy")}</p>
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

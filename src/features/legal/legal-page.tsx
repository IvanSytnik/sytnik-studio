import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

/** Shared layout for Impressum and privacy policy: readable, plain, no chrome. */
export function LegalPage({
  title,
  note,
  children,
}: {
  title: string;
  /** e.g. "The German version is legally binding." */
  note?: string;
  children: ReactNode;
}) {
  return (
    <Container className="pb-24 pt-12 sm:pt-16">
      <article className="max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {note && <p className="mt-4 text-sm text-muted-foreground">{note}</p>}
        <div className="mt-10 space-y-10 text-pretty leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:mt-1 [&_p+p]:mt-3 [&_p]:text-muted-foreground [&_section>*+*]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted-foreground">
          {children}
        </div>
      </article>
    </Container>
  );
}

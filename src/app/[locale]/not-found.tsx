import { useTranslations } from "next-intl";

import { QuickContact } from "@/components/contact/quick-contact";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

/** Localized 404: say what happened and offer the two useful ways forward. */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex min-h-[60dvh] flex-col justify-center py-16">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 max-w-[20ch] text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {t("text")}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className={buttonVariants({ variant: "accent", size: "lg" })}
        >
          {t("home")}
        </Link>
        <Link
          href="/#projects"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          {t("projects")}
        </Link>
        <QuickContact variant="icon" className="ml-1" />
      </div>
    </Container>
  );
}

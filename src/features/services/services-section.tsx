import { getTranslations } from "next-intl/server";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import { Container } from "@/components/layout/container";
import { getProjectsForService } from "@/features/projects/queries";
import type { Project } from "@/features/projects/types";
import { Link } from "@/i18n/routing";
import { SERVICE_IDS, type ServiceId } from "@/types/service";

/**
 * What I offer. Every service links to real work that proves it, taken
 * from the project registry — so adding a project automatically adds
 * proof here, and a service never claims more than the portfolio shows.
 *
 * Rendered as ruled rows, matching the "More work" list, rather than a
 * grid of identical cards.
 */
export async function ServicesSection() {
  const t = await getTranslations("services");
  const tp = await getTranslations("projects");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-14 border-t border-border pb-10 pt-10 sm:pb-12"
    >
      <Container>
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("section.eyebrow")}
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("section.title")}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t("section.intro")}
          </p>
        </header>

        <ul className="mt-10 border-b border-border sm:mt-12">
          {SERVICE_IDS.map((id) => (
            <ServiceRow
              key={id}
              id={id}
              proofs={getProjectsForService(id).slice(0, 2)}
              t={t}
              tp={tp}
            />
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted-foreground">
          {t("section.note")}
        </p>
      </Container>
    </section>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"services">>>;
type TP = Awaited<ReturnType<typeof getTranslations<"projects">>>;

function ServiceRow({
  id,
  proofs,
  t,
  tp,
}: {
  id: ServiceId;
  proofs: Project[];
  t: T;
  tp: TP;
}) {
  const includes = t.raw(`items.${id}.includes`) as string[];

  return (
    <li className="grid gap-4 border-t border-border py-8 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <h3 className="text-xl font-semibold tracking-tight">
          {t(`items.${id}.label`)}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("timelineLabel")}:{" "}
          <span className="text-foreground">{t(`items.${id}.timeline`)}</span>
        </p>
      </div>

      <div className="lg:col-span-5">
        <p className="text-pretty leading-relaxed text-muted-foreground">
          {t(`items.${id}.pitch`)}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {includes.map((item) => (
            <li key={item} className="relative pl-4">
              <span
                aria-hidden
                className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {proofs.length > 0 && (
        <div className="lg:col-span-3 lg:text-right">
          <p className="text-xs text-muted-foreground">{t("proofLabel")}</p>
          <ul className="mt-2 space-y-1.5">
            {proofs.map((p) => (
              <li key={p.slug}>
                <ProofLink project={p} title={tp(`items.${p.slug}.title`)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

const proofClass =
  "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Flagships link to their case study; smaller work to its live site or code. */
function ProofLink({ project, title }: { project: Project; title: string }) {
  const short = title.split(" — ")[0];

  if (project.tier === "flagship") {
    return (
      <Link href={`/projects/${project.slug}`} className={proofClass}>
        {short}
        <FiArrowRight aria-hidden className="h-3.5 w-3.5" />
      </Link>
    );
  }

  const href = project.links.live ?? project.links.repo;
  if (!href) return <span className="text-sm">{short}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={proofClass}
    >
      {short}
      <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
    </a>
  );
}

import { getTranslations } from "next-intl/server";
import { FiArrowRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";

import { cn } from "@/lib/utils";
import { ProjectCover } from "./project-cover";
import { ProjectLinks } from "./project-links";
import { StatusBadge } from "./status-badge";
import type { FlagshipProject as Flagship } from "./types";

type Props = { project: Flagship; index: number };

/**
 * One flagship case as a wide row: cover on one side, story on the other.
 * Rows alternate sides on large screens; on mobile the cover always comes
 * first so every case starts with a picture.
 */
export async function FlagshipProject({ project, index }: Props) {
  const t = await getTranslations("projects");
  const tServices = await getTranslations("services.items");
  const key = `items.${project.slug}` as const;

  const title = t(`${key}.title`);
  const reversed = index % 2 === 1;

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <ProjectCover
        title={title}
        src={project.media.cover}
        srcLight={project.media.coverLight}
        kind={project.media.coverKind}
        alt={t("coverAlt", { title })}
        priority={index === 0}
        className={cn("lg:col-span-7", reversed && "lg:order-2")}
      />

      <div className={cn("lg:col-span-5", reversed && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-mono text-xs tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden>·</span>
          <span>{tServices(`${project.services[0]}.label`)}</span>
          <StatusBadge
            status={project.status}
            label={t(`status.${project.status}`)}
          />
        </div>

        <h3
          id={`project-${project.slug}`}
          className="mt-4 text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h3>

        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {t(`${key}.summary`)}
        </p>

        <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed">
          <span className="sr-only">{t("resultLabel")}: </span>
          {t(`${key}.result`)}
        </p>

        <ul aria-label={t("stackLabel")} className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-2 rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("caseStudy.open")}
            <span className="sr-only">: {title}</span>
            <FiArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <ProjectLinks project={project} title={title} />
        </div>
      </div>
    </article>
  );
}

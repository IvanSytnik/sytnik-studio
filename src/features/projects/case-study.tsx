import { getTranslations } from "next-intl/server";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ProjectCover } from "./project-cover";
import { ProjectGallery } from "./project-gallery";
import { ProjectLinks } from "./project-links";
import { getNextFlagship } from "./queries";
import { StatusBadge } from "./status-badge";
import type { FlagshipProject } from "./types";

type Props = { project: FlagshipProject };

/**
 * Full case study. Reading order follows how a client evaluates work:
 * outcome first (header), then the story (context → problem → what I
 * built), then the engineering detail for technical readers, then proof
 * (screenshots), then a way to get in touch.
 */
export async function CaseStudy({ project }: Props) {
  const t = await getTranslations("projects");
  const tc = await getTranslations("projects.caseStudy");
  const tServices = await getTranslations("services.items");

  const key = `items.${project.slug}` as const;
  const title = t(`${key}.title`);
  const built = t.raw(`${key}.built`) as string[];
  const highlights = t.raw(`${key}.highlights`) as string[];
  const next = getNextFlagship(project.slug);

  return (
    <article aria-labelledby="case-title" className="pb-24 pt-10 sm:pt-14">
      <Container>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FiArrowLeft aria-hidden className="h-4 w-4" />
          {tc("back")}
        </Link>

        {/* Header: what it is and what came out of it */}
        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{tServices(`${project.services[0]}.label`)}</span>
            <StatusBadge
              status={project.status}
              label={t(`status.${project.status}`)}
            />
          </div>
          <h1
            id="case-title"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t(`${key}.summary`)}
          </p>
          <p className="mt-6 border-l-2 border-accent pl-4 leading-relaxed">
            <span className="sr-only">{t("resultLabel")}: </span>
            {t(`${key}.result`)}
          </p>
          <ProjectLinks project={project} title={title} className="mt-8" />
        </header>

        <ProjectCover
          title={title}
          src={project.media.cover}
          srcLight={project.media.coverLight}
          kind={project.media.coverKind}
          phones={project.media.phones}
          alt={t("coverAlt", { title })}
          priority
          className="mt-14"
        />

        {/* Body: story on the right, facts in a sticky column on the left */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <dl className="space-y-8 lg:sticky lg:top-24">
              <div>
                <dt className="text-sm text-muted-foreground">{tc("role")}</dt>
                <dd className="mt-1.5 font-medium">{t(`${key}.role`)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">
                  {t("stackLabel")}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="space-y-14 lg:col-span-8">
            <CaseSection title={tc("context")}>
              <p>{t(`${key}.context`)}</p>
            </CaseSection>
            <CaseSection title={tc("problem")}>
              <p>{t(`${key}.problem`)}</p>
            </CaseSection>
            <CaseSection title={tc("built")}>
              <BulletList items={built} />
            </CaseSection>
            <CaseSection title={tc("highlights")}>
              <BulletList items={highlights} />
            </CaseSection>
          </div>
        </div>

        {project.media.gallery.length > 0 && (
          <section aria-labelledby="gallery-heading" className="mt-20 lg:mt-28">
            <h2
              id="gallery-heading"
              className="mb-8 text-2xl font-semibold tracking-tight"
            >
              {tc("gallery")}
            </h2>
            <ProjectGallery
              images={project.media.gallery}
              altFor={(n) => tc("galleryAlt", { title, n })}
            />
          </section>
        )}

        {/* Close: get in touch, or keep browsing */}
        <div className="mt-20 grid gap-6 border-t border-border pt-12 lg:mt-28 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {tc("ctaTitle")}
            </h2>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {tc("ctaText")}
            </p>
            <Link
              href="/#contact"
              className={buttonVariants({
                variant: "accent",
                size: "lg",
                className: "mt-6",
              })}
            >
              {tc("ctaButton")}
            </Link>
          </div>

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col justify-between gap-6 rounded-xl border border-border p-6 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
            >
              <span className="text-sm text-muted-foreground">
                {tc("next")}
              </span>
              <span className="flex items-end justify-between gap-4">
                <span className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
                  {t(`items.${next.slug}.title`)}
                </span>
                <FiArrowRight
                  aria-hidden
                  className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          )}
        </div>
      </Container>
    </article>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 max-w-[68ch] text-pretty leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span
            aria-hidden
            className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/container";
import { CompactProject } from "./compact-project";
import { FlagshipProject } from "./flagship-project";
import { getCompactProjects, getFlagshipProjects } from "./queries";

/**
 * Selected work. Server Component; the only client code it pulls in is
 * next/image for the covers.
 *
 * Hierarchy is carried by form, not by labels: flagships are wide rows
 * with screenshots, everything else is a quiet ruled list underneath.
 */
export async function ProjectsSection() {
  const t = await getTranslations("projects.section");
  const flagships = getFlagshipProjects();
  const compact = getCompactProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-14 border-t border-border pb-10 pt-10 sm:pb-12"
    >
      <Container>
        <header className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2
            id="projects-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <div className="mt-10 space-y-16 sm:mt-12 lg:space-y-20">
          {flagships.map((project, i) => (
            <FlagshipProject key={project.slug} project={project} index={i} />
          ))}
        </div>

        {compact.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h3 className="text-lg font-semibold tracking-tight">
              {t("moreTitle")}
            </h3>
            <ul className="mt-6 border-b border-border">
              {compact.map((project) => (
                <CompactProject key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

import { getTranslations } from "next-intl/server";

import { ProjectLinks } from "./project-links";
import { StatusBadge } from "./status-badge";
import type { CompactProject as Compact } from "./types";

type Props = { project: Compact };

/** A smaller piece of work as one ruled row: what it is, status, links. */
export async function CompactProject({ project }: Props) {
  const t = await getTranslations("projects");
  const key = `items.${project.slug}` as const;
  const title = t(`${key}.title`);

  return (
    <li className="grid gap-3 border-t border-border py-6 sm:grid-cols-12 sm:gap-6">
      <div className="sm:col-span-4">
        <h4 className="font-semibold tracking-tight">{title}</h4>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <StatusBadge
            status={project.status}
            label={t(`status.${project.status}`)}
          />
          <span>{t(`kind.${project.kind}`)}</span>
        </div>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:col-span-5">
        {t(`${key}.summary`)}
      </p>
      <ProjectLinks
        project={project}
        title={title}
        className="sm:col-span-3 sm:flex-col sm:items-end sm:gap-y-2"
      />
    </li>
  );
}

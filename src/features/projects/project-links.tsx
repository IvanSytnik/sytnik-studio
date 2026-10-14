import { getTranslations } from "next-intl/server";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

import { cn } from "@/lib/utils";
import type { Project } from "./types";

type Props = { project: Project; title: string; className?: string };

/**
 * Outbound links. The live link's label depends on where it goes:
 * a Telegram bot, a pre-launch preview, or a regular live site.
 * Each link carries the project name for screen readers, since
 * "Live site" alone repeated six times is meaningless out of context.
 */
export async function ProjectLinks({ project, title, className }: Props) {
  const t = await getTranslations("projects.links");
  const { live, repo, video } = project.links;

  const liveKey = live?.startsWith("https://t.me/")
    ? "bot"
    : project.status === "pre-launch"
      ? "preview"
      : "live";

  const linkClass =
    "inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm";

  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {live && (
        <li>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t(liveKey)}
            <FiArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only">: {title}</span>
          </a>
        </li>
      )}
      {video && (
        <li>
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t("video")}
            <FiArrowUpRight aria-hidden className="h-4 w-4" />
            <span className="sr-only">: {title}</span>
          </a>
        </li>
      )}
      {repo && (
        <li>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              linkClass,
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <FiGithub aria-hidden className="h-4 w-4" />
            {t("code")}
            <span className="sr-only">: {title}</span>
          </a>
        </li>
      )}
    </ul>
  );
}

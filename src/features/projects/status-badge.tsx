import { cn } from "@/lib/utils";
import type { ProjectStatus } from "./types";

const dot: Record<ProjectStatus, string> = {
  live: "bg-emerald-500",
  beta: "bg-amber-500",
  delivered: "bg-muted-foreground",
  "pre-launch": "bg-transparent ring-1 ring-inset ring-muted-foreground",
};

type Props = { status: ProjectStatus; label: string; className?: string };

/** Honest lifecycle label. Colour is decorative — the text carries the meaning. */
export function StatusBadge({ status, label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", dot[status])}
      />
      {label}
    </span>
  );
}

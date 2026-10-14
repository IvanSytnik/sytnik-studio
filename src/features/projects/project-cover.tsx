import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** Path under /public. Without it a typographic cover is rendered. */
  src?: string;
  alt: string;
  /** Only the first cover on the page is above the fold on large screens. */
  priority?: boolean;
  className?: string;
};

/**
 * 16:10 project cover framed as a minimal browser window, so screenshots
 * of very different products read as one consistent set.
 *
 * Without a screenshot the frame shows the project title set large — the
 * layout stays identical, and dropping a file into /public later is the
 * only change needed.
 */
export function ProjectCover({ title, src, alt, priority, className }: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div
        aria-hidden
        className="flex h-7 items-center gap-1.5 border-b border-border bg-muted/60 px-3"
      >
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>

      <div className="relative aspect-[16/10] bg-muted">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-end bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] p-6 [background-size:16px_16px] sm:p-10">
            <p
              aria-hidden
              className="max-w-[14ch] text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground/80 sm:text-5xl"
            >
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

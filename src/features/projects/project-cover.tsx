import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** Path under /public. Without it a typographic cover is rendered. */
  src?: string;
  /** Light-theme variant; falls back to `src`. */
  srcLight?: string;
  kind?: "screen" | "devices";
  alt: string;
  /** Only the first cover on the page is above the fold on large screens. */
  priority?: boolean;
  className?: string;
};

const SIZES = "(min-width: 1024px) 680px, 100vw";

/**
 * 16:10 project cover on a soft "stage": a tinted panel with the
 * screenshot inset like a product shot. Dark and light screenshots both
 * sit comfortably on it, in either theme.
 *
 * Theme variants: when a light cover exists, both images are rendered and
 * CSS shows the right one. Lazy images hidden with display:none are never
 * fetched, so below the fold only the visible variant is downloaded.
 */
export function ProjectCover({
  title,
  src,
  srcLight,
  kind = "screen",
  alt,
  priority,
  className,
}: Props) {
  const image = (path: string, extra?: string) => (
    <Image
      src={path}
      alt={alt}
      fill
      priority={priority}
      sizes={SIZES}
      className={cn(
        kind === "devices" ? "object-contain" : "object-cover object-top",
        extra
      )}
    />
  );

  return (
    <div
      className={cn(
        "rounded-2xl bg-[hsl(var(--stage))] p-[5%] ring-1 ring-inset ring-border",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden",
          kind === "screen" &&
            "rounded-lg bg-card shadow-[0_1px_2px_hsl(var(--foreground)/0.06),0_12px_32px_-12px_hsl(var(--foreground)/0.25)] ring-1 ring-foreground/5"
        )}
      >
        {src ? (
          srcLight ? (
            <>
              {image(srcLight, "dark:hidden")}
              {image(src, "hidden dark:block")}
            </>
          ) : (
            image(src)
          )
        ) : (
          <div className="absolute inset-0 flex items-end bg-card p-6 sm:p-10">
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

import { Link } from "@/i18n/routing";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Props = {
  /** When true, show only the monogram box (mobile / tight headers). */
  compact?: boolean;
  className?: string;
};

/**
 * Brand wordmark: monogram in a graphite box with an accent border,
 * followed by the studio name. Click goes home.
 *
 * The wordmark is hidden on mobile via responsive classes; the monogram
 * stays. `compact` forces monogram-only regardless of viewport.
 */
export function BrandMark({ compact = false, className }: Props) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 font-mono text-sm text-foreground",
        className
      )}
      aria-label={brand.fullName}
    >
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-md border border-accent/40 bg-foreground text-background shadow-sm transition-colors group-hover:border-accent"
      >
        <span className="text-[11px] font-semibold tracking-[0.05em]">
          {brand.initials}
        </span>
      </span>
      {!compact && (
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="font-sans text-sm font-medium text-foreground">
            {brand.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {brand.studio}
          </span>
        </span>
      )}
    </Link>
  );
}

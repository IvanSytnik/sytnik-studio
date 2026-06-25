import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

/**
 * Horizontal width constraint and gutter. Used by every section and the
 * header/footer to keep the same content edge across the site.
 *
 * max-width: ~1200px on 2xl (matches tailwind.config.container.screens.2xl)
 * gutter: 1rem mobile → 2rem on lg
 */
export function Container({ className, ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

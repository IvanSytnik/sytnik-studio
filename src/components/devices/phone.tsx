import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Minimal phone frame drawn in CSS: rounded body, thin bezel and a
 * Dynamic Island. Scales with its own width (container query units).
 * Children fill a 9:19.5 screen (iPhone proportions).
 */
export function Phone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("[container-type:inline-size]", className)}>
      <div className="relative rounded-[15cqw] bg-neutral-900 p-[3.2cqw] shadow-[0_2px_4px_rgb(0_0_0/0.08),0_24px_48px_-24px_rgb(0_0_0/0.45)] ring-1 ring-black/10 dark:ring-white/15">
        <div className="relative aspect-[1290/2796] overflow-hidden rounded-[12cqw] bg-neutral-950">
          {children}
          <span
            aria-hidden
            className="absolute left-1/2 top-[2.6cqw] z-10 h-[7.5cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Minimal laptop frame drawn in CSS: dark bezel with a camera dot and a
 * thin base. Sizes scale with the frame's own width (container query
 * units), so it looks the same in a card, a hero or a gallery.
 * Children fill a 16:10 screen.
 */
export function Laptop({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("[container-type:inline-size]", className)}>
      <div className="relative mx-[5.5%] rounded-t-[2.2cqw] bg-neutral-900 p-[1.6cqw] pb-[2cqw] shadow-[0_2px_4px_rgb(0_0_0/0.08),0_20px_40px_-20px_rgb(0_0_0/0.35)] ring-1 ring-black/10 dark:ring-white/10">
        <span
          aria-hidden
          className="absolute left-1/2 top-[0.6cqw] h-[0.7cqw] w-[0.7cqw] -translate-x-1/2 rounded-full bg-neutral-700"
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.4cqw] bg-neutral-950">
          {children}
        </div>
      </div>
      <div aria-hidden className="relative">
        <div className="h-[1.8cqw] rounded-b-[1.4cqw] bg-gradient-to-b from-neutral-300 to-neutral-400 shadow-[0_8px_16px_-8px_rgb(0_0_0/0.4)] dark:from-neutral-600 dark:to-neutral-700" />
        <div className="absolute left-1/2 top-0 h-[0.7cqw] w-[14%] -translate-x-1/2 rounded-b-[0.6cqw] bg-neutral-400/80 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

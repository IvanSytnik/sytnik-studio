import Image from "next/image";

import { cn } from "@/lib/utils";
import type { GalleryImage } from "./types";

type Props = { images: readonly GalleryImage[]; altFor: (n: number) => string };

/**
 * Screenshots on the case study page. Landscape shots take the full width;
 * portrait (phone) shots sit side by side, so a Telegram bot and a web app
 * both look intentional instead of letterboxed.
 */
export function ProjectGallery({ images, altFor }: Props) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {images.map((img, i) => {
        const portrait = img.height > img.width;
        return (
          <li
            key={img.src}
            className={cn(
              "overflow-hidden rounded-xl bg-[hsl(var(--stage))] p-3 ring-1 ring-inset ring-border sm:p-4",
              portrait ? "mx-auto w-full max-w-sm" : "sm:col-span-2"
            )}
          >
            <Image
              src={img.src}
              alt={altFor(i + 1)}
              width={img.width}
              height={img.height}
              sizes={
                portrait
                  ? "(min-width: 640px) 384px, 100vw"
                  : "(min-width: 1280px) 1216px, 100vw"
              }
              className="h-auto w-full rounded-lg ring-1 ring-foreground/5"
            />
          </li>
        );
      })}
    </ul>
  );
}

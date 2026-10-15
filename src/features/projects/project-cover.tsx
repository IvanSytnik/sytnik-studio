import Image from "next/image";

import { Laptop } from "@/components/devices/laptop";
import { Phone } from "@/components/devices/phone";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  /** Desktop screenshot under /public. Without it a typographic screen is shown. */
  src?: string;
  /** Light-theme variant of `src`. */
  srcLight?: string;
  kind?: "laptop" | "phones";
  /** Phone screenshots for kind "phones". */
  phones?: readonly string[];
  alt: string;
  /** Only the first cover on the page is above the fold on large screens. */
  priority?: boolean;
  className?: string;
};

/**
 * Project cover in a device frame: a laptop for web apps, a row of phones
 * for mobile/Telegram products. Frames are pure CSS, so they cost nothing
 * to load and adapt to both themes.
 *
 * Theme variants: when a light cover exists, both images are rendered and
 * CSS shows the right one. Lazy images hidden with display:none are never
 * fetched, so only the visible variant is downloaded.
 */
export function ProjectCover({
  title,
  src,
  srcLight,
  kind = "laptop",
  phones,
  alt,
  priority,
  className,
}: Props) {
  if (kind === "phones" && phones?.length) {
    return (
      <div
        className={cn(
          "flex items-end justify-center gap-[4%] px-[4%]",
          className
        )}
      >
        {phones.map((phone, i) => (
          <Phone
            key={phone}
            className={cn(
              "w-[29%]",
              phones.length === 3 && i === 1 && "-translate-y-[6%]"
            )}
          >
            <Image
              src={phone}
              alt={i === 0 ? alt : ""}
              fill
              priority={priority && i === 0}
              sizes="(min-width: 1024px) 200px, 30vw"
              className="object-cover object-top"
            />
          </Phone>
        ))}
      </div>
    );
  }

  const image = (path: string, extra?: string) => (
    <Image
      src={path}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 640px, 90vw"
      className={cn("object-cover object-top", extra)}
    />
  );

  return (
    <Laptop className={className}>
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
        <div className="absolute inset-0 flex items-end bg-card p-[6cqw]">
          <p
            aria-hidden
            className="max-w-[14ch] text-balance text-[5cqw] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground/80"
          >
            {title}
          </p>
        </div>
      )}
    </Laptop>
  );
}

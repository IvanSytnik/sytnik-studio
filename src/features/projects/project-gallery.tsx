import Image from "next/image";

import { Laptop } from "@/components/devices/laptop";
import { Phone } from "@/components/devices/phone";
import type { GalleryImage } from "./types";

type Props = { images: readonly GalleryImage[]; altFor: (n: number) => string };

/**
 * Screenshots on the case study page, each in its device: desktop shots
 * in a laptop at full width, phone shots side by side in phone frames.
 */
export function ProjectGallery({ images, altFor }: Props) {
  const desktop = images.filter((img) => img.width >= img.height);
  const mobile = images.filter((img) => img.height > img.width);
  const indexOf = (img: GalleryImage) => images.indexOf(img) + 1;

  return (
    <div className="space-y-14">
      {desktop.map((img) => (
        <Laptop key={img.src} className="mx-auto max-w-4xl">
          <Image
            src={img.src}
            alt={altFor(indexOf(img))}
            fill
            sizes="(min-width: 1024px) 860px, 90vw"
            className="object-cover object-top"
          />
        </Laptop>
      ))}

      {mobile.length > 0 && (
        <ul className="flex flex-wrap items-start justify-center gap-8 sm:gap-12">
          {mobile.map((img) => (
            <li key={img.src} className="w-[min(16rem,70vw)]">
              <Phone>
                <Image
                  src={img.src}
                  alt={altFor(indexOf(img))}
                  fill
                  sizes="256px"
                  className="object-cover object-top"
                />
              </Phone>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import { cn } from "@/lib/utils";

type Props = {
  ctaLabel: string;
  telegramUrl: string;
  whatsappUrl: string;
};

/**
 * Sticky contact bar for phones. Appears once the hero has scrolled away
 * and disappears again when the contact section comes into view, so it
 * never covers the form it points to. Hidden from md up — the header CTA
 * is always visible there.
 */
export function MobileContactBar({
  ctaLabel,
  telegramUrl,
  whatsappUrl,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const contact = document.getElementById("contact");
    let frame = 0;

    const update = () => {
      frame = 0;
      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < 0
        : window.scrollY > 600;
      const beforeContact = contact
        ? contact.getBoundingClientRect().top > window.innerHeight * 0.85
        : true;
      setVisible(pastHero && beforeContact);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const iconClass =
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href="#contact"
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {ctaLabel}
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          tabIndex={visible ? 0 : -1}
          className={iconClass}
        >
          <FaTelegramPlane aria-hidden className="h-5 w-5" />
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          tabIndex={visible ? 0 : -1}
          className={iconClass}
        >
          <FaWhatsapp aria-hidden className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

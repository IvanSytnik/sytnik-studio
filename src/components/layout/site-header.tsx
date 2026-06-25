"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";

import { Container } from "./container";
import { BrandMark } from "./brand-mark";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Sticky top header.
 *
 * Visual state:
 *  - At top: transparent background, no border.
 *  - Scrolled: warm off-white / dark with blur and subtle border.
 *
 * Listens to window scroll with a passive listener, threshold 8px.
 * Keeps the listener until unmount; no rAF needed for a binary flag.
 *
 * Layout:
 *  - md+: Brand · Nav · LangSwitcher · ThemeSwitcher · CTA
 *  - mobile: Brand · ThemeSwitcher · MobileNav (hamburger)
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <BrandMark />

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Button variant="accent" size="sm" asChild className="ml-2">
              <Link href="/#contact">
                {t("cta")}
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeSwitcher />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}

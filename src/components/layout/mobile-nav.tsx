"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiMenu, FiArrowRight } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { navItems } from "@/lib/nav";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Mobile-only menu trigger and slide-in sheet.
 * Renders nav, switchers, and CTA. Closes on any nav click.
 */
export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("openMenu")}
          className="text-muted-foreground hover:text-foreground md:hidden"
        >
          <FiMenu className="h-5 w-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent title={t("menuTitle")} side="right">
        <nav
          aria-label={t("menuTitle")}
          className="mt-8 flex flex-col gap-1 text-lg"
        >
          {navItems.map((item) => (
            <SheetClose asChild key={item.id}>
              <Link
                href={`/#${item.id}`}
                className="rounded-md px-2 py-2 transition-colors hover:bg-muted"
              >
                {t(item.labelKey)}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <SheetClose asChild>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-between rounded-md bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t("cta")}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </SheetClose>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}

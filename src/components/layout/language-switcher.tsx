"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { FiGlobe } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing, usePathname, useRouter } from "@/i18n/routing";

/**
 * Language switcher: globe trigger + radio list of all supported locales.
 *
 * Uses next-intl's locale-aware router so switching from /de/about to "en"
 * goes to /about (not /en/about, because EN has no prefix in this config).
 *
 * `useTransition` keeps the dropdown responsive while the route updates.
 */
export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t("label")}
          disabled={isPending}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <FiGlobe className="h-[16px] w-[16px]" aria-hidden />
          <span className="font-mono text-xs uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {routing.locales.map((code) => (
            <DropdownMenuRadioItem key={code} value={code}>
              <span className="mr-2 font-mono text-[10px] uppercase text-muted-foreground">
                {code}
              </span>
              {t(code)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

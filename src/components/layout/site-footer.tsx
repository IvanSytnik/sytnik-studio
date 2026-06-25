import { useTranslations } from "next-intl";
import {
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";
import type { ComponentType } from "react";

import { Container } from "./container";
import { BrandMark } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";
import { Link } from "@/i18n/routing";
import { navItems } from "@/lib/nav";
import { brand } from "@/lib/brand";

type SocialEntry = {
  key: keyof typeof brand.social;
  url: string;
  label: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

/**
 * Footer.
 *
 * Three logical zones:
 *  - Brand + tagline + language switcher
 *  - Sections (mirrors header nav for accessibility & SEO)
 *  - Social (auto-hides links with empty URLs in brand.ts)
 *
 * Server component — no interactive state here. The language switcher is
 * the only client island, which is fine.
 */
export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const allSocial: SocialEntry[] = [
    {
      key: "github",
      url: brand.social.github,
      label: "GitHub",
      Icon: FiGithub,
    },
    {
      key: "linkedin",
      url: brand.social.linkedin,
      label: "LinkedIn",
      Icon: FiLinkedin,
    },
    {
      key: "upwork",
      url: brand.social.upwork,
      label: "Upwork",
      Icon: FiBriefcase,
    },
    {
      key: "telegram",
      url: brand.social.telegram,
      label: "Telegram",
      Icon: FiSend,
    },
    {
      key: "email",
      url: brand.social.email ? `mailto:${brand.social.email}` : "",
      label: "Email",
      Icon: FiMail,
    },
  ];

  const social = allSocial.filter((s) => s.url.length > 0);

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand zone */}
          <div className="flex flex-col gap-4">
            <BrandMark />
            <p className="max-w-xs text-sm text-muted-foreground">
              {t("brand.tagline")}
            </p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Sections */}
          <nav aria-label={t("footer.sections")} className="flex flex-col gap-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.sections")}
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social — hidden entirely if no links configured */}
          {social.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("footer.social")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {social.map(({ key, url, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={url}
                      target={url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={
                        url.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {brand.name}. {t("footer.rights")}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em]">
            {t("footer.builtWith")}
          </p>
        </div>
      </Container>
    </footer>
  );
}

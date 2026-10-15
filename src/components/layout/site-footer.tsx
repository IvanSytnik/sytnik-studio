import { useTranslations } from "next-intl";
import type { ComponentType, ReactNode } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import { Link } from "@/i18n/routing";
import { brand } from "@/lib/brand";
import { navItems } from "@/lib/nav";
import { BrandMark } from "./brand-mark";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

/**
 * Footer, in four columns: who I am, where to go on the page, how to reach
 * me (with the actual handles visible, not just icons), and profiles.
 * Bottom row: copyright, legal links, language.
 */
export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const contacts: { label: string; value: string; href: string; Icon: Icon }[] =
    [
      {
        label: "Telegram",
        value: brand.contact.telegram.handle,
        href: brand.contact.telegram.url,
        Icon: FaTelegramPlane,
      },
      {
        label: "WhatsApp",
        value: brand.contact.whatsapp.number,
        href: brand.contact.whatsapp.url,
        Icon: FaWhatsapp,
      },
      {
        label: "Email",
        value: brand.contact.email,
        href: `mailto:${brand.contact.email}`,
        Icon: FiMail,
      },
    ];

  const profiles: { label: string; href: string; Icon: Icon }[] = [
    { label: "GitHub", href: brand.social.github, Icon: FiGithub },
    { label: "LinkedIn", href: brand.social.linkedin, Icon: FiLinkedin },
  ].filter((p) => p.href);

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandMark />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {t("brand.tagline")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("footer.basedIn")}
            </p>
          </div>

          <Column title={t("footer.sections")} className="md:col-span-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={`/#${item.id}`} className={linkClass}>
                  {t(`nav.${item.labelKey}`)}
                </Link>
              </li>
            ))}
          </Column>

          <Column title={t("footer.contact")} className="md:col-span-4">
            {contacts.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <Icon
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                  />
                  <span className="sr-only">{label}: </span>
                  {value}
                </a>
              </li>
            ))}
          </Column>

          <Column title={t("footer.profiles")} className="md:col-span-2">
            {profiles.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <Icon
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-muted-foreground"
                  />
                  {label}
                </a>
              </li>
            ))}
          </Column>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              © {year} {brand.name}
            </span>
            <Link href="/impressum" className="hover:text-foreground">
              {t("footer.impressum")}
            </Link>
            <Link href="/datenschutz" className="hover:text-foreground">
              {t("footer.privacy")}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </Container>
    </footer>
  );
}

const linkClass =
  "rounded-sm text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Column({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-sm font-medium">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}

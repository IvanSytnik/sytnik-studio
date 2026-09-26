import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { brand } from "@/lib/brand";
import { env, isIndexable } from "@/lib/env";

import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
  width: "device-width",
  initialScale: 1,
};
// Indexability is driven by the NEXT_PUBLIC_ALLOW_INDEXING env flag.
// Until the flag is "true", every deployment (incl. *.vercel.app previews
// and local dev) is hard-noindexed via both meta tag AND robots.txt.
const indexable = isIndexable();

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: brand.fullName, template: `%s · ${brand.name}` },
  description: brand.description,
  applicationName: brand.fullName,
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.fullName,
    title: brand.fullName,
    description: brand.description,
    url: env.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.fullName,
    description: brand.description,
  },
  robots: indexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering: must run before any next-intl server API.
  setRequestLocale(locale);

  // Only namespaces used by Client Components are serialized to the browser.
  // Everything else (project case studies, section copy) is read on the
  // server and never ships in the page payload. Add a namespace here when a
  // new Client Component calls useTranslations() with it.
  const messages = await getMessages();
  const clientMessages = {
    nav: messages.nav,
    theme: messages.theme,
    language: messages.language,
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          <NextIntlClientProvider messages={clientMessages}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

const PREFIXED = new RegExp(`^/(${routing.locales.join("|")})(/|$)`);

/**
 * Locale routing (next-intl), plus one rule required for businesses
 * registered in Ukraine (Law "On the State Language", art. 27): visitors
 * from Ukraine get the Ukrainian version by default.
 *
 * Applies only on a first visit to an unprefixed URL — anyone who picked a
 * language (NEXT_LOCALE cookie) or opened a /de, /en… link keeps it.
 * The country comes from Vercel's edge header; locally it is absent and
 * this rule is a no-op.
 */
export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const country = request.headers.get("x-vercel-ip-country");
  const chosen = request.cookies.has("NEXT_LOCALE");

  if (country === "UA" && !chosen && !PREFIXED.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/uk${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  return intl(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

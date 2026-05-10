import { NextRequest, NextResponse } from "next/server";
import {
  defaultWebsiteLocaleCode,
  isSupportedWebsiteLocale,
  localeFromPathname,
  localizedPath,
  pathWithoutLocale,
  websiteLocaleCookieName,
  type WebsiteLocaleCode,
} from "@/lib/website/i18n";

const localizableRoutes = [
  /^\/$/,
  /^\/fairs(?:\/.*)?$/,
  /^\/faq(?:\/.*)?$/,
  /^\/privacy$/,
  /^\/support$/,
];

function isStaticAssetPath(pathname: string): boolean {
  return /\.[a-z0-9]+$/i.test(pathname);
}

function shouldSkipLocaleProxy(pathname: string): boolean {
  return (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/sanity-preview") ||
    isStaticAssetPath(pathname)
  );
}

function isLocalizablePath(pathname: string): boolean {
  return localizableRoutes.some((route) => route.test(pathname));
}

function preferredLocaleFromAcceptLanguage(
  header: string | null,
): WebsiteLocaleCode {
  if (!header) {
    return defaultWebsiteLocaleCode;
  }

  const weightedLanguages = header
    .split(",")
    .map((entry) => {
      const [languageRange, ...parameters] = entry.trim().split(";");
      const qParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const quality = qParameter
        ? Number.parseFloat(qParameter.trim().slice(2))
        : 1;

      return {
        language: languageRange.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { language } of weightedLanguages) {
    const primaryLanguage = language.split("-")[0];
    if (isSupportedWebsiteLocale(primaryLanguage)) {
      return primaryLanguage;
    }
  }

  return defaultWebsiteLocaleCode;
}

function preferredLocale(request: NextRequest): WebsiteLocaleCode {
  const savedLocale = request.cookies.get(websiteLocaleCookieName)?.value;
  if (isSupportedWebsiteLocale(savedLocale)) {
    return savedLocale;
  }

  return preferredLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
}

function withLocaleCookie(response: NextResponse, locale: WebsiteLocaleCode) {
  response.cookies.set(websiteLocaleCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (shouldSkipLocaleProxy(pathname)) {
    return NextResponse.next();
  }

  const pathLocale = localeFromPathname(pathname);

  if (pathLocale) {
    if (pathLocale === defaultWebsiteLocaleCode) {
      const canonicalPath = pathWithoutLocale(pathname);
      const redirectURL = request.nextUrl.clone();
      redirectURL.pathname = canonicalPath;
      return withLocaleCookie(NextResponse.redirect(redirectURL), pathLocale);
    }

    return withLocaleCookie(NextResponse.next(), pathLocale);
  }

  if (!isLocalizablePath(pathname)) {
    return NextResponse.next();
  }

  const locale = preferredLocale(request);

  if (locale === defaultWebsiteLocaleCode) {
    return withLocaleCookie(NextResponse.next(), locale);
  }

  const redirectURL = request.nextUrl.clone();
  redirectURL.pathname = localizedPath(pathname, locale);
  redirectURL.search = search;

  return withLocaleCookie(NextResponse.redirect(redirectURL), locale);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

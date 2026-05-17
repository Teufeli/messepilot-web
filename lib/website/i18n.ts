export const websiteLocaleCookieName = "messepilot_locale";
export const websiteLocaleStorageKey = "messepilot.locale";
export const supportedWebsiteLocaleCodes = [
  "en",
  "de",
  "ja",
  "es",
  "fr",
  "it",
  "bs",
  "hr",
  "hi",
] as const;

export type WebsiteLocaleCode = (typeof supportedWebsiteLocaleCodes)[number];

export const defaultWebsiteLocaleCode: WebsiteLocaleCode = "en";

export function isSupportedWebsiteLocale(
  locale: string | undefined,
): locale is WebsiteLocaleCode {
  return supportedWebsiteLocaleCodes.includes(locale as WebsiteLocaleCode);
}

export function websiteLocaleOrDefault(
  locale: string | undefined,
): WebsiteLocaleCode {
  return isSupportedWebsiteLocale(locale) ? locale : defaultWebsiteLocaleCode;
}

export function localePathPrefix(locale: WebsiteLocaleCode): string {
  return locale === defaultWebsiteLocaleCode ? "" : locale;
}

export function isLocaleLikeSegment(segment: string | undefined): boolean {
  return Boolean(segment && /^[a-z]{2}(-[a-z]{2})?$/i.test(segment));
}

export function localeFromPathname(pathname: string): WebsiteLocaleCode | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (isSupportedWebsiteLocale(firstSegment)) {
    return firstSegment;
  }

  return null;
}

export function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (isSupportedWebsiteLocale(firstSegment) || isLocaleLikeSegment(firstSegment)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}

export function localizedPath(pathname: string, locale: WebsiteLocaleCode): string {
  const basePath = pathWithoutLocale(pathname);
  const prefix = localePathPrefix(locale);

  if (!prefix) {
    return basePath;
  }

  return basePath === "/" ? `/${prefix}` : `/${prefix}${basePath}`;
}

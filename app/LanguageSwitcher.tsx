"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = ["de", "ja"] as const;

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }

  return pathname || "/";
}

function getLocalizedPath(pathname: string, locale: "en" | "de" | "ja") {
  const basePath = getPathWithoutLocale(pathname);

  if (locale === "en") {
    return basePath;
  }

  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language selection"
      className="flex items-center gap-2 text-xs font-medium text-slate-500"
    >
      <Link
        href={getLocalizedPath(pathname, "en")}
        className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900"
      >
        EN
      </Link>
      <span aria-hidden="true">·</span>
      <Link
        href={getLocalizedPath(pathname, "de")}
        className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900"
      >
        DE
      </Link>
      <span aria-hidden="true">·</span>
      <Link
        href={getLocalizedPath(pathname, "ja")}
        className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900"
      >
        JA
      </Link>
    </nav>
  );
}

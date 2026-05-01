"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const locales = ["de", "ja"] as const;

type Locale = "en" | "de" | "ja";

const labels: Record<
  Locale,
  {
    home: string;
    faq: string;
    privacy: string;
    support: string;
  }
> = {
  en: {
    home: "Home",
    faq: "FAQ",
    privacy: "Privacy",
    support: "Support",
  },
  de: {
    home: "Home",
    faq: "FAQ",
    privacy: "Datenschutz",
    support: "Support",
  },
  ja: {
    home: "ホーム",
    faq: "FAQ",
    privacy: "プライバシー",
    support: "サポート",
  },
};

function getCurrentLocale(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment === "de" || firstSegment === "ja") {
    return firstSegment;
  }

  return "en";
}

function localizedPath(locale: Locale, path: string) {
  if (locale === "en") {
    return path;
  }

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export default function HeaderNavigation() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const copy = labels[locale];

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
      <nav
        aria-label="Main navigation"
        className="flex flex-wrap items-center justify-center gap-6 text-sm sm:justify-end"
      >
        <Link
          href={localizedPath(locale, "/")}
          className="text-slate-700 hover:text-slate-900"
        >
          {copy.home}
        </Link>
        <Link
          href={localizedPath(locale, "/faq")}
          className="text-slate-700 hover:text-slate-900"
        >
          {copy.faq}
        </Link>
        <Link
          href={localizedPath(locale, "/privacy")}
          className="text-slate-700 hover:text-slate-900"
        >
          {copy.privacy}
        </Link>
        <Link
          href={localizedPath(locale, "/support")}
          className="text-slate-700 hover:text-slate-900"
        >
          {copy.support}
        </Link>
      </nav>

      <LanguageSwitcher />
    </div>
  );
}

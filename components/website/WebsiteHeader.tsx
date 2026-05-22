import Link from "next/link";

import WebsiteNavigation from "@/components/website/WebsiteNavigation";

export function WebsiteHeader() {
  return (
    <header className="relative z-[100] border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-slate-950 transition hover:text-slate-700 sm:text-4xl"
        >
          MessePilot
        </Link>

        <WebsiteNavigation />
      </div>
    </header>
  );
}

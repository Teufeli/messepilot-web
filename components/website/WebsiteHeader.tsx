import Image from "next/image";
import Link from "next/link";

import HeaderNavigation from "@/app/HeaderNavigation";

export function WebsiteHeader() {
  return (
    <header className="border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:gap-5 sm:text-4xl"
        >
          <Image
            src="/messepilot-app-icon.png"
            alt="MessePilot app icon"
            width={96}
            height={96}
            className="h-16 w-16 rounded-2xl sm:h-24 sm:w-24 sm:rounded-3xl"
            priority
          />
          <span>MessePilot</span>
        </Link>

        <HeaderNavigation />
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderNavigation from "./HeaderNavigation";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");

  if (isStudio) {
    return (
      <main className="min-h-screen bg-[#101014]">
        {children}
      </main>
    );
  }

  return (
    <>
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

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-slate-600">
          © 2026 Roger Zutter. MessePilot.
        </div>
      </footer>
    </>
  );
}

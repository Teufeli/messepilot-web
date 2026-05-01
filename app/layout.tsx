import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MessePilot",
  description: "Trade fair planning made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900">
        <header className="border-b border-white/50 bg-white/75 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
            <Link href="/" className="flex items-center gap-3 text-2xl font-semibold tracking-tight sm:gap-5 sm:text-4xl">
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
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:items-end">
              <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-center gap-6 text-sm sm:justify-end">
                <Link href="/" className="text-slate-700 hover:text-slate-900">
                  Home
                </Link>
                <Link href="/faq" className="text-slate-700 hover:text-slate-900">
                  FAQ
                </Link>
                <Link href="/privacy" className="text-slate-700 hover:text-slate-900">
                  Privacy
                </Link>
                <Link href="/support" className="text-slate-700 hover:text-slate-900">
                  Support
                </Link>
              </nav>

              <nav aria-label="Language selection" className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Link href="/" className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900">
                  EN
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/de" className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900">
                  DE
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/ja" className="rounded-full px-2 py-1 transition hover:bg-white/70 hover:text-slate-900">
                  JA
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>

        <footer className="border-t border-white/60 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-slate-600">
            © 2026 Roger Zutter. MessePilot.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}

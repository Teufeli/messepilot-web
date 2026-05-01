import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "./HeaderNavigation";
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
            <HeaderNavigation />
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

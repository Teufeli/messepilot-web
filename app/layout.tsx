import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              MessePilot
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-slate-700 hover:text-slate-900">
                Home
              </Link>
              <Link href="/privacy" className="text-slate-700 hover:text-slate-900">
                Privacy
              </Link>
              <Link href="/support" className="text-slate-700 hover:text-slate-900">
                Support
              </Link>
            </nav>
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

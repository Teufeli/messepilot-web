import { WebsiteFooter } from "@/components/website/WebsiteFooter";
import { WebsiteHeader } from "@/components/website/WebsiteHeader";
import { WebsiteUsageHeartbeat } from "@/components/website/WebsiteUsageHeartbeat";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WebsiteHeader />
      <WebsiteUsageHeartbeat />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {children}
      </main>

      <WebsiteFooter />
    </>
  );
}

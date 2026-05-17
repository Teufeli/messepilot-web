import type { Metadata } from "next";

import { WebsiteHomePage } from "@/components/website/WebsiteHomePage";
import { getHomeContent } from "@/lib/website/homeContent";
import { websiteLocaleOrDefault } from "@/lib/website/i18n";

type LocalizedHomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const websiteLocale = websiteLocaleOrDefault(locale);
  const content = await getHomeContent(websiteLocale);

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
}

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale } = await params;
  const content = await getHomeContent(websiteLocaleOrDefault(locale));

  return <WebsiteHomePage content={content} />;
}

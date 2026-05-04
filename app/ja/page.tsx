import type { Metadata } from "next";

import { WebsiteHomePage } from "@/components/website/WebsiteHomePage";
import { getHomeContent } from "@/lib/website/homeContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent("ja");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
}

export default async function JapaneseHome() {
  const content = await getHomeContent("ja");

  return <WebsiteHomePage content={content} />;
}

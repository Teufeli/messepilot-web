import type { Metadata } from "next";

import { WebsiteHomePage } from "@/components/website/WebsiteHomePage";
import { getPublishedFairs } from "@/lib/fairs";
import { getHomeContent } from "@/lib/website/homeContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent("ja");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
}

export default async function JapaneseHome() {
  const [content, fairs] = await Promise.all([
    getHomeContent("ja"),
    getPublishedFairs(),
  ]);

  return <WebsiteHomePage content={content} fairs={fairs} />;
}

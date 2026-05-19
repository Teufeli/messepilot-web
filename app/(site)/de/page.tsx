import type { Metadata } from "next";

import { WebsiteHomePage } from "@/components/website/WebsiteHomePage";
import { getPublishedFairs } from "@/lib/fairs";
import { getHomeContent } from "@/lib/website/homeContent";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent("de");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
}

export default async function GermanHome() {
  const [content, fairs] = await Promise.all([
    getHomeContent("de"),
    getPublishedFairs(),
  ]);

  return <WebsiteHomePage content={content} fairs={fairs} />;
}

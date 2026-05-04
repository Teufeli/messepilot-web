import type { Metadata } from "next";

import { WebsiteHomePage } from "@/components/website/WebsiteHomePage";
import { getHomeContent } from "@/lib/website/homeContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomeContent("en");

  return {
    title: content.seoTitle,
    description: content.seoDescription,
  };
}

export default async function Home() {
  const content = await getHomeContent("en");

  return <WebsiteHomePage content={content} />;
}

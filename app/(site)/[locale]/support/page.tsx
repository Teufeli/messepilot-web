import type { Metadata } from "next";

import { SupportPageContent } from "@/components/website/SupportPageContent";
import { getSupportPageCopy } from "@/lib/website/staticPageCopy";

type LocalizedSupportPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: LocalizedSupportPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = getSupportPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function LocalizedSupportPage({
  params,
}: LocalizedSupportPageProps) {
  const { locale } = await params;

  return <SupportPageContent copy={getSupportPageCopy(locale)} />;
}

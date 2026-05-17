import type { Metadata } from "next";

import { PrivacyPageContent } from "@/components/website/PrivacyPageContent";
import { getPrivacyPageCopy } from "@/lib/website/staticPageCopy";

type LocalizedPrivacyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: LocalizedPrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPrivacyPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function LocalizedPrivacyPage({
  params,
}: LocalizedPrivacyPageProps) {
  const { locale } = await params;

  return <PrivacyPageContent copy={getPrivacyPageCopy(locale)} />;
}

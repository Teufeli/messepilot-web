import type { Metadata } from "next";

import { PrivacyPageContent } from "@/components/website/PrivacyPageContent";
import { getPrivacyPageCopy } from "@/lib/website/staticPageCopy";

const copy = getPrivacyPageCopy("ja");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default function JapanesePrivacyPage() {
  return <PrivacyPageContent copy={copy} />;
}

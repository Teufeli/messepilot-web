import type { Metadata } from "next";

import { PrivacyPageContent } from "@/components/website/PrivacyPageContent";
import { getPrivacyPageCopy } from "@/lib/website/staticPageCopy";

const copy = getPrivacyPageCopy("de");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default function GermanPrivacyPage() {
  return <PrivacyPageContent copy={copy} />;
}

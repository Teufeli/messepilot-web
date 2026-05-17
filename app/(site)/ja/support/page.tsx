import type { Metadata } from "next";

import { SupportPageContent } from "@/components/website/SupportPageContent";
import { getSupportPageCopy } from "@/lib/website/staticPageCopy";

const copy = getSupportPageCopy("ja");

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
};

export default function JapaneseSupportPage() {
  return <SupportPageContent copy={copy} />;
}

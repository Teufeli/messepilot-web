import { NextResponse } from "next/server";

import { getWebsiteNavigationContent } from "@/lib/website/navigationContent";
import {
  defaultWebsiteLocale,
  isWebsiteLocale,
  type WebsiteLocale,
} from "@/lib/website/homeContent";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLocale = searchParams.get("locale") ?? defaultWebsiteLocale;

  const locale: WebsiteLocale = isWebsiteLocale(requestedLocale)
    ? requestedLocale
    : defaultWebsiteLocale;

  const navigation = await getWebsiteNavigationContent(locale);

  return NextResponse.json({ navigation });
}

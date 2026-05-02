import { NextResponse } from "next/server";
import { getWebsiteLanguages } from "@/lib/websiteLanguages";

export const dynamic = "force-dynamic";

export async function GET() {
  const languages = await getWebsiteLanguages();

  return NextResponse.json({
    languages,
  });
}

import {
  collection,
  doc,
  getDocs,
} from "firebase/firestore/lite";
import { db } from "./firebase";

export type PublicHelpCenterFAQ = {
  faqId: string;
  languageCode: string;
  sourceLanguageCode: string;
  usedFallbackLanguage: boolean;
  groupKey: string;
  groupTitle?: string;
  groupSortOrder?: number;
  categoryKey: string;
  categoryTitle?: string;
  categorySortOrder?: number;
  sortOrder?: number;
  question?: string;
  shortAnswer?: string;
  answer?: string;
  media?: unknown[];
  publicUpdatedAt?: unknown;
};

export type WebsiteFAQItem = {
  question: string;
  answer: string;
};

export type WebsiteFAQCategory = {
  title: string;
  items: WebsiteFAQItem[];
};

export type WebsiteFAQSection = {
  group: string;
  categories: WebsiteFAQCategory[];
};

const helpCenterPublishedDoc = doc(db, "publicContent", "helpCenterPublished");

function normalizeLanguageCode(languageCode: string): string {
  const trimmed = languageCode.trim().toLowerCase();
  return trimmed || "en";
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

type CategoryGroup = {
  categoryKey: string;
  categoryTitle: string;
  categorySortOrder: number;
  faqs: PublicHelpCenterFAQ[];
};

type SectionGroup = {
  groupKey: string;
  groupTitle: string;
  groupSortOrder: number;
  categories: Map<string, CategoryGroup>;
};

function compareText(a: string, b: string): number {
  return a.localeCompare(b);
}

function compareFaqs(a: PublicHelpCenterFAQ, b: PublicHelpCenterFAQ): number {
  return (
    numberValue(a.sortOrder) - numberValue(b.sortOrder) ||
    compareText(a.faqId, b.faqId)
  );
}

async function getWebsiteFAQSectionsForLanguage(
  normalizedLanguageCode: string,
): Promise<WebsiteFAQSection[]> {
  const faqsSnapshot = await getDocs(
    collection(
      helpCenterPublishedDoc,
      "languages",
      normalizedLanguageCode,
      "faqs",
    ),
  );

  const sections = new Map<string, SectionGroup>();

  for (const document of faqsSnapshot.docs) {
    const faq = {
      faqId: document.id,
      ...document.data(),
    } as PublicHelpCenterFAQ;
    const question = stringValue(faq.question);
    const answer = stringValue(faq.answer);

    if (!question || !answer) {
      continue;
    }

    const groupKey = stringValue(faq.groupKey);
    const categoryKey = stringValue(faq.categoryKey);

    if (!groupKey || !categoryKey) {
      continue;
    }

    if (!sections.has(groupKey)) {
      sections.set(groupKey, {
        groupKey,
        groupTitle: stringValue(faq.groupTitle) || groupKey,
        groupSortOrder: numberValue(faq.groupSortOrder),
        categories: new Map(),
      });
    }

    const section = sections.get(groupKey)!;

    if (!section.categories.has(categoryKey)) {
      section.categories.set(categoryKey, {
        categoryKey,
        categoryTitle: stringValue(faq.categoryTitle) || categoryKey,
        categorySortOrder: numberValue(faq.categorySortOrder),
        faqs: [],
      });
    }

    section.categories.get(categoryKey)!.faqs.push({
      ...faq,
      question,
      answer,
    });
  }

  return [...sections.values()]
    .sort(
      (a, b) =>
        a.groupSortOrder - b.groupSortOrder ||
        compareText(a.groupKey, b.groupKey),
    )
    .map((section) => ({
      group: section.groupTitle,
      categories: [...section.categories.values()]
        .sort(
          (a, b) =>
            a.categorySortOrder - b.categorySortOrder ||
            compareText(a.categoryKey, b.categoryKey),
        )
        .map((category) => ({
          title: category.categoryTitle,
          items: category.faqs.sort(compareFaqs).map((faq) => ({
            question: stringValue(faq.question),
            answer: stringValue(faq.answer),
          })),
        })),
    }))
    .filter((section) => section.categories.length > 0);
}

export async function getWebsiteFAQSections(
  languageCode: string,
): Promise<WebsiteFAQSection[]> {
  const requestedLanguageCode = normalizeLanguageCode(languageCode);
  const fallbackLanguageCodes = [...new Set([requestedLanguageCode, "en", "de"])];

  for (const fallbackLanguageCode of fallbackLanguageCodes) {
    const sections = await getWebsiteFAQSectionsForLanguage(fallbackLanguageCode);
    if (sections.length > 0) {
      return sections;
    }
  }

  return [];
}

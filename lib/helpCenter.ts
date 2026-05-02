import {
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "./firebase";

export type HelpCenterTranslation = {
  title?: string;
  question?: string;
  shortAnswer?: string;
  answer?: string;
  status?: string;
};

export type HelpCenterGroup = {
  groupKey: string;
  sortOrder: number;
  status: string;
  translations: Record<string, HelpCenterTranslation>;
};

export type HelpCenterCategory = {
  categoryKey: string;
  groupKey: string;
  sortOrder: number;
  status: string;
  translations: Record<string, HelpCenterTranslation>;
};

export type HelpCenterFAQ = {
  faqId: string;
  groupKey: string;
  categoryKey: string;
  sortOrder: number;
  status: string;
  translations: Record<string, HelpCenterTranslation>;
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

const helpCenterDoc = doc(db, "publicContent", "helpCenter");

function translationTitle(
  translations: Record<string, HelpCenterTranslation> | undefined,
  languageCode: string,
): string | undefined {
  return (
    translations?.[languageCode]?.title ||
    translations?.en?.title
  );
}

function faqTranslation(
  translations: Record<string, HelpCenterTranslation> | undefined,
  languageCode: string,
): HelpCenterTranslation | undefined {
  const current = translations?.[languageCode];
  if (current?.status === "published" && current.question && current.answer) {
    return current;
  }

  const fallback = translations?.en;
  if (fallback?.status === "published" && fallback.question && fallback.answer) {
    return fallback;
  }

  return undefined;
}

export async function getWebsiteFAQSections(
  languageCode: string,
): Promise<WebsiteFAQSection[]> {
  const groupsSnapshot = await getDocs(
    query(collection(helpCenterDoc, "groups"), where("status", "==", "published")),
  );

  const categoriesSnapshot = await getDocs(
    query(collection(helpCenterDoc, "categories"), where("status", "==", "published")),
  );

  const faqsSnapshot = await getDocs(
    query(collection(helpCenterDoc, "faqs"), where("status", "==", "published")),
  );

  const groups = (groupsSnapshot.docs.map((document) => ({
    groupKey: document.id,
    ...document.data(),
  })) as HelpCenterGroup[])
    .sort((a, b) => a.sortOrder - b.sortOrder || a.groupKey.localeCompare(b.groupKey));

  const categories = (categoriesSnapshot.docs.map((document) => ({
    categoryKey: document.id,
    ...document.data(),
  })) as HelpCenterCategory[])
    .sort((a, b) => a.sortOrder - b.sortOrder || a.categoryKey.localeCompare(b.categoryKey));

  const faqs = (faqsSnapshot.docs.map((document) => ({
    faqId: document.id,
    ...document.data(),
  })) as HelpCenterFAQ[])
    .sort((a, b) => a.sortOrder - b.sortOrder || a.faqId.localeCompare(b.faqId));

  return groups
    .map((group) => {
      const groupTitle = translationTitle(group.translations, languageCode);
      if (!groupTitle) {
        return null;
      }

      const groupCategories = categories
        .filter((category) => category.groupKey === group.groupKey)
        .map((category) => {
          const categoryTitle = translationTitle(
            category.translations,
            languageCode,
          );

          if (!categoryTitle) {
            return null;
          }

          const items = faqs
            .filter(
              (faq) =>
                faq.groupKey === group.groupKey &&
                faq.categoryKey === category.categoryKey,
            )
            .map((faq) => {
              const translation = faqTranslation(faq.translations, languageCode);

              if (!translation?.question || !translation.answer) {
                return null;
              }

              return {
                question: translation.question,
                answer: translation.answer,
              };
            })
            .filter((item): item is WebsiteFAQItem => Boolean(item));

          if (items.length === 0) {
            return null;
          }

          return {
            title: categoryTitle,
            items,
          };
        })
        .filter((category): category is WebsiteFAQCategory => Boolean(category));

      if (groupCategories.length === 0) {
        return null;
      }

      return {
        group: groupTitle,
        categories: groupCategories,
      };
    })
    .filter((section): section is WebsiteFAQSection => Boolean(section));
}

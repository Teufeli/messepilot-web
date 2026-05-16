import {
  fairCategoryLabelById,
  publicFairCategoryIds,
  type WebsiteFair,
  type WebsiteFairCategory,
} from "@/lib/fairs";
import type { FairPageCopy } from "@/lib/website/fairCopy";

type FairCategoryChipsProps = {
  fair: WebsiteFair;
  categories: WebsiteFairCategory[];
  locale: string;
  copy: FairPageCopy;
};

function sameCategoryId(a: string | undefined, b: string): boolean {
  return a?.trim().toLowerCase() === b.trim().toLowerCase();
}

export function FairCategoryChips({
  fair,
  categories,
  locale,
  copy,
}: FairCategoryChipsProps) {
  const categoryIds = publicFairCategoryIds(fair.categoryIds);

  if (categoryIds.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-950">
        {copy.categories}
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {categoryIds.map((categoryId) => {
          const isPrimary = sameCategoryId(fair.primaryCategoryId, categoryId);

          return (
            <span
              key={categoryId}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                isPrimary
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-700",
              ].join(" ")}
            >
              {fairCategoryLabelById(categoryId, categories, locale)}
            </span>
          );
        })}
      </div>
    </section>
  );
}

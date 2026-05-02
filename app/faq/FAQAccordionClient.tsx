"use client";

import { useState } from "react";
import type { WebsiteFAQSection } from "@/lib/helpCenter";

type FAQAccordionClientProps = {
  sections: WebsiteFAQSection[];
};

export default function FAQAccordionClient({
  sections,
}: FAQAccordionClientProps) {
  const [openItemKey, setOpenItemKey] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.group} className="space-y-5">
          <h2 className="text-2xl font-semibold text-slate-950">
            {section.group}
          </h2>

          <div className="space-y-6">
            {section.categories.map((category) => (
              <div
                key={`${section.group}-${category.title}`}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {category.title}
                </h3>

                <div className="mt-4 divide-y divide-slate-200">
                  {category.items.map((item, index) => {
                    const itemKey = `${section.group}-${category.title}-${index}-${item.question}`;
                    const isOpen = openItemKey === itemKey;

                    return (
                      <div key={itemKey} className="py-4 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenItemKey(isOpen ? null : itemKey)
                          }
                          className="flex w-full items-start justify-between gap-4 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="text-base font-semibold text-slate-950">
                            {item.question}
                          </span>

                          <span
                            className={[
                              "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition",
                              isOpen
                                ? "rotate-45 bg-slate-950 text-white"
                                : "bg-white",
                            ].join(" ")}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </button>

                        {isOpen ? (
                          <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                            {item.answer}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

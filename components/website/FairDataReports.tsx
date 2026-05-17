"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  fairCategoryLabelById,
  publicFairCategoryIds,
  type WebsiteFair,
  type WebsiteFairCategory,
} from "@/lib/fairs";
import {
  makeFairDataReportClientRequestId,
  submitFairDataReport,
  type FairDataReportType,
  type SubmitFairDataReportPayload,
} from "@/lib/fairDataReports";
import type { FairDataReportCopy } from "@/lib/website/fairCopy";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type FairDataReportSharedProps = {
  copy: FairDataReportCopy;
  locale: string;
};

type ExistingFairCorrectionReportProps = FairDataReportSharedProps & {
  fair: WebsiteFair;
  categories: WebsiteFairCategory[];
};

type MissingFairSuggestionReportProps = FairDataReportSharedProps & {
  initialFairName?: string;
  variant?: "inline" | "empty";
};

const reportTypes: FairDataReportType[] = [
  "date",
  "location",
  "organizer",
  "officialWebsite",
  "categories",
  "description",
  "status",
  "duplicate",
  "other",
];

const textLimits = {
  message: 1200,
  correctedValue: 500,
  contactEmail: 254,
  fairName: 160,
  city: 120,
  country: 120,
  dateText: 160,
  venue: 160,
  url: 500,
  organizer: 160,
  note: 1200,
};

function cleanText(value: string, maxLength: number): string | undefined {
  const trimmed = value.replace(/\p{C}/gu, "").trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

function compactPayload(
  payload: Record<string, unknown>,
): SubmitFairDataReportPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null;
    }),
  );
}

function isValidOptionalEmail(value: string): boolean {
  const email = value.trim();
  if (!email) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidOptionalHttpUrl(value: string): boolean {
  const urlValue = value.trim();
  if (!urlValue) {
    return true;
  }

  try {
    const url = new URL(urlValue);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function reportedUrl(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.href;
}

function optionalWebsiteVersion(): string | undefined {
  return cleanText(
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ??
      "",
    120,
  );
}

function isoDate(date: Date | null): string | undefined {
  return date ? date.toISOString().slice(0, 10) : undefined;
}

function fairSnapshot(
  fair: WebsiteFair,
  categories: WebsiteFairCategory[],
  locale: string,
) {
  const categoryIds = publicFairCategoryIds(fair.categoryIds);
  const categoryLabels = categoryIds.map((categoryId) =>
    fairCategoryLabelById(categoryId, categories, locale),
  );

  return compactPayload({
    name: cleanText(fair.name, 200),
    startDate: isoDate(fair.startDate),
    endDate: isoDate(fair.endDate),
    city: cleanText(fair.city, 120),
    countryISO: cleanText(fair.countryISO, 12),
    officialWebsite: cleanText(fair.officialWebsite ?? "", textLimits.url),
    organizerName: cleanText(fair.organizerName ?? "", textLimits.organizer),
    categoryIds,
    categoryLabels,
  });
}

function StatusMessage({
  state,
  copy,
}: {
  state: SubmissionState;
  copy: FairDataReportCopy;
}) {
  if (state === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
        role="status"
      >
        <p className="font-semibold">{copy.result.successTitle}</p>
        <p className="mt-1 leading-6">{copy.result.successText}</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div
        className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900"
        role="alert"
      >
        <p className="font-semibold">{copy.result.errorTitle}</p>
        <p className="mt-1 leading-6">{copy.result.errorText}</p>
      </div>
    );
  }

  return null;
}

function FieldLabel({
  label,
  optional,
}: {
  label: string;
  optional?: string;
}) {
  return (
    <span className="text-sm font-semibold text-slate-800">
      {label}
      {optional ? (
        <span className="font-medium text-slate-500"> ({optional})</span>
      ) : null}
    </span>
  );
}

function FormActions({
  copy,
  state,
  onCancel,
}: {
  copy: FairDataReportCopy;
  state: SubmissionState;
  onCancel: () => void;
}) {
  if (state === "success") {
    return (
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        {copy.form.close}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copy.form.submit}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={state === "submitting"}
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copy.form.cancel}
      </button>
    </div>
  );
}

export function FairDataDisclaimerNotice({
  copy,
}: {
  copy: FairDataReportCopy["disclaimer"];
}) {
  return (
    <aside className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm leading-6 text-blue-950">
      <p className="font-semibold">{copy.title}</p>
      <p className="mt-1">{copy.text}</p>
    </aside>
  );
}

export function ExistingFairCorrectionReport({
  fair,
  categories,
  locale,
  copy,
}: ExistingFairCorrectionReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reportType, setReportType] = useState<FairDataReportType>("other");
  const [message, setMessage] = useState("");
  const [correctedValue, setCorrectedValue] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [clientRequestId, setClientRequestId] = useState(
    makeFairDataReportClientRequestId,
  );

  const resetForm = () => {
    setReportType("other");
    setMessage("");
    setCorrectedValue("");
    setContactEmail("");
    setHoneypot("");
    setState("idle");
    setValidationMessage(null);
    setClientRequestId(makeFairDataReportClientRequestId());
  };

  const closeForm = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage(null);

    if (!isValidOptionalEmail(contactEmail)) {
      setValidationMessage(copy.form.invalidEmail);
      return;
    }

    if (honeypot.trim()) {
      setState("success");
      return;
    }

    setState("submitting");

    try {
      await submitFairDataReport(
        compactPayload({
          reportKind: "existingFairCorrection",
          source: "website",
          locale,
          clientRequestId,
          fairId: fair.id,
          reportType,
          message: cleanText(message, textLimits.message),
          correctedValue: cleanText(correctedValue, textLimits.correctedValue),
          contactEmail: cleanText(contactEmail, textLimits.contactEmail),
          reportedUrl: reportedUrl(),
          fairSnapshot: fairSnapshot(fair, categories, locale),
          websiteVersion: optionalWebsiteVersion(),
        }),
      );
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="space-y-4">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          {copy.existing.action}
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              {copy.existing.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {copy.existing.intro}
            </p>
          </div>

          <input
            type="text"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label className="grid gap-1.5">
            <FieldLabel label={copy.form.reportType} />
            <select
              value={reportType}
              onChange={(event) =>
                setReportType(event.target.value as FairDataReportType)
              }
              className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            >
              {reportTypes.map((type) => (
                <option key={type} value={type}>
                  {copy.reportType[type]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5">
            <FieldLabel label={copy.form.message} optional={copy.form.optional} />
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={textLimits.message}
              placeholder={copy.form.messagePlaceholder}
              className="min-h-28 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </label>

          <label className="grid gap-1.5">
            <FieldLabel
              label={copy.form.correctedValue}
              optional={copy.form.optional}
            />
            <input
              type="text"
              value={correctedValue}
              onChange={(event) => setCorrectedValue(event.target.value)}
              maxLength={textLimits.correctedValue}
              className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </label>

          <label className="grid gap-1.5">
            <FieldLabel
              label={copy.form.contactEmail}
              optional={copy.form.optional}
            />
            <input
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              maxLength={textLimits.contactEmail}
              className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </label>

          {validationMessage ? (
            <p className="text-sm font-medium text-rose-700" role="alert">
              {validationMessage}
            </p>
          ) : null}

          <StatusMessage state={state} copy={copy} />
          <FormActions copy={copy} state={state} onCancel={closeForm} />
        </form>
      )}
    </section>
  );
}

export function MissingFairSuggestionReport({
  locale,
  copy,
  initialFairName = "",
  variant = "inline",
}: MissingFairSuggestionReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedFairName, setSuggestedFairName] = useState("");
  const [suggestedCity, setSuggestedCity] = useState("");
  const [suggestedCountryName, setSuggestedCountryName] = useState("");
  const [suggestedStartDate, setSuggestedStartDate] = useState("");
  const [suggestedEndDate, setSuggestedEndDate] = useState("");
  const [suggestedDateText, setSuggestedDateText] = useState("");
  const [suggestedVenueName, setSuggestedVenueName] = useState("");
  const [suggestedOfficialWebsite, setSuggestedOfficialWebsite] = useState("");
  const [suggestedOrganizerName, setSuggestedOrganizerName] = useState("");
  const [suggestedSourceUrl, setSuggestedSourceUrl] = useState("");
  const [note, setNote] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [clientRequestId, setClientRequestId] = useState(
    makeFairDataReportClientRequestId,
  );

  const suggestedInitialName = useMemo(
    () => cleanText(initialFairName, textLimits.fairName) ?? "",
    [initialFairName],
  );

  const resetForm = () => {
    setSuggestedFairName("");
    setSuggestedCity("");
    setSuggestedCountryName("");
    setSuggestedStartDate("");
    setSuggestedEndDate("");
    setSuggestedDateText("");
    setSuggestedVenueName("");
    setSuggestedOfficialWebsite("");
    setSuggestedOrganizerName("");
    setSuggestedSourceUrl("");
    setNote("");
    setContactEmail("");
    setHoneypot("");
    setState("idle");
    setValidationMessage(null);
    setClientRequestId(makeFairDataReportClientRequestId());
  };

  const openForm = () => {
    if (!suggestedFairName.trim() && suggestedInitialName) {
      setSuggestedFairName(suggestedInitialName);
    }
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage(null);

    if (!cleanText(suggestedFairName, textLimits.fairName) || !cleanText(suggestedCity, textLimits.city)) {
      setValidationMessage(copy.form.requiredHint);
      return;
    }

    if (!isValidOptionalEmail(contactEmail)) {
      setValidationMessage(copy.form.invalidEmail);
      return;
    }

    if (
      !isValidOptionalHttpUrl(suggestedOfficialWebsite) ||
      !isValidOptionalHttpUrl(suggestedSourceUrl)
    ) {
      setValidationMessage(copy.form.invalidUrl);
      return;
    }

    if (honeypot.trim()) {
      setState("success");
      return;
    }

    setState("submitting");

    try {
      await submitFairDataReport(
        compactPayload({
          reportKind: "missingFairSuggestion",
          source: "website",
          locale,
          clientRequestId,
          suggestedFairName: cleanText(suggestedFairName, textLimits.fairName),
          suggestedCity: cleanText(suggestedCity, textLimits.city),
          suggestedCountryName: cleanText(suggestedCountryName, textLimits.country),
          suggestedStartDate: cleanText(suggestedStartDate, 10),
          suggestedEndDate: cleanText(suggestedEndDate, 10),
          suggestedDateText: cleanText(suggestedDateText, textLimits.dateText),
          suggestedVenueName: cleanText(suggestedVenueName, textLimits.venue),
          suggestedOfficialWebsite: cleanText(
            suggestedOfficialWebsite,
            textLimits.url,
          ),
          suggestedOrganizerName: cleanText(
            suggestedOrganizerName,
            textLimits.organizer,
          ),
          suggestedSourceUrl: cleanText(suggestedSourceUrl, textLimits.url),
          note: cleanText(note, textLimits.note),
          contactEmail: cleanText(contactEmail, textLimits.contactEmail),
          reportedUrl: reportedUrl(),
          websiteVersion: optionalWebsiteVersion(),
        }),
      );
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <section
      className={[
        "space-y-4",
        variant === "empty"
          ? "rounded-2xl border border-slate-200 bg-white p-4"
          : "",
      ].join(" ")}
    >
      {!isOpen ? (
        <div className="space-y-2">
          {variant === "empty" ? (
            <p className="text-sm leading-6 text-slate-600">
              {copy.missing.intro}
            </p>
          ) : null}
          <button
            type="button"
            onClick={openForm}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            {copy.missing.action}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              {copy.missing.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {copy.missing.helper}
            </p>
          </div>

          <input
            type="text"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.fairName} />
              <input
                type="text"
                value={suggestedFairName}
                onChange={(event) => setSuggestedFairName(event.target.value)}
                maxLength={textLimits.fairName}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.city} />
              <input
                type="text"
                value={suggestedCity}
                onChange={(event) => setSuggestedCity(event.target.value)}
                maxLength={textLimits.city}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.country} optional={copy.form.optional} />
              <input
                type="text"
                value={suggestedCountryName}
                onChange={(event) => setSuggestedCountryName(event.target.value)}
                maxLength={textLimits.country}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.dateText} optional={copy.form.optional} />
              <input
                type="text"
                value={suggestedDateText}
                onChange={(event) => setSuggestedDateText(event.target.value)}
                maxLength={textLimits.dateText}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.startDate} optional={copy.form.optional} />
              <input
                type="date"
                value={suggestedStartDate}
                onChange={(event) => setSuggestedStartDate(event.target.value)}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.endDate} optional={copy.form.optional} />
              <input
                type="date"
                value={suggestedEndDate}
                onChange={(event) => setSuggestedEndDate(event.target.value)}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.venue} optional={copy.form.optional} />
              <input
                type="text"
                value={suggestedVenueName}
                onChange={(event) => setSuggestedVenueName(event.target.value)}
                maxLength={textLimits.venue}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel
                label={copy.form.officialWebsite}
                optional={copy.form.optional}
              />
              <input
                type="url"
                value={suggestedOfficialWebsite}
                onChange={(event) =>
                  setSuggestedOfficialWebsite(event.target.value)
                }
                maxLength={textLimits.url}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.organizer} optional={copy.form.optional} />
              <input
                type="text"
                value={suggestedOrganizerName}
                onChange={(event) => setSuggestedOrganizerName(event.target.value)}
                maxLength={textLimits.organizer}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>

            <label className="grid gap-1.5">
              <FieldLabel label={copy.form.sourceUrl} optional={copy.form.optional} />
              <input
                type="url"
                value={suggestedSourceUrl}
                onChange={(event) => setSuggestedSourceUrl(event.target.value)}
                maxLength={textLimits.url}
                className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
              />
            </label>
          </div>

          <label className="grid gap-1.5">
            <FieldLabel label={copy.form.note} optional={copy.form.optional} />
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={textLimits.note}
              className="min-h-28 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </label>

          <label className="grid gap-1.5">
            <FieldLabel label={copy.form.contactEmail} optional={copy.form.optional} />
            <input
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              maxLength={textLimits.contactEmail}
              className="min-h-11 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
            />
          </label>

          {validationMessage ? (
            <p className="text-sm font-medium text-rose-700" role="alert">
              {validationMessage}
            </p>
          ) : null}

          <StatusMessage state={state} copy={copy} />
          <FormActions copy={copy} state={state} onCancel={closeForm} />
        </form>
      )}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import { app } from "@/lib/firebase";

const heartbeatStorageKey = "messepilot.websiteUsage.sessionId";
const heartbeatIntervalMs = 60_000;

type UsageHeartbeatPayload = {
  platform: "web";
  presenceStatus: "active" | "inactive";
  countryISO: string;
  appVersion: string;
  buildNumber: string;
  sessionId: string;
};

type UsageHeartbeatResult = {
  ok: boolean;
};

let functionsInstance: ReturnType<typeof getFunctions> | null = null;

function firebaseFunctions() {
  functionsInstance ??= getFunctions(app, "us-central1");
  return functionsInstance;
}

function randomSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return [
    Date.now().toString(36),
    Math.random().toString(36).slice(2),
    Math.random().toString(36).slice(2),
  ].join("-");
}

function sessionId(): string {
  try {
    const stored = window.localStorage.getItem(heartbeatStorageKey);
    if (stored && stored.length >= 16) {
      return stored;
    }

    const nextSessionId = randomSessionId();
    window.localStorage.setItem(heartbeatStorageKey, nextSessionId);
    return nextSessionId;
  } catch {
    return randomSessionId();
  }
}

function countryISO(): string {
  const locale = navigator.languages?.[0] ?? navigator.language ?? "";
  const region = locale.match(/[-_]([A-Za-z]{2})\b/)?.[1]?.toUpperCase() ?? "";
  return region.length === 2 ? region : "unknown";
}

async function sendHeartbeat(
  sessionIdValue: string,
  presenceStatus: UsageHeartbeatPayload["presenceStatus"],
) {
  const callable = httpsCallable<UsageHeartbeatPayload, UsageHeartbeatResult>(
    firebaseFunctions(),
    "recordUsageHeartbeat",
  );

  await callable({
    platform: "web",
    presenceStatus,
    countryISO: countryISO(),
    appVersion: "website",
    buildNumber: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "",
    sessionId: sessionIdValue,
  });
}

export function WebsiteUsageHeartbeat() {
  const lastSentAtRef = useRef(0);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function heartbeat(
      presenceStatus: UsageHeartbeatPayload["presenceStatus"],
      force = false,
    ) {
      if (presenceStatus === "active" && document.visibilityState !== "visible") {
        return;
      }

      const now = Date.now();
      if (
        presenceStatus === "active" &&
        !force &&
        now - lastSentAtRef.current < heartbeatIntervalMs
      ) {
        return;
      }

      if (presenceStatus === "active") {
        lastSentAtRef.current = now;
      }
      sessionIdRef.current ??= sessionId();

      try {
        await sendHeartbeat(sessionIdRef.current, presenceStatus);
      } catch {
        // Presence is best effort and must not affect the public website.
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void heartbeat("active");
      } else {
        void heartbeat("inactive", true);
      }
    }

    function handlePageHide() {
      void heartbeat("inactive", true);
    }

    void heartbeat("active", true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    const intervalId = window.setInterval(() => {
      if (isMounted) {
        void heartbeat("active");
      }
    }, heartbeatIntervalMs);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}

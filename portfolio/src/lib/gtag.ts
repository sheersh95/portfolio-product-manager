export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    anonymize_ip: true,
  });
}

export function event(action: string, params?: EventParams) {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, params ?? {});
}

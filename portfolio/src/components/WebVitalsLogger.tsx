"use client";

import { useEffect } from "react";

export default function WebVitalsLogger() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    if (!("PerformanceObserver" in window)) return;

    const log = (name: string, value: number) => {
      // eslint-disable-next-line no-console
      console.log(`[WebVitals] ${name}:`, value);
    };

    const observers: PerformanceObserver[] = [];

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry | undefined;
        if (!last) return;
        log("LCP", last.startTime);
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true } as never);
      observers.push(lcpObserver);
    } catch {}

    try {
      let cls = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (entry?.hadRecentInput) continue;
          cls += entry?.value ?? 0;
        }
        log("CLS", cls);
      });
      clsObserver.observe({ type: "layout-shift", buffered: true } as never);
      observers.push(clsObserver);
    } catch {}

    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        const first = entries[0];
        if (!first) return;
        const fid = (first.processingStart ?? 0) - (first.startTime ?? 0);
        log("FID", fid);
      });
      fidObserver.observe({ type: "first-input", buffered: true } as never);
      observers.push(fidObserver);
    } catch {}

    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            log("FCP", entry.startTime);
          }
        }
      });
      paintObserver.observe({ type: "paint", buffered: true } as never);
      observers.push(paintObserver);
    } catch {}

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return null;
}

import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Suspense } from "react";

import Analytics from "@/components/Analytics";
import WebVitalsLogger from "@/components/WebVitalsLogger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sakshi-bhargava.com"),
  title: "Sakshi Bhargava | Product Manager | MBA @ Simon Business School",
  description:
    "Product Manager with 4+ years experience in B2B SaaS and supply chain technology. MBA candidate at Simon Business School specializing in Product Management.",
  keywords: [
    "Product Manager",
    "Supply Chain",
    "B2B SaaS",
    "MBA",
    "Logistics Technology",
    "Product Management",
    "WiseTech Global",
    "Blume Global",
  ],
  authors: [{ name: "Sakshi Bhargava" }],
  openGraph: {
    title: "Sakshi Bhargava | Product Manager | MBA @ Simon Business School",
    description:
      "Product Manager with 4+ years experience in B2B SaaS and supply chain technology. MBA candidate at Simon Business School specializing in Product Management.",
    url: "https://sakshi-bhargava.com",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakshi Bhargava | Product Manager | MBA @ Simon Business School",
    description:
      "Product Manager with 4+ years experience in B2B SaaS and supply chain technology. MBA candidate at Simon Business School specializing in Product Management.",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sakshi Bhargava",
    jobTitle: "Product Manager",
    url: "https://sakshi-bhargava.com",
    sameAs: ["https://linkedin.com/in/sakshi-s-bhargava"],
    alumniOf: ["Simon Business School", "Christ University"],
  };

  return (
    <html lang="en">
      <head>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { anonymize_ip: true });`,
              }}
            />
          </>
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-dark-navy focus:shadow focus:outline-none"
        >
          Skip to content
        </a>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {process.env.NODE_ENV === "development" ? <WebVitalsLogger /> : null}
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { poppins, inter } from "./fonts";
import { BUSINESS } from "./components/reviewsData";
import { buildLocalBusinessJsonLd, SITE_URL } from "./structuredData";
import "./globals.css";

const title = `${BUSINESS.name} Reviews | ${BUSINESS.aggregateRating}★ from ${BUSINESS.aggregateReviewCount}+ Customers`;
const description = `Read real, unfiltered customer reviews for ${BUSINESS.name} — ${BUSINESS.tagline.toLowerCase()}. See what Google, Yelp, and Nextdoor customers are saying.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${BUSINESS.name} Reviews`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${BUSINESS.name} Reviews`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#b21b41",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        {/* Google tag (gtag.js) — beforeInteractive injects this into the
            initial HTML <head>, same placement Google's own install
            instructions ask for. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-17HCMFY1J9"
          strategy="beforeInteractive"
        />
        <Script id="ga4-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-17HCMFY1J9');`}
        </Script>

        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

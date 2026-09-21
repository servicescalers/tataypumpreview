import type { Metadata, Viewport } from "next";
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
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

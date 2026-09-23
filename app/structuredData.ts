import { BUSINESS, PLATFORM_REVIEWS } from "./components/reviewsData";

export const SITE_URL = "https://www.tataypumpreviews.com";

function yelpIsoDate(date: string): string | undefined {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

export function buildLocalBusinessJsonLd() {
  const yelp = PLATFORM_REVIEWS.find((p) => p.key === "yelp")!.reviews;
  const google = PLATFORM_REVIEWS.find((p) => p.key === "google")!.reviews;

  // A small representative sample (not every review on the page), matching
  // how review platforms' own structured data behaves.
  const sampleReviews = [
    ...yelp.slice(0, 4),
    ...google.filter((r) => !r.quote.endsWith("…")).slice(0, 4),
  ].map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
    reviewRating: r.rating
      ? { "@type": "Rating", ratingValue: r.rating, bestRating: 5 }
      : undefined,
    ...(r.platform === "yelp" ? { datePublished: yelpIsoDate(r.date) } : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    image: `${SITE_URL}/brand/tatay-logo-horizontal.png`,
    telephone: BUSINESS.phoneHref.replace("tel:", ""),
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressLine1,
      addressLocality: "Granger",
      addressRegion: "IN",
      postalCode: "46530",
      addressCountry: "US",
    },
    areaServed: [
      "Granger, IN",
      "South Bend, IN",
      "Mishawaka, IN",
      "Elkhart, IN",
      "Goshen, IN",
      "New Carlisle, IN",
      "North Liberty, IN",
      "Osceola, IN",
      "Lakeville, IN",
      "Roseland, IN",
      "Bristol, IN",
      "Middlebury, IN",
      "Jimtown, IN",
      "Benton Harbor, MI",
      "St. Joseph, MI",
      "Bridgman, MI",
      "Buchanan, MI",
      "Coloma, MI",
      "Baroda, MI",
      "Berrien Springs, MI",
      "Niles, MI",
      "Cassopolis, MI",
      "Dowagiac, MI",
      "Edwardsburg, MI",
      "Marcellus, MI",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.aggregateRating,
      reviewCount: BUSINESS.aggregateReviewCount,
      bestRating: 5,
    },
    review: sampleReviews,
  };
}

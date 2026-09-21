import { googleReviews } from "./googleReviews";
import { yelpReviews } from "./yelpReviews";
import { nextdoorReviews } from "./nextdoorReviews";

export interface NormalizedReview {
  platform: "google" | "yelp" | "nextdoor";
  name: string;
  location?: string;
  quote: string;
  date: string;
  rating?: 5;
}

export interface PlatformConfig {
  key: "google" | "yelp" | "nextdoor";
  name: string;
  href: string;
  reviews: NormalizedReview[];
}

export const BUSINESS = {
  name: "Tatay Pump Services",
  legalName: "Tatay Pump Services, LLC",
  tagline: "Over 55 Years of Trusted Water Well & Pump Expertise",
  phone: "(574) 232-1006",
  phoneHref: "tel:+15742321006",
  email: "tataywell@me.com",
  addressLine1: "12871 Industrial Park Drive, Suite 5",
  addressLine2: "Granger, IN 46530",
  mainSiteUrl: "https://tataypump.com",
  // Google's own stated total on tataypump.com and its Google Business
  // Profile — not the count of reviews actually loaded on this page.
  aggregateRating: 4.9,
  aggregateReviewCount: 468,
} as const;

export const PLATFORM_REVIEWS: PlatformConfig[] = [
  {
    key: "google",
    name: "Google",
    href: "https://share.google/eiXLdfEl816CKEbk1",
    reviews: googleReviews.map((r) => ({
      platform: "google" as const,
      name: r.name,
      quote: r.quote,
      date: r.date,
      rating: r.rating,
    })),
  },
  {
    key: "yelp",
    name: "Yelp",
    href: "https://www.yelp.com/biz/tatay-pump-service-granger-8",
    reviews: yelpReviews.map((r) => ({
      platform: "yelp" as const,
      name: r.name,
      location: r.location,
      quote: r.quote,
      date: r.date,
    })),
  },
  {
    key: "nextdoor",
    name: "Nextdoor",
    href: "https://nextdoor.com/pages/tatay-pump-service-granger-in-1/",
    reviews: nextdoorReviews.map((r) => ({
      platform: "nextdoor" as const,
      name: r.name,
      location: r.location,
      quote: r.quote,
      date: r.date,
    })),
  },
];

// A representative sample across platforms for the hero carousel — favors
// complete (non-truncated) quotes so the rotating card never cuts off
// mid-sentence.
export const CAROUSEL_REVIEWS: NormalizedReview[] = [
  PLATFORM_REVIEWS[0].reviews.find((r) => !r.quote.endsWith("…") && r.quote.length > 80)!,
  PLATFORM_REVIEWS[1].reviews[5],
  PLATFORM_REVIEWS[0].reviews.filter((r) => !r.quote.endsWith("…") && r.quote.length > 80)[3],
  PLATFORM_REVIEWS[1].reviews[8],
  PLATFORM_REVIEWS[0].reviews.filter((r) => !r.quote.endsWith("…") && r.quote.length > 80)[6],
  PLATFORM_REVIEWS[2].reviews[0],
].filter(Boolean);

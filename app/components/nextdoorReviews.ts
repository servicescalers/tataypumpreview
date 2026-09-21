// Real, unedited customer language pasted directly from Tatay Pump Service's
// Nextdoor Recommendations page (fetched 2026-09-22).
// Nextdoor has no star rating — a "recommends" signal is used instead, per
// the platform's own review format.
// Loaded here: 2 of the 4 threads visible on the page. Excluded 2 that were
// not genuine reviews of Tatay: a neighbor asking "Anyone have a good plumber
// recommendation?" (a question, not feedback on Tatay) and a neighbor's DIY
// well-pressure troubleshooting advice (unrelated to Tatay's service). Both
// are real Nextdoor posts, just not reviews — flagged and dropped rather than
// silently included.
export interface NextdoorReview {
  name: string;
  location: string;
  quote: string;
  date: string;
  verifiedSince?: string;
}

export const nextdoorReviews: NextdoorReview[] = [
  {
    name: 'P. C.',
    location: 'Elkhart, IN',
    quote: 'Awesome people and wonderful job! Highly recommend!!',
    date: '18 Nov 23',
    verifiedSince: 'Verified in 2013',
  },
  {
    name: 'D. B.',
    location: 'Osceola, IN',
    quote: 'Agree. They installed the original pump 20+ years ago and recently replaced it.',
    date: '23 Nov 23',
    verifiedSince: 'Verified in 2017',
  },
];

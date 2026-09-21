// Inline SVG marks only — no "★" text glyph anywhere in this file. A star
// glyph forces next/og's Satori renderer to fetch a fallback font at build
// time, which fails in sandboxed/offline builds.

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

export function StarRow({ count = 5, className = "h-4 w-4 text-brand-red-light" }: { count?: number; className?: string }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </div>
  );
}

export function RecommendsBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18A13.96 13.96 0 0 1 10.95 24c0-1.45.25-2.86.74-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export function YelpMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#D32323" />
      <path
        fill="#fff"
        d="M23 12c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 1.8l-1.1 11.4c-.06.6-.56 1-1.16 1h-.46c-.6 0-1.1-.4-1.16-1L23 12z"
      />
      <path
        fill="#fff"
        d="M30.5 26.3c.9-.6 2.1-.3 2.6.6l.5.9c.55.96.2 2.17-.76 2.7l-6.6 3.7c-.68.4-1.53-.1-1.53-.9v-1c0-.5.27-.95.7-1.2l5.03-4.8z"
      />
      <path
        fill="#fff"
        d="M18.5 27.6c.5.9-.02 2.02-.98 2.28l-6.4 1.7c-.75.2-1.5-.35-1.5-1.13v-1.9c0-.6.4-1.1 1-1.27l6.4-1.7c1-.27 2 .3 2.2 1.3l-.72.72z"
      />
      <path
        fill="#fff"
        d="M17 20.6c.3 1-.34 2.02-1.36 2.13l-6.6.7c-.76.08-1.4-.55-1.3-1.3l.14-1c.1-.66.66-1.15 1.33-1.2l6.6-.5c1.02-.08 1.9.66 1.9 1.67l-.71-.5z"
      />
    </svg>
  );
}

export function NextdoorMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#8ED500" />
      <path
        fill="#fff"
        d="M16 16h4.2l7.4 9.9V16H32v18h-4.1l-7.5-10v10H16V16z"
      />
    </svg>
  );
}

export const PLATFORM_MARKS = {
  google: GoogleMark,
  yelp: YelpMark,
  nextdoor: NextdoorMark,
} as const;

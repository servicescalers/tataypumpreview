"use client";

import { useState } from "react";
import { CAROUSEL_REVIEWS } from "./reviewsData";
import { PLATFORM_MARKS, RecommendsBadge, StarRow } from "./reviewMarks";
import { useAutoRotate } from "./useAutoRotate";

const WORD_LIMIT = 42;

function truncateToWords(text: string, limit: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return { text, isTruncated: false };
  return { text: words.slice(0, limit).join(" ") + "…", isTruncated: true };
}

export default function ReviewsCarousel() {
  const { index, goTo, onMouseEnter, onMouseLeave, onFocus, onBlur } = useAutoRotate(
    CAROUSEL_REVIEWS.length,
    6500
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const review = CAROUSEL_REVIEWS[index];
  const Mark = PLATFORM_MARKS[review.platform];
  const isExpanded = expandedIndex === index;
  const { text: displayQuote, isTruncated } = truncateToWords(review.quote, WORD_LIMIT);

  function toggleExpand() {
    if (isExpanded) {
      setExpandedIndex(null);
      onBlur();
    } else {
      setExpandedIndex(index);
      onFocus();
    }
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-ink/10 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <Mark className="h-7 w-7" />
        {review.rating ? (
          <StarRow count={review.rating} className="h-5 w-5 text-brand-red-light" />
        ) : (
          <span className="flex items-center gap-1 text-xs font-semibold text-brand-navy">
            <RecommendsBadge className="h-4 w-4" />
            Recommends
          </span>
        )}
      </div>

      <p className="mt-5 min-h-[6.5rem] text-lg leading-relaxed text-ink sm:min-h-[7.5rem]">
        &ldquo;{isExpanded ? review.quote : displayQuote}&rdquo;
        {isTruncated && (
          <button
            onClick={toggleExpand}
            className="ml-1 inline text-sm font-semibold text-brand-red transition-colors hover:text-brand-navy focus:outline-none focus-visible:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
        <div>
          <p className="text-sm font-semibold text-ink">{review.name}</p>
          <p className="text-xs text-ink/50">{review.location ?? review.date}</p>
        </div>
        <span className="text-xs text-ink/40">{review.date}</span>
      </div>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Featured reviews">
        {CAROUSEL_REVIEWS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Show review ${i + 1}`}
            onClick={() => {
              setExpandedIndex(null);
              goTo(i);
            }}
            className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
              i === index ? "w-6 bg-brand-red" : "w-2 bg-ink/15 hover:bg-ink/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { PLATFORM_REVIEWS } from "./reviewsData";
import { PLATFORM_MARKS, RecommendsBadge, StarRow } from "./reviewMarks";

const PAGE_SIZE = 9;

export default function ReviewsGrid() {
  const [activeKey, setActiveKey] = useState(PLATFORM_REVIEWS[0].key);
  const [page, setPage] = useState(1);

  const active = PLATFORM_REVIEWS.find((p) => p.key === activeKey)!;
  const totalPages = Math.max(1, Math.ceil(active.reviews.length / PAGE_SIZE));
  const pageReviews = useMemo(
    () => active.reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [active, page]
  );

  function selectTab(key: typeof activeKey) {
    setActiveKey(key);
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Review platforms">
        {PLATFORM_REVIEWS.map((p) => {
          const Mark = PLATFORM_MARKS[p.key];
          const isActive = p.key === activeKey;
          return (
            <button
              key={p.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => selectTab(p.key)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                isActive
                  ? "bg-brand-navy text-white"
                  : "bg-surface-alt text-ink/70 hover:bg-ink/10"
              }`}
            >
              <Mark className="h-4 w-4" />
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageReviews.map((review, i) => {
          const Mark = PLATFORM_MARKS[review.platform];
          return (
            <article
              key={`${review.name}-${review.date}-${i}`}
              className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <Mark className="h-6 w-6" />
                {review.rating ? (
                  <StarRow count={review.rating} className="h-4 w-4 text-brand-red-light" />
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-navy">
                    <RecommendsBadge className="h-3.5 w-3.5" />
                    Recommends
                  </span>
                )}
              </div>
              <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-ink/80">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                <p className="text-sm font-semibold text-ink">{review.name}</p>
                <p className="text-xs text-ink/40">{review.date}</p>
              </div>
              {review.location && (
                <p className="mt-1 text-xs text-ink/40">{review.location}</p>
              )}
            </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-ink/70 ring-1 ring-ink/10 transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-ink/70 ring-1 ring-ink/10 transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

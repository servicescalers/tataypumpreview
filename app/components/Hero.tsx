import { BUSINESS } from "./reviewsData";
import { StarRow } from "./reviewMarks";
import ReviewsCarousel from "./ReviewsCarousel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-light">
            {BUSINESS.name} &middot; Real Customer Reviews
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
            Trusted by Homes Across Michiana
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
            {BUSINESS.tagline} — browse real reviews from Google, Yelp, and
            Nextdoor before you call.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <StarRow count={5} className="h-6 w-6 text-brand-red-light" />
            <p className="text-white">
              <span className="text-2xl font-extrabold">{BUSINESS.aggregateRating}</span>
              <span className="text-white/60"> / 5 from </span>
              <span className="font-semibold">{BUSINESS.aggregateReviewCount}</span>
              <span className="text-white/60"> Google reviews</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={BUSINESS.phoneHref}
              className="flex h-12 items-center justify-center rounded-full bg-brand-red px-7 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] hover:bg-brand-red-light"
            >
              Call {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Visit Main Site
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <ReviewsCarousel />
        </div>
      </div>
    </section>
  );
}

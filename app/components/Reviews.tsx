import { BUSINESS } from "./reviewsData";
import ReviewsGrid from "./ReviewsGrid";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            Real Feedback
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            What Our Customers Are Saying
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60">
            Every quote below is unedited customer language, pulled directly
            from {BUSINESS.name}&apos;s public review pages.
          </p>
        </div>

        <div className="mt-12">
          <ReviewsGrid />
        </div>
      </div>
    </section>
  );
}

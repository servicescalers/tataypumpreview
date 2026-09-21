import { BUSINESS } from "./reviewsData";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-red py-16 md:py-20">
      {/* diagonal brand-color sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #8a1332 0%, var(--brand-red) 32%, var(--brand-red) 55%, #d43a63 78%, var(--brand-red) 100%)",
        }}
      />
      {/* glow accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 90% 0%, rgba(17,44,74,0.55), transparent 60%), radial-gradient(ellipse 50% 60% at 5% 100%, rgba(255,102,140,0.4), transparent 55%)",
        }}
      />
      {/* fine dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* top & bottom hairline glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          Need Help With Your Well or Pump?
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-white/85">
          Same-day service, 24/7 live call answering, and 55+ years of
          well &amp; pump expertise across Northern Indiana and Southwest
          Michigan.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-brand-red shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]"
          >
            Call {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.mainSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}

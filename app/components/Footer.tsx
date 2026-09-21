import Image from "next/image";
import { BUSINESS, PLATFORM_REVIEWS } from "./reviewsData";
import { PLATFORM_MARKS } from "./reviewMarks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy py-14 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-flex rounded-xl bg-white p-2.5">
            <Image
              src="/brand/tatay-logo-horizontal.png"
              alt={BUSINESS.name}
              width={160}
              height={72}
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {BUSINESS.tagline}
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={BUSINESS.phoneHref} className="transition-colors hover:text-white">
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-white">
                {BUSINESS.email}
              </a>
            </li>
            <li>{BUSINESS.addressLine1}</li>
            <li>{BUSINESS.addressLine2}</li>
            <li>
              <a
                href={BUSINESS.mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                tataypump.com
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-white">Read More Reviews</p>
          <ul className="mt-3 space-y-2">
            {PLATFORM_REVIEWS.map((p) => {
              const Mark = PLATFORM_MARKS[p.key];
              return (
                <li key={p.key}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mark className="h-4 w-4" />
                    {p.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs text-white/40 sm:px-6">
        <p>
          &copy; {year} {BUSINESS.legalName}. Licensed in Indiana (#281) and
          Michigan (#91-2210). This is an independent reviews microsite, not
          the company&apos;s primary website.
        </p>
      </div>
    </footer>
  );
}

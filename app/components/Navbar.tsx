import Image from "next/image";
import { BUSINESS } from "./reviewsData";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href={BUSINESS.mainSiteUrl} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
          <Image
            src="/brand/tatay-logo-horizontal.png"
            alt={BUSINESS.name}
            width={148}
            height={66}
            priority
            className="h-11 w-auto"
          />
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={BUSINESS.mainSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-ink/70 transition-colors hover:text-brand-navy sm:block"
          >
            Visit tataypump.com
          </a>
          <a
            href={BUSINESS.phoneHref}
            className="flex h-10 items-center justify-center rounded-full bg-brand-red px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy"
          >
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

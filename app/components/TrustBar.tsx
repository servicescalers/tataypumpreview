function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 4.6L4 16.2V20h3.8l5.3-5.3a4 4 0 004.6-5.4l-2.6 2.6-2-2 2.6-2.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l2.2 1.3 2.5-.2 1 2.3 2.1 1.4-.5 2.5.5 2.5-2.1 1.4-1 2.3-2.5-.2L12 18l-2.2-1.3-2.5.2-1-2.3-2.1-1.4.5-2.5-.5-2.5 2.1-1.4 1-2.3 2.5.2L12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 4h3l1.5 4L7.5 9.5a11 11 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16 16 0 015 6.2 2 2 0 015 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 9v0M17.5 15v0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const BADGES = [
  { icon: ShieldIcon, value: "Licensed", label: "IN #281 & MI #91-2210" },
  { icon: CalendarIcon, value: "55+ Years", label: "In Business" },
  { icon: WrenchIcon, value: "20,000+", label: "Well Systems Installed" },
  { icon: BadgeCheckIcon, value: "5-Yr / 3-Yr", label: "Product & Labor Warranty" },
  { icon: PhoneIcon, value: "24/7", label: "Live Call Answering" },
  { icon: CashIcon, value: "Financing", label: "Available Through Wisetack" },
];

function BadgeCard({ icon: Icon, value, label }: (typeof BADGES)[number]) {
  return (
    <div className="flex min-w-[220px] items-center gap-4 sm:min-w-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red-light/15 text-brand-red-light ring-1 ring-brand-red-light/30">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-bold leading-tight text-white">{value}</p>
        <p className="text-xs leading-tight text-white/55">{label}</p>
      </div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 30%, rgba(178,27,65,0.35), transparent 45%), radial-gradient(circle at 88% 75%, rgba(255,102,140,0.18), transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red-light/50 to-transparent"
      />

      {/* Desktop / tablet: static wrapped row with dividers */}
      <div className="relative mx-auto hidden max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6 sm:flex">
        {BADGES.map((b, i) => (
          <div key={b.value} className="flex items-center gap-10">
            {i > 0 && <span className="hidden h-10 w-px bg-white/10 lg:block" />}
            <BadgeCard {...b} />
          </div>
        ))}
      </div>

      {/* Mobile: ticker marquee, duplicated content for seamless loop */}
      <div className="relative overflow-hidden sm:hidden">
        <div className="flex w-max animate-marquee gap-8 px-4">
          {[...BADGES, ...BADGES].map((b, i) => (
            <BadgeCard key={`${b.value}-${i}`} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}

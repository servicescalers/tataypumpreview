# Client Reviews Microsite — Build Playbook

> **How to use this file:** copy it into a fresh, empty repo as `CLAUDE.md`
> (or paste it into the first prompt) before asking Claude to build the
> site. It was written from the build of `kintyjonesreview.com` and is
> generalized so it works for any local-service client — HVAC, plumbing,
> roofing, electrical, dental, law, etc. — starting from nothing but their
> live website and some pasted review text.

## What this produces

A standalone, single-page reviews microsite: hero with a rotating review
carousel, trust badges, a tabbed + paginated review grid (one tab per
platform the client actually has reviews on), a closing CTA, and a footer —
fully branded to the client, modern, and SEO-complete with structured data.
It is not a landing page for the business itself; it exists to make the
client's real customer reviews easy to browse and easy to trust.

## Inputs to collect before starting

Ask for whatever wasn't given up front. Do not proceed on guesses for any
of these:

1. **The client's live website URL** — this is the brand source of truth.
2. **Business name, phone, email, city/service area.**
3. **Raw review text, pasted, per platform** (Google, Angi, Yelp, Facebook,
   Nextdoor, BBB, whatever they have). Copy-pasted page text is fine and
   expected to be messy — see Phase 2.
4. **The domain the microsite will live on** (or a placeholder to swap
   later).
5. Whether there's a **separate main/marketing site** this microsite should
   link back to (most clients will have one).

## Phase 1 — Brand extraction (from the real site, not invented)

Fetch the client's live site and pull the brand system from it directly.
Never invent a palette or pick fonts "that would suit them" — every value
below must be traceable to something actually on their site.

- **Logo.** Look in the header, `/assets`, `/logo*`, `/images/*logo*`,
  the favicon, and the apple-touch-icon. Prefer SVG. Download the actual
  asset file — don't redraw it. If the logo is a wordmark set in a custom
  font rather than an image, treat that font as **logo-only**: its
  lowercase glyphs are usually stylized in a way that reads as shouting or
  gets illegible in body copy, so it's used strictly for the wordmark, the
  same way VC Kansas Casual is used for "KJHC" and nowhere else.
- **Color palette.** Check CSS custom properties (`--primary`, `--brand`,
  `--accent`, etc.), the `theme-color` meta tag, inline styles on the header
  and primary CTA buttons, and computed styles on any element that's
  clearly load-bearing brand color (nav background, hero button). Land on
  4–6 tokens: a primary/accent, a background (usually off-white, not pure
  white), an ink/text color (usually a dark navy or near-black, not pure
  black), and one or two secondary accents (a highlight/gold, a secondary
  brand color). Record exact hex values.
- **Fonts.** Look for `@font-face` rules, Google Fonts `<link>` tags, and
  `font-family` declarations on headings vs. body text. Identify a display
  face (headlines, usually heavier weight) and a body face (workhorse,
  neutral). If you can't find a real font being used, don't substitute a
  generic system font silently — say so and ask, or pick the closest
  Google Fonts match and say that's what you did.
- If brand extraction comes up short on any of the above, stop and ask the
  client rather than filling the gap with a plausible-looking guess. A
  wrong logo or off-brand palette is worse than a pause to confirm.

## Phase 2 — Reviews (never fabricated, ever)

This is the part most likely to go wrong if rushed. Ground rules:

- **Nothing here is written by the assistant, and nothing should be.**
  Every quote, name, and rating must trace back to text the client or the
  requester actually provided.
- Ask for the review text pasted directly from each platform's page.
  Expect it to be messy (copy-pasted UI chrome, "View full review" buttons,
  owner replies mixed in) — that's normal and handled in parsing, not by
  asking for cleaner input.
- **Write a small parser script** (Node, one-off, in a scratch directory)
  rather than hand-transcribing dozens of reviews by eye — hand-transcription
  is where names get mismatched to quotes and where errors creep in. Parse
  deterministically: reviewer name, quote text, star rating (if the
  platform shows one), relative or absolute date. Verify the parse (count
  check, spot-check a handful, check for accidental duplicates or leaked
  UI text like "photos" counts bleeding into a quote) before using the
  output.
- **Filter deliberately, and say what you filtered:**
  - Only include reviews at the star threshold the requester asks for
    (commonly 4★ and up). If a platform doesn't expose a star rating on
    its review cards, use its own "would recommend" signal instead.
  - Drop reviews with no real comment (a period, "unknown", blank).
  - Drop anything that isn't genuine service feedback — a personal dispute,
    a complaint aimed at a named employee, spam. These are more than just
    "negative"; flag them to the requester rather than silently dropping
    or silently including them, since they can be reputationally or
    legally sensitive.
  - Two reviews from the same name on different dates with different text
    are two different real reviews, not a duplicate — don't merge or drop
    them.
- **Mask incidental PII.** A reviewer's display name is sometimes literally
  their email address. Don't publish that verbatim; shorten it the way you
  would any other name.
- Each platform's cleaned data goes in **its own file** with a short
  provenance comment at the top stating it's real, unedited customer
  language, noting the total review count the platform itself reports (if
  known) versus how many are actually loaded here, and noting what was
  excluded and why.
- **If a platform has no usable reviews, it gets no tab.** Don't stub it
  out with a "coming soon" card unless the requester specifically wants
  that placeholder — the default is to only show what's real.

## Phase 3 — Tech stack & file structure

Next.js (App Router) + Tailwind v4 + TypeScript, mirroring this layout:

```
app/
  fonts.ts                 # local logo font (if any) + Google Fonts display/body
  globals.css               # brand tokens under :root + @theme inline
  layout.tsx                 # metadata, viewport, JSON-LD script tags
  page.tsx                   # assembles the sections below, in order
  structuredData.ts          # JSON-LD builders
  icon.tsx                   # generated favicon (ImageResponse, real logo + colors)
  apple-icon.tsx
  opengraph-image.tsx        # generated OG card (real rating/count, brand colors)
  twitter-image.tsx          # re-exports opengraph-image
  robots.ts
  sitemap.ts
  manifest.ts
  components/
    Navbar.tsx
    Hero.tsx                  # left: copy + rating; right: ReviewsCarousel
    ReviewsCarousel.tsx        # auto-rotating single-quote carousel (hero)
    TrustBar.tsx                # awards/certifications, marquee on mobile
    Reviews.tsx                  # section wrapper + heading
    ReviewsGrid.tsx               # tabbed, paginated 3-per-row review grid
    FinalCta.tsx
    Footer.tsx
    useAutoRotate.ts               # shared carousel hook
    reviewMarks.tsx                 # platform icon SVGs
    reviewsData.ts                    # platform config: name/href/icon/shared constants
    {platform}Reviews.ts               # one file per platform, real parsed data
assets/
  <brand fonts as .ttf, for ImageResponse generation only>
public/
  <downloaded real logo/badge/award image assets>
```

Key implementation notes carried over from the reference build:

- `useAutoRotate` pauses on hover/focus and does nothing if
  `prefers-reduced-motion: reduce` is set — never override that.
- Star ratings are drawn as inline SVG paths everywhere, including inside
  `ImageResponse` for the OG image. A `"★"` glyph forces `satori` to fetch a
  fallback font at build time, which fails in sandboxed/offline builds and
  produces a build warning — avoid it entirely.
- `ReviewsGrid` and `ReviewsCarousel` both read from the same
  `PLATFORM_REVIEWS` map in `reviewsData.ts`, so adding or removing a
  platform is a one-place change.

## Phase 4 — Design language: sleek, not basic

Concrete rules, not vibes:

- Generous whitespace — section padding `py-16 md:py-24` or more, content
  capped at `max-w-6xl`, never edge-to-edge text.
- `rounded-2xl` cards with `ring-1 ring-{ink}/10` instead of hard
  `border`s; reserve real `shadow-xl` for the one or two genuinely elevated
  elements (the carousel card), not every card on the page.
- One accent color carries each CTA. Don't rainbow the page — the accent,
  the ink, and the background do almost all the work, with the secondary
  accent reserved for small highlights (stars, badges, eyebrow labels).
- Real typographic hierarchy: the display face at a heavy weight,
  uppercase, tight tracking for H1/H2; the body face at `leading-relaxed`
  for paragraph copy. Two faces, used consistently, beats three faces used
  inconsistently.
- **The hero has to feel alive.** A centered headline over a flat gradient
  reads as a template. Split it left/right; the right side is a photo
  carousel or, for a reviews-first site, a rotating review card — never a
  static block.
- Micro-interactions everywhere interactive: `transition-colors` /
  `transition-transform` on hover, visibly muted `disabled` states, focus
  states that don't disappear.
- Mobile gets its own layout decisions, not just a squeezed desktop layout
  — e.g. a badge marquee/ticker on mobile where desktop has a multi-column
  grid.
- Delete every trace of the framework starter template: default SVGs,
  "Deploy on Vercel" links, placeholder Lorem ipsum, the default favicon.
  A single leftover boilerplate element makes the whole page read as
  unfinished.

## Phase 5 — SEO, always included

- Full `Metadata` export: title template, `alternates.canonical`, explicit
  `robots`/`googleBot` directives, OpenGraph + Twitter card,
  `formatDetection`.
- `viewport` export with the client's real primary brand color as
  `themeColor`.
- File-convention `icon.tsx` / `apple-icon.tsx` / `opengraph-image.tsx` /
  `twitter-image.tsx`, built with `next/og`'s `ImageResponse` using the
  client's real logo mark, real fonts, real brand colors, and real stats
  (actual rating, actual review count) — never placeholder numbers.
- JSON-LD via a script tag in `layout.tsx`:
  - Pick the **most specific** schema.org `LocalBusiness` subtype for the
    client's industry (`HVACBusiness`, `Plumber`, `Electrician`,
    `RoofingContractor`, `GeneralContractor`, `Dentist`, `Attorney`, etc.)
    rather than defaulting to generic `LocalBusiness` — check schema.org's
    hierarchy for the closest match.
  - `aggregateRating` using the platform's own stated total review count
    (what the review site itself reports), not the number of reviews you
    happened to get pasted and parsed.
  - A small **representative sample** in the `review` array (5–10 real
    reviews), not every review on the page — matches how review sites'
    own structured data behaves and avoids looking like schema spam.
- `robots.ts`, `sitemap.ts`, `manifest.ts` via the standard file
  conventions.

## Phase 6 — Verification before calling it done

- `pnpm lint` clean.
- `pnpm build` clean — check the output for the `satori`/font-fallback
  warning specifically; if present, find the offending glyph and replace it
  with an inline SVG.
- Start the dev server and actually look at screenshots: hero (including
  the carousel mid-rotation), trust bar, each review platform tab, the
  empty state for any platform with no data (if applicable), footer, and
  the generated OG image. Don't declare success on a build pass alone —
  look at the rendered page.
- Confirm no tab exists for a platform that wasn't given real review data.
- Confirm nothing from the framework starter template survived.

## Non-negotiables

These are the ones worth repeating on their own, because they're the ones
most likely to get compressed away under time pressure:

- **Never write a review, never invent a quote, never round a review count
  up or down.** If a number isn't stated by the source, don't state it.
- **Never guess brand colors or fonts.** Pull them from the real site, or
  stop and ask.
- **Always disclose, in a code comment, which reviews were excluded and
  why** — a future editor (human or Claude) needs to know that's a
  deliberate filter, not a missed import.

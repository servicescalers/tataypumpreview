import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BUSINESS } from "./components/reviewsData";

export const alt = `${BUSINESS.name} Reviews`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAR_PATH =
  "M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z";

function Star() {
  return (
    <svg width={40} height={40} viewBox="0 0 20 20" fill="#ff668c">
      <path d={STAR_PATH} />
    </svg>
  );
}

export default async function Image() {
  const [logo, regular, semibold, bold, extrabold] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/tatay-logo-horizontal.png")),
    readFile(join(process.cwd(), "assets/Poppins-Regular.ttf")),
    readFile(join(process.cwd(), "assets/Poppins-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/Poppins-Bold.ttf")),
    readFile(join(process.cwd(), "assets/Poppins-ExtraBold.ttf")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#112c4a",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(178,27,65,0.35), transparent 55%)",
        }}
      >
        <img src={logoSrc} width={220} height={98} alt="" style={{ objectFit: "contain" }} />

        <div style={{ display: "flex", marginTop: 48 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: "flex", marginRight: 8 }}>
              <Star />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "baseline", marginTop: 20 }}>
          <span style={{ fontFamily: "Poppins-ExtraBold", fontSize: 84, color: "#ffffff" }}>
            {BUSINESS.aggregateRating}
          </span>
          <span
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 36,
              color: "rgba(255,255,255,0.75)",
              marginLeft: 16,
            }}
          >
            from {BUSINESS.aggregateReviewCount}+ Google reviews
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Poppins-Bold",
            fontSize: 44,
            color: "#ffffff",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {BUSINESS.name} Reviews
        </div>
        <div
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            marginTop: 14,
          }}
        >
          {BUSINESS.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins-Regular", data: regular, weight: 400, style: "normal" },
        { name: "Poppins-SemiBold", data: semibold, weight: 600, style: "normal" },
        { name: "Poppins-Bold", data: bold, weight: 700, style: "normal" },
        { name: "Poppins-ExtraBold", data: extrabold, weight: 800, style: "normal" },
      ],
    }
  );
}

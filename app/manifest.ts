import type { MetadataRoute } from "next";
import { BUSINESS } from "./components/reviewsData";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name} Reviews`,
    short_name: `${BUSINESS.name} Reviews`,
    description: BUSINESS.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#b21b41",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

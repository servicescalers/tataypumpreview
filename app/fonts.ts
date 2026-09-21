import { Poppins, Inter } from "next/font/google";

// Tatay Pump Services' live site (tataypump.com) declares its heading/body
// font tokens as the system-ui stack — it never actually loads a distinct
// webfont. Poppins is used here as the display face because it's the one
// real webfont the site does load (for its nav menu and process-step
// numbers), so it's not an invented substitution. Inter is used as a clean,
// neutral body face standing in for that system-ui stack.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

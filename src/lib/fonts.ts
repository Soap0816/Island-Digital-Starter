import { Fraunces, Inter, Space_Grotesk } from "next/font/google";

/*
 * All fonts a theme can reference. Each exposes a CSS variable; the theme maps
 * `--font-heading` / `--font-body` onto one of them (`fontCssVar` in src/lib/theme.ts).
 * For a client project, delete the fonts the chosen theme doesn't use.
 */
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

export const fontVariables = [sans.variable, serif.variable, grotesk.variable].join(" ");

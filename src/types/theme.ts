export type ThemePresetName =
  | "service"
  | "luxury"
  | "restaurant"
  | "automotive"
  | "fashion"
  | "nightlife";

/** Semantic color tokens. Every component reads these, never raw hex values. */
export interface ThemeColors {
  background: string;
  foreground: string;
  /** Subtle alternate background for sections and inputs. */
  muted: string;
  /** Secondary text. Keep at 4.5:1 contrast against `background`. */
  mutedForeground: string;
  /** Card and panel background. */
  surface: string;
  border: string;
  /** Brand color used for primary buttons, eyebrows and highlights. */
  accent: string;
  /** Text placed on top of `accent`. */
  accentForeground: string;
  /** High-contrast band (e.g. dark section on a light site). */
  inverse: string;
  inverseForeground: string;
}

/** Keys of the fonts loaded in `src/lib/fonts.ts`. */
export type FontKey = "sans" | "serif" | "grotesk";

export interface ThemeTypography {
  heading: FontKey;
  body: FontKey;
  headingWeight: number;
  /** CSS letter-spacing, e.g. "-0.02em". */
  headingTracking: string;
  headingTransform: "none" | "uppercase";
}

export interface ThemeShape {
  /** Radius for cards, images and panels. */
  radius: string;
  /** Radius for buttons and inputs. Use "9999px" for pills. */
  buttonRadius: string;
}

export type CubicBezier = [number, number, number, number];

/** Default timing used by every reveal component. */
export interface MotionProfile {
  /** Seconds. */
  duration: number;
  /** Pixels travelled by slide reveals. */
  distance: number;
  /** Seconds between staggered children. */
  stagger: number;
  ease: CubicBezier;
}

export interface ThemePreset {
  name: ThemePresetName;
  label: string;
  description: string;
  colorScheme: "light" | "dark";
  colors: ThemeColors;
  typography: ThemeTypography;
  shape: ThemeShape;
  motion: MotionProfile;
}

/** What a project sets in `siteConfig.theme`: a preset plus optional overrides. */
export interface ThemeSelection {
  preset: ThemePresetName;
  colors?: Partial<ThemeColors>;
  typography?: Partial<ThemeTypography>;
  shape?: Partial<ThemeShape>;
  motion?: Partial<MotionProfile>;
}

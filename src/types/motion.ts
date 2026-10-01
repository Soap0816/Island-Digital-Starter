export type RevealVariant =
  | "fade"
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale";

export type RevealDirection = "up" | "down" | "left" | "right";

/** Shared viewport/timing props for every scroll-triggered component. */
export interface RevealTimingProps {
  /** Seconds before the animation starts. */
  delay?: number;
  /** Seconds. Defaults to the theme's motion profile. */
  duration?: number;
  /** Animate only the first time the element enters the viewport. */
  once?: boolean;
  /** Fraction of the element (0–1) that must be visible to trigger. */
  amount?: number;
}

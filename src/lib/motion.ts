import { stagger, type Transition, type Variants } from "motion/react";

import type { MotionProfile, RevealDirection, RevealVariant } from "@/types";

/*
 * Animation presets shared by the components in src/components/motion.
 * Every helper returns plain Motion variants so they can also be used directly:
 *   <motion.div variants={revealVariants("up", profile)} initial="hidden" whileInView="visible" />
 *
 * Reduced motion: the root <MotionProvider> sets `reducedMotion="user"`, which makes
 * Motion skip transform animations (x, y, scale) for users who ask for less motion.
 * Opacity still fades, so content never stays hidden.
 */

export const defaultMotionProfile: MotionProfile = {
  duration: 0.8,
  distance: 24,
  stagger: 0.08,
  ease: [0.22, 1, 0.36, 1],
};

interface TimingOptions {
  duration?: number;
  delay?: number;
}

function transitionFor(profile: MotionProfile, { duration, delay = 0 }: TimingOptions = {}): Transition {
  return { duration: duration ?? profile.duration, delay, ease: profile.ease };
}

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
};

/** Fade, slide (up/down/left/right) and scale reveals. "left" means the element moves leftwards into place. */
export function revealVariants(
  variant: RevealVariant,
  profile: MotionProfile = defaultMotionProfile,
  options: TimingOptions & { distance?: number } = {},
): Variants {
  const distance = options.distance ?? profile.distance;
  const visible = { opacity: 1, x: 0, y: 0, scale: 1, transition: transitionFor(profile, options) };

  if (variant === "fade") return { hidden: { opacity: 0 }, visible };
  if (variant === "scale") return { hidden: { opacity: 0, scale: 0.94 }, visible };

  const { x = 0, y = 0 } = offsets[variant];
  return { hidden: { opacity: 0, x: x * distance, y: y * distance }, visible };
}

/** Parent variants that stagger their children's "visible" animation. */
export function staggerVariants(interval: number, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } },
  };
}

/** Per-word/char variant for <TextReveal>: slides up from behind a mask. */
export function textRevealVariants(profile: MotionProfile = defaultMotionProfile, duration?: number): Variants {
  return {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: transitionFor(profile, { duration }) },
  };
}

const clipFrom: Record<RevealDirection, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
};

/**
 * Image wipe. Pass `custom={prefersReducedMotion}` on the motion element:
 * reduced-motion users get a plain fade instead of the wipe and zoom.
 */
export function imageRevealVariants(
  direction: RevealDirection,
  profile: MotionProfile = defaultMotionProfile,
  options: TimingOptions = {},
): { frame: Variants; image: Variants } {
  const duration = (options.duration ?? profile.duration) * 1.4;
  const transition = transitionFor(profile, { ...options, duration });

  return {
    frame: {
      hidden: { clipPath: clipFrom[direction], opacity: 1 },
      visible: (reduced: boolean | null) =>
        reduced
          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: [0, 1], transition: { duration: 0.4, delay: options.delay } }
          : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, transition },
    },
    image: {
      hidden: { scale: 1.15 },
      visible: { scale: 1, transition },
    },
  };
}

/** Hover/tap states for interactive surfaces. */
export const hoverLiftVariants = (lift = 6): Variants => ({
  rest: { y: 0 },
  hover: { y: -lift, transition: { type: "spring", stiffness: 300, damping: 22 } },
});

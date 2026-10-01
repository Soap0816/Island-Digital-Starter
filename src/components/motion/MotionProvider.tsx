"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";

import { defaultMotionProfile } from "@/lib/motion";
import type { MotionProfile } from "@/types";

const MotionProfileContext = createContext<MotionProfile>(defaultMotionProfile);

/** The active theme's timing (duration, distance, stagger, easing). */
export function useMotionProfile() {
  return useContext(MotionProfileContext);
}

interface MotionProviderProps {
  profile: MotionProfile;
  children: ReactNode;
}

/**
 * Wrap the app once (root layout). `reducedMotion="user"` makes every Motion
 * component respect the OS "reduce motion" setting automatically.
 */
export function MotionProvider({ profile, children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: profile.duration, ease: profile.ease }}>
      <MotionProfileContext value={profile}>{children}</MotionProfileContext>
    </MotionConfig>
  );
}

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useMotionProfile } from "./MotionProvider";

/**
 * Enter transition for each route. Rendered from src/app/template.tsx, which
 * remounts on navigation, so this replays on every page change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { ease } = useMotionProfile();

  return (
    <motion.div
      data-reveal=""
      className="flex flex-1 flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}

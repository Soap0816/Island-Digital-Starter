"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  /** 0–1. How far the element follows the cursor relative to its own size. */
  strength?: number;
  disabled?: boolean;
  className?: string;
}

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * Pulls its child toward the cursor. Mouse/pen only — touch and
 * reduced-motion users get a normal, static element.
 */
export function Magnetic({ children, strength = 0.3, disabled, className }: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const isActive = !disabled && !prefersReducedMotion;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isActive || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";

import { hoverLiftVariants } from "@/lib/motion";

import { motionElements, type MotionElement } from "./elements";

interface HoverLiftProps {
  children: ReactNode;
  /** Pixels to rise on hover/focus. */
  lift?: number;
  as?: MotionElement;
  className?: string;
}

/**
 * Spring lift on hover and keyboard focus. For simple cards, the CSS-only
 * `interactive` prop on <Card> is lighter; use this when you want the spring.
 */
export function HoverLift({ children, lift = 6, as = "div", className }: HoverLiftProps) {
  const Component = motionElements[as];

  return (
    <Component
      className={className}
      variants={hoverLiftVariants(lift)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      {children}
    </Component>
  );
}

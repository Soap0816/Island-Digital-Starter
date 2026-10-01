"use client";

import type { ReactNode } from "react";

import { revealVariants, staggerVariants } from "@/lib/motion";
import type { RevealTimingProps, RevealVariant } from "@/types";

import { motionElements, type MotionElement } from "./elements";
import { useMotionProfile } from "./MotionProvider";

interface RevealProps extends RevealTimingProps {
  children: ReactNode;
  /** fade | up | down | left | right | scale */
  variant?: RevealVariant;
  /** Pixels for slide variants. Defaults to the theme's motion profile. */
  distance?: number;
  as?: MotionElement;
  className?: string;
  id?: string;
}

/** Animates its children into view when scrolled to. */
export function Reveal({
  children,
  variant = "up",
  delay,
  duration,
  distance,
  once = true,
  amount = 0.25,
  as = "div",
  className,
  id,
}: RevealProps) {
  const profile = useMotionProfile();
  const Component = motionElements[as];

  return (
    <Component
      id={id}
      data-reveal=""
      className={className}
      variants={revealVariants(variant, profile, { delay, duration, distance })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

interface RevealGroupProps extends Omit<RevealTimingProps, "duration"> {
  children: ReactNode;
  /** Seconds between children. Defaults to the theme's motion profile. */
  stagger?: number;
  as?: MotionElement;
  className?: string;
}

/** Staggers the entrance of its <RevealItem> children. */
export function RevealGroup({
  children,
  stagger,
  delay = 0,
  once = true,
  amount = 0.15,
  as = "div",
  className,
}: RevealGroupProps) {
  const profile = useMotionProfile();
  const Component = motionElements[as];

  return (
    <Component
      className={className}
      variants={staggerVariants(stagger ?? profile.stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: ReactNode;
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
  as?: MotionElement;
  className?: string;
}

/** A child of <RevealGroup>. Inherits the group's trigger and stagger timing. */
export function RevealItem({ children, variant = "up", distance, duration, as = "div", className }: RevealItemProps) {
  const profile = useMotionProfile();
  const Component = motionElements[as];

  return (
    <Component data-reveal="" className={className} variants={revealVariants(variant, profile, { distance, duration })}>
      {children}
    </Component>
  );
}

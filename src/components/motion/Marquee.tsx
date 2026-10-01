"use client";

import { Pause, Play } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "motion/react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Accessible name for the region, e.g. "Industries we work with". */
  label: string;
  /** Seconds for one full loop. Higher is slower. */
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Shows a small pause/play button (WCAG 2.2.2). Only hide it for purely decorative marquees. */
  controls?: boolean;
  /** How many times the content repeats per half. Increase for short content. */
  repeat?: number;
  /** Fade the edges into the background. */
  fade?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * Infinite horizontal ticker. The track holds two identical halves and loops
 * by translating exactly one half. Reduced-motion users see a static row.
 */
export function Marquee({
  children,
  label,
  duration = 30,
  direction = "left",
  pauseOnHover = true,
  controls = true,
  repeat = 2,
  fade = true,
  className,
  trackClassName,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => `${wrap(-50, 0, value)}%`);
  const sign = direction === "left" ? -1 : 1;
  const isRunning = !prefersReducedMotion && !isStopped && !(pauseOnHover && isHovered);

  useAnimationFrame((_, delta) => {
    if (!isRunning) return;
    // Move one half of the track (one full copy) every `duration` seconds.
    progress.set(progress.get() + sign * (50 / duration) * (delta / 1000));
  });

  const half = (isDuplicate: boolean) => (
    <div className={cn("flex shrink-0 items-center", trackClassName)} aria-hidden={isDuplicate || undefined}>
      {Array.from({ length: repeat }, (_, index) => (
        <div key={index} className="flex shrink-0 items-center" aria-hidden={index > 0 || undefined}>
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div role="region" aria-label={label} className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden",
          fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        )}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex w-max" style={{ x: prefersReducedMotion ? 0 : x }}>
          {half(false)}
          {half(true)}
        </motion.div>
      </div>

      {controls && !prefersReducedMotion && (
        <button
          type="button"
          onClick={() => setIsStopped((value) => !value)}
          aria-pressed={isStopped}
          className="absolute top-1/2 right-0 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <span className="sr-only">{isStopped ? "Play" : "Pause"} scrolling text</span>
          {isStopped ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
        </button>
      )}
    </div>
  );
}

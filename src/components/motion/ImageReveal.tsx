"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { imageRevealVariants } from "@/lib/motion";
import { aspectClasses } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { AspectRatio, ImageAsset, RevealDirection, RevealTimingProps } from "@/types";

import { useMotionProfile } from "./MotionProvider";

interface ImageRevealProps extends RevealTimingProps {
  image: ImageAsset;
  /** Direction the wipe travels. */
  direction?: RevealDirection;
  aspect?: AspectRatio;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  /** Set for above-the-fold images (LCP). */
  preload?: boolean;
  className?: string;
  imageClassName?: string;
}

/** Image that wipes into view with a subtle zoom. Falls back to a fade for reduced motion. */
export function ImageReveal({
  image,
  direction = "up",
  aspect = "portrait",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  delay,
  duration,
  once = true,
  amount = 0.3,
  className,
  imageClassName,
}: ImageRevealProps) {
  const profile = useMotionProfile();
  const prefersReducedMotion = useReducedMotion();
  const variants = imageRevealVariants(direction, profile, { delay, duration });

  return (
    <motion.div
      data-reveal=""
      className={cn("relative overflow-hidden rounded-theme bg-muted", aspectClasses[aspect], className)}
      variants={variants.frame}
      custom={prefersReducedMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      <motion.div className="absolute inset-0" variants={variants.image}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </motion.div>
  );
}

"use client";

import { Fragment } from "react";

import { staggerVariants, textRevealVariants } from "@/lib/motion";
import type { RevealTimingProps } from "@/types";

import { motionElements, type MotionElement } from "./elements";
import { useMotionProfile } from "./MotionProvider";

const MotionSpan = motionElements.span;

interface TextRevealProps extends RevealTimingProps {
  text: string;
  /** Split into words or individual characters. */
  by?: "word" | "char";
  as?: MotionElement;
  /** Seconds between each word/char. */
  stagger?: number;
  /** "view" animates on scroll into view; "mount" animates immediately (use above the fold). */
  trigger?: "view" | "mount";
  className?: string;
  id?: string;
}

/**
 * Staggered text reveal. Screen readers get the plain sentence;
 * the animated pieces are hidden from assistive tech.
 */
export function TextReveal({
  text,
  by = "word",
  as = "p",
  stagger,
  delay = 0,
  duration,
  once = true,
  amount = 0.5,
  trigger = "view",
  className,
  id,
}: TextRevealProps) {
  const profile = useMotionProfile();
  const Component = motionElements[as];
  const words = text.split(" ");
  const interval = stagger ?? (by === "char" ? 0.025 : 0.06);
  const itemVariants = textRevealVariants(profile, duration);

  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: { once, amount } };

  return (
    <Component id={id} className={className} variants={staggerVariants(interval, delay)} {...triggerProps}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {/* Mask: pieces slide up from behind the line. Padding keeps descenders visible. */}
            <span className="-mb-[0.12em] inline-flex overflow-hidden pb-[0.12em] align-bottom">
              {by === "word" ? (
                <MotionSpan data-reveal="" className="inline-block" variants={itemVariants}>
                  {word}
                </MotionSpan>
              ) : (
                Array.from(word).map((char, charIndex) => (
                  <MotionSpan key={charIndex} data-reveal="" className="inline-block" variants={itemVariants}>
                    {char}
                  </MotionSpan>
                ))
              )}
            </span>
            {wordIndex < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}

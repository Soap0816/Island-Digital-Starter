import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { Container, type ContainerSize } from "./Container";

export type SectionTone = "default" | "muted" | "inverse" | "accent";
export type SectionSpacing = "none" | "sm" | "md" | "lg";

const spacings: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

const tones: Record<SectionTone, string> = {
  default: "",
  muted: "tone-muted",
  inverse: "tone-inverse",
  accent: "tone-accent",
};

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Re-maps theme tokens so everything inside adapts (e.g. light text on dark). */
  tone?: SectionTone;
  spacing?: SectionSpacing;
  /** Wraps children in a <Container>. Pass `false` to go edge-to-edge. */
  container?: ContainerSize | false;
  containerClassName?: string;
}

/** Vertical rhythm + background tone for a page section. */
export function Section({
  tone = "default",
  spacing = "md",
  container = "default",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative bg-background text-foreground", tones[tone], spacings[spacing], className)}
      {...props}
    >
      {container ? (
        <Container size={container} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}

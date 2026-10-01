import type { ReactNode } from "react";

import { Reveal, TextReveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { Align, HeadingLevel } from "@/types";

const titleSizes = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-5xl",
  lg: "text-4xl md:text-6xl",
} as const;

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  as?: HeadingLevel;
  align?: Align;
  size?: keyof typeof titleSizes;
  /** Animate the title word by word and fade in the rest. */
  animate?: boolean;
  /** Set this and pass the same id to the section's `aria-labelledby`. */
  id?: string;
  /** Extra content under the description, e.g. buttons. */
  children?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  as = "h2",
  align = "left",
  size = "md",
  animate = true,
  id,
  children,
  className,
}: SectionHeadingProps) {
  const Heading = as;
  const titleClass = cn("text-display", titleSizes[size]);
  const isCentered = align === "center";

  return (
    <header className={cn("flex max-w-3xl flex-col gap-4", isCentered && "mx-auto items-center text-center", className)}>
      {eyebrow && (animate ? (
        <Reveal as="p" variant="fade" className="eyebrow">
          {eyebrow}
        </Reveal>
      ) : (
        <p className="eyebrow">{eyebrow}</p>
      ))}

      {animate ? (
        <TextReveal as={as} id={id} text={title} className={titleClass} />
      ) : (
        <Heading id={id} className={titleClass}>
          {title}
        </Heading>
      )}

      {description &&
        (animate ? (
          <Reveal variant="up" delay={0.15} className="text-base text-pretty text-muted-foreground md:text-lg">
            {description}
          </Reveal>
        ) : (
          <div className="text-base text-pretty text-muted-foreground md:text-lg">{description}</div>
        ))}

      {children && <div className={cn("mt-2 flex flex-wrap gap-3", isCentered && "justify-center")}>{children}</div>}
    </header>
  );
}

import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import type { SectionTone } from "@/components/layout/Section";
import { Reveal, TextReveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { Align } from "@/types";

export interface CTAProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  /** Buttons, e.g. <ButtonLink> or <ModalTrigger>. */
  actions?: ReactNode;
  /** "band": full-width section. "panel": rounded block inside the page container. */
  variant?: "band" | "panel";
  tone?: Exclude<SectionTone, "default">;
  align?: Align;
  className?: string;
}

/** Call-to-action block. Tones re-map theme colors so buttons inside stay legible. */
export function CTA({
  title,
  eyebrow,
  description,
  actions,
  variant = "panel",
  tone = "inverse",
  align = "center",
  className,
}: CTAProps) {
  const isCentered = align === "center";

  const inner = (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCentered ? "mx-auto max-w-3xl items-center text-center" : "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
      )}
    >
      <div className={cn("flex flex-col gap-4", isCentered && "items-center")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <TextReveal as="h2" text={title} className="text-display text-3xl md:text-5xl" />
        {description && (
          <Reveal variant="up" delay={0.15} className="max-w-xl text-lg text-pretty text-muted-foreground">
            {description}
          </Reveal>
        )}
      </div>
      {actions && (
        <Reveal variant="up" delay={0.25} className={cn("flex shrink-0 flex-wrap gap-3 pt-2", isCentered && "justify-center")}>
          {actions}
        </Reveal>
      )}
    </div>
  );

  if (variant === "band") {
    return (
      <section className={cn(`tone-${tone} bg-background py-20 text-foreground md:py-28`, className)}>
        <Container>{inner}</Container>
      </section>
    );
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <Container size="wide">
        <Reveal variant="scale" className={cn(`tone-${tone}`, "rounded-theme bg-background px-6 py-16 text-foreground md:px-16 md:py-20")}>
          {inner}
        </Reveal>
      </Container>
    </section>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { ImageReveal, Reveal, TextReveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export type HeroLayout = "split" | "centered" | "background";

const heights = {
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  screen: "flex min-h-[calc(100svh-var(--header-height))] items-center py-20",
} as const;

export interface HeroProps {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  /** Buttons, e.g. <ButtonLink>s. */
  actions?: ReactNode;
  /** Required for "split" and "background" layouts. */
  image?: ImageAsset;
  layout?: HeroLayout;
  size?: keyof typeof heights;
  /** Extra content under the actions (trust badges, ratings, logos…). */
  children?: ReactNode;
  className?: string;
}

export function Hero({
  title,
  eyebrow,
  description,
  actions,
  image,
  layout = "split",
  size = "lg",
  children,
  className,
}: HeroProps) {
  const isCentered = layout === "centered";
  const isBackground = layout === "background" && image;

  const content = (
    <div className={cn("flex flex-col gap-6", isCentered && "mx-auto max-w-4xl items-center text-center")}>
      {eyebrow && (
        <Reveal as="p" variant="fade" className="eyebrow">
          {eyebrow}
        </Reveal>
      )}
      <TextReveal
        as="h1"
        text={title}
        trigger="mount"
        delay={0.1}
        className="text-display text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[1.02]"
      />
      {description && (
        <Reveal
          variant="up"
          delay={0.35}
          className={cn("max-w-xl text-lg text-pretty text-muted-foreground md:text-xl", isCentered && "mx-auto")}
        >
          {description}
        </Reveal>
      )}
      {actions && (
        <Reveal variant="up" delay={0.5} className={cn("flex flex-wrap gap-3 pt-2", isCentered && "justify-center")}>
          {actions}
        </Reveal>
      )}
      {children && (
        <Reveal variant="fade" delay={0.7}>
          {children}
        </Reveal>
      )}
    </div>
  );

  if (isBackground) {
    return (
      <section className={cn("on-image relative isolate overflow-hidden bg-inverse text-foreground", heights[size], className)}>
        <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/45 to-black/20" />
        <Container size="wide" className="w-full">
          {content}
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("relative overflow-hidden", heights[size], className)}>
      <Container size="wide" className="w-full">
        {layout === "split" && image ? (
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {content}
            <ImageReveal image={image} aspect="portrait" preload sizes="(min-width: 1024px) 45vw, 100vw" delay={0.2} />
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {content}
            {image && <ImageReveal image={image} aspect="wide" preload sizes="100vw" delay={0.3} />}
          </div>
        )}
      </Container>
    </section>
  );
}

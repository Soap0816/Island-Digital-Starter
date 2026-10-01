import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CardVariant = "outline" | "filled" | "elevated" | "plain";

const variants: Record<CardVariant, string> = {
  outline: "border border-border bg-surface",
  filled: "bg-muted",
  elevated: "border border-border/60 bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)]",
  plain: "",
};

export interface CardProps extends Omit<ComponentPropsWithoutRef<"article">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** Icon element, e.g. `<Palette />` from lucide-react. */
  icon?: ReactNode;
  eyebrow?: string;
  /** Makes the whole card a link (the title carries the link for screen readers). */
  href?: string;
  /** Rendered at the bottom of the card. */
  footer?: ReactNode;
  variant?: CardVariant;
  /** CSS hover lift. Disabled for reduced motion. */
  interactive?: boolean;
}

export function Card({
  title,
  description,
  icon,
  eyebrow,
  href,
  footer,
  variant = "outline",
  interactive = Boolean(href),
  className,
  children,
  ...props
}: CardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-theme p-6 md:p-8",
        variants[variant],
        variant === "plain" && "p-0 md:p-0",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 hover:border-foreground/25 motion-safe:hover:-translate-y-1 focus-within:border-foreground/25",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="grid size-11 place-items-center rounded-button bg-accent/10 text-accent-text [&_svg]:size-5">
          {icon}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 className="text-display text-xl leading-tight">
          {href ? (
            // The ::after stretches the link over the whole card.
            <Link href={href} className="after:absolute after:inset-0 after:rounded-theme focus-visible:outline-none">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {description && <p className="text-pretty text-muted-foreground">{description}</p>}
      </div>

      {children}

      {(footer || href) && (
        <div className="mt-auto flex items-center justify-between pt-2 text-sm font-medium">
          {footer}
          {href && (
            <ArrowUpRight
              aria-hidden
              className="ml-auto size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          )}
        </div>
      )}

      {/* Focus ring for the stretched link. */}
      {href && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-theme ring-foreground ring-offset-2 ring-offset-background group-has-[a:focus-visible]:ring-2"
        />
      )}
    </article>
  );
}

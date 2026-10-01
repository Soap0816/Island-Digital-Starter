import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn, isExternalHref } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/88",
  secondary: "bg-foreground text-background hover:bg-foreground/85",
  outline: "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground/5",
  ghost: "text-foreground hover:bg-foreground/8",
  link: "h-auto! px-0! text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

/** Class names for anything that should look like a button. */
export function buttonStyles({ variant = "primary", size = "md", fullWidth, className }: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-button font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 motion-safe:active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:size-[1.1em] [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
}

interface ButtonContentProps {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

function ButtonContent({ leadingIcon, trailingIcon, children }: ButtonContentProps) {
  return (
    <>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </>
  );
}

export interface ButtonProps extends ComponentPropsWithRef<"button">, Omit<ButtonStyleOptions, "className"> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  loading,
  disabled,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      <ButtonContent
        leadingIcon={loading ? <LoaderCircle aria-hidden className="animate-spin" /> : leadingIcon}
        trailingIcon={trailingIcon}
      >
        {children}
      </ButtonContent>
    </button>
  );
}

export interface ButtonLinkProps
  extends Omit<ComponentPropsWithRef<"a">, "href">,
    Omit<ButtonStyleOptions, "className"> {
  href: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Force a new tab. External http(s) links open in a new tab automatically. */
  newTab?: boolean;
}

/** A link styled as a button. Uses next/link for internal routes. */
export function ButtonLink({
  href,
  variant,
  size,
  fullWidth,
  leadingIcon,
  trailingIcon,
  newTab,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, fullWidth, className });
  const content = (
    <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
      {children}
    </ButtonContent>
  );

  if (isExternalHref(href) || newTab) {
    const opensTab = newTab ?? href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensTab && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

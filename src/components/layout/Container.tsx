import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export type ContainerSize = "narrow" | "default" | "wide" | "full";

const sizes: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: ContainerSize;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Centers content and applies the site's responsive side gutters. */
export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)} {...props} />;
}

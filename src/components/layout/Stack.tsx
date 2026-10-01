import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export const gaps: Record<Gap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-10",
  xl: "gap-16",
};

const aligns = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

type StackProps<T extends ElementType> = {
  as?: T;
  gap?: Gap;
  /** "row" stacks vertically on mobile and switches to a row from `sm` up. */
  direction?: "column" | "row" | "row-always";
  align?: keyof typeof aligns;
  wrap?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Flex layout with consistent gaps. */
export function Stack<T extends ElementType = "div">({
  as,
  gap = "md",
  direction = "column",
  align = "stretch",
  wrap,
  className,
  ...props
}: StackProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn(
        "flex",
        direction === "column" && "flex-col",
        direction === "row" && "flex-col sm:flex-row",
        direction === "row-always" && "flex-row",
        wrap && "flex-wrap",
        gaps[gap],
        aligns[align],
        className,
      )}
      {...props}
    />
  );
}

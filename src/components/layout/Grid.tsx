import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

import { gaps, type Gap } from "./Stack";

const columns = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

type GridProps<T extends ElementType> = {
  as?: T;
  /** Column count at the largest breakpoint. Collapses responsively. */
  cols?: keyof typeof columns;
  gap?: Gap;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Responsive grid: 1 column on mobile, up to `cols` on desktop. */
export function Grid<T extends ElementType = "div">({ as, cols = 3, gap = "md", className, ...props }: GridProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("grid", columns[cols], gaps[gap], className)} {...props} />;
}

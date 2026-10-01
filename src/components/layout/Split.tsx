import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const ratios = {
  "1:1": "lg:grid-cols-2",
  "2:3": "lg:grid-cols-[2fr_3fr]",
  "3:2": "lg:grid-cols-[3fr_2fr]",
  "1:2": "lg:grid-cols-[1fr_2fr]",
  "2:1": "lg:grid-cols-[2fr_1fr]",
} as const;

export interface SplitProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  start: ReactNode;
  end: ReactNode;
  ratio?: keyof typeof ratios;
  /** Show `end` first on desktop (mobile order is always start → end). */
  reverse?: boolean;
  align?: "start" | "center" | "end";
}

/** Two-column layout that stacks on mobile. */
export function Split({ start, end, ratio = "1:1", reverse, align = "center", className, ...props }: SplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 lg:gap-16",
        ratios[ratio],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        className,
      )}
      {...props}
    >
      <div className={cn("min-w-0", reverse && "lg:order-2")}>{start}</div>
      <div className={cn("min-w-0", reverse && "lg:order-1")}>{end}</div>
    </div>
  );
}

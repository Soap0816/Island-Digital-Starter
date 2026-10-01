import type { AspectRatio } from "@/types";

/** Shared class maps used by both server and client components. */
export const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  auto: "",
};

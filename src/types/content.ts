import type { StaticImageData } from "next/image";

/** Shared shape for any image passed to a component. `alt` is required on purpose. */
export interface ImageAsset {
  src: string | StaticImageData;
  /** Describe the image. Use "" only for purely decorative images. */
  alt: string;
  width?: number;
  height?: number;
}

export type AspectRatio = "square" | "portrait" | "landscape" | "wide" | "auto";

export type Align = "left" | "center";

export type HeadingLevel = "h1" | "h2" | "h3";

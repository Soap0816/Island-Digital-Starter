import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { aspectClasses } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { AspectRatio, ImageAsset } from "@/types";

export interface ImageCardProps {
  image: ImageAsset;
  title: ReactNode;
  /** Small label above the title, e.g. a category. */
  eyebrow?: string;
  description?: ReactNode;
  href?: string;
  aspect?: AspectRatio;
  /** "below": caption under the image. "overlay": caption on a gradient over the image. */
  layout?: "below" | "overlay";
  sizes?: string;
  preload?: boolean;
  className?: string;
}

export function ImageCard({
  image,
  title,
  eyebrow,
  description,
  href,
  aspect = "portrait",
  layout = "below",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  preload,
  className,
}: ImageCardProps) {
  const isOverlay = layout === "overlay";
  const titleContent = href ? (
    <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <article className={cn("group relative flex flex-col gap-4", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-theme bg-muted",
          aspectClasses[aspect],
          "group-has-[a:focus-visible]:ring-2 group-has-[a:focus-visible]:ring-foreground group-has-[a:focus-visible]:ring-offset-2 group-has-[a:focus-visible]:ring-offset-background",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        {isOverlay && (
          <div className="on-image absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/75 via-black/30 to-transparent p-6 pt-20 text-foreground">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h3 className="text-display text-xl">{titleContent}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
      </div>

      {!isOverlay && (
        <div className="flex flex-col gap-1">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3 className="text-display text-xl">{titleContent}</h3>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
    </article>
  );
}

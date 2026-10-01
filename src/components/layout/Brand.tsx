import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { SiteLogo } from "@/types";

export interface BrandProps {
  name: string;
  logo?: SiteLogo;
  href?: string;
  className?: string;
  onClick?: () => void;
}

/** Logo (image or wordmark) linking home. */
export function Brand({ name, logo, href = "/", className, onClick }: BrandProps) {
  return (
    <Link href={href} onClick={onClick} className={cn("inline-flex items-center rounded-sm", className)}>
      {logo ? (
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} preload />
      ) : (
        <span className="text-display text-lg leading-none md:text-xl">{name}</span>
      )}
      <span className="sr-only">, home</span>
    </Link>
  );
}

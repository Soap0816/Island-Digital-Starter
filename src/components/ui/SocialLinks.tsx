import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

import { SocialIcon, socialLabels } from "./SocialIcon";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-button text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
          >
            <SocialIcon platform={link.platform} className="size-5" />
            <span className="sr-only">{link.label ?? socialLabels[link.platform]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

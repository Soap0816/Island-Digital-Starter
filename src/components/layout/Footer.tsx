import Link from "next/link";

import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn, telHref } from "@/lib/utils";
import type { ContactInfo, FooterColumn, NavItem, SiteLogo, SocialLink } from "@/types";

import { Brand } from "./Brand";
import { Container } from "./Container";
import type { SectionTone } from "./Section";

export interface FooterProps {
  brandName: string;
  tagline?: string;
  logo?: SiteLogo;
  columns: FooterColumn[];
  legal?: NavItem[];
  contact?: ContactInfo;
  socials?: SocialLink[];
  tone?: Extract<SectionTone, "default" | "muted" | "inverse">;
}

export function Footer({
  brandName,
  tagline,
  logo,
  columns,
  legal = [],
  contact,
  socials = [],
  tone = "inverse",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("bg-background text-foreground", tone !== "default" && `tone-${tone}`)}>
      <Container size="wide" className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="flex flex-col gap-4 md:col-span-4">
          <Brand name={brandName} logo={logo} />
          {tagline && <p className="max-w-xs text-pretty text-muted-foreground">{tagline}</p>}
          <SocialLinks links={socials} className="-ml-2.5" />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-2">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {contact && (
          <address className="flex flex-col gap-3 not-italic md:col-span-3">
            <h2 className="text-sm font-semibold">Contact</h2>
            <a href={`mailto:${contact.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              {contact.email}
            </a>
            {contact.phone && (
              <a href={telHref(contact.phone)} className="text-muted-foreground transition-colors hover:text-foreground">
                {contact.phone}
              </a>
            )}
            {contact.address && (
              <p className="text-muted-foreground">
                {contact.address.street}
                <br />
                {[contact.address.city, contact.address.region, contact.address.postalCode].filter(Boolean).join(", ")}
              </p>
            )}
          </address>
        )}
      </Container>

      <Container
        size="wide"
        className="flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          © {year} {brandName}. All rights reserved.
        </p>
        {legal.length > 0 && (
          <ul className="flex gap-6">
            {legal.map((link) => (
              <li key={link.href}>
                <FooterLink item={link} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  const className = "text-muted-foreground transition-colors hover:text-foreground";
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

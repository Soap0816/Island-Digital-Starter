"use client";

import { Menu } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { cn } from "@/lib/utils";
import type { NavItem, SiteLogo } from "@/types";

import { Brand } from "./Brand";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

export interface NavbarProps {
  brandName: string;
  logo?: SiteLogo;
  items: NavItem[];
  cta?: NavItem;
  /**
   * Floats the header over the first section (transparent until scrolled).
   * Use with a full-bleed hero; the page must leave room at the top itself.
   */
  overlay?: boolean;
  /** Slides the header away when scrolling down, back when scrolling up. */
  hideOnScroll?: boolean;
}

export function Navbar({ brandName, logo, items, cta, overlay = false, hideOnScroll = false }: NavbarProps) {
  const pathname = usePathname();
  const menu = useDisclosure();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(current > 16);
    if (hideOnScroll) setIsHidden(current > previous && current > 200);
  });

  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isTransparent = overlay && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "top-0 z-50 h-(--header-height) w-full transition-[background-color,border-color,transform] duration-300",
          overlay ? "fixed" : "sticky",
          isTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border bg-background/85 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-background",
          isHidden && !menu.isOpen && "motion-safe:-translate-y-full",
        )}
      >
        <Container size="wide" className="flex h-full items-center justify-between gap-6">
          <Brand name={brandName} logo={logo} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="rounded-button px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {cta && (
              <ButtonLink href={cta.href} size="sm" className="hidden sm:inline-flex">
                {cta.label}
              </ButtonLink>
            )}
            <button
              type="button"
              onClick={menu.open}
              aria-haspopup="dialog"
              aria-expanded={menu.isOpen}
              className="-mr-2 grid size-11 place-items-center rounded-button transition-colors hover:bg-foreground/8 lg:hidden"
            >
              <Menu aria-hidden className="size-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menu.isOpen}
        onClose={menu.close}
        brandName={brandName}
        logo={logo}
        items={items}
        cta={cta}
        isActive={isActive}
      />
    </>
  );
}

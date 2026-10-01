"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { useMotionProfile } from "@/components/motion/MotionProvider";
import { useDialog } from "@/lib/hooks/useDialog";
import { revealVariants, staggerVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { NavItem, SiteLogo } from "@/types";

import { Brand } from "./Brand";
import { Container } from "./Container";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  brandName: string;
  logo?: SiteLogo;
  items: NavItem[];
  cta?: NavItem;
  isActive?: (href: string) => boolean;
  /** Extra content at the bottom, e.g. contact details or social links. */
  footer?: ReactNode;
}

/** Full-screen navigation sheet built on a native modal <dialog>. */
export function MobileMenu({ open, onClose, brandName, logo, items, cta, isActive, footer }: MobileMenuProps) {
  const dialogProps = useDialog(open, onClose);
  const profile = useMotionProfile();
  const itemVariants = revealVariants("up", profile, { distance: 16, duration: 0.5 });

  return (
    <dialog
      {...dialogProps}
      aria-label="Menu"
      className="dialog dialog-sheet m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground lg:hidden"
    >
      <div className="flex h-full flex-col">
        <Container size="wide" className="flex h-(--header-height) shrink-0 items-center justify-between">
          <Brand name={brandName} logo={logo} onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid size-11 place-items-center rounded-button transition-colors hover:bg-foreground/8"
          >
            <X aria-hidden className="size-6" />
            <span className="sr-only">Close menu</span>
          </button>
        </Container>

        <Container size="wide" className="flex flex-1 flex-col justify-between gap-10 overflow-y-auto py-8">
          <nav aria-label="Mobile">
            <motion.ul
              className="flex flex-col gap-1"
              variants={staggerVariants(0.05, 0.1)}
              initial="hidden"
              animate={open ? "visible" : "hidden"}
            >
              {items.map((item) => {
                const active = isActive?.(item.href);
                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-display block py-2 text-3xl transition-colors hover:text-accent-text sm:text-4xl",
                        active && "text-accent-text",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          <div className="flex flex-col gap-6">
            {cta && (
              <ButtonLink href={cta.href} onClick={onClose} size="lg" fullWidth>
                {cta.label}
              </ButtonLink>
            )}
            {footer}
          </div>
        </Container>
      </div>
    </dialog>
  );
}

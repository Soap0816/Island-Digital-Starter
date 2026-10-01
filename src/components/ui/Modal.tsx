"use client";

import { X } from "lucide-react";
import { useId, type ReactNode } from "react";

import { useDialog } from "@/lib/hooks/useDialog";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "./Button";

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
} as const;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Actions row, e.g. confirm/cancel buttons. */
  footer?: ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}

/**
 * Accessible modal built on the native <dialog> element: focus is trapped,
 * Escape and backdrop clicks close it, focus returns to the trigger, and the page behind is inert.
 */
export function Modal({ open, onClose, title, description, children, footer, size = "md", className }: ModalProps) {
  const dialogProps = useDialog(open, onClose);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog
      {...dialogProps}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "dialog m-auto w-[calc(100%-2rem)] rounded-theme border border-border bg-background p-0 text-foreground shadow-2xl",
        sizes[size],
        className,
      )}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <header className="flex items-start justify-between gap-6 p-6 pb-0 md:p-8 md:pb-0">
          <div className="flex flex-col gap-2">
            <h2 id={titleId} className="text-display text-2xl">
              {title}
            </h2>
            {description && (
              <div id={descriptionId} className="text-muted-foreground">
                {description}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="-mt-1 -mr-2 size-9 px-0">
            <X aria-hidden />
            <span className="sr-only">Close</span>
          </Button>
        </header>

        {children && <div className="overflow-y-auto p-6 md:p-8">{children}</div>}

        {footer && (
          <footer className="flex flex-wrap justify-end gap-3 border-t border-border p-6 md:px-8">{footer}</footer>
        )}
      </div>
    </dialog>
  );
}

interface ModalTriggerProps extends Omit<ModalProps, "open" | "onClose"> {
  /** Button label. */
  label: ReactNode;
  buttonProps?: Omit<ButtonProps, "onClick" | "children">;
}

/** A button that opens a modal. Lets server components use a modal without managing state. */
export function ModalTrigger({ label, buttonProps, ...modalProps }: ModalTriggerProps) {
  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <Button {...buttonProps} onClick={open} aria-haspopup="dialog">
        {label}
      </Button>
      <Modal {...modalProps} open={isOpen} onClose={close} />
    </>
  );
}

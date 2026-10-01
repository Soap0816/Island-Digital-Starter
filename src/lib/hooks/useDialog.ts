"use client";

import { useEffect, useRef, type MouseEvent } from "react";

/**
 * Syncs a controlled `open` prop with a native <dialog>.
 * The browser then handles focus trapping, Escape, the backdrop and inert background.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  /** Close when the backdrop (the dialog element itself) is clicked. */
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  /** Spread onto the <dialog>. */
  return { ref, onClose, onClick: onBackdropClick };
}

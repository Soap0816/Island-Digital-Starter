import { ChevronDown } from "lucide-react";
import { useId, type ComponentPropsWithRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const controlStyles = cn(
  "w-full rounded-button border border-border bg-surface px-4 py-3 text-base text-foreground",
  "placeholder:text-muted-foreground/70 transition-[border-color,box-shadow]",
  "hover:border-foreground/30 focus:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15",
  "aria-invalid:border-red-600 aria-invalid:focus-visible:ring-red-600/20",
);

interface FieldProps {
  label: string;
  /** Called with the ids to spread onto the control so label, hint and error are announced. */
  children: (control: { id: string; "aria-describedby"?: string; "aria-invalid"?: true }) => ReactNode;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
}

/** Label + hint + error wrapper that wires up all ARIA attributes. */
export function Field({ label, children, hint, error, optional, className }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && (
        <p id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-red-600 [.tone-inverse_&]:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
  return <input className={cn(controlStyles, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithRef<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-36 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentPropsWithRef<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlStyles, "h-12 cursor-pointer appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

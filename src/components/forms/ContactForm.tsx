"use client";

import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { submitContactForm } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";
import {
  HONEYPOT_FIELD,
  hasErrors,
  initialContactState,
  readContactValues,
  validateContact,
  type ContactFormState,
} from "@/lib/validation/contact";
import { getWhatsAppUrl } from "@/lib/whatsapp";

import { Field, Input, Select, Textarea } from "./Field";

export interface ContactFormProps {
  /** Options for the "What can we help with?" select. Hidden when empty. */
  services?: string[];
  showPhone?: boolean;
  submitLabel?: string;
  /** Adds a "Prefer WhatsApp?" link under the button. */
  whatsapp?: { number: string; message?: string };
  className?: string;
}

/** Validates instantly on the client, then re-validates and delivers on the server. */
async function submitWithClientValidation(previous: ContactFormState, formData: FormData) {
  const values = readContactValues(formData);
  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values } satisfies ContactFormState;
  }
  return submitContactForm(previous, formData);
}

export function ContactForm({
  services = [],
  showPhone = true,
  submitLabel = "Send message",
  whatsapp,
  className,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitWithClientValidation, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  // Move focus to the first invalid field so keyboard and screen reader users land on the problem.
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} noValidate className={cn("flex flex-col gap-5", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          {(control) => <Input {...control} name="name" autoComplete="name" required defaultValue={values.name} />}
        </Field>
        <Field label="Email" error={errors.email}>
          {(control) => (
            <Input {...control} name="email" type="email" autoComplete="email" required defaultValue={values.email} />
          )}
        </Field>
        {showPhone && (
          <Field label="Phone" optional error={errors.phone}>
            {(control) => <Input {...control} name="phone" type="tel" autoComplete="tel" defaultValue={values.phone} />}
          </Field>
        )}
        {services.length > 0 && (
          <Field label="What can we help with?" optional error={errors.service}>
            {(control) => (
              <Select {...control} name="service" defaultValue={values.service ?? ""}>
                <option value="">Select an option</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </Select>
            )}
          </Field>
        )}
      </div>

      <Field label="Message" error={errors.message} hint="A few lines about your project, timeline and budget.">
        {(control) => <Textarea {...control} name="message" required rows={5} defaultValue={values.message} />}
      </Field>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div role="status" aria-live="polite">
        {state.message && (
          <p
            className={cn(
              "flex items-start gap-2 rounded-button p-4 text-sm font-medium",
              state.status === "success" ? "bg-accent/10 text-foreground" : "bg-red-600/10 text-red-700 [.tone-inverse_&]:text-red-300",
            )}
          >
            {state.status === "success" ? (
              <CircleCheck aria-hidden className="mt-px size-4 shrink-0 text-accent-text" />
            ) : (
              <CircleAlert aria-hidden className="mt-px size-4 shrink-0" />
            )}
            {state.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" loading={isPending} trailingIcon={<Send aria-hidden />}>
          {isPending ? "Sending…" : submitLabel}
        </Button>
        {whatsapp && (
          <a
            href={getWhatsAppUrl(whatsapp.number, whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SocialIcon platform="whatsapp" className="size-4" />
            Prefer WhatsApp? Message us
          </a>
        )}
      </div>
    </form>
  );
}

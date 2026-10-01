/*
 * Contact form validation shared by the client (instant feedback) and the
 * server action (source of truth). Dependency-free; swap for zod if a project grows.
 */

export const contactFields = ["name", "email", "phone", "service", "message"] as const;

export type ContactField = (typeof contactFields)[number];

export type ContactValues = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
  /** Echoed back so fields keep their values after a failed submit. */
  values?: Partial<ContactValues>;
}

export const initialContactState: ContactFormState = { status: "idle" };

/** Hidden field that real users never fill. Bots usually do. */
export const HONEYPOT_FIELD = "company_website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactValues(formData: FormData): ContactValues {
  const read = (key: ContactField) => String(formData.get(key) ?? "").trim();
  return {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    service: read("service"),
    message: read("message"),
  };
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !/^[\d\s()+-]{7,20}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.message.length < 10) errors.message = "Please write at least 10 characters.";
  if (values.message.length > 5000) errors.message = "Please keep your message under 5000 characters.";

  return errors;
}

export function hasErrors(errors: ContactErrors) {
  return Object.keys(errors).length > 0;
}

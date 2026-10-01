"use server";

import {
  HONEYPOT_FIELD,
  hasErrors,
  readContactValues,
  validateContact,
  type ContactFormState,
} from "@/lib/validation/contact";

/**
 * Server action used by <ContactForm>.
 * Connect a delivery method where marked (Resend, Postmark, Formspree, a CRM webhook…)
 * and keep any API keys in environment variables.
 */
export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Silently accept bot submissions so they don't retry.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success", message: "Thanks! We'll be in touch shortly." };
  }

  const values = readContactValues(formData);
  const errors = validateContact(values);

  if (hasErrors(errors)) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  try {
    // TODO(project): deliver the message, e.g.
    // await resend.emails.send({ to: siteConfig.contact.email, subject: `New enquiry from ${values.name}`, ... })
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] new enquiry", values);
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email us directly.",
      values,
    };
  }

  return { status: "success", message: "Thanks! Your message has been sent. We'll reply within one business day." };
}

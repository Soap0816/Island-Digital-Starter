/** Builds a https://wa.me link. Accepts numbers with spaces, dashes or a leading +. */
export function getWhatsAppUrl(number: string, message?: string) {
  const digits = number.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}

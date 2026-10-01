import { twMerge } from "tailwind-merge";

type ClassValue = string | number | false | null | undefined;

/** Joins class names and resolves Tailwind conflicts so `className` props override defaults. */
export function cn(...classes: ClassValue[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string, base: string) {
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

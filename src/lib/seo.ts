import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

const { seo } = siteConfig;

/** Site-wide defaults. Used once in the root layout. */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(seo.siteUrl),
    title: { default: seo.defaultTitle, template: seo.titleTemplate },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: siteConfig.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: seo.locale,
      url: "/",
      title: seo.defaultTitle,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.description,
      creator: seo.twitterHandle,
    },
  };
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  /** Route path, e.g. "/about". Used for the canonical URL. */
  path: string;
  /** Set true for pages that shouldn't be indexed (thank-you pages, drafts). */
  noIndex?: boolean;
}

/** Per-page metadata. Export from a page: `export const metadata = buildPageMetadata({...})`. */
export function buildPageMetadata({
  title,
  description = seo.description,
  path,
  noIndex,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

import type { ThemeSelection } from "./theme";

export interface NavItem {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "linkedin"
  | "x"
  | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  /** Accessible label. Defaults to the platform name. */
  label?: string;
}

export interface PostalAddress {
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
}

export interface OpeningHours {
  label: string;
  value: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: PostalAddress;
  hours?: OpeningHours[];
  /** Link to Google Maps or similar. */
  mapUrl?: string;
}

export interface WhatsAppConfig {
  enabled: boolean;
  /** International format, digits only or with spaces/+, e.g. "+1 555 555 0123". */
  number: string;
  defaultMessage: string;
}

export interface SeoConfig {
  /** Production URL without trailing slash. Used for canonical URLs, sitemap and OG. */
  siteUrl: string;
  defaultTitle: string;
  /** `%s` is replaced by the page title. */
  titleTemplate: string;
  description: string;
  keywords: string[];
  locale: string;
  twitterHandle?: string;
  /**
   * schema.org type for the JSON-LD block, e.g. "Restaurant", "AutoDealer",
   * "ProfessionalService". See https://schema.org/LocalBusiness.
   */
  businessType: string;
}

export interface SiteFeatures {
  loadingScreen: boolean;
  pageTransitions: boolean;
  whatsappButton: boolean;
}

export interface SiteLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  /** Optional image logo. When omitted the brand name is rendered as text. */
  logo?: SiteLogo;
  theme: ThemeSelection;
  navigation: {
    main: NavItem[];
    cta?: NavItem;
    footer: FooterColumn[];
    legal: NavItem[];
  };
  contact: ContactInfo;
  socials: SocialLink[];
  whatsapp: WhatsAppConfig;
  seo: SeoConfig;
  features: SiteFeatures;
}

import type { SiteConfig } from "@/types";

/**
 * The single place to rebrand the starter for a new client.
 * Everything in the layout (navbar, footer, SEO, WhatsApp, theme) reads from here.
 */
export const siteConfig: SiteConfig = {
  name: "Island Digital",
  tagline: "Websites that work as hard as you do.",

  // logo: { src: "/images/logo.svg", alt: "Island Digital", width: 140, height: 32 },

  theme: {
    // "service" | "luxury" | "restaurant" | "automotive" | "fashion" | "nightlife"
    preset: "service",
    // Override any token from the preset, e.g. the client's brand color:
    colors: {
      // accent: "#0f766e",
    },
  },

  navigation: {
    main: [
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/#work" },
      { label: "Styles", href: "/#styles" },
      { label: "Motion", href: "/#motion" },
      { label: "Contact", href: "/#contact" },
    ],
    cta: { label: "Start a project", href: "/#contact" },
    footer: [
      {
        title: "Studio",
        links: [
          { label: "Services", href: "/#services" },
          { label: "Work", href: "/#work" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Style presets", href: "/#styles" },
          { label: "Motion toolkit", href: "/#motion" },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },

  contact: {
    email: "hello@islanddigital.example",
    phone: "+1 555 555 0123",
    address: {
      street: "12 Harbour Street",
      city: "Kingston",
      country: "JM",
    },
    hours: [
      { label: "Mon – Fri", value: "9:00 – 17:00" },
      { label: "Sat", value: "By appointment" },
    ],
  },

  socials: [
    { platform: "instagram", href: "https://instagram.com/" },
    { platform: "linkedin", href: "https://linkedin.com/" },
    { platform: "facebook", href: "https://facebook.com/" },
  ],

  whatsapp: {
    enabled: true,
    number: "+1 555 555 0123",
    defaultMessage: "Hi! I'd like to talk about a new website.",
  },

  seo: {
    siteUrl: "https://islanddigital.example",
    defaultTitle: "Island Digital — Web design studio",
    titleTemplate: "%s | Island Digital",
    description:
      "Island Digital designs and builds fast, accessible websites for ambitious local businesses.",
    keywords: ["web design", "website development", "Next.js", "freelance web designer"],
    locale: "en_US",
    businessType: "ProfessionalService",
  },

  features: {
    loadingScreen: true,
    pageTransitions: true,
    whatsappButton: true,
  },
};

import {
  Accessibility,
  Gauge,
  MonitorSmartphone,
  Palette,
  Rocket,
  Search,
  type LucideIcon,
} from "lucide-react";

import type { ImageAsset } from "@/types";

/*
 * Placeholder content for the demo homepage.
 * For a client project, replace this file with real content (or a CMS fetch).
 */

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Brand-led design",
    description: "Layouts, type and colour tuned to the client's brand, not a template.",
    icon: Palette,
  },
  {
    title: "Responsive builds",
    description: "Every section is designed mobile-first and tested down to 320px.",
    icon: MonitorSmartphone,
  },
  {
    title: "Performance",
    description: "Static rendering, optimised images and fonts for fast Core Web Vitals.",
    icon: Gauge,
  },
  {
    title: "Search visibility",
    description: "Metadata, sitemap, Open Graph and structured data out of the box.",
    icon: Search,
  },
  {
    title: "Accessible by default",
    description: "Semantic HTML, keyboard support, focus states and reduced motion.",
    icon: Accessibility,
  },
  {
    title: "Launch support",
    description: "Hosting, analytics, domains and handover documentation.",
    icon: Rocket,
  },
];

export interface Project {
  title: string;
  category: string;
  href: string;
  image: ImageAsset;
}

export const projects: Project[] = [
  {
    title: "Harbour Kitchen",
    category: "Restaurant",
    href: "#work",
    image: { src: "/images/placeholder-1.svg", alt: "Placeholder artwork in warm tones" },
  },
  {
    title: "Northline Motors",
    category: "Automotive",
    href: "#work",
    image: { src: "/images/placeholder-2.svg", alt: "Placeholder artwork in cool tones" },
  },
  {
    title: "Maison Ora",
    category: "Fashion",
    href: "#work",
    image: { src: "/images/placeholder-3.svg", alt: "Placeholder artwork in neutral tones" },
  },
];

export const marqueeItems = [
  "Restaurants",
  "Hotels & villas",
  "Automotive",
  "Fashion",
  "Nightlife",
  "Health & beauty",
  "Trades & services",
];

export const contactServiceOptions = [
  "New website",
  "Redesign",
  "Landing page",
  "Ongoing support",
];

export const heroImage: ImageAsset = {
  src: "/images/placeholder-hero.svg",
  alt: "Abstract placeholder composition",
  width: 1200,
  height: 1400,
};

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Island Digital Starter

Reusable foundation for Island Digital client sites. **Not a client site.** Copy it, rebrand it through config, replace the demo content.

Stack: Next.js 16 (App Router, Turbopack, React Compiler) · React 19 · Tailwind CSS 4 · Motion 13 (`motion/react`) · TypeScript strict · lucide-react · tailwind-merge.

## Folder map

```
src/
  app/                    Routes. layout.tsx wires config → navbar, footer, theme, SEO, WhatsApp.
    template.tsx          Page transition (remounts per route).
    (legal)/              Privacy/terms placeholder pages sharing one layout.
    sitemap.ts robots.ts opengraph-image.tsx   SEO generated from config.
  components/
    layout/               Container, Section, Stack, Grid, Split, Navbar, MobileMenu, Footer, Brand
    ui/                   Button/ButtonLink, Card, ImageCard, SectionHeading, Modal/ModalTrigger, SocialIcon, SocialLinks
    sections/             Hero, CTA (composed page blocks)
    motion/               MotionProvider, Reveal/RevealGroup/RevealItem, TextReveal, ImageReveal,
                          HoverLift, Magnetic, Marquee, PageTransition, LoadingScreen (barrel: @/components/motion)
    forms/                ContactForm, Field/Input/Textarea/Select
    widgets/              WhatsAppButton
    seo/                  LocalBusinessJsonLd
    demo/                 DEMO ONLY (ThemePreview, MotionShowcase) — delete for client sites
  data/
    site.ts               ← THE file to edit per client (brand, theme, nav, contact, socials, WhatsApp, SEO, features)
    themes.ts             Six style presets: service, luxury, restaurant, automotive, fashion, nightlife
    demo.ts               Demo homepage content — replace with real content
  lib/
    theme.ts              resolveTheme(), themeToCssVars(), siteTheme
    motion.ts             Variant factories: revealVariants, staggerVariants, textRevealVariants, imageRevealVariants, hoverLiftVariants
    seo.ts                buildRootMetadata(), buildPageMetadata()
    fonts.ts              next/font loaders (Inter, Fraunces, Space Grotesk)
    actions/contact.ts    Contact server action (connect email delivery here)
    validation/contact.ts Shared client/server validation
    hooks/                useDialog (native <dialog>), useDisclosure
    utils.ts whatsapp.ts styles.ts
  types/                  SiteConfig, ThemePreset, motion and content types (import from "@/types")
```

## Starting a new client project

1. Copy the folder (or use it as a GitHub template), then `npm install`.
2. Edit `src/data/site.ts`: name, tagline, `theme.preset`, `theme.colors` overrides, navigation, contact, socials, WhatsApp, `seo.siteUrl`, `seo.businessType`, feature flags.
3. Delete `src/components/demo/` and `src/data/demo.ts`; rebuild `src/app/page.tsx` from the components.
4. Remove unused fonts from `src/lib/fonts.ts` (and their keys in `fontCssVar` in `src/lib/theme.ts`).
5. Add real images to `public/images/` and delete the placeholders.
6. Connect delivery in `src/lib/actions/contact.ts` (keep API keys in `.env.local`).
7. Replace legal placeholder copy; add new routes to `src/app/sitemap.ts`.
8. `npm run lint && npm run build` before every deploy.

## Theming rules

- Components only use semantic tokens: `bg-background text-foreground bg-muted text-muted-foreground bg-surface border-border bg-accent text-accent-foreground text-accent-text bg-inverse`, `rounded-theme`, `rounded-button`, `font-display`, plus the `text-display` (theme heading style) and `eyebrow` utilities. **Never hard-code hex colors in components.**
- Change colors in `site.ts` → `theme.colors`, not in `globals.css` (its `:root` values are only fallbacks).
- Section tones (`<Section tone="muted|inverse|accent">`, or classes `tone-*`, `on-image`) re-map tokens so everything inside adapts automatically.
- A new preset = add a name to `ThemePresetName` in `src/types/theme.ts` and an entry in `src/data/themes.ts`. Check text contrast (AA) for foreground, mutedForeground and accentForeground pairs.
- Motion timing (duration, distance, stagger, easing) is part of each preset and read via `useMotionProfile()`.

## Component conventions

- Server components by default. `"use client"` only for state/effects/Motion (motion/, Navbar, MobileMenu, Modal, ContactForm, ThemePreview).
- Never import non-component values from a `"use client"` file into a server component — put shared constants in `src/lib/` (see `lib/styles.ts`).
- Every image prop uses `ImageAsset` with a required `alt`. Use `preload` (not the deprecated `priority`) for above-the-fold images.
- Use `cn()` from `@/lib/utils` so `className` overrides win.
- Polymorphic motion wrappers use the `motionElements` map — don't call a function that returns a component during render (React Compiler lint rule `react-hooks/static-components`).
- Slot props (`actions`, `footer`, `icon`) take `ReactNode` so server pages can pass JSX into client components.

## Motion & accessibility

- `MotionProvider` sets `reducedMotion="user"`: transforms are skipped, opacity still fades. ImageReveal falls back to a fade; Marquee and Magnetic stop entirely.
- Reveal wrappers carry `data-reveal`; a `<noscript>` style in the layout un-hides them without JavaScript.
- Use `trigger="mount"` on `<TextReveal>` above the fold, the default `"view"` elsewhere.
- Marquee needs a `label` and shows a pause button by default (WCAG 2.2.2).
- Modal and MobileMenu use native `<dialog>` (focus trap, Escape, inert background, focus return). Don't replace with div overlays.
- Keep: skip link, `aria-labelledby` on sections (pass the same `id` to `SectionHeading`), visible focus styles, one `h1` per page.

## Quick reference

```tsx
<Section id="menu" tone="muted" aria-labelledby="menu-title">
  <SectionHeading id="menu-title" eyebrow="Menu" title="Seasonal plates" description="…" />
  <RevealGroup>
    <Grid cols={3}>
      {items.map((item) => (
        <RevealItem key={item.id}><Card title={item.name} description={item.text} /></RevealItem>
      ))}
    </Grid>
  </RevealGroup>
</Section>

<Hero layout="background" size="screen" title="…" image={{ src: "/images/hero.jpg", alt: "…" }} actions={<ButtonLink href="#book">Book a table</ButtonLink>} />
<CTA variant="band" tone="accent" title="…" actions={<ModalTrigger label="Enquire" title="…">…</ModalTrigger>} />
export const metadata = buildPageMetadata({ title: "About", path: "/about" });
```

Navbar over a full-bleed hero: pass `overlay` (and optionally `hideOnScroll`) to `<Navbar>` in `src/app/layout.tsx`.

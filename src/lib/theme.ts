import type { CSSProperties } from "react";

import { siteConfig } from "@/data/site";
import { themePresets } from "@/data/themes";
import type { FontKey, ThemePreset, ThemeSelection } from "@/types";

/** Maps a font key to the CSS variable created in src/lib/fonts.ts. */
export const fontCssVar: Record<FontKey, string> = {
  sans: "var(--font-inter)",
  serif: "var(--font-fraunces)",
  grotesk: "var(--font-space-grotesk)",
};

/** Merges a preset with the project's overrides. */
export function resolveTheme(selection: ThemeSelection): ThemePreset {
  const preset = themePresets[selection.preset];
  return {
    ...preset,
    colors: { ...preset.colors, ...selection.colors },
    typography: { ...preset.typography, ...selection.typography },
    shape: { ...preset.shape, ...selection.shape },
    motion: { ...preset.motion, ...selection.motion },
  };
}

/** The resolved theme for this site. */
export const siteTheme = resolveTheme(siteConfig.theme);

/**
 * Converts a theme into CSS custom properties. These are consumed by
 * `@theme inline` in globals.css, so Tailwind classes like `bg-accent` follow the theme.
 */
export function themeToCssVars(theme: ThemePreset): Record<`--${string}`, string> {
  const { colors, typography, shape } = theme;
  return {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--surface": colors.surface,
    "--border": colors.border,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--accent-text": colors.accent,
    "--accent-base": colors.accent,
    "--accent-foreground-base": colors.accentForeground,
    "--inverse": colors.inverse,
    "--inverse-foreground": colors.inverseForeground,
    "--font-heading": fontCssVar[typography.heading],
    "--font-body": fontCssVar[typography.body],
    "--heading-weight": String(typography.headingWeight),
    "--heading-tracking": typography.headingTracking,
    "--heading-transform": typography.headingTransform,
    "--radius": shape.radius,
    "--radius-btn": shape.buttonRadius,
  };
}

export function themeStyle(theme: ThemePreset): CSSProperties {
  return { ...themeToCssVars(theme), colorScheme: theme.colorScheme } as CSSProperties;
}

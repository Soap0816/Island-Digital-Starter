import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";
import { siteTheme } from "@/lib/theme";

/* Generated social share image using the brand name, tagline and theme colors. */
export const alt = siteConfig.seo.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { colors } = siteTheme;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: colors.background,
          color: colors.foreground,
        }}
      >
        <div style={{ display: "flex", width: 96, height: 8, background: colors.accent }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 36, color: colors.mutedForeground }}>{siteConfig.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}

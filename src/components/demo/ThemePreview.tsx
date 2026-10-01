"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { themePresetList } from "@/data/themes";
import { themeToCssVars } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { ThemePresetName } from "@/types";

/**
 * DEMO ONLY — previews a preset by swapping the CSS variables on <html>.
 * Real projects choose a preset in src/data/site.ts. Delete this component for client sites.
 */
export function ThemePreview({ initial }: { initial: ThemePresetName }) {
  const [active, setActive] = useState(initial);

  const apply = (name: ThemePresetName) => {
    const preset = themePresetList.find((item) => item.name === name);
    if (!preset) return;
    const root = document.documentElement;
    for (const [property, value] of Object.entries(themeToCssVars(preset))) {
      root.style.setProperty(property, value);
    }
    root.style.setProperty("color-scheme", preset.colorScheme);
    setActive(name);
  };

  return (
    <div role="group" aria-label="Style presets" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {themePresetList.map((preset) => {
        const isActive = preset.name === active;
        const { colors } = preset;
        return (
          <button
            key={preset.name}
            type="button"
            aria-pressed={isActive}
            onClick={() => apply(preset.name)}
            className={cn(
              "flex cursor-pointer items-center gap-4 rounded-theme border bg-surface p-4 text-left transition-colors",
              isActive ? "border-foreground" : "border-border hover:border-foreground/40",
            )}
          >
            <span
              aria-hidden
              className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-button border border-black/10"
              style={{ backgroundColor: colors.background, color: colors.foreground }}
            >
              <span className="text-lg font-semibold">Aa</span>
              <span className="absolute right-0 bottom-0 left-0 h-2" style={{ backgroundColor: colors.accent }} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="font-medium">{preset.label}</span>
              <span className="text-sm text-muted-foreground">{preset.description}</span>
            </span>
            <Check aria-hidden className={cn("size-5 shrink-0", !isActive && "invisible")} />
          </button>
        );
      })}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Grid } from "@/components/layout/Grid";
import { HoverLift, Magnetic, Reveal, TextReveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";

/* DEMO ONLY — a live reference for the motion utilities. */

function Tile({ name, usage, children }: { name: string; usage: string; children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-theme border border-border bg-surface">
      <div className="grid min-h-44 place-items-center bg-muted p-6">{children}</div>
      <div className="flex flex-col gap-1 border-t border-border p-5">
        <h3 className="font-medium">{name}</h3>
        <code className="truncate font-mono text-xs text-muted-foreground">{usage}</code>
      </div>
    </div>
  );
}

const swatch = "size-16 rounded-theme bg-accent";

export function MotionShowcase() {
  return (
    <Grid cols={3}>
      <Tile name="Fade reveal" usage='<Reveal variant="fade">'>
        <Reveal variant="fade" amount={0.8} once={false}>
          <div className={swatch} />
        </Reveal>
      </Tile>
      <Tile name="Slide reveal" usage='<Reveal variant="left">'>
        <Reveal variant="left" distance={60} amount={0.8} once={false}>
          <div className={swatch} />
        </Reveal>
      </Tile>
      <Tile name="Scale reveal" usage='<Reveal variant="scale">'>
        <Reveal variant="scale" amount={0.8} once={false}>
          <div className={swatch} />
        </Reveal>
      </Tile>
      <Tile name="Staggered text" usage='<TextReveal by="char" text="…" />'>
        <TextReveal as="p" by="char" text="Hello there" once={false} className="text-display text-3xl" />
      </Tile>
      <Tile name="Hover lift" usage="<HoverLift lift={8}>">
        <HoverLift lift={8} className="rounded-theme border border-border bg-surface px-6 py-4 text-sm font-medium shadow-sm">
          Hover me
        </HoverLift>
      </Tile>
      <Tile name="Magnetic button" usage="<Magnetic strength={0.4}>">
        <Magnetic strength={0.4}>
          <Button variant="secondary" trailingIcon={<ArrowRight aria-hidden />}>
            Move closer
          </Button>
        </Magnetic>
      </Tile>
    </Grid>
  );
}

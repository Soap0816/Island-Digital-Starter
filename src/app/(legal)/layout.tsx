import type { ReactNode } from "react";

import { Section } from "@/components/layout/Section";

/* Shared layout for simple text pages (privacy, terms, imprint…). */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <Section spacing="lg" container="narrow">
      <article className="flex flex-col gap-6 text-pretty text-muted-foreground [&_h1]:text-foreground [&_h2]:mt-6 [&_h2]:text-display [&_h2]:text-2xl [&_h2]:text-foreground">
        {children}
      </article>
    </Section>
  );
}

import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <Section spacing="lg" container="narrow" className="flex flex-1 items-center">
      <SectionHeading
        as="h1"
        eyebrow="404"
        title="This page doesn't exist"
        description="The link may be broken or the page may have moved."
        align="center"
        animate={false}
      >
        <ButtonLink href="/" variant="outline" leadingIcon={<ArrowLeft aria-hidden />}>
          Back to home
        </ButtonLink>
      </SectionHeading>
    </Section>
  );
}

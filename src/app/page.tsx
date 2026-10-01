import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { MotionShowcase } from "@/components/demo/MotionShowcase";
import { ThemePreview } from "@/components/demo/ThemePreview";
import { ContactForm } from "@/components/forms/ContactForm";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Split } from "@/components/layout/Split";
import { Magnetic, Marquee, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageCard } from "@/components/ui/ImageCard";
import { ModalTrigger } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactServiceOptions, heroImage, marqueeItems, projects, services } from "@/data/demo";
import { siteConfig } from "@/data/site";
import { telHref } from "@/lib/utils";

/*
 * Demo homepage: shows every starter component in context.
 * For a client project, replace the sections below with the client's content.
 */
export default function HomePage() {
  const { contact, whatsapp } = siteConfig;

  return (
    <>
      <Hero
        eyebrow="Island Digital starter"
        title="Clean foundations for websites that convert"
        description="A reusable Next.js kit with themeable components, accessible motion and a single config file for every new client."
        image={heroImage}
        actions={
          <>
            <Magnetic>
              <ButtonLink href="#contact" size="lg" trailingIcon={<ArrowRight aria-hidden />}>
                Start a project
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#services" size="lg" variant="outline">
              Explore components
            </ButtonLink>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">Next.js 16 · Tailwind CSS 4 · Motion · TypeScript</p>
      </Hero>

      <Section spacing="sm" container={false} className="border-y border-border">
        <Marquee label="Industries we design for" duration={40}>
          {marqueeItems.map((item) => (
            <span key={item} className="text-display flex items-center gap-8 pr-8 text-2xl text-muted-foreground md:text-3xl">
              {item}
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </Section>

      <Section id="services" aria-labelledby="services-title">
        <div className="flex flex-col gap-12 md:gap-16">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Everything a small business site needs"
            description="Cards, grids and headings are theme-aware primitives. Swap the content, keep the structure."
          />
          <RevealGroup>
            <Grid cols={3}>
              {services.map((service) => (
                <RevealItem key={service.title}>
                  <Card icon={<service.icon />} title={service.title} description={service.description} interactive />
                </RevealItem>
              ))}
            </Grid>
          </RevealGroup>
        </div>
      </Section>

      <Section id="work" tone="muted" aria-labelledby="work-title">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="work-title"
              eyebrow="Selected work"
              title="Image cards for portfolios, menus and inventory"
            />
            <Reveal variant="fade">
              <ButtonLink href="#contact" variant="link" trailingIcon={<ArrowRight aria-hidden />}>
                Discuss your project
              </ButtonLink>
            </Reveal>
          </div>
          <Grid cols={3}>
            {projects.map((project, index) => (
              <Reveal key={project.title} variant="up" delay={index * 0.1}>
                <ImageCard
                  image={project.image}
                  eyebrow={project.category}
                  title={project.title}
                  href={project.href}
                  layout={index === 1 ? "overlay" : "below"}
                />
              </Reveal>
            ))}
          </Grid>
        </div>
      </Section>

      <Section id="styles" aria-labelledby="styles-title">
        <div className="flex flex-col gap-12">
          <SectionHeading
            id="styles-title"
            eyebrow="Style presets"
            title="One codebase, six visual directions"
            description={
              <>
                Click a preset to preview it on this page. For a real project, set{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">theme.preset</code> in{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">src/data/site.ts</code>.
              </>
            }
          />
          <Reveal variant="up">
            <ThemePreview initial={siteConfig.theme.preset} />
          </Reveal>
        </div>
      </Section>

      <Section id="motion" tone="muted" aria-labelledby="motion-title">
        <div className="flex flex-col gap-12">
          <SectionHeading
            id="motion-title"
            eyebrow="Motion toolkit"
            title="Subtle animation, respectful of reduced motion"
            description="Every utility reads its timing from the active theme and turns off movement for visitors who ask for less."
          />
          <MotionShowcase />
        </div>
      </Section>

      <CTA
        eyebrow="Ready when you are"
        title="Let's plan your next website"
        description="Book a free 20-minute call to talk through goals, timeline and budget."
        actions={
          <>
            <ModalTrigger
              label="Book a discovery call"
              buttonProps={{ size: "lg" }}
              title="Book a discovery call"
              description="Pick whichever is easiest. We usually reply within one business day."
              size="sm"
            >
              <div className="flex flex-col gap-3">
                <ButtonLink href={`mailto:${contact.email}`} variant="secondary" fullWidth leadingIcon={<Mail aria-hidden />}>
                  Email {contact.email}
                </ButtonLink>
                {contact.phone && (
                  <ButtonLink href={telHref(contact.phone)} variant="outline" fullWidth leadingIcon={<Phone aria-hidden />}>
                    Call {contact.phone}
                  </ButtonLink>
                )}
              </div>
            </ModalTrigger>
            <ButtonLink href={`mailto:${contact.email}`} size="lg" variant="outline">
              Email us
            </ButtonLink>
          </>
        }
      />

      <Section id="contact" aria-labelledby="contact-title" className="pt-0 md:pt-0">
        <Split
          ratio="2:3"
          align="start"
          start={
            <div className="flex flex-col gap-10">
              <SectionHeading
                id="contact-title"
                eyebrow="Contact"
                title="Tell us about your project"
                description="Fill in the form and we'll get back to you with next steps."
              />
              <Reveal variant="up" delay={0.2}>
                <ul className="flex flex-col gap-4 text-sm">
                  <ContactRow icon={<Mail />} label="Email">
                    <a href={`mailto:${contact.email}`} className="hover:underline">
                      {contact.email}
                    </a>
                  </ContactRow>
                  {contact.phone && (
                    <ContactRow icon={<Phone />} label="Phone">
                      <a href={telHref(contact.phone)} className="hover:underline">
                        {contact.phone}
                      </a>
                    </ContactRow>
                  )}
                  {contact.address && (
                    <ContactRow icon={<MapPin />} label="Studio">
                      {contact.address.street}, {contact.address.city}
                    </ContactRow>
                  )}
                  {contact.hours?.map((slot) => (
                    <ContactRow key={slot.label} icon={<Clock />} label={slot.label}>
                      {slot.value}
                    </ContactRow>
                  ))}
                </ul>
              </Reveal>
            </div>
          }
          end={
            <Reveal variant="up" className="rounded-theme border border-border bg-surface p-6 md:p-10">
              <ContactForm
                services={contactServiceOptions}
                whatsapp={whatsapp.enabled ? { number: whatsapp.number, message: whatsapp.defaultMessage } : undefined}
              />
            </Reveal>
          }
        />
      </Section>
    </>
  );
}

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-button bg-muted text-accent-text [&_svg]:size-4">
        {icon}
      </span>
      <span className="flex flex-col pt-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{children}</span>
      </span>
    </li>
  );
}

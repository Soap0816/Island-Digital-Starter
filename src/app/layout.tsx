import type { Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen, MotionProvider } from "@/components/motion";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { WhatsAppButton } from "@/components/widgets/WhatsAppButton";
import { siteConfig } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { buildRootMetadata } from "@/lib/seo";
import { siteTheme, themeStyle } from "@/lib/theme";

import "./globals.css";

export const metadata = buildRootMetadata();

export const viewport: Viewport = {
  themeColor: siteTheme.colors.background,
  colorScheme: siteTheme.colorScheme,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { navigation, features, whatsapp } = siteConfig;

  return (
    <html lang="en" className={`${fontVariables} antialiased`} style={themeStyle(siteTheme)}>
      <body className="flex min-h-dvh flex-col">
        {/* Without JavaScript, show content that would otherwise wait for a reveal animation. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only z-100 rounded-button bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>

        {features.loadingScreen && <LoadingScreen label={siteConfig.name} />}

        <MotionProvider profile={siteTheme.motion}>
          <Navbar brandName={siteConfig.name} logo={siteConfig.logo} items={navigation.main} cta={navigation.cta} />
          <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
            {children}
          </main>
        </MotionProvider>

        <Footer
          brandName={siteConfig.name}
          tagline={siteConfig.tagline}
          logo={siteConfig.logo}
          columns={navigation.footer}
          legal={navigation.legal}
          contact={siteConfig.contact}
          socials={siteConfig.socials}
        />

        {features.whatsappButton && whatsapp.enabled && (
          <WhatsAppButton number={whatsapp.number} message={whatsapp.defaultMessage} />
        )}

        <LocalBusinessJsonLd config={siteConfig} />
      </body>
    </html>
  );
}

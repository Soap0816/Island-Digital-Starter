import { siteConfig } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({ title: "Privacy policy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-display text-4xl md:text-5xl">Privacy policy</h1>
      <p>
        Placeholder copy. Replace with the client&apos;s privacy policy before launch. Explain what data the contact
        form collects, where it is sent, and how long it is kept.
      </p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent to {siteConfig.contact.email}.</p>
    </>
  );
}

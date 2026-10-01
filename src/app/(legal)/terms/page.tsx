import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({ title: "Terms of use", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <h1 className="text-display text-4xl md:text-5xl">Terms of use</h1>
      <p>Placeholder copy. Replace with the client&apos;s terms before launch.</p>
    </>
  );
}

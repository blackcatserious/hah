import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { siteUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Artur Ziganshin — AI Responsibility Laboratory",
    template: "%s — Traceremove Research",
  },
  description:
    "Independent research and applied assessment on AI ethics, narrative identity, epistemic responsibility, dignity, contestability, and institutional accountability.",
  openGraph: {
    title: "Traceremove — AI Responsibility Laboratory",
    description: "Identity, knowledge, and responsibility in the age of artificial intelligence.",
    type: "website",
    url: siteUrl,
    siteName: "Traceremove",
    locale: "en",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Artur Ziganshin",
  url: siteUrl + "/about",
  jobTitle: "Philosopher of Artificial Intelligence",
  description:
    "Independent philosopher and AI researcher working on narrative identity, machine testimony, contestability, dignity, and institutional responsibility.",
  sameAs: [
    "https://orcid.org/0009-0003-8406-9303",
    "https://philpeople.org/profiles/artur-ziganshin",
    "https://independent.academia.edu/ArturZiganshin",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

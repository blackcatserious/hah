import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { siteUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Traceremove Research — AI Responsibility Laboratory",
    template: "%s — Traceremove Research",
  },
  description:
    "Independent AI responsibility research and applied assessment on narrative identity, epistemic risk, dignity, contestability, and institutional accountability.",
  keywords: [
    "AI responsibility research",
    "AI ethics assessment",
    "AI governance research",
    "algorithmic accountability",
    "AI contestability",
    "epistemic risk",
  ],
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://traceremove.com/#organization",
      name: "Traceremove",
      url: "https://traceremove.com/",
      subOrganization: { "@id": siteUrl + "/#laboratory" },
    },
    {
      "@type": "Organization",
      "@id": siteUrl + "/#laboratory",
      name: "Traceremove Research — AI Responsibility Laboratory",
      url: siteUrl,
      description:
        "Independent research and applied assessment on AI responsibility, narrative identity, epistemic risk, dignity, contestability, and institutional accountability.",
      parentOrganization: { "@id": "https://traceremove.com/#organization" },
      founder: { "@id": siteUrl + "/#artur-ziganshin" },
    },
    {
      "@type": "Person",
      "@id": siteUrl + "/#artur-ziganshin",
      name: "Artur Ziganshin",
      url: siteUrl + "/about",
      jobTitle: "Philosopher of Artificial Intelligence",
      description:
        "Independent philosopher and AI researcher working on narrative identity, machine testimony, contestability, dignity, and institutional responsibility.",
      affiliation: { "@id": siteUrl + "/#laboratory" },
      sameAs: [
        "https://orcid.org/0009-0003-8406-9303",
        "https://philpeople.org/profiles/artur-ziganshin",
        "https://independent.academia.edu/ArturZiganshin",
      ],
    },
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      name: "Traceremove Research",
      url: siteUrl,
      publisher: { "@id": siteUrl + "/#laboratory" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

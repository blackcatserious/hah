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
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}

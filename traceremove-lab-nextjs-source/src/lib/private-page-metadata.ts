import type { Metadata } from "next";

/**
 * Metadata shared by pages that expose account-specific data or setup guidance.
 *
 * `robots.ts` keeps these routes out of the crawl queue, while this metadata
 * protects against a crawler following a direct link to an HTML response. Do
 * not replace this with a canonical URL: private workspace pages do not have a
 * public equivalent that search engines should index.
 */
export const privatePageMetadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
} satisfies Pick<Metadata, "robots">;

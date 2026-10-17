import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-index">
          <span>TRACEREMOVE RESEARCH</span>
          <span>404</span>
        </div>
        <h1>This page is not available.</h1>
        <p className="hero-lead">
          The address may have changed or may not be part of the public research site.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href="/">Return to the research home</Link>
          <Link className="button" href="/publications">Browse publications</Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <div>
          <span className="footer-wordmark">traceremove</span>
          <p>Independent research and applied assessment at the intersection of AI, identity, knowledge, and institutional responsibility.</p>
        </div>
        <div className="footer-links">
          <div><span>Research</span><Link href="/research">Programme</Link><Link href="/publications">Archive</Link><Link href="/lab">Laboratory</Link></div>
          <div><span>Platform</span><Link href="/dashboard">Workspace</Link><Link href="/pricing">Access</Link><Link href="/contact">Institutional audit</Link></div>
        </div>
      </div>
      <div className="footer-secondary">
        <span>© 2026 Artur Ziganshin</span>
        <span>Philosophy of AI · epistemology · dignity · contestability</span>
      </div>
    </footer>
  );
}

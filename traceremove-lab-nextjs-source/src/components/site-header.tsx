"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Research", "/research"],
  ["Archive", "/publications"],
  ["Laboratory", "/lab"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="Traceremove Research home">
          <span className="brand-mark" aria-hidden="true">
            <span>T</span>
          </span>
          <span className="brand-copy">
            <span className="brand-name">traceremove</span>
            <span className="brand-sub">AI responsibility laboratory</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              data-active={pathname === href || pathname.startsWith(`${href}/`)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <span className="research-status"><i /> Research system · 2026</span>
          <Link className="nav-cta" href="/dashboard">Open workspace <span>↗</span></Link>
        </div>
      </div>
    </header>
  );
}

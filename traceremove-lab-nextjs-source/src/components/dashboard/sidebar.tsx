"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Overview", "/dashboard", "OV"],
  ["Cases", "/dashboard/projects", "CA"],
  ["New assessment", "/dashboard/projects/new", "NW"],
] as const;

export function DashboardSidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const links = isAdmin ? [...items, ["Publications", "/dashboard/publications", "PB"] as const] : items;

  return (
    <aside className="sidebar">
      <div className="workspace-brand"><span>T</span><div><strong>Responsibility Lab</strong><small>Private workspace</small></div></div>
      <nav aria-label="Workspace navigation">
        {links.map(([label, href, code]) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
          return <Link key={href} href={href} data-active={active}><span>{code}</span>{label}<i>↗</i></Link>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <Link href="/pricing">Access & billing</Link>
        <Link href="/">Public research site</Link>
      </div>
    </aside>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith("/dashboard");

  if (isWorkspace) return <main className="dashboard-page-root">{children}</main>;

  return (
    <div className="shell">
      <SiteHeader />
      <main className="page">{children}</main>
      <SiteFooter />
    </div>
  );
}

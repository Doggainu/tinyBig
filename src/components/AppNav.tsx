"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/AppLogo";
import { APP_NAME } from "@/config/app";

const links = [
  { href: "/", label: "App" },
  { href: "/farm", label: "Farm" },
  { href: "/referral", label: "Refer" },
  { href: "/badges", label: "Badges" },
  { href: "/leaderboard", label: "Leaders" },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="uni-card mb-3 flex items-center gap-2 px-3 py-2">
      <Link
        href="/"
        className="flex shrink-0 items-center no-underline"
        aria-label={APP_NAME}
      >
        <AppLogo size={32} />
      </Link>
      <div className="uni-tabs uni-tabs-compact min-w-0 flex-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`uni-tab ${active ? "uni-tab-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

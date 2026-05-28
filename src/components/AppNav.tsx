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
    <nav className="uni-card mb-3 flex w-full items-center gap-2 px-2 py-2 sm:px-3">
      <Link
        href="/"
        className="uni-nav-brand-link flex shrink-0 items-center gap-1.5 border-r border-[var(--uni-border)] pr-2.5 no-underline sm:gap-2 sm:pr-3"
        aria-label={`${APP_NAME} home`}
      >
        <AppLogo size={32} />
        <span className="uni-nav-brand">{APP_NAME}</span>
      </Link>
      <div className="uni-tabs uni-tabs-compact min-w-0 flex-1 basis-0">
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

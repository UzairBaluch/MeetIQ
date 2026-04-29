"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Video,
  FileText,
  PlayCircle,
  CreditCard,
  Settings,
  Users,
  Sparkles,
  Search,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/meetings", label: "Meetings", icon: Video },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/recordings", label: "Recordings", icon: PlayCircle },
  { href: "/team", label: "Team", icon: Users },
];

const FOOTER_NAV = [
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
        <Logo />
        <ThemeToggle />
      </div>

      <div className="px-3 py-3">
        <button
          type="button"
          className="group flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search meetings…</span>
          <kbd className="rounded border border-sidebar-border bg-background/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-3">
        <ul className="space-y-0.5">
          {NAV.map((item) => (
            <SidebarLink key={item.href} {...item} active={isActive(pathname, item.href)} />
          ))}
        </ul>

        <div className="mt-auto space-y-3 pb-4">
          <UpgradeCard />
          <ul className="space-y-0.5">
            {FOOTER_NAV.map((item) => (
              <SidebarLink key={item.href} {...item} active={isActive(pathname, item.href)} />
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <UserCard />
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </li>
  );
}

function UpgradeCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-sidebar-border bg-gradient-to-br from-[var(--brand)]/15 to-[var(--accent-purple)]/15 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Sparkles className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
        Upgrade to Pro
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Unlock unlimited summaries, live captions, and Slack integrations.
      </p>
      <Link
        href="/billing"
        className="mt-3 inline-flex h-7 items-center justify-center rounded-md bg-foreground px-3 text-xs font-medium text-background"
      >
        Upgrade
      </Link>
    </div>
  );
}

function UserCard() {
  return (
    <Link
      href="/settings"
      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent"
    >
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-gradient-to-br from-[var(--brand)]/40 to-[var(--accent-purple)]/40 text-xs font-semibold">
          UB
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">Uzair Baluch</div>
        <div className="truncate text-xs text-muted-foreground">Free plan</div>
      </div>
    </Link>
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

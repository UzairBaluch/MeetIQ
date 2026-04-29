"use client";

import Link from "next/link";
import { Calendar, LinkIcon, Video } from "lucide-react";

const ACTIONS = [
  {
    title: "Start instant meeting",
    description: "Spin up a room and share the link in seconds.",
    icon: Video,
    accent: "from-[var(--brand)] to-[var(--accent-purple)]",
    href: "/meeting/new",
    cta: "Start now",
  },
  {
    title: "Schedule a meeting",
    description: "Pick a time, invite attendees, send calendar invites.",
    icon: Calendar,
    accent: "from-cyan-500 to-blue-600",
    href: "/meetings/new",
    cta: "Schedule",
  },
  {
    title: "Join with code",
    description: "Enter a meeting code or paste an invite link.",
    icon: LinkIcon,
    accent: "from-amber-500 to-orange-600",
    href: "/meetings/join",
    cta: "Join",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ACTIONS.map((a) => (
        <Link
          key={a.title}
          href={a.href}
          className="group relative overflow-hidden rounded-xl border border-border/70 bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md"
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${a.accent} opacity-[0.06] transition-opacity group-hover:opacity-[0.12]`}
          />
          <div
            className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${a.accent} text-white shadow-sm`}
          >
            <a.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-sm font-semibold">{a.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
          <span className="mt-4 inline-flex items-center text-xs font-medium text-foreground">
            {a.cta} →
          </span>
        </Link>
      ))}
    </div>
  );
}

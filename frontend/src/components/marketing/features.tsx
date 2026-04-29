import {
  Video,
  MessageSquare,
  MonitorUp,
  Sparkles,
  FileText,
  Search,
  Users,
  ListTodo,
  Lock,
} from "lucide-react";
import { SectionReveal } from "@/components/shared/section-reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Video,
    title: "HD Video Meetings",
    description:
      "Crystal-clear 1080p calls with adaptive bitrate, low-latency global routing, and noise suppression baked in.",
    span: "lg:col-span-2",
    visual: "video",
  },
  {
    icon: Sparkles,
    title: "AI Notes Taker",
    description:
      "Real-time speaker-aware notes that capture the meaning, not just the words.",
    visual: "notes",
  },
  {
    icon: FileText,
    title: "Instant Summaries",
    description:
      "TL;DRs, decisions, and follow-ups generated the moment you hang up.",
    visual: "summary",
  },
  {
    icon: Search,
    title: "Searchable Transcripts",
    description:
      "Full-text search across every meeting your team has ever had — with semantic AI lookup.",
    span: "lg:col-span-2",
    visual: "search",
  },
  {
    icon: ListTodo,
    title: "Action Items",
    description:
      "Tasks extracted automatically and assigned to the right teammate with due dates.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description:
      "Persistent in-meeting chat with link previews, code blocks, and history.",
  },
  {
    icon: MonitorUp,
    title: "Screen Sharing",
    description:
      "Share a tab, window, or full screen — with automatic presenter mode.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description:
      "Shared notes, libraries of past meetings, and granular role permissions.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade Security",
    description:
      "End-to-end encrypted media, SOC 2 Type II, GDPR & HIPAA-ready.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
            Everything you need
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            One platform to meet, decide, and ship
          </h2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            MeetIQ replaces three tools — your video conferencing, your notes
            app, and your task tracker — with a single AI-native workspace.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <SectionReveal
              key={f.title}
              delay={i * 0.04}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-[var(--brand)]/40 hover:shadow-lg",
                f.span,
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)]/15 to-[var(--accent-purple)]/15 text-[var(--brand)] ring-1 ring-[var(--brand)]/20">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

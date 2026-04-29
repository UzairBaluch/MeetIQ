"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  ListTodo,
  MessageSquare,
  CheckCircle2,
  Send,
  X,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "notes", label: "AI Notes", icon: Sparkles },
  { id: "transcript", label: "Transcript", icon: FileText },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "chat", label: "Chat", icon: MessageSquare },
] as const;

type TabId = (typeof TABS)[number]["id"];

const NOTES = [
  { type: "section" as const, text: "Discussion" },
  { type: "bullet" as const, text: "Q3 roadmap prioritization aligned on AI Notes v2." },
  { type: "bullet" as const, text: "Marcus to lead the new transcript search initiative." },
  { type: "bullet" as const, text: "Concerns raised about live caption latency on free tier." },
  { type: "section" as const, text: "Decisions" },
  { type: "bullet" as const, text: "Ship live captions to Pro tier next sprint." },
  { type: "bullet" as const, text: "Migrate STT pipeline to Deepgram by end of quarter." },
];

const TRANSCRIPT = [
  { speaker: "Sarah", initials: "SC", time: "00:12", text: "Alright team, let's kick off the Q3 roadmap sync. Marcus, want to start?" },
  { speaker: "Marcus", initials: "ML", time: "00:18", text: "Sure. The big one for Q3 is shipping AI Notes v2 — we have most of the infra in place." },
  { speaker: "Priya", initials: "PR", time: "00:34", text: "Quick question — is live caption latency still an issue on the free tier?" },
  { speaker: "Marcus", initials: "ML", time: "00:42", text: "Yeah, it's around 1.2 seconds right now. We think Deepgram could get us under 400ms." },
  { speaker: "Sarah", initials: "SC", time: "01:05", text: "Let's commit to the migration this quarter. I'll spec out the design panel changes by Friday." },
];

const TASKS = [
  { who: "Sarah", text: "Finalize design specs for Notes panel v2", due: "Fri" },
  { who: "Priya", text: "Audit current STT pipeline cost", due: "Mon" },
  { who: "Marcus", text: "Spike on Deepgram integration", due: "Wed" },
  { who: "Jordan", text: "Draft customer comms for Pro tier features", due: "Fri" },
];

const CHAT = [
  { who: "Sarah", initials: "SC", text: "Sharing the design link: https://figma.com/file/notes-v2", time: "11:14 AM" },
  { who: "Priya", initials: "PR", text: "Thanks! Can we add a section for live caption fallback?", time: "11:16 AM" },
  { who: "Marcus", initials: "ML", text: "Good call. Will note it on the spec.", time: "11:17 AM" },
];

export function MeetingSidebar({ onClose }: { onClose?: () => void }) {
  const [tab, setTab] = useState<TabId>("notes");

  return (
    <aside className="flex h-full w-full flex-col border-l border-border/60 bg-card lg:w-96">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--brand)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
          </span>
          Live · AI is listening
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex border-b border-border/60 text-xs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 transition-colors",
              tab === t.id
                ? "border-[var(--brand)] text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "notes" && <NotesPanel />}
        {tab === "transcript" && <TranscriptPanel />}
        {tab === "tasks" && <TasksPanel />}
        {tab === "chat" && <ChatPanel />}
      </div>
    </aside>
  );
}

function NotesPanel() {
  return (
    <div className="space-y-3 p-4 text-sm">
      {NOTES.map((n, i) => (
        <div key={i}>
          {n.type === "section" ? (
            <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {n.text}
            </div>
          ) : (
            <div className="flex gap-2 text-foreground/90">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--brand)]" />
              <span className="leading-snug">{n.text}</span>
            </div>
          )}
        </div>
      ))}
      <div className="flex items-center gap-2 pt-3 text-xs text-muted-foreground">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse-glow" />
        Generating new bullets…
      </div>
    </div>
  );
}

function TranscriptPanel() {
  return (
    <div>
      <div className="border-b border-border/60 p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transcript…"
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>
      <div className="divide-y divide-border/60">
        {TRANSCRIPT.map((t, i) => (
          <div key={i} className="flex gap-3 p-4 text-sm">
            <Avatar className="mt-0.5 h-7 w-7">
              <AvatarFallback className="bg-muted text-[10px] font-medium">
                {t.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{t.speaker}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {t.time}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {t.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksPanel() {
  return (
    <div className="space-y-2 p-4">
      {TASKS.map((t, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <div className="flex-1">
            <div className="text-sm leading-snug">{t.text}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">@{t.who}</span>
              <span>·</span>
              <span>Due {t.due}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {CHAT.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-muted text-[10px] font-medium">
                  {c.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{c.who}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                <p className="mt-0.5 break-words text-sm text-foreground/90">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border/60 p-3">
        <form className="flex gap-2">
          <Input placeholder="Send a message…" className="h-9 flex-1" />
          <Button type="submit" size="icon-sm" aria-label="Send">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

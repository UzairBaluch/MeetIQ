"use client";

import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  MonitorUp,
  MessageSquare,
  Sparkles,
  PhoneOff,
  CheckCircle2,
  ListTodo,
  FileText,
} from "lucide-react";

const PARTICIPANTS = [
  { name: "Sarah Chen", initials: "SC", muted: false, speaking: true, gradient: "from-pink-500/80 to-rose-600/80" },
  { name: "Marcus Liu", initials: "ML", muted: true, speaking: false, gradient: "from-amber-500/80 to-orange-600/80" },
  { name: "You", initials: "YOU", muted: false, speaking: false, gradient: "from-indigo-500/80 to-violet-600/80", isYou: true },
  { name: "Priya Rao", initials: "PR", muted: false, speaking: false, gradient: "from-cyan-500/80 to-teal-600/80" },
];

const NOTES = [
  { type: "section", text: "Discussion" },
  { type: "bullet", text: "Q3 roadmap prioritization aligned on AI Notes v2." },
  { type: "bullet", text: "Marcus to lead the new transcript search initiative." },
  { type: "section", text: "Decisions" },
  { type: "bullet", text: "Ship live captions to Pro tier next sprint." },
  { type: "section", text: "Action items" },
  { type: "task", text: "Sarah · finalize design specs for Notes panel", due: "Fri" },
  { type: "task", text: "Priya · audit current STT pipeline cost", due: "Mon" },
];

export function MeetingMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-20 -bottom-10 -z-10 opacity-70 blur-3xl"
      >
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[var(--brand)]/35" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-purple)]/35" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-6xl"
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-2xl backdrop-blur-xl
            ring-1 ring-black/5 dark:ring-white/10"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                REC
              </span>
              <span className="font-mono">Q3 Roadmap Sync · 24:18</span>
            </div>
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
            {/* Video grid */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 p-3 sm:p-4">
              <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3">
                {PARTICIPANTS.map((p) => (
                  <ParticipantTile key={p.name} {...p} />
                ))}
              </div>
            </div>

            {/* AI Notes sidebar */}
            <div className="border-t border-border/60 bg-card/60 lg:border-l lg:border-t-0">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <Sparkles className="h-4 w-4 text-[var(--accent-purple)]" />
                <span className="text-sm font-semibold">AI Notes</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--brand)]">
                  Live
                </span>
              </div>

              <div className="flex border-b border-border/60 text-xs">
                <SidebarTab icon={Sparkles} label="Notes" active />
                <SidebarTab icon={FileText} label="Transcript" />
                <SidebarTab icon={ListTodo} label="Tasks" />
                <SidebarTab icon={MessageSquare} label="Chat" />
              </div>

              <div className="space-y-3 p-4 text-sm">
                {NOTES.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                  >
                    {n.type === "section" && (
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {n.text}
                      </div>
                    )}
                    {n.type === "bullet" && (
                      <div className="flex gap-2 text-foreground/90">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--brand)]" />
                        <span className="leading-snug">{n.text}</span>
                      </div>
                    )}
                    {n.type === "task" && (
                      <div className="flex items-start gap-2 rounded-md border border-border/60 bg-background/60 px-2.5 py-1.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <div className="flex-1">
                          <div className="text-[13px] leading-snug">{n.text}</div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">
                            Due {n.due}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="flex items-center gap-2 pt-2 text-xs text-muted-foreground"
                >
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse-glow" />
                  AI is listening…
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-center gap-2 border-t border-border/60 bg-card/80 px-4 py-3">
            <ControlButton icon={Mic} active />
            <ControlButton icon={Video} active />
            <ControlButton icon={MonitorUp} />
            <ControlButton icon={MessageSquare} />
            <ControlButton icon={Sparkles} accent />
            <div className="mx-1 h-6 w-px bg-border" />
            <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-500 px-4 text-xs font-semibold text-white shadow-md transition-colors hover:bg-red-600">
              <PhoneOff className="h-3.5 w-3.5" />
              Leave
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ParticipantTile({
  name,
  initials,
  muted,
  speaking,
  gradient,
  isYou,
}: (typeof PARTICIPANTS)[number]) {
  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${gradient} ring-1 ring-white/10 ${
        speaking
          ? "outline outline-2 outline-offset-2 outline-emerald-400/80"
          : ""
      }`}
    >
      {/* "video" shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight text-white/95 drop-shadow">
          {initials}
        </span>
      </div>

      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between text-white">
        <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">
          {name} {isYou && "(You)"}
        </span>
        <span
          className={`grid h-5 w-5 place-items-center rounded-full backdrop-blur-sm ${
            muted ? "bg-red-500/80" : "bg-black/40"
          }`}
        >
          {muted ? (
            <MicOff className="h-3 w-3" />
          ) : (
            <Mic className="h-3 w-3" />
          )}
        </span>
      </div>

      {speaking && (
        <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-1.5 py-0.5 text-[9px] font-medium text-white">
          <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
          Speaking
        </div>
      )}
    </div>
  );
}

function SidebarTab({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex flex-1 items-center justify-center gap-1.5 px-2 py-2 transition-colors ${
        active
          ? "border-b-2 border-[var(--brand)] text-foreground"
          : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function ControlButton({
  icon: Icon,
  active,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  accent?: boolean;
}) {
  return (
    <button
      className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
        accent
          ? "bg-gradient-to-br from-[var(--brand)] to-[var(--accent-purple)] text-white shadow-md"
          : active
            ? "bg-foreground/10 text-foreground"
            : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Sparkles, Users } from "lucide-react";
import { ParticipantTile, type Participant } from "./participant-tile";
import { MeetingSidebar } from "./meeting-sidebar";
import { MeetingControls } from "./meeting-controls";
import { cn } from "@/lib/utils";

const PARTICIPANTS: Participant[] = [
  {
    id: "you",
    name: "Uzair",
    initials: "UB",
    muted: false,
    videoOn: true,
    isYou: true,
    gradient: "from-indigo-500/80 to-violet-600/80",
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    initials: "SC",
    muted: false,
    videoOn: true,
    speaking: true,
    gradient: "from-pink-500/80 to-rose-600/80",
  },
  {
    id: "marcus",
    name: "Marcus Liu",
    initials: "ML",
    muted: true,
    videoOn: true,
    gradient: "from-amber-500/80 to-orange-600/80",
  },
  {
    id: "priya",
    name: "Priya Rao",
    initials: "PR",
    muted: false,
    videoOn: false,
    gradient: "from-cyan-500/80 to-teal-600/80",
  },
  {
    id: "jordan",
    name: "Jordan Kim",
    initials: "JK",
    muted: false,
    videoOn: true,
    gradient: "from-emerald-500/80 to-teal-600/80",
  },
];

export function MeetingRoom({ meetingId }: { meetingId: string }) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [recording, setRecording] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [seconds, setSeconds] = useState(24 * 60 + 18);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const timer = formatTime(seconds);

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">
      {/* Top bar */}
      <header className="flex h-14 items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            REC
          </span>
          <div>
            <h1 className="text-sm font-semibold">Q3 Roadmap Sync</h1>
            <p className="text-[11px] text-white/60">
              Meeting · {meetingId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Users className="h-3.5 w-3.5" />
            {PARTICIPANTS.length} attendees
          </span>
          <span className="font-mono">{timer}</span>
          <button
            type="button"
            onClick={() => setSidebarOpen((s) => !s)}
            className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs font-medium hover:bg-white/15 lg:hidden"
          >
            <Sparkles className="h-3 w-3" />
            AI Notes
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden p-3 sm:p-4">
            <div
              className={cn(
                "grid h-full gap-2 sm:gap-3",
                getGridClass(PARTICIPANTS.length),
              )}
            >
              {PARTICIPANTS.map((p) => (
                <ParticipantTile key={p.id} participant={p} />
              ))}
            </div>
          </div>

          <MeetingControls
            micOn={micOn}
            cameraOn={cameraOn}
            recording={recording}
            sharing={sharing}
            sidebarOpen={sidebarOpen}
            onToggleMic={() => setMicOn((v) => !v)}
            onToggleCamera={() => setCameraOn((v) => !v)}
            onToggleRecording={() => setRecording((v) => !v)}
            onToggleSharing={() => setSharing((v) => !v)}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />
        </div>

        {sidebarOpen && (
          <div
            className={cn(
              "absolute inset-y-14 right-0 z-30 w-full bg-card text-foreground lg:relative lg:inset-y-0 lg:w-96",
            )}
          >
            <MeetingSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

function getGridClass(count: number) {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count <= 4) return "grid-cols-2";
  if (count <= 6) return "grid-cols-2 lg:grid-cols-3";
  return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
}

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

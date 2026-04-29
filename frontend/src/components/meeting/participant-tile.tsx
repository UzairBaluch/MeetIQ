"use client";

import { Mic, MicOff, VideoOff, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Participant {
  id: string;
  name: string;
  initials: string;
  muted: boolean;
  videoOn: boolean;
  speaking?: boolean;
  isYou?: boolean;
  pinned?: boolean;
  gradient: string;
}

export function ParticipantTile({
  participant,
  large,
}: {
  participant: Participant;
  large?: boolean;
}) {
  const { name, initials, muted, videoOn, speaking, isYou, pinned, gradient } =
    participant;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all",
        videoOn
          ? `bg-gradient-to-br ${gradient}`
          : "bg-slate-900",
        speaking && "outline outline-2 outline-offset-2 outline-emerald-400/80",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative flex h-full min-h-32 items-center justify-center">
        {videoOn ? (
          <span
            className={cn(
              "font-semibold tracking-tight text-white/95 drop-shadow",
              large ? "text-7xl" : "text-4xl",
            )}
          >
            {initials}
          </span>
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/80">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10">
              <VideoOff className="h-6 w-6" />
            </div>
            <span className="text-xs">Camera off</span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-white">
        <span className="rounded-md bg-black/45 px-2 py-1 text-xs font-medium backdrop-blur-md">
          {name} {isYou && "(You)"}
        </span>
        <div className="flex items-center gap-1.5">
          {pinned && (
            <span className="grid h-6 w-6 place-items-center rounded-full bg-black/45 backdrop-blur-md">
              <Pin className="h-3 w-3" />
            </span>
          )}
          <span
            className={cn(
              "grid h-6 w-6 place-items-center rounded-full backdrop-blur-md",
              muted ? "bg-red-500/85" : "bg-black/45",
            )}
          >
            {muted ? (
              <MicOff className="h-3 w-3" />
            ) : (
              <Mic className="h-3 w-3" />
            )}
          </span>
        </div>
      </div>

      {speaking && (
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white">
          <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
          Speaking
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MessageSquare,
  Sparkles,
  PhoneOff,
  Hand,
  MoreHorizontal,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingControlsProps {
  micOn: boolean;
  cameraOn: boolean;
  recording: boolean;
  sharing: boolean;
  sidebarOpen: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleSharing: () => void;
  onToggleSidebar: () => void;
  onToggleRecording: () => void;
}

export function MeetingControls({
  micOn,
  cameraOn,
  recording,
  sharing,
  sidebarOpen,
  onToggleMic,
  onToggleCamera,
  onToggleSharing,
  onToggleSidebar,
  onToggleRecording,
}: MeetingControlsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-2 border-t border-border/60 bg-card/95 px-4 py-3 backdrop-blur-md">
      <ControlButton
        icon={micOn ? Mic : MicOff}
        label={micOn ? "Mute" : "Unmute"}
        active={micOn}
        danger={!micOn}
        onClick={onToggleMic}
      />
      <ControlButton
        icon={cameraOn ? Video : VideoOff}
        label={cameraOn ? "Stop video" : "Start video"}
        active={cameraOn}
        danger={!cameraOn}
        onClick={onToggleCamera}
      />
      <ControlButton
        icon={MonitorUp}
        label={sharing ? "Stop sharing" : "Share screen"}
        active={sharing}
        accent={sharing}
        onClick={onToggleSharing}
      />
      <ControlButton icon={Hand} label="Raise hand" />
      <ControlButton
        icon={Circle}
        label={recording ? "Stop recording" : "Record"}
        danger={recording}
        onClick={onToggleRecording}
      />
      <ControlButton
        icon={MessageSquare}
        label="Sidebar"
        active={sidebarOpen}
        onClick={onToggleSidebar}
        showLabelMobile={false}
      />
      <ControlButton
        icon={Sparkles}
        label="AI"
        accent
        showLabelMobile={false}
      />
      <ControlButton icon={MoreHorizontal} label="More" showLabelMobile={false} />

      <div className="mx-2 h-6 w-px bg-border" />

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-red-500 px-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-600"
      >
        <PhoneOff className="h-4 w-4" />
        <span className="hidden sm:inline">Leave</span>
      </button>
    </div>
  );
}

function ControlButton({
  icon: Icon,
  label,
  active,
  accent,
  danger,
  onClick,
  showLabelMobile = true,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  accent?: boolean;
  danger?: boolean;
  onClick?: () => void;
  showLabelMobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "group inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
        accent &&
          "bg-gradient-to-br from-[var(--brand)] to-[var(--accent-purple)] text-white shadow-sm",
        !accent && danger && "bg-red-500/15 text-red-500 hover:bg-red-500/25",
        !accent && !danger && active && "bg-foreground/10 text-foreground",
        !accent &&
          !danger &&
          !active &&
          "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span
        className={cn(
          showLabelMobile ? "hidden md:inline" : "hidden xl:inline",
        )}
      >
        {label}
      </span>
    </button>
  );
}

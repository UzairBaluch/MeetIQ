import Link from "next/link";
import { Clock, Video, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const MEETINGS = [
  {
    id: "wkly-eng",
    title: "Engineering weekly",
    time: "Today · 2:00 PM",
    duration: "60 min",
    attendees: ["AR", "MP", "JK", "PR"],
    extra: 2,
    accent: "bg-[var(--brand)]",
  },
  {
    id: "design-sync",
    title: "Design sync — Notes panel v2",
    time: "Today · 4:30 PM",
    duration: "30 min",
    attendees: ["SC", "DA"],
    accent: "bg-pink-500",
  },
  {
    id: "1-1-jordan",
    title: "1:1 with Jordan",
    time: "Tomorrow · 10:00 AM",
    duration: "30 min",
    attendees: ["JK"],
    accent: "bg-amber-500",
  },
  {
    id: "all-hands",
    title: "All hands",
    time: "Friday · 11:00 AM",
    duration: "45 min",
    attendees: ["UB", "AR", "MP", "PR"],
    extra: 14,
    accent: "bg-violet-500",
  },
];

export function UpcomingMeetings() {
  return (
    <div className="rounded-xl border border-border/70 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold">Upcoming meetings</h2>
          <p className="text-xs text-muted-foreground">
            Synced from Google Calendar
          </p>
        </div>
        <Link
          href="/meetings"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View all →
        </Link>
      </div>
      <ul className="divide-y divide-border/60">
        {MEETINGS.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/40"
          >
            <span className={`h-9 w-1 rounded-full ${m.accent}`} aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{m.title}</div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {m.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {m.duration}
                </span>
              </div>
            </div>
            <div className="hidden items-center sm:flex">
              <div className="flex -space-x-1.5">
                {m.attendees.slice(0, 3).map((a) => (
                  <Avatar key={a} className="h-6 w-6 ring-2 ring-card">
                    <AvatarFallback className="bg-muted text-[10px] font-medium">
                      {a}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {m.extra && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-muted text-[10px] font-medium ring-2 ring-card">
                    +{m.extra}
                  </span>
                )}
              </div>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              <Video className="h-3.5 w-3.5" />
              Join
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

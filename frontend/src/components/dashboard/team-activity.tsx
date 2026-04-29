import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ACTIVITY = [
  { who: "Sarah", whoInitials: "SC", action: "shared notes from", target: "Design sync", when: "12m ago" },
  { who: "Marcus", whoInitials: "ML", action: "completed action item", target: "Audit STT pipeline cost", when: "32m ago" },
  { who: "Priya", whoInitials: "PR", action: "joined", target: "Engineering weekly", when: "1h ago" },
  { who: "Jordan", whoInitials: "JK", action: "created", target: "Customer Discovery — Helix", when: "3h ago" },
  { who: "Sarah", whoInitials: "SC", action: "commented on", target: "Q3 Roadmap Sync", when: "5h ago" },
];

export function TeamActivity() {
  return (
    <div className="rounded-xl border border-border/70 bg-card">
      <div className="border-b border-border/60 px-5 py-4">
        <h2 className="text-sm font-semibold">Team activity</h2>
        <p className="text-xs text-muted-foreground">What your team is up to</p>
      </div>
      <ul className="divide-y divide-border/60">
        {ACTIVITY.map((a, i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-3.5">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-muted text-[10px] font-medium">
                {a.whoInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-sm">
              <span className="font-medium">{a.who}</span>{" "}
              <span className="text-muted-foreground">{a.action}</span>{" "}
              <span className="font-medium">{a.target}</span>
              <div className="text-xs text-muted-foreground">{a.when}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

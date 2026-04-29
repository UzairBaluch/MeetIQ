import Link from "next/link";
import { Sparkles, Clock, FileText } from "lucide-react";

const SUMMARIES = [
  {
    id: "1",
    title: "Q3 Roadmap Sync",
    when: "Today, 11:18 AM",
    duration: "48 min",
    snippet:
      "Aligned on launching AI Notes v2 next sprint. Marcus owns transcript search, Sarah finalizes the Notes panel design by Friday.",
    decisions: 3,
    actionItems: 7,
    participants: 6,
  },
  {
    id: "2",
    title: "Weekly 1:1 — Priya",
    when: "Yesterday, 4:00 PM",
    duration: "30 min",
    snippet:
      "Discussed STT pipeline cost overruns. Considered switching to Deepgram for live captions — Priya to bring back proposal Monday.",
    decisions: 1,
    actionItems: 2,
    participants: 2,
  },
  {
    id: "3",
    title: "Customer Discovery — Helix",
    when: "2 days ago",
    duration: "55 min",
    snippet:
      "Prospect asked about SAML, audit logs, and HIPAA compliance. Strong fit for Team plan once we ship SSO.",
    decisions: 2,
    actionItems: 4,
    participants: 5,
  },
];

export function RecentSummaries() {
  return (
    <div className="rounded-xl border border-border/70 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--accent-purple)]" />
          <h2 className="text-sm font-semibold">Recent AI summaries</h2>
        </div>
        <Link
          href="/notes"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View all →
        </Link>
      </div>
      <ul className="divide-y divide-border/60">
        {SUMMARIES.map((s) => (
          <li key={s.id}>
            <Link
              href={`/notes/${s.id}`}
              className="block px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{s.title}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {s.when}
                    </span>
                    <span>· {s.duration}</span>
                    <span>· {s.participants} attendees</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
                    {s.snippet}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {s.decisions} decisions
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  {s.actionItems} action items
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-medium text-foreground">
                  <FileText className="h-3 w-3" /> Read summary
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

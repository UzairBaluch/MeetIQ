import Link from "next/link";
import { Search, Sparkles, Clock } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const NOTES = [
  {
    id: "1",
    title: "Q3 Roadmap Sync",
    when: "Today, 11:18 AM",
    duration: "48 min",
    snippet:
      "Aligned on launching AI Notes v2 next sprint. Marcus owns transcript search, Sarah finalizes the Notes panel design by Friday.",
    tags: ["Engineering", "Roadmap"],
    decisions: 3,
    actionItems: 7,
  },
  {
    id: "2",
    title: "Weekly 1:1 — Priya",
    when: "Yesterday, 4:00 PM",
    duration: "30 min",
    snippet:
      "Discussed STT pipeline cost overruns. Considered switching to Deepgram for live captions — Priya to bring back proposal Monday.",
    tags: ["1:1"],
    decisions: 1,
    actionItems: 2,
  },
  {
    id: "3",
    title: "Customer Discovery — Helix",
    when: "2 days ago",
    duration: "55 min",
    snippet:
      "Prospect asked about SAML, audit logs, and HIPAA compliance. Strong fit for Team plan once we ship SSO.",
    tags: ["Sales", "Discovery"],
    decisions: 2,
    actionItems: 4,
  },
  {
    id: "4",
    title: "Design Critique — Notes panel",
    when: "3 days ago",
    duration: "45 min",
    snippet:
      "Reviewed v2 mockups. Team agreed to ship inline editing first, voice annotations next quarter.",
    tags: ["Design"],
    decisions: 2,
    actionItems: 5,
  },
];

export const metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <>
      <DashboardTopbar
        title="Notes"
        description="Searchable AI summaries from every meeting."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search across all meeting notes…"
              className="h-11 pl-10"
            />
          </div>

          <ul className="space-y-3">
            {NOTES.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/notes/${n.id}`}
                  className="group block rounded-xl border border-border/70 bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold">{n.title}</h3>
                        {n.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-[10px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {n.when}
                        </span>
                        <span>· {n.duration}</span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
                        {n.snippet}
                      </p>
                    </div>
                    <Sparkles className="h-4 w-4 shrink-0 text-[var(--accent-purple)]" />
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                    <span>{n.decisions} decisions</span>
                    <span>·</span>
                    <span>{n.actionItems} action items</span>
                    <span className="ml-auto font-medium text-foreground">
                      Open →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

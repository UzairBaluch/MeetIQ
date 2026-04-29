import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  Sparkles,
  Share2,
  Download,
  CheckCircle2,
  Search,
} from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ATTENDEES = [
  { name: "Sarah Chen", initials: "SC" },
  { name: "Marcus Liu", initials: "ML" },
  { name: "Priya Rao", initials: "PR" },
  { name: "Jordan Kim", initials: "JK" },
  { name: "Uzair Baluch", initials: "UB" },
  { name: "Diana Aldana", initials: "DA" },
];

const KEY_POINTS = [
  "Q3 roadmap prioritization aligned on AI Notes v2.",
  "Marcus to lead the new transcript search initiative.",
  "Concerns raised about live caption latency on free tier.",
  "Team agreed to migrate STT pipeline to Deepgram by end of quarter.",
];

const DECISIONS = [
  "Ship live captions to Pro tier next sprint.",
  "Migrate STT pipeline to Deepgram by end of Q3.",
  "Include caption fallback in the Notes panel v2 spec.",
];

const TASKS = [
  { who: "Sarah", initials: "SC", text: "Finalize design specs for Notes panel v2", due: "Fri" },
  { who: "Priya", initials: "PR", text: "Audit current STT pipeline cost", due: "Mon" },
  { who: "Marcus", initials: "ML", text: "Spike on Deepgram integration", due: "Wed" },
  { who: "Jordan", initials: "JK", text: "Draft customer comms for Pro tier features", due: "Fri" },
];

const TRANSCRIPT = [
  { speaker: "Sarah", initials: "SC", time: "00:12", text: "Alright team, let's kick off the Q3 roadmap sync. Marcus, want to start?" },
  { speaker: "Marcus", initials: "ML", time: "00:18", text: "Sure. The big one for Q3 is shipping AI Notes v2 — we have most of the infra in place." },
  { speaker: "Priya", initials: "PR", time: "00:34", text: "Quick question — is live caption latency still an issue on the free tier?" },
  { speaker: "Marcus", initials: "ML", time: "00:42", text: "Yeah, it's around 1.2 seconds right now. We think Deepgram could get us under 400ms." },
  { speaker: "Sarah", initials: "SC", time: "01:05", text: "Let's commit to the migration this quarter. I'll spec out the design panel changes by Friday." },
  { speaker: "Jordan", initials: "JK", time: "01:23", text: "On the customer side, three prospects this week asked about SAML. We should make sure SSO ships before we go upmarket." },
];

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <DashboardTopbar title="Note" description={`Meeting #${id}`} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/notes"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All notes
          </Link>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--accent-purple)]" />
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                  AI Summary
                </Badge>
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Q3 Roadmap Sync
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Today, 11:18 AM · 48 min
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {ATTENDEES.length} attendees
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ATTENDEES.map((a) => (
              <div
                key={a.name}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2 py-1 pr-3"
              >
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-muted text-[9px] font-medium">
                    {a.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{a.name}</span>
              </div>
            ))}
          </div>

          <Tabs defaultValue="summary" className="mt-8">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-6 space-y-8">
              <Section title="TL;DR">
                <p className="text-foreground/90">
                  The team aligned on shipping AI Notes v2 next sprint, with Marcus
                  owning transcript search and Sarah leading the design panel
                  redesign. A migration from the in-house STT to Deepgram was
                  approved to address live caption latency on the free tier.
                </p>
              </Section>

              <Section title="Key points">
                <ul className="space-y-2">
                  {KEY_POINTS.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--brand)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Decisions made">
                <ul className="space-y-2">
                  {DECISIONS.map((d) => (
                    <li key={d} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Action items">
                <ul className="space-y-2">
                  {TASKS.map((t) => (
                    <li
                      key={t.text}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-muted text-[10px] font-medium">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">{t.text}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          @{t.who} · Due {t.due}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            </TabsContent>

            <TabsContent value="transcript" className="mt-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search this transcript…"
                  className="h-10 pl-10"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
                <ul className="divide-y divide-border/60">
                  {TRANSCRIPT.map((t, i) => (
                    <li key={i} className="flex gap-3 p-4">
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarFallback className="bg-muted text-[11px] font-medium">
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
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              <ul className="space-y-2">
                {TASKS.map((t) => (
                  <li
                    key={t.text}
                    className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <div className="flex-1">
                      <div className="text-sm">{t.text}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        @{t.who} · Due {t.due}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

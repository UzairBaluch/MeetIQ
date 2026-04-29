import { Plus, Search, Mail, MoreHorizontal, Crown, Shield, User } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Role = "Owner" | "Admin" | "Member";

const MEMBERS: { name: string; email: string; role: Role; initials: string; status: "active" | "invited" }[] = [
  { name: "Uzair Baluch", email: "uzair@meetiq.app", role: "Owner", initials: "UB", status: "active" },
  { name: "Sarah Chen", email: "sarah@meetiq.app", role: "Admin", initials: "SC", status: "active" },
  { name: "Marcus Liu", email: "marcus@meetiq.app", role: "Admin", initials: "ML", status: "active" },
  { name: "Priya Rao", email: "priya@meetiq.app", role: "Member", initials: "PR", status: "active" },
  { name: "Jordan Kim", email: "jordan@meetiq.app", role: "Member", initials: "JK", status: "active" },
  { name: "Diana Aldana", email: "diana@meetiq.app", role: "Member", initials: "DA", status: "active" },
  { name: "alex@partner.com", email: "alex@partner.com", role: "Member", initials: "A", status: "invited" },
];

const WORKSPACES = [
  { name: "MeetIQ HQ", color: "from-[var(--brand)] to-[var(--accent-purple)]", members: 24, current: true },
  { name: "Design Guild", color: "from-pink-500 to-rose-600", members: 8 },
  { name: "Helix Customer", color: "from-emerald-500 to-teal-600", members: 5 },
];

export const metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <DashboardTopbar
        title="Team"
        description="Manage members, roles, and workspaces."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspaces
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {WORKSPACES.map((w) => (
                <div
                  key={w.name}
                  className={cn(
                    "rounded-xl border p-4 transition-all",
                    w.current
                      ? "border-[var(--brand)]/50 bg-card ring-1 ring-[var(--brand)]/20"
                      : "border-border/70 bg-card hover:border-foreground/20",
                  )}
                >
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${w.color} text-white shadow-sm`}
                  >
                    <span className="text-sm font-semibold">
                      {w.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{w.name}</h3>
                    {w.current && (
                      <Badge variant="secondary" className="text-[10px]">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {w.members} members
                  </p>
                </div>
              ))}
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                <Plus className="h-5 w-5" />
                Create workspace
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-border/70 bg-card">
            <div className="flex flex-col items-start justify-between gap-3 border-b border-border/60 px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-semibold">Members</h2>
                <p className="text-xs text-muted-foreground">
                  {MEMBERS.length} members in MeetIQ HQ
                </p>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search members…"
                    className="h-9 w-full pl-8 sm:w-64"
                  />
                </div>
                <Button>
                  <Mail className="h-3.5 w-3.5" />
                  Invite
                </Button>
              </div>
            </div>

            <ul className="divide-y divide-border/60">
              {MEMBERS.map((m) => (
                <li key={m.email} className="flex items-center gap-4 px-5 py-3.5">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-xs font-medium">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {m.name}
                      </span>
                      {m.status === "invited" && (
                        <Badge variant="secondary" className="text-[10px]">
                          Invited
                        </Badge>
                      )}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {m.email}
                    </div>
                  </div>
                  <RoleBadge role={m.role} />
                  <Button variant="ghost" size="icon-sm" aria-label="More">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const cfg = {
    Owner: { icon: Crown, className: "text-amber-500" },
    Admin: { icon: Shield, className: "text-[var(--brand)]" },
    Member: { icon: User, className: "text-muted-foreground" },
  } as const;
  const Icon = cfg[role].icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-xs font-medium",
        cfg[role].className,
      )}
    >
      <Icon className="h-3 w-3" />
      {role}
    </span>
  );
}

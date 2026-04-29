import { Video, Sparkles, Clock, ListTodo } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings";
import { RecentSummaries } from "@/components/dashboard/recent-summaries";
import { TeamActivity } from "@/components/dashboard/team-activity";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <DashboardTopbar
        title="Welcome back, Uzair"
        description="Here's what's happening with your meetings today."
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
          <section>
            <QuickActions />
          </section>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Meetings this week"
              value="14"
              delta={{ value: "+22%", positive: true }}
              hint="vs. last week"
              icon={Video}
            />
            <StatCard
              label="AI summaries"
              value="11"
              delta={{ value: "+4", positive: true }}
              hint="this month"
              icon={Sparkles}
            />
            <StatCard
              label="Hours saved"
              value="6.2"
              delta={{ value: "+1.4h", positive: true }}
              hint="from auto-notes"
              icon={Clock}
            />
            <StatCard
              label="Open action items"
              value="9"
              delta={{ value: "-3", positive: true }}
              hint="3 due this week"
              icon={ListTodo}
            />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <UpcomingMeetings />
              <RecentSummaries />
            </div>
            <div className="space-y-6">
              <TeamActivity />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

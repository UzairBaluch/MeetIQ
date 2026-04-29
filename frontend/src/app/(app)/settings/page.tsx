import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <DashboardTopbar
        title="Settings"
        description="Manage your account, workspace, and preferences."
      />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          <SettingsSection
            title="Profile"
            description="Your personal information and how others see you."
          >
            <div className="flex items-center gap-5">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-br from-[var(--brand)]/40 to-[var(--accent-purple)]/40 text-lg font-semibold">
                  UB
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" size="sm">
                  Upload new
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="First name" defaultValue="Uzair" />
              <Field label="Last name" defaultValue="Baluch" />
              <Field label="Display name" defaultValue="Uzair" />
              <Field label="Pronouns" placeholder="he/him" />
            </div>
          </SettingsSection>

          <SettingsSection
            title="Account"
            description="Used for sign-in, billing receipts, and notifications."
          >
            <Field
              label="Email"
              type="email"
              defaultValue="uzair@meetiq.app"
              hint="We'll send a confirmation link before changing this."
            />
            <Field label="Time zone" defaultValue="(GMT+04:00) Asia / Dubai" />
          </SettingsSection>

          <SettingsSection
            title="Meeting defaults"
            description="Set how new meetings start by default."
          >
            <ToggleRow
              label="Camera on when joining"
              description="Start meetings with your video on by default."
              defaultChecked
            />
            <ToggleRow
              label="Microphone on when joining"
              description="Don't auto-mute when entering a meeting."
            />
            <ToggleRow
              label="Auto-record meetings"
              description="Start recording the moment you join a meeting."
              defaultChecked
            />
            <ToggleRow
              label="Live captions"
              description="Show real-time captions during all meetings."
              defaultChecked
            />
            <ToggleRow
              label="Auto-generate AI summary"
              description="Run summarization automatically when a meeting ends."
              defaultChecked
            />
          </SettingsSection>

          <SettingsSection
            title="Notifications"
            description="Where and how MeetIQ pings you."
          >
            <ToggleRow
              label="Email — meeting summaries"
              description="Get a recap email when each meeting ends."
              defaultChecked
            />
            <ToggleRow
              label="Email — weekly digest"
              description="Sunday recap of last week's meetings + this week's calendar."
              defaultChecked
            />
            <ToggleRow
              label="Slack — meeting summaries"
              description="Push recaps to your DMs in Slack."
            />
            <ToggleRow
              label="Push — meeting reminders"
              description="Mobile and desktop push 5 minutes before a call."
              defaultChecked
            />
          </SettingsSection>

          <SettingsSection
            title="Integrations"
            description="Connect MeetIQ to the rest of your stack."
          >
            <Integration name="Google Calendar" status="connected" />
            <Integration name="Slack" status="connected" />
            <Integration name="Notion" status="not-connected" />
            <Integration name="Linear" status="not-connected" />
          </SettingsSection>

          <SettingsSection
            title="Danger zone"
            description="Irreversible actions affecting your account."
            danger
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-sm font-medium">Delete account</h4>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account, recordings, and notes.
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete account
              </Button>
            </div>
          </SettingsSection>
        </div>
      </div>
    </>
  );
}

function SettingsSection({
  title,
  description,
  children,
  danger,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border ${
        danger ? "border-destructive/30" : "border-border/70"
      } bg-card`}
    >
      <div className="border-b border-border/60 px-6 py-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-5 p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  ...props
}: React.ComponentProps<typeof Input> & { label: string; hint?: string }) {
  const id = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-medium">{label}</h4>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <Switch defaultChecked={defaultChecked} />
      </div>
      <Separator className="last:hidden" />
    </>
  );
}

function Integration({
  name,
  status,
}: {
  name: string;
  status: "connected" | "not-connected";
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-xs font-semibold">
            {name[0]}
          </div>
          <div>
            <h4 className="text-sm font-medium">{name}</h4>
            {status === "connected" ? (
              <Badge variant="secondary" className="mt-0.5 text-[10px]">
                Connected
              </Badge>
            ) : (
              <p className="text-xs text-muted-foreground">Not connected</p>
            )}
          </div>
        </div>
        <Button variant={status === "connected" ? "outline" : "default"} size="sm">
          {status === "connected" ? "Disconnect" : "Connect"}
        </Button>
      </div>
      <Separator className="last:hidden" />
    </>
  );
}

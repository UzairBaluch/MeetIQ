import { PricingPreview } from "@/components/marketing/pricing-preview";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Check, X } from "lucide-react";

export const metadata = { title: "Pricing" };

const COMPARISON_ROWS = [
  { feature: "Meeting length", starter: "40 min", pro: "Unlimited", team: "Unlimited" },
  { feature: "Participants per meeting", starter: "10", pro: "100", team: "Custom" },
  { feature: "AI summaries", starter: "5 / month", pro: "Unlimited", team: "Unlimited" },
  { feature: "Live captions", starter: false, pro: true, team: true },
  { feature: "Transcript search", starter: "30 days", pro: "Unlimited history", team: "Unlimited history" },
  { feature: "Recording storage", starter: "1 GB", pro: "100 GB / user", team: "Custom" },
  { feature: "Slack / Notion / Linear sync", starter: false, pro: true, team: true },
  { feature: "SSO / SAML & SCIM", starter: false, pro: false, team: true },
  { feature: "Audit logs & DLP", starter: false, pro: false, team: true },
  { feature: "Dedicated success manager", starter: false, pro: false, team: true },
  { feature: "Uptime SLA", starter: "—", pro: "99.9%", team: "99.99%" },
];

const FAQ = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Starter plan is free forever. We only ask for billing details when you upgrade to Pro.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your billing settings any time, no questions asked. You retain access until the end of your billing period.",
  },
  {
    q: "Are recordings encrypted?",
    a: "Media is encrypted in transit and at rest. Pro and Team plans get customer-managed encryption keys (CMK) on request.",
  },
  {
    q: "Does the AI use my data to train models?",
    a: "Never. Your transcripts and notes are never used to train third-party models. We have strict data isolation per workspace.",
  },
  {
    q: "What integrations are available?",
    a: "Slack, Notion, Linear, Asana, Google Calendar, and Zapier today. Webhooks and a public API for everyone else.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]"
        />
        <div className="container-page text-center">
          <SectionReveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
              Pricing
            </p>
            <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Pricing that scales with{" "}
              <span className="gradient-text">your meetings</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              Start free. Upgrade when your team grows. Talk to us when you need
              SSO, audit logs, or custom retention.
            </p>
          </SectionReveal>
        </div>
      </section>

      <PricingPreview />

      <section className="container-page py-20">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Compare plans in detail
          </h2>
        </SectionReveal>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border/70 bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Feature</th>
                <th className="px-5 py-3 text-center font-medium">Starter</th>
                <th className="px-5 py-3 text-center font-medium text-foreground">
                  Pro
                </th>
                <th className="px-5 py-3 text-center font-medium">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-muted/30">
                  <td className="px-5 py-3 text-foreground/90">{row.feature}</td>
                  <td className="px-5 py-3 text-center">
                    <CellValue v={row.starter} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <CellValue v={row.pro} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <CellValue v={row.team} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked
          </h2>
        </SectionReveal>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {FAQ.map((item, i) => (
            <SectionReveal
              key={item.q}
              delay={i * 0.05}
              className="rounded-xl border border-border/70 bg-card p-5"
            >
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}

function CellValue({ v }: { v: string | boolean }) {
  if (typeof v === "boolean") {
    return v ? (
      <Check className="mx-auto h-4 w-4 text-[var(--brand)]" />
    ) : (
      <X className="mx-auto h-4 w-4 text-muted-foreground/50" />
    );
  }
  return <span className="text-sm text-foreground/90">{v}</span>;
}

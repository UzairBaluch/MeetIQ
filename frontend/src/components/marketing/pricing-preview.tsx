import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/shared/section-reveal";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description: "For individuals getting started with AI meetings.",
    features: [
      "Unlimited 40-min meetings",
      "AI summaries (5 / month)",
      "1 GB transcript storage",
      "Basic action item extraction",
      "Community support",
    ],
    cta: "Start free",
    href: "/sign-up",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "per user / month",
    description: "Everything teams need to leave every meeting with clarity.",
    features: [
      "Unlimited meeting length",
      "Unlimited AI summaries",
      "Live captions & translation",
      "Searchable transcript history",
      "Action items + integrations",
      "Slack, Notion, Linear sync",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    href: "/sign-up?plan=pro",
    featured: true,
  },
  {
    name: "Team",
    price: "Custom",
    cadence: "annual contract",
    description: "Advanced controls and security for larger organizations.",
    features: [
      "Everything in Pro",
      "SSO / SAML & SCIM",
      "Custom retention policies",
      "Audit logs & DLP",
      "Dedicated success manager",
      "99.99% uptime SLA",
    ],
    cta: "Talk to sales",
    href: "/contact",
    featured: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple plans that scale with your team
          </h2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            Free forever for solo work. Affordable for teams. Built for serious
            organizations.
          </p>
        </SectionReveal>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <SectionReveal key={tier.name} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-all",
                  tier.featured
                    ? "border-[var(--brand)]/50 shadow-[0_0_0_1px_color-mix(in_oklch,var(--brand)_30%,transparent),0_20px_60px_-20px_color-mix(in_oklch,var(--brand)_40%,transparent)]"
                    : "border-border/70 hover:border-foreground/20",
                )}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent-purple)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </div>
                )}

                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-2 min-h-12 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.cadence}
                  </span>
                </div>

                <Button
                  render={<Link href={tier.href} />}
                  className={cn("mt-6 h-11", !tier.featured && "")}
                  variant={tier.featured ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>

                <ul className="mt-7 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

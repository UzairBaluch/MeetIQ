import { Video, ShieldCheck, Sparkles, Share2 } from "lucide-react";
import { SectionReveal } from "@/components/shared/section-reveal";

const STEPS = [
  {
    icon: Video,
    title: "Start or join a meeting",
    description:
      "One-click join from any browser. No downloads, no friction — just paste a link.",
  },
  {
    icon: ShieldCheck,
    title: "MeetIQ records securely",
    description:
      "Encrypted media is captured to your private workspace. Speakers are auto-identified.",
  },
  {
    icon: Sparkles,
    title: "AI generates notes & tasks",
    description:
      "Live captions stream into structured notes. Decisions and action items are extracted.",
  },
  {
    icon: Share2,
    title: "Share results instantly",
    description:
      "Recap delivered to inbox, Slack, or Notion the second the call ends. Searchable forever.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      >
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
            How it works
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            From hello to recap in 4 steps
          </h2>
          <p className="mt-4 text-balance text-lg text-muted-foreground">
            No new habits to learn. MeetIQ runs alongside your meeting and does
            the busywork in the background.
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <SectionReveal
              key={step.title}
              delay={i * 0.08}
              className="relative rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--brand)]/15 to-[var(--accent-purple)]/15 text-[var(--brand)] ring-1 ring-[var(--brand)]/20">
                  <step.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="absolute right-[-12px] top-1/2 hidden h-px w-6 bg-gradient-to-r from-[var(--brand)]/40 to-transparent lg:block"
                />
              )}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

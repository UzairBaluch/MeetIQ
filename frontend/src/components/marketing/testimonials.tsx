import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionReveal } from "@/components/shared/section-reveal";

const TESTIMONIALS = [
  {
    quote:
      "MeetIQ saved us hours every week. Our PMs stopped scribbling notes mid-call and our follow-up rate went up 3x.",
    name: "Alex Rivera",
    role: "Head of Product",
    company: "Loop",
    initials: "AR",
  },
  {
    quote:
      "The best AI meeting assistant we've used — and we tried five. The summaries actually sound like a person took the notes.",
    name: "Maya Patel",
    role: "Engineering Lead",
    company: "Northwind",
    initials: "MP",
  },
  {
    quote:
      "We replaced Zoom + Otter + Asana for meeting workflows. The fact that it's one tool is the killer feature.",
    name: "Jordan Kim",
    role: "COO",
    company: "Helix",
    initials: "JK",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)]">
            Loved by teams
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            People talk. We listen.
          </h2>
        </SectionReveal>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-card p-6">
                <blockquote className="text-base leading-relaxed text-foreground/90">
                  <span className="text-3xl text-[var(--brand)]/60">“</span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-[var(--brand)]/30 to-[var(--accent-purple)]/30 text-xs font-semibold">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

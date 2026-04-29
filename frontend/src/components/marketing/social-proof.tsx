import { SectionReveal } from "@/components/shared/section-reveal";

const LOGOS = [
  "Loop",
  "Northwind",
  "Helix",
  "Cobalt",
  "Lumen",
  "Apex",
  "Vector",
  "Foundry",
];

export function SocialProof() {
  return (
    <section className="border-y border-border/50 bg-muted/30">
      <div className="container-page py-12">
        <SectionReveal>
          <p className="text-center text-sm font-medium text-muted-foreground">
            Trusted by 12,000+ teams at startups, agencies, and remote-first
            companies
          </p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {LOGOS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center text-center text-base font-semibold tracking-tight text-muted-foreground/70 transition-opacity hover:text-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

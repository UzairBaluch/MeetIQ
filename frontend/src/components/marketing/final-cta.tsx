import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/shared/section-reveal";

export function FinalCta() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--brand)]/30 bg-gradient-to-br from-[var(--brand)]/15 via-card to-[var(--accent-purple)]/15 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute left-1/3 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--brand)]/30 blur-3xl" />
              <div className="absolute right-1/3 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-[var(--accent-purple)]/30 blur-3xl" />
            </div>

            <h2 className="relative mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Never take manual meeting notes again.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
              Start free in under a minute. Bring your team along when you&apos;re ready.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full px-7 text-base shadow-lg",
                )}
              >
                Get started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 rounded-full border-border/70 bg-background/60 px-7 text-base backdrop-blur-md",
                )}
              >
                Book a demo
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Background art (right on desktop) */}
      <div className="relative hidden overflow-hidden border-l border-border/60 bg-gradient-to-br from-[var(--brand)]/15 via-background to-[var(--accent-purple)]/15 lg:order-2 lg:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[var(--brand)]/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[var(--accent-purple)]/30 blur-3xl"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Logo />

          <figure>
            <blockquote className="text-balance text-2xl font-medium leading-snug">
              <span className="text-3xl text-[var(--brand)]/70">“</span>
              MeetIQ replaced three tools for our team. Our PMs stopped scribbling
              notes and our follow-up rate tripled.
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              — Alex Rivera, Head of Product · Loop
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Form column */}
      <div className="relative flex flex-col lg:order-1">
        <header className="flex items-center justify-between p-6 lg:p-8">
          <Link href="/" className="lg:hidden">
            <Logo />
          </Link>
          <span className="hidden lg:block" />
          <ThemeToggle />
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

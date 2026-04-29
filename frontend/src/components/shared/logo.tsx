import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  showText?: boolean;
}

export function Logo({ className, href = "/", showText = true }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          MeetIQ
        </span>
      )}
    </div>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="MeetIQ home" className="inline-flex">
      {content}
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-lg",
        "bg-gradient-to-br from-[var(--brand)] to-[var(--accent-purple)]",
        "shadow-[0_4px_16px_-4px_color-mix(in_oklch,var(--brand)_60%,transparent)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-white"
        aria-hidden="true"
      >
        <path
          d="M4 7.5C4 6.12 5.12 5 6.5 5h7C14.88 5 16 6.12 16 7.5v9c0 1.38-1.12 2.5-2.5 2.5h-7C5.12 19 4 17.88 4 16.5v-9Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="m17 9.6 3.4-2.27A1 1 0 0 1 22 8.16v7.68a1 1 0 0 1-1.6.84L17 14.4V9.6Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}

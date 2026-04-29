import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export const metadata = { title: "Sign up" };

const PERKS = [
  "Free forever, no credit card required",
  "Unlimited 40-min meetings",
  "5 AI summaries per month",
];

export default function SignUpPage() {
  return (
    <div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start running smarter meetings in under a minute.
        </p>
      </div>

      <ul className="mx-auto mt-6 w-fit space-y-1.5 text-xs text-muted-foreground">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-[var(--brand)]" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-7 space-y-5">
        <OAuthButtons />

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <Separator className="flex-1" />
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" autoComplete="given-name" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" autoComplete="family-name" required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              required
            />
          </div>

          <Button type="submit" className="h-10 w-full">
            Create account
          </Button>
          <p className="text-center text-[11px] leading-snug text-muted-foreground">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="h-10" type="button">
        <GoogleIcon className="h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="h-10" type="button">
        <GithubIcon className="h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.96h5.5c-.24 1.32-1.7 3.86-5.5 3.86-3.31 0-6-2.74-6-6.12s2.69-6.12 6-6.12c1.88 0 3.14.8 3.86 1.49l2.62-2.52C16.78 3.39 14.62 2.5 12 2.5 6.76 2.5 2.5 6.76 2.5 12s4.26 9.5 9.5 9.5c5.48 0 9.13-3.85 9.13-9.27 0-.62-.07-1.1-.16-1.55Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.7 0 4.97-.89 6.62-2.42l-3.16-2.45c-.87.6-2.04 1.02-3.46 1.02-2.66 0-4.92-1.79-5.73-4.21H3v2.64A9.5 9.5 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.27 13.44A5.66 5.66 0 0 1 5.97 12c0-.5.09-.98.3-1.44V7.92H3a9.5 9.5 0 0 0 0 8.16l3.27-2.64Z"
      />
      <path
        fill="#4285F4"
        d="M21.5 12c0-.62-.07-1.1-.16-1.55H12v3.96h5.5c-.22 1.21-.92 2.24-1.96 2.92l3.16 2.45c1.85-1.71 2.92-4.23 2.92-7.27Z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

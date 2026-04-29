import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetiq.app"),
  title: {
    default: "MeetIQ — Meet Smarter with AI",
    template: "%s · MeetIQ",
  },
  description:
    "HD video meetings with instant AI summaries, transcripts, and action items. Never take manual meeting notes again.",
  keywords: [
    "AI meeting notes",
    "video conferencing",
    "meeting transcripts",
    "AI summaries",
    "team collaboration",
  ],
  authors: [{ name: "MeetIQ" }],
  openGraph: {
    title: "MeetIQ — Meet Smarter with AI",
    description:
      "HD video meetings with instant AI summaries, transcripts, and action items.",
    url: "https://meetiq.app",
    siteName: "MeetIQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetIQ — Meet Smarter with AI",
    description:
      "HD video meetings with instant AI summaries, transcripts, and action items.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

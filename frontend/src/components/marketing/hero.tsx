"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingMockup } from "./meeting-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32">
      {/* Background layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[600px] max-w-5xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand)]/20 via-[var(--accent-purple)]/15 to-transparent blur-3xl" />
      </div>

      <div className="container-page">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-purple)]" />
          <span>Now with live AI captions & action items</span>
          <span className="h-3 w-px bg-border" />
          <Link
            href="/changelog"
            className="inline-flex items-center gap-0.5 text-foreground hover:underline"
          >
            What&apos;s new <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-4xl text-balance text-center text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Meet <span className="gradient-text">Smarter</span>
          <br className="hidden sm:block" /> with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          HD video meetings with instant summaries, transcripts, and action
          items — so your team leaves every call with clarity, not chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            render={<Link href="/sign-up" />}
            size="lg"
            className="h-12 rounded-full px-6 text-base shadow-lg"
          >
            Start free
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            render={<Link href="#demo" />}
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border/70 bg-background/60 px-6 text-base backdrop-blur-md"
          >
            <PlayCircle className="mr-1 h-4 w-4" />
            Watch demo
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-xs text-muted-foreground"
        >
          Free forever · No credit card required · 5 min setup
        </motion.p>

        <div className="mt-16 sm:mt-20">
          <MeetingMockup />
        </div>
      </div>
    </section>
  );
}

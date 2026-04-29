"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionRevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  yOffset?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  yOffset = 24,
  ...props
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

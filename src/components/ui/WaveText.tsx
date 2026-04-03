"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveTextProps {
  text: string;
  className?: string;
  wrapperClassName?: string;
}

export function WaveText({ text, className, wrapperClassName }: WaveTextProps) {
  return (
    <span className={cn("inline-flex h-full", wrapperClassName)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.05,
          }}
          className={cn("inline-block", className)}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

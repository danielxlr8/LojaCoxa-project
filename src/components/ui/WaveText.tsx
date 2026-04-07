"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WaveTextProps {
  text: string;
  className?: string;
  wrapperClassName?: string;
  /** When true, uses SVG feTurbulence for an organic fluid distortion (good for big display text) */
  turbulence?: boolean;
  filterId?: string;
}

export function WaveText({ text, className, wrapperClassName, turbulence = false, filterId = "wave-filter" }: WaveTextProps) {
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Animate SVG turbulence via RAF — pauses outside viewport to save CPU
  useEffect(() => {
    if (!turbulence) return;
    let time = 0;

    const animate = () => {
      time += 0.012;
      if (filterRef.current) {
        filterRef.current.setAttribute("baseFrequency", `0 ${0.03 + Math.sin(time) * 0.01}`);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Only run RAF while element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!animFrameRef.current) animFrameRef.current = requestAnimationFrame(animate);
          } else {
            if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
              animFrameRef.current = null;
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [turbulence]);

  // ── MODE A: SVG feTurbulence — fluid organic distortion for big headlines ──
  if (turbulence) {
    return (
      <span ref={containerRef} className={cn("inline-flex items-center relative", wrapperClassName)}>
        <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
          <defs>
            <filter id={filterId} x="-5%" y="-20%" width="110%" height="140%">
              <feTurbulence ref={filterRef} type="turbulence" baseFrequency="0 0.03" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <span style={{ filter: `url(#${filterId})` }} className={cn("inline-block", className)}>
          {text}
        </span>
      </span>
    );
  }

  // ── MODE B (default): Letter-by-letter stagger — CSS animation, zero JS overhead ──
  return (
    <span className={cn("inline-flex h-full", wrapperClassName)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={cn("inline-block", className)}
          style={{
            animation: "wave-float 2s ease-in-out infinite",
            animationDelay: `${index * 0.07}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

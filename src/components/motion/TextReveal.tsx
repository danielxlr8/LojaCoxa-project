"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";


export function TextReveal({ 
  children, 
  as: Component = "h2", 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  as?: any; 
  className?: string;
  delay?: number;
}) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // We only split simple text nodes safely
    // Adding 'lines' creates wrappers that we can clip.
    const text = new SplitType(textRef.current, { types: "lines,words" });

    gsap.fromTo(
      text.words,
      {
        yPercent: 110,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.04,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      text.revert();
    };
  }, [delay, children]);

  // Use overflow-hidden to clip the words as they animate up
  return (
    <Component ref={textRef} className={cn("overflow-hidden", className)}>
      {children}
    </Component>
  );
}

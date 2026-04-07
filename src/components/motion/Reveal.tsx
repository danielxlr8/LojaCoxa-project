"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  type = "fade", // 'fade', 'clip', 'scale'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "clip" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    
    let fromState: gsap.TweenVars = {};
    let toState: gsap.TweenVars = { 
      duration: 1.6, 
      delay, 
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    };

    const distance = 80;

    if (direction === "up") fromState.y = distance;
    if (direction === "down") fromState.y = -distance;
    if (direction === "left") fromState.x = distance;
    if (direction === "right") fromState.x = -distance;

    if (type === "fade") {
      fromState.opacity = 0;
      toState.opacity = 1;
      toState.x = 0;
      toState.y = 0;
    } else if (type === "clip") {
      fromState.clipPath = "inset(100% 0% 0% 0%)";
      toState.clipPath = "inset(0% 0% 0% 0%)";
      toState.y = 0;
    } else if (type === "scale") {
      fromState.scale = 0.8;
      fromState.opacity = 0;
      toState.scale = 1;
      toState.opacity = 1;
      toState.y = 0;
      toState.ease = "back.out(1.2)";
    }

    gsap.fromTo(el, fromState, toState);

  }, [delay, direction, type]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

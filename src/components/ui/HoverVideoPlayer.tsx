"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HoverVideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  posterClassName?: string;
  alt?: string;
}

export function HoverVideoPlayer({ videoSrc, posterSrc, className, posterClassName, alt }: HoverVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isHovered) {
      videoRef.current.play().catch(() => {
        // Ignora erro de autoplay se o navegador barrar
      });
    } else {
      videoRef.current.pause();
      // Opcional: resetar video no mouse leave
      // videoRef.current.currentTime = 0; 
    }
  }, [isHovered]);

  return (
    <div 
      className={cn("w-full h-full relative overflow-hidden bg-black", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ contain: "paint layout" }}
      />
      {posterSrc && (
        <img 
          src={posterSrc} 
          alt={alt || "Video Poster"}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none",
            isHovered ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0",
            posterClassName
          )}
        />
      )}
    </div>
  );
}

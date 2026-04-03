"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export function LatestReleases() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const isAnimating = useRef(false);

  const totalItems = PRODUCTS.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Calculate items per view based on viewport
  useEffect(() => {
    const calculateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 3;
    };

    setItemsPerView(calculateItemsPerView());

    const handleResize = () => {
      const newItems = calculateItemsPerView();
      setItemsPerView(newItems);
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, totalItems - newItems)));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalItems]);

  // Animate the track to show the current index
  const animateToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current || isAnimating.current) return;

      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      isAnimating.current = true;

      // Calculate card width + gap
      const card = trackRef.current.children[0] as HTMLElement;
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const offset = clampedIndex * (cardWidth + gap);

      gsap.to(trackRef.current, {
        x: -offset,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      setCurrentIndex(clampedIndex);
    },
    [maxIndex]
  );

  const goNext = useCallback(() => {
    animateToIndex(currentIndex + 1);
  }, [currentIndex, animateToIndex]);

  const goPrev = useCallback(() => {
    animateToIndex(currentIndex - 1);
  }, [currentIndex, animateToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond if section is in viewport
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // ScrollTrigger: subtle entrance animation when section comes into view
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          trackRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        );
      },
    });

    return () => st.kill();
  }, []);

  // Block mouse wheel from scrolling the page while hovering the carousel area
  // Instead interpret horizontal intent — but per user request, we do NOT
  // translate wheel to slides. We just let the section sit still.

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  // Progress dots
  const totalPages = maxIndex + 1;

  return (
    <section
      ref={sectionRef}
      id="lancamentos"
      className="w-full bg-[var(--color-surface)] py-16 md:py-24 overflow-hidden flex flex-col justify-center relative border-t border-white/5"
    >
      {/* Header with title + navigation */}
      <div className="container mx-auto px-6 mb-10 md:mb-14">
        <div className="flex items-end justify-between gap-4">
          {/* Title */}
          <Reveal type="clip" direction="up">
            <h2 className="text-white text-fluid-h2 font-black font-heading uppercase tracking-tight leading-none">
              Lançamentos <span className="text-[var(--color-primary)]">.</span>
            </h2>
          </Reveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Counter */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <span className="text-white font-heading text-lg tabular-nums font-bold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="w-8 h-[1px] bg-white/30"></span>
              <span className="text-white/40 font-heading text-lg tabular-nums">
                {String(totalItems).padStart(2, "0")}
              </span>
            </div>

            {/* Prev Button */}
            <button
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Produto anterior"
              className="releases-nav-btn group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-0.5 group-active:-translate-x-1"
              >
                <path
                  d="M13 4L7 10L13 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Próximo produto"
              className="releases-nav-btn group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-1"
              >
                <path
                  d="M7 4L13 10L7 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative px-6 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 w-max will-change-transform"
        >
          {PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="w-[85vw] sm:w-[45vw] lg:w-[calc((100vw-48px-48px)/3)] h-[65vh] min-h-[420px] max-h-[650px] shrink-0"
            >
              <ProductCard product={item} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mt-8 md:mt-12">
        <div className="flex items-center gap-4">
          {/* Progress track */}
          <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-700 ease-[var(--ease-premium)]"
              style={{
                width: `${((currentIndex + 1) / totalPages) * 100}%`,
              }}
            />
          </div>

          {/* Dot indicators for mobile */}
          <div className="flex sm:hidden items-center gap-1.5">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const isActive = i === Math.min(currentIndex, 4);
              return (
                <button
                  key={i}
                  onClick={() => animateToIndex(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ${
                    isActive
                      ? "w-6 h-1.5 bg-[var(--color-primary)]"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

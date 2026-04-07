"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { WaveText } from "@/components/ui/WaveText";
import { MagneticEffect } from "@/components/ui/MagneticEffect";
import { Button } from "@/components/ui/Button";
import { Package, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const contentGroup = contentGroupRef.current;

    if (!section || !contentGroup) return;

    const ctx = gsap.context(() => {
      // 1. Animação de saída do texto ao rolar para baixo
      gsap.to(contentGroup, {
        y: 100,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 2. Parallax suave no container do YouTube
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white"
    >
      {/* ── NATIVE VIDEO BACKGROUND ────────────────────── */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 w-full h-full will-change-transform"
        style={{ transform: "scale(1.2)" }} // Scale para evitar bordas pretas no parallax
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ border: "none" }}
          >
            {/* O usuário deve colocar o vídeo da coleção no formato .mp4 dentro da pasta public/videos/ com o nome hero_bg.mp4 */}
            <source src="/videos/hero_bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay premium: gradiente escuro na base para contraste do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />

        {/* Camada global de escurecimento sutil (Apple/Nike style) */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* ── CONTEÚDO CENTRAL ────────────────────────────────────────── */}
      <div
        ref={contentGroupRef}
        className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center mt-20 will-change-transform"
      >
        <TextReveal
          as="h1"
          className="font-black font-heading tracking-tighter uppercase text-fluid-h1 flex flex-col items-center gap-2 cursor-pointer relative z-20 group drop-shadow-2xl"
        >
          <span className="block text-[var(--color-primary)] leading-none text-shadow-sm">
            <WaveText text="NOVA" filterId="hero-wave-nova" turbulence />
          </span>
          <span className="block text-white leading-none text-shadow-sm">
            <WaveText text="COLEÇÃO" filterId="hero-wave-colecao" turbulence />
          </span>
        </TextReveal>

        <Reveal
          type="clip"
          delay={0.8}
          direction="up"
          className="mt-8 max-w-lg"
        >
          <p className="text-lg md:text-xl text-white/70 font-medium">
            Assume o orgulho coxa-branca. Navegue pela nova linha de vestuário e
            história.
          </p>
        </Reveal>

        <Reveal type="scale" delay={1.0} className="mt-10 flex gap-4 group">
          <MagneticEffect strength={0.4}>
            <Button
              variant="primary"
              className="hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 border border-transparent hover:border-[var(--color-primary)]/30 transition-all duration-300"
              onClick={() => {
                document.getElementById('featured-drop')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Conheça a Nova Coleção
            </Button>
          </MagneticEffect>
        </Reveal>

        {/* TRACK ORDER HERO CARD/LINK */}
        <Reveal type="clip" delay={1.2} direction="up" className="mt-8">
          <a
            href="/rastreio"
            className="px-6 py-3.5 bg-black/40 hover:bg-[#111] backdrop-blur-xl border border-white/10 hover:border-[var(--color-primary)]/50 rounded-full flex items-center gap-3 transition-all duration-300 text-[11px] md:text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white group shadow-[0_4px_30_rgba(0,0,0,0.3)]"
          >
            <Package
              strokeWidth={2.5}
              size={16}
              className="text-[var(--color-primary)] group-hover:-translate-y-0.5 transition-transform"
            />
            Já comprou? Acompanhe seu pedido
            <ArrowRight
              size={14}
              className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
            />
          </a>
        </Reveal>
      </div>

      {/* ── INDICADOR DE SCROLL ───────────────────────────────────── */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80">
          Role para Descobrir
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-[var(--color-primary)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

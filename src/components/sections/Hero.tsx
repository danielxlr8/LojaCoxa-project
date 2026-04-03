"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Package, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

      // 2. Parallax suave no vídeo de background
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 15,
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

  // Itens do ticker
  const tickerItems = [
    " SÓCIO COXA TEM DESCONTO DE ATÉ 20%!",
    " PARCELAMENTO EM ATÉ 6X SEM JUROS!",
    " COMPRE AGORA A NOVA COLEÇÃO CORITIBA DIADORA 2026!",
    " FRETE GRÁTIS PARA CURITIBA E REGIÃO!",
    " PARCELAMENTO EM ATÉ 6X SEM JUROS!",
    " TROCA GRÁTIS EM ATÉ 30 DIAS",
    " GANHE BRINDES EXCLUSIVOS ACIMA DE R$250",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-surface)] text-white"
    >
      {/* ── VÍDEO DE BACKGROUND ────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          style={{
            transform:
              "scale(1.1)" /* leve scale extra para o parallax não revelar bordas */,
          }}
        >
          <source src="/videos/camisa-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay premium: gradiente escuro na base para contraste do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

        {/* Camada global de escurecimento sutil (Apple/Nike style) */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ── NEWS TICKER — Colado na base da seção ────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden select-none"
        style={{ backgroundColor: "#115740" }}
      >
        <div className="ticker-track flex whitespace-nowrap py-2.5">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-white font-bold text-xs md:text-sm tracking-wide mx-8 shrink-0 uppercase"
            >
              {item}
              <span className="mx-6 text-white/25 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CONTEÚDO CENTRAL (animado pelo ScrollTrigger) ─────────── */}
      <div
        ref={contentGroupRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-20 will-change-transform"
      >
        <TextReveal
          as="h1"
          className="font-black font-heading tracking-tighter uppercase text-fluid-h1 flex flex-col items-center gap-3 cursor-pointer relative z-20 group"
        >
          <span className="block text-[var(--color-primary)] leading-none neon-border">
            NOVA
          </span>
          <span className="block text-white leading-none neon-border">
            COLEÇÃO
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

        <Reveal type="scale" delay={1.0} className="mt-10 flex gap-4">
          <Button variant="primary">Explorar Agora</Button>
        </Reveal>

        {/* TRACK ORDER HERO CARD/LINK */}
        <Reveal type="clip" delay={1.2} direction="up" className="mt-8">
          <a 
            href="/rastreio" 
            className="px-6 py-3.5 bg-black/40 hover:bg-[#111] backdrop-blur-xl border border-white/10 hover:border-[var(--color-primary)]/50 rounded-full flex items-center gap-3 transition-all duration-300 text-[11px] md:text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white group shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          >
             <Package strokeWidth={2.5} size={16} className="text-[var(--color-primary)] group-hover:-translate-y-0.5 transition-transform" />
             Já comprou? Acompanhe seu pedido
             <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
          </a>
        </Reveal>
      </div>

      {/* ── INDICADOR DE SCROLL ───────────────────────────────────── */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
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

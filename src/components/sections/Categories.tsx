"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function Categories() {
  const decorVideoRef = useRef<HTMLVideoElement>(null);
  // Pause decorative video when section is offscreen — saves GPU/CPU
  useEffect(() => {
    const video = decorVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-[var(--color-background-dark)] w-full relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <Reveal type="clip" direction="up">
            <div className="flex items-center">
              <h2 className="text-white text-fluid-h2 font-black font-heading uppercase tracking-tight leading-none">
                Linhas <br />
                <span className="text-[var(--color-primary)]">da Loja</span>
              </h2>
              <video
                ref={decorVideoRef}
                src="/videos/Coxa.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-48 md:w-30 h-auto object-contain pointer-events-none ml-4 md:ml-10 opacity-80"
                style={{
                  maskImage:
                    "radial-gradient(ellipse at center, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                  filter: "contrast(2.05)",
                  contain: "paint layout",
                }}
              />
            </div>
          </Reveal>
          <Reveal
            type="fade"
            delay={0.7}
            direction="up"
            className="mt-6 md:mt-0"
          >
            <p className="text-white/50 max-w-sm font-medium text-lg leading-relaxed">
              Explore os produtos oficiais do Coritiba, do campo ao casual, para
              toda a família coxa-branca.
            </p>
          </Reveal>
        </div>

        {/* Asymmetrical Bento Grid — 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large Card — Uniformes */}
          <Link
            href="/categorias/uniformes"
            className="md:col-span-2 group relative overflow-hidden rounded-[2px] h-[400px] md:h-[560px] cursor-pointer block"
          >
            <Image
              src="/imagens/uniformes.webp"
              alt="Uniformes de Jogo"
              fill
              className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-[var(--ease-premium)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                Performance
              </span>
              <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight font-heading">
                Uniformes
              </h3>
              <p className="text-white/60 text-sm mt-2 font-medium">
                Masculino · Feminino · Goleiro
              </p>
            </div>
          </Link>

          {/* Right column — 3 stacked cards */}
          <div className="md:col-span-1 flex flex-col gap-4 md:gap-6">
            {/* Infantojuvenil — New! */}
            <Link
              href="/categorias/infantojuvenil"
              className="group relative overflow-hidden rounded-[2px] h-[200px] md:h-[240px] cursor-pointer block bg-neutral-900"
            >
              <Image
                src="https://cdn.fanmarket.app.br/69c91bd1e039ef33fb14fe33_camisa-jogo-1-infjuv.png"
                alt="Infantojuvenil"
                fill
                className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-[var(--ease-premium)] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-primary)] text-black rounded-[2px]">
                  Nova Linha
                </span>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-xs mb-1 opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Tamanhos 4-14
                </span>
                <h3 className="text-white text-2xl font-black uppercase tracking-tight font-heading">
                  Infantojuvenil
                </h3>
              </div>
            </Link>

            {/* Casual */}
            <Link
              href="/categorias/casual"
              className="group relative overflow-hidden rounded-[2px] h-[160px] md:h-[150px] cursor-pointer bg-neutral-800 block"
            >
              <Image
                src="/imagens/casual.webp"
                alt="Casual / Viagem"
                fill
                className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-[var(--ease-premium)] opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-xs mb-1 opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Elegância
                </span>
                <h3 className="text-white text-2xl font-black uppercase tracking-tight font-heading">
                  Casual
                </h3>
              </div>
            </Link>

            {/* Treino */}
            <Link
              href="/categorias/treino"
              className="group relative overflow-hidden rounded-[2px] h-[160px] md:h-[150px] cursor-pointer bg-neutral-700 block"
            >
              <Image
                src="https://cdn.fanmarket.app.br/69c863fbe810c57450f23e9f_camisa-jogo-1-fem.png"
                alt="Treino"
                fill
                className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-[var(--ease-premium)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <span className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-xs mb-1 opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Alta Performance
                </span>
                <h3 className="text-white text-2xl font-black uppercase tracking-tight font-heading">
                  Treino
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

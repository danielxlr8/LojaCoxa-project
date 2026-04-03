"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  // Armazena o tempo-alvo para a interpolação RAF
  const targetTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const marquee = marqueeRef.current;
    if (!section || !video || !marquee) return;

    // ─── RAF INTERPOLATION ──────────────────────────────────────────
    // Em vez de setar currentTime diretamente no onUpdate (que causa stutter),
    // usamos um loop de requestAnimationFrame que avança suavemente o currentTime
    // em direção ao target. Isso reduz drasticamente o número de seeks por segundo.
    const rafLoop = () => {
      if (video.readyState >= 2) {
        const diff = targetTimeRef.current - video.currentTime;
        // Avança 35% da distância restante por frame (interpolação exponencial)
        if (Math.abs(diff) > 0.033) {
          video.currentTime += diff * 0.35;
        }
      }
      rafRef.current = requestAnimationFrame(rafLoop);
    };
    rafRef.current = requestAnimationFrame(rafLoop);

    // ─── GSAP CONTEXT ───────────────────────────────────────────────
    let ctx = gsap.context(() => {
      const build = () => {
        const dur = video.duration || 15;

        // scroll total = 180px por segundo de vídeo
        // Ambos (vídeo e marquee) terminam nesse mesmo ponto
        const totalScroll = Math.ceil(dur * 180);

        // ── TIMELINE ÚNICA — tudo sincronizado no mesmo scroll ─────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScroll}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.5, // resposta suave de 500ms — equilibra fluidez e resposta
            onUpdate: (self) => {
              // Apenas atualiza o TARGET, o RAF faz o currentTime se mover suavemente
              targetTimeRef.current = self.progress * dur;
            },
          }
        });

        // Marquee: começa na posição natural e percorre -55% sincronizado
        tl.fromTo(
          marquee,
          { xPercent: 0 },
          { xPercent: -55, ease: "none", duration: 1 },
          0 // label "0" = começa no mesmo momento que o scroll inicia
        );
      };

      if (video.readyState >= 1) {
        build();
      } else {
        video.addEventListener("loadedmetadata", build, { once: true });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* ── BACKGROUND: Vídeo da Torcida ─────────────────────── */}
      {/* preload="auto" carrega o vídeo inteiro para evitar stutter ao buscar frames */}
      <video
        ref={videoRef}
        preload="auto"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.65, pointerEvents: "none" }}
      >
        <source src="/videos/torcida_scrub.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAY: profundidade para o texto ─────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* ── MARQUEE: faixa de texto centralizada ────────────── */}
      {/* overflow-hidden no wrapper garante que o texto não extrapole a tela */}
      <div className="absolute inset-0 z-20 flex items-center overflow-hidden">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap flex items-center leading-none font-black uppercase font-heading tracking-tighter will-change-transform"
          style={{ fontSize: "clamp(3rem, 12vw, 14rem)" }}
        >
          <span className="mr-10 text-white">Tradição.</span>
          <span className="mr-10 text-[var(--color-primary)]">Raça.</span>
          <span className="mr-10 text-white">Pioneirismo.</span>
          <span className="mr-10 text-[var(--color-primary)]">Alto da Glória.</span>
          <span className="mr-10 text-white">Tradição.</span>
          <span className="mr-10 text-[var(--color-primary)]">Raça.</span>
        </div>
      </div>
    </section>
  );
}

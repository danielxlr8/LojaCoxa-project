"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const text3 = text3Ref.current;
    if (!section || !video || !text1 || !text2 || !text3) return;

    // ─── GSAP CONTEXT ───────────────────────────────────────────────
    let ctx = gsap.context(() => {
      const build = () => {
        const dur = video.duration || 15;

        // scroll total = 180px por segundo de vídeo
        // Ambos (vídeo e marquee) terminam nesse mesmo ponto
        const totalScroll = Math.ceil(dur * 180);

        // ── TIMELINE ÚNICA — tudo sincronizado no mesmo scroll ─────
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScroll}`,
            pin: true,
            anticipatePin: 1,
            // Utilizamos um valor numérico de scrub (ex: 1 ou 0.5) 
            // Em vez de "true", isso cria uma interpolação suave entre os "cliques"
            // da roda do mouse, removendo totalmente a sensação de engasgo e pulos secos.
            scrub: 1,
            fastScrollEnd: true,
          },
        });

        // ── ANIMAÇÃO NATIVA DE VÍDEO DO GSAP ───────────────
        // Este é o padrão oficial da Greensock para Video Scrubbing
        // A duração (1.10) foi calculada para dar match exato no fim da animação do Text3.
        tl.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: dur || video.duration, duration: 1.10 },
          0
        );

        // Revelação Cinemática: Fade-in sem Zoom
        tl.fromTo(
          video,
          { opacity: 0.05 },
          { opacity: 0.9, ease: "none", duration: 1 },
          0
        );

        // Text sequences
        tl.fromTo(
          text1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.15 },
          0.05,
        )
          .to(text1, { opacity: 0, y: -40, duration: 0.15 }, 0.25)

          .fromTo(
            text2,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.15 },
            0.4,
          )
          .to(text2, { opacity: 0, y: -40, duration: 0.15 }, 0.6)

          .fromTo(
            text3,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.15 },
            0.75,
          )
          .to(text3, { opacity: 0, y: -40, duration: 0.15 }, 0.95);
      };

      if (video.readyState >= 1) {
        build();
      } else {
        video.addEventListener("loadedmetadata", build, { once: true });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
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
      {/* ── BACKGROUND: Vídeo da Torcida ─────────────────────── */}
      <video
        ref={videoRef}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: 0.85,
          pointerEvents: "none",
          transform: "translateZ(0)",
          willChange: "transform",
          contain: "layout paint size",
        }}
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

      {/* ── NARRATIVA APPLE-STYLE ────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          ref={text1Ref}
          className="absolute text-center px-6 max-w-4xl"
          style={{ opacity: 0 }}
        >
          <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl">
            O Fogo{" "}
            <span className="text-[var(--color-primary)] opacity-90 drop-shadow-2xl">
              Jamais
            </span>
            <br />
            Se Apaga.
          </h2>
          <p className="text-white/80 font-semibold md:text-xl tracking-wide max-w-xl mx-auto drop-shadow-lg">
            A paixão que inflama o estádio. Uma força visceral que precede a
            razão.
          </p>
        </div>

        <div
          ref={text2Ref}
          className="absolute text-center px-6 max-w-4xl"
          style={{ opacity: 0 }}
        >
          <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl">
            Do Alto da Glória <br />
            <span className="text-[var(--color-primary)] opacity-90 drop-shadow-2xl">
              Para o Mundo.
            </span>
          </h2>
          <p className="text-white/80 font-semibold md:text-xl tracking-wide max-w-xl mx-auto drop-shadow-lg">
            Mais do que um clube esportivo, uma verdadeira instituição delineada
            pelo peso da tradição.
          </p>
        </div>

        <div
          ref={text3Ref}
          className="absolute text-center px-6 max-w-4xl"
          style={{ opacity: 0 }}
        >
          <h2 className="text-4xl md:text-7xl font-black font-heading text-[var(--color-primary)] opacity-90 uppercase tracking-tighter leading-none mb-4 drop-shadow-2xl">
            Isto é <br />
            <span className="text-white drop-shadow-2xl">Coritiba.</span>
          </h2>
          <p className="text-white/80 font-semibold md:text-xl tracking-wide max-w-xl mx-auto drop-shadow-lg">
            Ousadia técnica, vanguarda estética e uma devoção imaterial
            eternizada em cada tecido.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export function CoxaIdSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !mockupRef.current || !scrollWrapRef.current) return;

    // Float animation on the inner element (mockupRef)
    const floatTween = gsap.to(mockupRef.current, {
      y: -30,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut",
    });

    // Scroll parallax on the outer wrapper (scrollWrapRef) — no conflict
    gsap.to(scrollWrapRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -80,
    });

    // Pause float tween while section is offscreen — stops idle GSAP cycles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            floatTween.play();
          } else {
            floatTween.pause();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#050505] overflow-hidden border-t border-white/5"
      style={{ paddingTop: "clamp(64px, 8vw, 128px)", paddingBottom: "clamp(32px, 4vw, 64px)" }}
    >
      {/* ── GRADIENT BRIDGE — conecta suavemente ao footer ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(96,232,97,0.025) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* BACKGROUND TEXTURE / GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[var(--color-primary)] opacity-5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* TEXT CONTENT */}
          <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading uppercase text-white tracking-tighter leading-none">
              Coxa ID
              <span className="block text-2xl md:text-3xl text-[var(--color-primary)] mt-2">
                Coritiba Oficial App
              </span>
            </h2>
            
            <p className="text-white/60 text-lg max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Acompanhe tudo sobre o Coritiba e tenha acesso a benefícios exclusivos no seu celular. O clube na palma da sua mão.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="h-14 px-8 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-[2px] transition-transform active:scale-95 hover:bg-[#60E861] duration-300 flex items-center justify-center gap-2 group">
                <span>Baixe Agora o App</span>
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>

          {/* MOCKUP IMAGE COM EFEITO PARALLAX */}
          <div ref={scrollWrapRef} className="order-1 lg:order-2 flex justify-center lg:justify-end relative h-[400px] lg:h-[600px]">
             <div 
               ref={mockupRef}
               className="relative w-full max-w-[300px] lg:max-w-[400px] h-full"
             >
               <Image
                 src="https://cdn.fanbase.com.br/fanmarket/coxa-store/mockup-coxa-store-1-1.png"
                 alt="Coxa ID - App Screenshot"
                 fill
                 className="object-contain drop-shadow-[0_20px_50px_rgba(96,232,97,0.15)]"
                 sizes="(max-width: 768px) 100vw, 50vw"
                 priority
               />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

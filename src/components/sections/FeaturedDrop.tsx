"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function FeaturedDrop() {
  return (
    <section id="featured-drop" className="w-full bg-[#0A0A0A] pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* TITULO DA SESSÃO */}
        <Reveal type="clip" direction="up" className="mb-12">
          <h2 className="text-sm md:text-base font-bold text-[var(--color-primary)] tracking-[0.2em] uppercase mb-4">
            Editorial Exclusivo
          </h2>
          <h3 className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none">
            A Alma do Couto
          </h3>
        </Reveal>

        {/* GRID ASSIMÉTRICA NIKE/APPLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* PEÇA MASTER (8 Column LG, Full MD/Mobile) */}
          <Reveal type="fade" delay={0.1} className="col-span-1 md:col-span-2 lg:col-span-8 h-[500px] lg:h-[720px] relative group rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-500">
            <div className="absolute inset-0 bg-black z-0">
              <img
                src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop"
                alt="Novo Uniforme III"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 p-8 lg:p-12 z-20 w-full flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-[var(--color-primary)] font-bold text-xs tracking-widest uppercase mb-3 drop-shadow-md">
                Pinnacle Drop
              </span>
              <h4 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tighter mb-2 text-shadow-sm">
                Camisa III Pro 24/25
              </h4>
              <p className="text-white/70 font-medium text-lg mb-8 max-w-md">
                Tecnologia de ponta fundida à agressividade verde e branca. A armadura definitiva para a temporada.
              </p>
              
              {/* Botão Hover reativo ajustado */}
              <button className="px-8 py-3 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-[var(--color-primary)] hover:text-black hover:scale-[0.97] transition-all duration-150 shadow-xl">
                Descobrir peça
              </button>
            </div>
          </Reveal>

          {/* PEÇAS SECUNDÁRIAS (Stack LG, Grid MD) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 md:gap-6">
            
            {/* Secundária 1 */}
            <Reveal type="fade" delay={0.25} className="h-[320px] md:h-[360px] lg:h-[calc(360px-12px)] relative group rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-500">
              <div className="absolute inset-0 bg-black z-0">
                <img
                  src="https://images.unsplash.com/photo-1580983554865-4a5c0e7b89d4?q=80&w=1000&auto=format&fit=crop"
                  alt="Jaqueta Corta-Vento"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 w-full flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-1">
                <h4 className="text-2xl font-black font-heading text-white uppercase tracking-tighter mb-1">
                  Corta-Vento Origin
                </h4>
                <p className="text-white/70 font-medium text-sm mb-4">
                  Do asfalto à arquibancada.
                </p>
                <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
                  Explorar uniforme
                </span>
              </div>
            </Reveal>

            {/* Secundária 2 */}
            <Reveal type="fade" delay={0.4} className="h-[320px] md:h-[360px] lg:h-[calc(360px-12px)] relative group rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-500">
              <div className="absolute inset-0 bg-black z-0">
                <img
                  src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"
                  alt="Tech Fleece Coxa"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04] object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 w-full flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-1">
                <h4 className="text-2xl font-black font-heading text-white uppercase tracking-tighter mb-1">
                  Calça Tech Fleece
                </h4>
                <p className="text-white/70 font-medium text-sm mb-4">
                  Mobilidade máxima e retenção térmica.
                </p>
                <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
                  Ver destaque
                </span>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}

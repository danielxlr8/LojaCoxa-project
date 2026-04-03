"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Play, Smartphone } from "lucide-react";
import Lottie from "lottie-react";
import youtubeIconData from "../../../public/imagens/Youtube Icon.json";
import appStoreIconData from "../../../public/imagens/App Store-icon.json";
import googlePlayIconData from "../../../public/imagens/google play.json";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 mb-32">
          <div className="lg:col-span-4 lg:pr-8">
            <Reveal type="clip" direction="up">
              <h2 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tighter mb-6 flex items-center gap-4">
                <div>
                  Assine nossa <br />
                  <span className="text-[var(--color-primary)]">
                    Newsletter
                  </span>
                </div>
                <img
                  src="https://config.fanbase.com.br/fanpage/54/img/logo.png"
                  alt="Coxa Logo"
                  className="w-[60px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </h2>
              <form className="flex border-b border-white/20 pb-2 relative group mt-8">
                <input
                  type="email"
                  placeholder="Seu e-mail..."
                  className="bg-transparent border-none outline-none w-full text-lg placeholder:text-white/30 text-[var(--color-primary)]"
                />
                <button
                  type="button"
                  className="font-bold tracking-widest uppercase text-sm group-hover:text-[var(--color-primary)] transition-colors"
                >
                  Enviar
                </button>
              </form>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal type="fade" delay={0.2} direction="up">
              <h4 className="font-bold tracking-widest uppercase text-sm mb-6 text-white/50">
                Categorias
              </h4>
              <ul className="flex flex-col gap-4 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Uniformes de Jogo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Linha Treino
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Acessórios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Outlet
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal type="fade" delay={0.4} direction="up">
              <h4 className="font-bold tracking-widest uppercase text-sm mb-6 text-white/50">
                Ajuda
              </h4>
              <ul className="flex flex-col gap-4 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Rastreio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Trocas & Devoluções
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* YouTube & App Section */}
          <div className="md:col-span-2 lg:col-span-4 mt-8 lg:mt-0 flex flex-col gap-6">
            <Reveal type="fade" delay={0.6} direction="up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[38px] h-[38px] flex items-center justify-center relative -ml-1 shrink-0">
                  <Lottie
                    animationData={youtubeIconData}
                    loop={true}
                    className="w-full h-full scale-[1.7]"
                    style={{ background: "transparent" }}
                  />
                </div>
                <h4 className="font-black font-heading tracking-widest uppercase text-xl md:text-2xl text-white group relative leading-none pt-1">
                  <span className="relative z-10 bg-gradient-to-br from-green-900 to-green-600 bg-clip-text text-transparent drop-shadow-md">
                    Acompanhe também no youtube
                  </span>
                  <span className="absolute -inset-1 blur-xl bg-red-500/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded block"></span>
                </h4>
              </div>

              <div className="aspect-video w-full rounded-[4px] overflow-hidden border border-white/10 bg-neutral-900 group relative shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/lgmv7yfVdAg?autoplay=0&mute=0"
                  title="Coritiba Bastidores"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-xs text-white/40 mt-3 flex items-center gap-1.5 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                Acompanhe os bastidores exclusivos no nosso canal.
              </p>
            </Reveal>

            {/* App Card Section */}
            <Reveal type="fade" delay={0.7} direction="up">
              <div className="relative w-full rounded-[8px] overflow-hidden bg-gradient-to-br from-[#1b5e20] to-[#0d3b13] p-6 flex flex-col justify-between group cursor-pointer border border-[#2e7d32]/50 shadow-xl mt-2 transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[95%] transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none">
                  {/* The user can drop their uploaded phones layout here for perfect background matching */}
                  <div className="w-full h-full bg-[url('/imagens/coxa-id.png')] bg-contain bg-right bg-no-repeat drop-shadow-2xl" />
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[var(--color-primary)] text-[10px] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                    <Smartphone size={12} className="text-white/80" /> Coxa ID
                  </div>
                  <h3 className="text-white font-black font-heading text-2xl uppercase leading-[0.9] tracking-tighter drop-shadow-lg max-w-[80%]">
                    Baixe agora o <br />
                    <span className="text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(69,209,94,0.3)]">
                      App Oficial
                    </span>
                  </h3>
                </div>

                {/* MODIFICAÇÃO AQUI: Alterado gap-2 para gap-4 e ajustadas as porcentagens */}
                <div className="relative z-10 flex justify-between mt-8 items-center w-[95%]">
                  <a
                    href="https://apps.apple.com/app/coxa-id-coritiba-oficial-app/id1541896243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[22%] transition-transform hover:-translate-y-1 active:scale-95 block rounded-md overflow-hidden"
                  >
                    <Lottie
                      animationData={appStoreIconData}
                      loop={true}
                      className="w-full h-auto origin-center drop-shadow-md"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.sportm.coritiba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[66%] transition-transform hover:-translate-y-1 active:scale-95 block rounded-md overflow-hidden bg-[#0A0A0A] drop-shadow-md"
                  >
                    <Lottie
                      animationData={googlePlayIconData}
                      loop={true}
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Coxa Store. Design Premium.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
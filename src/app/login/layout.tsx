import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import { WaveText } from "@/components/ui/WaveText";

export const metadata = {
  title: "Acesso & Coxa ID - Coritiba Store",
  description: "Acesse sua conta ou vincule o Coxa ID para garantir benefícios de sócio.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* HEADER MINIMALISTA - ENCLOSED */}
      <header className="sticky top-0 w-full h-[72px] md:h-20 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-center px-4 md:px-8">
        <Link 
          href="/" 
          className="absolute left-4 md:left-8 flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} /> <span className="hidden sm:inline">Voltar para a loja</span>
        </Link>
        
        {/* LOGOTIPO CENTRALIZADO */}
        <Link href="/" className="font-heading font-black text-2xl tracking-[0.1em] scale-100 hover:scale-105 active:scale-95 transition-transform">
          <WaveText text="CORITIBA" />
        </Link>
        
        <div className="absolute right-4 md:right-8 flex items-center gap-2 text-[var(--color-primary)] opacity-80">
          <ShieldCheck size={20} />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest hidden sm:inline">Acesso Seguro</span>
        </div>
      </header>

      {children}
      
      {/* FOOTER MINIMALISTA */}
      <footer className="mt-auto w-full py-8 text-center text-xs text-white/30 tracking-widest uppercase">
        <p className="mb-2">© 2026 Coritiba Store - Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 text-white/20">
          <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
          <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
        </div>
      </footer>
    </div>
  );
}

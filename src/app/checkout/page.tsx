"use client";

import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-[#050505] selection:bg-[var(--color-primary)] selection:text-black">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Título da Página - Visível penas Desktop ou Topo Mobile */}
        <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight text-white mb-8 md:mb-12">
          Finalizar Compra <span className="text-[var(--color-primary)]">.</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* COLUNA ESQUERDA: Formulários / Acordeão */}
          <div className="flex-1 w-full ord">
            <CheckoutSteps />
          </div>

          {/* COLUNA DIREITA: Resumo Fixo */}
          <aside className="w-full lg:w-[400px] xl:w-[480px] shrink-0 order-first lg:order-last mb-8 lg:mb-0">
            <OrderSummary />
          </aside>
          
        </div>
      </div>
    </main>
  );
}

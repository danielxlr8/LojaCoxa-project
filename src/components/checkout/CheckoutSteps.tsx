"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingInput } from "./FloatingInput";
import { Check, Truck, CreditCard, Box } from "lucide-react";

export function CheckoutSteps() {
  const [activeStep, setActiveStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState<"delivery" | "pickup">("delivery");

  const StepHeader = ({ stepNum, title, isCompleted }: { stepNum: number, title: string, isCompleted: boolean }) => (
    <div 
      className={`flex items-center gap-4 py-6 cursor-pointer ${activeStep !== stepNum ? "opacity-50 hover:opacity-100" : "opacity-100"}`}
      onClick={() => setActiveStep(stepNum)}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
        ${isCompleted 
          ? "bg-[var(--color-primary)] text-black" 
          : activeStep === stepNum 
            ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)]" 
            : "border border-white/20 text-white"}`}
      >
        {isCompleted ? <Check size={14} strokeWidth={4} /> : stepNum}
      </div>
      <h2 className="text-xl md:text-2xl font-heading tracking-widest uppercase text-white">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      
      {/* ── STEP 1: IDENTIFICATION ── */}
      <div className="border-b border-white/10">
        <StepHeader stepNum={1} title="Identificação" isCompleted={activeStep > 1} />
        <AnimatePresence initial={false}>
          {activeStep === 1 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: "circOut", duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 pb-8 pt-2">
                <FloatingInput label="E-mail" type="email" placeholder="E-mail" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput label="Nome Completo" type="text" placeholder="Nome Completo" />
                  <FloatingInput label="CPF" type="text" placeholder="CPF" />
                </div>
                <FloatingInput label="Telefone / Celular" type="tel" placeholder="Telefone / Celular" />
                <button 
                  onClick={() => setActiveStep(2)}
                  className="mt-4 h-14 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
                >
                  Continuar para Entrega
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── STEP 2: SHIPPING ── */}
      <div className="border-b border-white/10">
        <StepHeader stepNum={2} title="Entrega" isCompleted={activeStep > 2} />
        <AnimatePresence initial={false}>
          {activeStep === 2 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: "circOut", duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6 pb-8 pt-2">
                {/* Segmented Control */}
                <div className="flex border border-white/10 p-1 rounded bg-white/5">
                  <button 
                    onClick={() => setShippingMethod("delivery")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest rounded transition-all
                      ${shippingMethod === "delivery" ? "bg-white text-black shadow-sm" : "text-white/50 hover:text-white"}`}
                  >
                    <Truck size={16} /> Entregar
                  </button>
                  <button 
                    onClick={() => setShippingMethod("pickup")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest rounded transition-all
                      ${shippingMethod === "pickup" ? "bg-white text-black shadow-sm" : "text-white/50 hover:text-white"}`}
                  >
                    <Box size={16} /> Retirar na Loja
                  </button>
                </div>

                {shippingMethod === "delivery" ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <FloatingInput label="CEP" type="text" placeholder="CEP" className="flex-1" />
                      <button className="h-14 px-6 border border-white/20 text-xs font-bold uppercase tracking-widest hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                        BUSCAR
                      </button>
                    </div>
                    <FloatingInput label="Endereço" type="text" placeholder="Endereço" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <FloatingInput label="Número" type="text" placeholder="Número" />
                      <FloatingInput label="Complemento" type="text" placeholder="Complemento" className="col-span-1 sm:col-span-2" />
                    </div>
                    <FloatingInput label="Bairro" type="text" placeholder="Bairro" />
                    <div className="grid grid-cols-3 gap-4">
                      <FloatingInput label="Cidade" type="text" placeholder="Cidade" className="col-span-2" />
                      <FloatingInput label="UF" type="text" placeholder="UF" />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 border border-white/10 bg-white/5 rounded text-center">
                    <p className="text-sm text-white/60 mb-2">Retirada disponível no</p>
                    <p className="font-bold text-[var(--color-primary)] text-lg">Couto Pereira - Store</p>
                    <p className="text-xs text-white/40 mt-1">Rua Ubaldino do Amaral, 37 - Alto da Glória</p>
                  </div>
                )}
                
                <button 
                  onClick={() => setActiveStep(3)}
                  className="mt-2 h-14 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
                >
                  Continuar para Pagamento
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── STEP 3: PAYMENT ── */}
      <div className="border-b border-transparent">
        <StepHeader stepNum={3} title="Pagamento" isCompleted={activeStep > 3} />
        <AnimatePresence initial={false}>
          {activeStep === 3 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ ease: "circOut", duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 pb-8 pt-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button className="border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5 py-4 rounded flex flex-col items-center gap-2">
                    <CreditCard className="text-[var(--color-primary)]" size={24} />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Cartão</span>
                  </button>
                  <button className="border border-white/10 bg-white/5 py-4 rounded flex flex-col items-center gap-2 hover:border-white/30 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.23607L19.7639 8.11803L12 12V4.23607ZM4.23607 8.11803L12 12V19.7639L4.23607 15.882V8.11803ZM22 15.882L14.2361 19.7639L14.2361 12H22V15.882Z" fill="currentColor"/>
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">PIX (-5%)</span>
                  </button>
                </div>

                <FloatingInput label="Número do Cartão" type="text" placeholder="Número do Cartão" />
                <FloatingInput label="Nome Impresso no Cartão" type="text" placeholder="Nome Impresso no Cartão" />
                
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Validade (MM/AA)" type="text" placeholder="Validade" />
                  <FloatingInput label="CVV" type="text" placeholder="CVV" />
                </div>
                
                <select className="h-14 w-full bg-[#111] border border-white/10 text-white px-4 rounded-[4px] outline-none focus:border-[var(--color-primary)] font-medium text-sm">
                  <option value="" disabled selected>Opções de Parcelamento</option>
                  <option value="1">1x sem juros</option>
                  <option value="2">2x sem juros</option>
                </select>

                <button 
                  onClick={() => alert("Simulação de Compra Finalizada!")}
                  className="mt-6 h-14 bg-[#60E861] text-black font-black uppercase tracking-widest text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(96,232,97,0.3)]"
                >
                  Confirmar e Pagar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

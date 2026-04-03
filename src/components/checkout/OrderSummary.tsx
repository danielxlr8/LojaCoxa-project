"use client";

import Image from "next/image";
import { useStore } from "@/store/useStore";

export function OrderSummary() {
  const { cartItems } = useStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // Example: Socio Coxa discount (let's say 20% flat for mock)
  const isSocio = true; 
  const discount = isSocio ? subtotal * 0.20 : 0;
  const shipping = subtotal > 0 ? 15.00 : 0; // Flat shipping rate
  
  const total = subtotal - discount + shipping;

  const formatPrice = (val: number) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-[4px]">
        <h3 className="text-xl font-heading font-black tracking-widest uppercase mb-4">Resumo do Pedido</h3>
        <p className="text-sm text-white/40">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-6 md:p-8 rounded-[4px] sticky top-[100px]">
      <h3 className="text-xl font-heading font-black tracking-widest uppercase mb-6 border-b border-white/5 pb-4">
        Resumo do Pedido
      </h3>
      
      {/* PRODUCTS LIST */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-6">
        {cartItems.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
            <div className="relative w-16 h-20 bg-[#111] border border-white/5 shrink-0 rounded-[2px] overflow-hidden">
              <Image 
                src={item.product.images[0]} 
                alt={item.product.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-white line-clamp-2 leading-tight">
                {item.product.name}
              </p>
              <p className="text-[10px] text-white/40 mt-1 uppercase">TAM: {item.size} | QTD: {item.quantity}</p>
              <p className="text-[var(--color-primary)] font-bold text-xs mt-2">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAIS */}
      <div className="space-y-3 text-sm border-t border-white/5 pt-6">
        <div className="flex justify-between text-white/60">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {isSocio && discount > 0 && (
          <div className="flex justify-between text-[#60E861]">
            <span>Desconto Sócio (-20%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-white/60">
          <span>Frete</span>
          <span>{formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between text-white font-bold text-lg border-t border-white/10 pt-4 mt-2">
          <span className="uppercase tracking-widest">Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      <p className="text-[10px] text-white/30 text-center mt-6">
        Os itens no seu carrinho não estão reservados. Ao concluir o pedido, você concorda com nossos T&C.
      </p>
    </div>
  );
}

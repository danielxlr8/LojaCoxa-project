"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Filter, ChevronDown, Check, X } from "lucide-react";
import gsap from "gsap";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PRODUCTS, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function CategoryListingPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Map URL slug -> product field
  const genderMap: Record<string, string> = {
    uniformes: "uniformes",
    casual: "casual",
    treino: "treino",
    infantojuvenil: "infantojuvenil",
  };

  // Filter products: by category OR by gender (infantil)
  const filteredProducts = slug === "infantojuvenil"
    ? PRODUCTS.filter((p) => p.gender === "infantil")
    : PRODUCTS.filter((p) => p.category === slug);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : PRODUCTS;

  // Title formatter (uniformes -> Uniformes)
  const title = slug.replace(/-/g, " ").toUpperCase();

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block", ease: "power2.out" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: "none", ease: "power2.in" });
      gsap.to(sidebarRef.current, { x: "-100%", duration: 0.5, ease: "power3.in" });
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  // Entrance animation for grid
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-item", {
        y: 60,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
      });
    }, gridRef);
    return () => ctx.revert();
  }, [slug]);

  return (
    <main className="min-h-screen bg-[var(--color-background-dark)] flex flex-col cursor-crosshair">
      <Navbar />

      {/* ── BREADCRUMB & HEADER ────────────────────────────────── */}
      <div className="container mx-auto px-6 pt-28 pb-8">
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white/70">Categorias</span>
          <ChevronRight size={14} />
          <span className="text-white font-bold">{title}</span>
        </nav>

        <h1 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tight text-white leading-none">
          {title} <span className="text-[var(--color-primary)]">.</span>
        </h1>
        <p className="text-white/50 text-lg mt-4 font-medium">
          {displayProducts.length} Produtos Encontrados
        </p>
      </div>

      {/* ── TOOLBAR (STICKY TOP) ────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-y border-white/10 mt-4 mb-8">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors group"
          >
            <Filter size={18} className="group-hover:scale-110 transition-transform" /> 
            Mostrar Filtros
          </button>

          {/* Sort Dropdown (Adidas Style Mock) */}
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <span className="text-white/60 text-sm font-medium">Ordenar por:</span>
            <span className="text-white font-bold text-sm">Mais Relevantes</span>
            <ChevronDown size={16} className="text-white group-hover:rotate-180 transition-transform" />
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ────────────────────────────────────────── */}
      <section className="container mx-auto px-6 pb-24 flex-1">
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
          {displayProducts.map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* ── SIDEBAR FILTERS ─────────────────────────────────────── */}
      <div 
        ref={overlayRef}
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] hidden opacity-0"
      />
      
      <div 
        ref={sidebarRef}
        className="fixed top-0 left-0 w-[340px] max-w-[90vw] h-full bg-[#0F0F0F] border-r border-white/10 z-[100] transform -translate-x-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-white text-2xl font-black font-heading uppercase tracking-widest">Filtros</h3>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          
          {/* Categoria */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Categorias</h4>
            <div className="space-y-2">
              {["uniformes", "treino", "casual", "infantojuvenil"].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 border border-white/20 rounded-[2px] flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors">
                    {cat === slug && <Check size={14} className="text-[var(--color-primary)]" />}
                  </div>
                  <span className={`text-sm capitalize ${cat === slug ? "text-white font-bold" : "text-white/60 group-hover:text-white"}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Gênero */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Gênero</h4>
            <div className="space-y-2">
              {["Masculino", "Feminino", "Infantil"].map(gender => (
                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 border border-white/20 rounded-[2px] flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tamanho */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Tamanho</h4>
            <div className="flex flex-wrap gap-2">
              {["P", "M", "G", "GG", "EG", "3G"].map(size => (
                <button key={size} className="w-12 h-10 border border-white/15 rounded-[2px] text-xs font-bold text-white/70 hover:border-white hover:text-white transition-colors">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Sócio Coxa */}
          <div className="p-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-[4px] cursor-pointer mt-6 flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5 border border-[var(--color-primary)] rounded-[2px] bg-transparent flex items-center justify-center" />
            <div>
              <p className="text-[#60E861] font-bold text-sm tracking-wide uppercase">Sócio Coxa</p>
              <p className="text-[#60E861]/70 text-xs mt-1">Mostrar apenas itens com desconto para sócios.</p>
            </div>
          </div>

        </div>

        <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="w-full bg-white text-black h-12 rounded-[4px] font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-transform"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </main>
  );
}

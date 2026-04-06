"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Filter, ChevronDown, Check, X, SearchX, SlidersHorizontal } from "lucide-react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PRODUCTS, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

const CATEGORIES = ["uniformes", "treino", "casual", "infantojuvenil"] as const;
const GENDERS = ["masculino", "feminino", "infantil"] as const;
const SIZES = ["P", "M", "G", "GG", "EG", "3G"];

type Category = (typeof CATEGORIES)[number];
type Gender = (typeof GENDERS)[number];

const CATEGORY_LABELS: Record<string, string> = {
  uniformes: "Uniformes",
  treino: "Treino",
  casual: "Casual",
  infantojuvenil: "Infantojuvenil",
};

const GENDER_LABELS: Record<string, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  infantil: "Infantil",
};

export default function CategoryListingPage() {
  const params = useParams();
  const slug = params.slug as string;

  // ── Initial categories state based on URL slug ──────────────
  const getInitialCategories = (): Category[] => {
    if (slug === "infantojuvenil") return [];
    if (CATEGORIES.includes(slug as Category)) return [slug as Category];
    return [];
  };

  const getInitialGenders = (): Gender[] => {
    if (slug === "infantojuvenil") return ["infantil"];
    return [];
  };

  // ── Filter State ─────────────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(getInitialCategories);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>(getInitialGenders);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlySocio, setOnlySocio] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"relevantes" | "menor" | "maior">("relevantes");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // ── Real-time Filter Engine ──────────────────────────────────
  const finalProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter (infantojuvenil = gender:infantil)
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes("infantojuvenil" as Category)
          ? p.gender === "infantil" || selectedCategories.filter(c => c !== "infantojuvenil").includes(p.category as Category)
          : selectedCategories.includes(p.category as Category)
      );
    } else if (slug === "infantojuvenil" && selectedGenders.length === 0) {
      // Default: show infantil when on infantojuvenil page with no filters
      result = result.filter((p) => p.gender === "infantil");
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender as Gender));
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        selectedSizes.some((size) => p.sizes.includes(size))
      );
    }

    // Sócio Coxa filter
    if (onlySocio) {
      result = result.filter((p) => p.discountInfo && p.discountInfo.toLowerCase().includes("sócio"));
    }

    // Sort
    if (sortOrder === "menor") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "maior") result.sort((a, b) => b.price - a.price);

    return result;
  }, [selectedCategories, selectedGenders, selectedSizes, onlySocio, sortOrder, slug]);

  // ── Toggle Helpers ───────────────────────────────────────────
  const toggleCategory = (cat: Category) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleGender = (gender: Gender) =>
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const clearAllFilters = () => {
    setSelectedCategories(getInitialCategories());
    setSelectedGenders(getInitialGenders());
    setSelectedSizes([]);
    setOnlySocio(false);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedGenders.length +
    selectedSizes.length +
    (onlySocio ? 1 : 0);

  // ── Sidebar Animation ────────────────────────────────────────
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

  const title = slug.replace(/-/g, " ").toUpperCase();

  const sortLabels = { relevantes: "Mais Relevantes", menor: "Menor Preço", maior: "Maior Preço" };

  return (
    <main className="min-h-screen bg-[var(--color-background-dark)] flex flex-col cursor-crosshair">
      <Navbar />

      {/* ── BREADCRUMB & HEADER ──────────────────────────────── */}
      <div className="container mx-auto px-6 pt-28 pb-8">
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">Categorias</span>
          <ChevronRight size={14} />
          <span className="text-white font-bold">{title}</span>
        </nav>

        <h1 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tight text-white leading-none">
          {title} <span className="text-[var(--color-primary)]">.</span>
        </h1>
        <motion.p
          key={finalProducts.length}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 text-lg mt-4 font-medium"
        >
          {finalProducts.length} {finalProducts.length === 1 ? "Produto Encontrado" : "Produtos Encontrados"}
        </motion.p>
      </div>

      {/* ── TOOLBAR ─────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-y border-white/10 mt-4 mb-8">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-[var(--color-primary)] transition-colors group"
          >
            <SlidersHorizontal size={18} className="group-hover:scale-110 transition-transform" />
            Filtros
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)] text-black text-[10px] font-black"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen((v) => !v)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-white/60 text-sm font-medium">Ordenar por:</span>
              <span className="text-white font-bold text-sm">{sortLabels[sortOrder]}</span>
              <ChevronDown
                size={16}
                className={`text-white transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-white/10 rounded-[4px] overflow-hidden shadow-2xl z-50"
                >
                  {(["relevantes", "menor", "maior"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortOrder(opt); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between
                        ${sortOrder === opt ? "text-[var(--color-primary)] bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                    >
                      {sortLabels[opt]}
                      {sortOrder === opt && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ─────────────────────────────────────────── */}
      <section className="container mx-auto px-6 pb-24 flex-1">
        <AnimatePresence mode="wait">
          {finalProducts.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10"
            >
              <AnimatePresence>
                {finalProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
                    layout
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8"
              >
                <SearchX size={36} className="text-white/30" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-white font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter mb-3"
              >
                Nenhum Produto <span className="text-[var(--color-primary)]">Encontrado</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-white/40 text-base font-medium max-w-sm mb-10"
              >
                Os filtros selecionados não correspondem a nenhum item do catálogo atual.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={clearAllFilters}
                className="flex items-center gap-2 bg-[var(--color-primary)] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-[4px] hover:bg-white transition-colors"
              >
                <X size={16} />
                Limpar Filtros
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />

      {/* ── SIDEBAR OVERLAY ──────────────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] hidden opacity-0"
      />

      {/* ── SIDEBAR FILTERS ──────────────────────────────────────── */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 w-[340px] max-w-[90vw] h-full bg-[#0F0F0F] border-r border-white/10 z-[100] transform -translate-x-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h3 className="text-white text-2xl font-black font-heading uppercase tracking-widest">Filtros</h3>
            {activeFilterCount > 0 && (
              <span className="bg-[var(--color-primary)] text-black text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                {activeFilterCount} ativos
              </span>
            )}
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Categorias */}
          <div className="space-y-4">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Categorias</h4>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                return (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleCategory(cat)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-200 group
                      ${isActive ? "bg-[var(--color-primary)]/10" : "hover:bg-white/5"}`}
                  >
                    <div className={`w-5 h-5 border rounded-[2px] flex items-center justify-center transition-all duration-200 flex-shrink-0
                      ${isActive ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/20 group-hover:border-white/50"}`}
                    >
                      {isActive && <Check size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-semibold capitalize transition-colors ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                      {CATEGORY_LABELS[cat]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Gênero */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Gênero</h4>
            <div className="space-y-1">
              {GENDERS.map((gender) => {
                const isActive = selectedGenders.includes(gender);
                return (
                  <motion.button
                    key={gender}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleGender(gender)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-200 group
                      ${isActive ? "bg-[var(--color-primary)]/10" : "hover:bg-white/5"}`}
                  >
                    <div className={`w-5 h-5 border rounded-[2px] flex items-center justify-center transition-all duration-200 flex-shrink-0
                      ${isActive ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-white/20 group-hover:border-white/50"}`}
                    >
                      {isActive && <Check size={12} className="text-black" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-semibold capitalize transition-colors ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                      {GENDER_LABELS[gender]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Tamanho */}
          <div className="space-y-4 border-t border-white/5 pt-6">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Tamanho</h4>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const isActive = selectedSizes.includes(size);
                return (
                  <motion.button
                    key={size}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSize(size)}
                    className={`w-12 h-10 border rounded-[2px] text-xs font-bold transition-all duration-200
                      ${isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-black"
                        : "border-white/15 text-white/60 hover:border-white hover:text-white"
                      }`}
                  >
                    {size}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sócio Coxa */}
          <div className="border-t border-white/5 pt-6">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setOnlySocio((v) => !v)}
              className={`w-full p-4 rounded-[4px] cursor-pointer flex items-start gap-3 transition-all duration-300 border
                ${onlySocio
                  ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)]/60"
                  : "bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40"
                }`}
            >
              <div className={`w-5 h-5 mt-0.5 border rounded-[2px] flex items-center justify-center flex-shrink-0 transition-all
                ${onlySocio ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-primary)]/60"}`}
              >
                {onlySocio && <Check size={12} className="text-black" strokeWidth={3} />}
              </div>
              <div className="text-left">
                <p className="text-[var(--color-primary)] font-bold text-sm tracking-wide uppercase">Sócio Coxa</p>
                <p className="text-[var(--color-primary)]/60 text-xs mt-1 leading-relaxed">
                  Mostrar apenas itens com desconto para sócios.
                </p>
              </div>
            </motion.button>
          </div>

          {/* Clear all */}
          {activeFilterCount > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={clearAllFilters}
              className="w-full text-center text-white/40 hover:text-white/80 text-xs font-bold uppercase tracking-widest py-2 transition-colors"
            >
              Limpar todos os filtros
            </motion.button>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsSidebarOpen(false)}
            className="w-full bg-white text-black h-12 rounded-[4px] font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-primary)] transition-colors"
          >
            {finalProducts.length === 0
              ? "Nenhum resultado"
              : `Ver ${finalProducts.length} produto${finalProducts.length > 1 ? "s" : ""}`}
          </motion.button>
        </div>
      </div>
    </main>
  );
}

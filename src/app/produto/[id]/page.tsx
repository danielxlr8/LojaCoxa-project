"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  Star,
  Ruler,
} from "lucide-react";
import gsap from "gsap";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PRODUCTS, getProductBySlug, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShareModal } from "@/components/ui/ShareModal";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";
import { useStore } from "@/store/useStore";

// Mock Reviews Data
const MOCK_REVIEWS = {
  rating: 4.8,
  count: 124,
  fit: 50, // 0 = Apertado, 50 = Perfeito, 100 = Largo
  quality: 95,
  comfort: 90,
  items: [
    {
      id: 1,
      author: "membro.coxa_1909",
      date: "15 de março de 2026",
      rating: 5,
      title: "Detalhes impressionantes, muito leve.",
      content:
        "Uma das camisas mais bonitas que o clube já lançou. O tecido respira muito bem e o detalhe cromado no escudo ao vivo é surreal.",
      fit: "Perfeito",
    },
    {
      id: 2,
      author: "camisasecia",
      date: "02 de abril de 2026",
      rating: 5,
      title: "Design futurista com alma clássica",
      content:
        "Achei o conforto absurdo. Pedi meu tamanho normal e serviu perfeitamente. O jacquard botânico dá uma textura incrível.",
      fit: "Perfeito",
    },
  ],
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.id as string;

  const product =
    getProductBySlug(slug) ||
    PRODUCTS.find((p) => p.id === slug) ||
    PRODUCTS[0];

  const { addToCart, toggleFavorite, favoriteItems } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isFavorite = favoriteItems.some((f) => f.id === product.id);

  // Modos de visualização
  const [isMagnified, setIsMagnified] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("info");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Custom Cursor
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  // Reset state quando troca de produto
  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(null);
    setQuantity(1);
    setIsMagnified(false);
    setOpenAccordion("info");
  }, [slug]);

  // Entrada inicial
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mainImageRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(detailsRef.current, {
        opacity: 0,
        x: 60,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [slug]);

  // Handle Sticky Cart Visibility
  useEffect(() => {
    const handleScroll = () => {
      if (addToCartBtnRef.current) {
        const btnRect = addToCartBtnRef.current.getBoundingClientRect();
        setShowStickyCart(btnRect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animação custom cursor ultra fluída via GSAP
  useEffect(() => {
    if (!cursorRef.current) return;
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Handler for Inner Zoom Inicialization (Fix jump bug)
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnified) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }
    setIsMagnified(!isMagnified);
  };

  // Handler for Inner Zoom Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnified) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const socioPrice = (product.price * 0.8).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? "" : id);
  };

  return (
    <main className="min-h-screen bg-[var(--color-background-dark)] selection:bg-[var(--color-primary)] selection:text-black pb-24 lg:pb-0">
      <Navbar />

      {/* ── BREADCRUMB ────────────────────────────────── */}
      <div className="container mx-auto px-6 pt-28 pb-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link
            href="/"
            className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={14} /> Home
          </Link>
          <span>/</span>
          <span className="capitalize hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            {product.category}
          </span>
          <span>/</span>
          <span className="text-white/70">{product.name}</span>
        </nav>
      </div>

      {/* ── PRODUCT SECTION ───────────────────────────── */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
          {/* === COLUNA ESQUERDA: GALERIA MAGNIFIER ======================= */}
          <div
            ref={mainImageRef}
            className="lg:col-span-7 flex flex-col gap-4 relative"
          >
            {/* Imagem Principal (Inner Zoom) */}
            <div
              className={`relative w-full aspect-[4/5] overflow-hidden bg-[#0A0A0A] cursor-none`}
              onClick={handleImageClick}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => {
                setIsMagnified(false);
                setIsHoveringImage(false);
              }}
            >
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-[400ms] ease-out pointer-events-none"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transform: isMagnified ? "scale(2.5)" : "scale(1)",
                }}
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={100}
                />
              </div>

              {/* Botões/Badges (Somente visíveis quando NÃO está ampliado) */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isMagnified ? "opacity-0" : "opacity-100"}`}
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-black text-white">
                    <span className="ball-spin inline-block">⚽</span> Sócio
                    Coxa -20%
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                    className={`p-2.5 transition-all duration-300 ${isFavorite ? "bg-black/80 text-[var(--color-primary)] border border-white/20" : "bg-white text-black hover:bg-gray-200"}`}
                  >
                    <Heart
                      size={18}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsShareOpen(true);
                    }}
                    className="p-2.5 bg-white text-black hover:bg-gray-200 transition-all duration-300 pointer-events-auto"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Slider com Setas < > */}
            <div className="relative group/thumbs w-full">
              {/* Botão < Esquerda */}
              <button
                onClick={() => {
                  const el = document.getElementById("thumb-track");
                  if (el) el.scrollBy({ left: -140, behavior: "smooth" });
                }}
                aria-label="Fotos anteriores"
                className="absolute left-0 top-0 bottom-0 z-20 w-10 md:w-12 flex items-center justify-center bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent opacity-0 group-hover/thumbs:opacity-100 transition-opacity duration-300 cursor-pointer hover:from-[#0A0A0A]"
              >
                <ChevronLeft
                  size={22}
                  className="text-white/80 hover:text-[var(--color-primary)] transition-colors"
                />
              </button>

              {/* Track de Thumbnails */}
              <div
                id="thumb-track"
                className="flex gap-2 w-full overflow-x-auto scrollbar-hide shrink-0 pb-2 px-1 scroll-smooth"
              >
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-24 h-24 md:w-28 md:h-28 shrink-0 bg-[#0A0A0A] transition-all duration-300 border-b-[3px] rounded-[2px] overflow-hidden
                      ${selectedImage === i ? "border-[var(--color-primary)] opacity-100 scale-[1.02]" : "border-transparent opacity-50 hover:opacity-90"}`}
                  >
                    <Image
                      src={src}
                      alt={`thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                ))}
              </div>

              {/* Botão > Direita */}
              <button
                onClick={() => {
                  const el = document.getElementById("thumb-track");
                  if (el) el.scrollBy({ left: 140, behavior: "smooth" });
                }}
                aria-label="Próximas fotos"
                className="absolute right-0 top-0 bottom-0 z-20 w-10 md:w-12 flex items-center justify-center bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent opacity-0 group-hover/thumbs:opacity-100 transition-opacity duration-300 cursor-pointer hover:from-[#0A0A0A]"
              >
                <ChevronRight
                  size={22}
                  className="text-white/80 hover:text-[var(--color-primary)] transition-colors"
                />
              </button>
            </div>
          </div>

          {/* === COLUNA DIREITA: DETALHES ====================== */}
          <div ref={detailsRef} className="lg:col-span-5 flex flex-col pt-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Vendido por
              </span>
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                {product.vendor}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                {product.brand}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tight text-white leading-none mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-lg text-white/50 font-medium">
                {product.subtitle}
              </p>
              <div className="flex items-center gap-1 text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold">{MOCK_REVIEWS.rating}</span>
                <span className="text-xs text-white/40">
                  ({MOCK_REVIEWS.count})
                </span>
              </div>
            </div>

            <div className="relative p-6 rounded-[4px] border border-white/10 bg-[var(--color-surface)] mb-8">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-4xl font-black text-white tabular-nums">
                  {priceFormatted}
                </span>
              </div>
              <p className="text-sm text-white/50 mb-3">
                {product.installments}
              </p>
              <div className="flex items-center gap-2 px-4 py-3 rounded m-0 bg-[#115740]/40 border border-[#115740]">
                <span className="text-xs font-bold text-[#60E861] uppercase tracking-wider">
                  Sócio Coxa
                </span>
                <span className="text-xl font-black text-[#60E861]">
                  {socioPrice}
                </span>
                <span className="ml-auto text-[10px] text-[#60E861]/70 font-medium">
                  até 20% OFF
                </span>
              </div>

              {/* TENDÊNCIA BADGE (ADIDAS STYLE) */}
              <div className="mt-4 flex items-center gap-2 bg-[#E9ECEF] text-black px-4 py-3 rounded-[2px]">
                <Star size={16} fill="currentColor" strokeWidth={1} />
                <span>
                  <span className="font-bold text-sm tracking-wide">
                    Tendência!{" "}
                  </span>
                  <span className="text-sm">
                    Este artigo tem muita procura.
                  </span>
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  Tamanho
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[var(--color-primary)] hover:underline underline-offset-2 transition-colors font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  <Ruler size={14} /> Guia inteligente
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[56px] h-12 px-4 rounded-[4px] text-sm font-bold uppercase tracking-wider transition-all duration-300 border
                      ${selectedSize === size ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)] scale-105" : "bg-transparent text-white border-white/15 hover:border-white/40 hover:bg-white/5"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <div className="flex items-center border border-white/15 rounded-[4px] overflow-hidden h-14 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-white font-bold tabular-nums text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                ref={addToCartBtnRef}
                onClick={() => {
                  if (selectedSize) {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(product, selectedSize);
                    }
                  }
                }}
                className={`flex-1 h-14 rounded-[4px] font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-400
                  ${selectedSize ? "bg-[var(--color-primary)] text-black hover:bg-white hover:scale-[1.02] active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(96,232,97,0.3)]" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
                disabled={!selectedSize}
              >
                <ShoppingCart size={18} />{" "}
                {selectedSize
                  ? "Adicionar ao Carrinho"
                  : "Selecione um tamanho"}
              </button>
            </div>

            {/* ── ACCORDIONS (Substituto das Tabs) ───────────────────────────── */}
            <div className="border-t border-white/10">
              {/* ACCORDION: INFO */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion("info")}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-[var(--color-primary)] transition-colors">
                    Descrição
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-white/40 transition-transform duration-300 ${openAccordion === "info" ? "rotate-180 text-white" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[var(--ease-spring)] ${openAccordion === "info" ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="space-y-4 text-sm leading-relaxed text-white/60">
                    <p>{product.description}</p>
                    {product.descriptionExtra && (
                      <p>{product.descriptionExtra}</p>
                    )}
                    <p className="text-white font-semibold italic text-base mt-4">
                      {product.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* ACCORDION: SPECS */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion("specs")}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-[var(--color-primary)] transition-colors">
                    Detalhes Técnicos
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-white/40 transition-transform duration-300 ${openAccordion === "specs" ? "rotate-180 text-white" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[var(--ease-spring)] ${openAccordion === "specs" ? "max-h-[800px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {product.specs.map((spec, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[var(--color-primary)] before:rounded-full"
                      >
                        <span className="text-sm text-white/80">
                          <span className="font-semibold text-white/40">
                            {spec.label}:
                          </span>{" "}
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACCORDION: REVIEWS */}
              <div className="border-b border-white/10">
                <button
                  onClick={() => toggleAccordion("reviews")}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 group-hover:text-[var(--color-primary)] transition-colors">
                    Avaliações{" "}
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full font-medium">
                      {MOCK_REVIEWS.count}
                    </span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-white/40 transition-transform duration-300 ${openAccordion === "reviews" ? "rotate-180 text-white" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[var(--ease-spring)] ${openAccordion === "reviews" ? "max-h-[1200px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {/* Reviews Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 p-6 bg-white/[0.02] rounded-[4px] border border-white/5">
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-black font-heading tracking-tight text-white">
                          {MOCK_REVIEWS.rating}
                        </span>
                        <div className="flex text-[var(--color-primary)]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < Math.floor(MOCK_REVIEWS.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-white/50">
                        {MOCK_REVIEWS.count} avaliações
                      </p>
                    </div>
                    <div className="space-y-4">
                      {/* Fit Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-white/40 font-bold uppercase mb-1">
                          <span>Apertado</span> <span>Perfeito</span>{" "}
                          <span>Largo</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full relative">
                          <div
                            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-[0_0_10px_white]"
                            style={{
                              left: `${MOCK_REVIEWS.fit}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        </div>
                      </div>
                      {/* Comfort Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-white/40 font-bold uppercase mb-1">
                          <span>Conforto</span>{" "}
                          <span>{MOCK_REVIEWS.comfort}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-primary)]"
                            style={{ width: `${MOCK_REVIEWS.comfort}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {MOCK_REVIEWS.items.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-white/5 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-1 text-[var(--color-primary)] mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <h4 className="text-white font-bold text-base mb-1">
                          {review.title}
                        </h4>
                        <p className="text-sm text-white/60 mb-3 leading-relaxed">
                          {review.content}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-white/40 font-medium">
                          <span className="text-white/80">{review.author}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                          <span>•</span>
                          <span>
                            Caimento:{" "}
                            <strong className="text-white/60">
                              {review.fit}
                            </strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 py-4 border border-white/20 rounded-[4px] text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors">
                    Escrever uma avaliação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUTOS RELACIONADOS ──────────────────────── */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <h2 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tight text-white mb-10">
            Você Também Pode Gostar{" "}
            <span className="text-[var(--color-primary)]">.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                className="w-full h-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY ADD TO CART BAR (BOTTOM) ────────────── */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 p-4 z-50 transform transition-transform duration-500 ease-[var(--ease-spring)] flex justify-center
          ${showStickyCart ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="container max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-4 flex-1">
            <div className="relative w-12 h-14 rounded overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-bold uppercase tracking-wider text-sm">
                {product.name}
              </p>
              <p className="text-[var(--color-primary)] font-black text-sm">
                {priceFormatted}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="h-12 bg-white/5 border border-white/10 text-white rounded-[4px] px-4 outline-none focus:border-[var(--color-primary)] uppercase text-xs font-bold tracking-wider cursor-pointer appearance-none min-w-[120px]"
            >
              <option value="" disabled>
                Tamanho
              </option>
              {product.sizes.map((size) => (
                <option key={size} value={size} className="text-black">
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (selectedSize) {
                  // Add quantity times (it only adds 1 by default, but we can call it multiple times or adjust our store to accept quantity.)
                  // For now, our store accepts quantity 1 and sums up. We'll iterate the quantity state:
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product, selectedSize);
                  }
                }
              }}
              className={`flex-1 md:w-[240px] h-12 rounded-[4px] font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-400
                ${selectedSize ? "bg-[var(--color-primary)] text-black hover:bg-white" : "bg-white/10 text-white/30 cursor-not-allowed"}`}
              disabled={!selectedSize}
            >
              <ShoppingCart size={16} /> Comprar
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* ── CUSTOM CURSOR (CORITIBA LOGO) ─────────────────────── */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 w-14 h-14 -ml-7 -mt-7 z-[9999] transition-opacity duration-300 flex items-center justify-center
          ${isHoveringImage ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ease-[var(--ease-spring)] ${isMagnified ? "scale-[0.7] rotate-[90deg] opacity-70" : "scale-100 rotate-0 opacity-100"}`}
        >
          <Image
            src="/imagens/coritiba-cursor.webp"
            alt="Coritiba Cursor"
            fill
            className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        productName={product.name}
        productUrl={
          typeof window !== "undefined"
            ? window.location.href
            : `https://coxastore.com.br/produto/${product.slug}`
        }
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productType={
          product.name.toLowerCase().includes("jogador")
            ? "jogador"
            : "torcedor"
        }
      />
    </main>
  );
}

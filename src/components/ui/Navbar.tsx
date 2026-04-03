"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Search, Menu, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { SearchOverlay } from "./SearchOverlay";
import { WaveText } from "./WaveText";
import gsap from "gsap";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // VIBRATION STATE
  const [cartVibrating, setCartVibrating] = useState(false);
  const [favVibrating, setFavVibrating] = useState(false);

  const cartItems = useStore((state) => state.cartItems);
  const favoriteItems = useStore((state) => state.favoriteItems);
  const toggleCart = useStore((state) => state.toggleCart);
  const toggleFavoritesDrawer = useStore((state) => state.toggleFavoritesDrawer);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favCount = favoriteItems.length;

  useEffect(() => {
    if (cartCount > 0) {
      setCartVibrating(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([200]);
      const timer = setTimeout(() => setCartVibrating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  useEffect(() => {
    if (favCount > 0) {
      setFavVibrating(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([200]);
      const timer = setTimeout(() => setFavVibrating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [favCount]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glassmorphism logic
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-500 ease-[var(--ease-premium)]",
        isScrolled ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent",
        isHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* NIKE STYLE TOP MICRO BAR */}
      <div className={cn(
        "w-full h-8 flex items-center justify-end px-6 border-b border-white/10 transition-all duration-300",
        isScrolled ? "hidden" : "bg-[#111]"
      )}>
        <nav className="flex items-center gap-4 text-[10px] text-white/50 font-bold uppercase tracking-widest">
          <Link href="/guia" className="hover:text-white transition-colors">Guia de Produtos</Link>
          <span className="text-white/20">|</span>
          <Link href="/rastreio" className="hover:text-[var(--color-primary)] transition-colors">Acompanhe seu pedido</Link>
          <span className="text-white/20">|</span>
          <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
        </nav>
      </div>

      {/* MAIN NAVBAR */}
      <div className={cn(
        "container mx-auto px-6 border-solid flex items-center justify-between transition-all duration-300",
        isScrolled ? "h-16" : "h-24"
      )}>
        
        {/* Left Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Uniformes", href: "/produto/camisa-jogo-1-masc" },
            { label: "Goleiro", href: "/produto/camisa-goleiro-1-masc" },
            { label: "Feminino", href: "/produto/camisa-jogo-1-fem" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="text-white text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Logo */}
        <a href="/" className="flex items-center justify-center relative z-10">
          <h1 className="text-3xl font-heading font-black text-white hover:text-[var(--color-primary)] transition-colors uppercase tracking-tight">
            <WaveText text="Coxa Store" />
          </h1>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-white hover:text-[var(--color-primary)] transition-colors"
          >
            <Search size={22} strokeWidth={2.5} />
          </button>
          
          <Link href="/login" className="text-white hover:text-[var(--color-primary)] transition-colors">
            <User size={22} strokeWidth={2.5} />
          </Link>
          
          <button 
            onClick={toggleFavoritesDrawer}
            className={cn(
              "text-white hover:text-[var(--color-primary)] transition-colors relative",
              favVibrating && "animate-shake-vibrate text-[var(--color-primary)]"
            )}
          >
            <Heart size={22} strokeWidth={2.5} />
            <AnimatePresence>
              {favCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-[#5D8B6E] text-white text-[11px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center pointer-events-none shadow-sm"
                >
                  {favCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button 
            onClick={toggleCart}
            className={cn(
              "text-white hover:text-[var(--color-primary)] transition-colors relative",
              cartVibrating && "animate-shake-vibrate text-[var(--color-primary)]"
            )}
          >
            <ShoppingBag size={22} strokeWidth={2.5} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-[#5D8B6E] text-white text-[11px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center pointer-events-none shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <button className="md:hidden text-white hover:text-[var(--color-primary)] transition-colors">
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      
      {/* Search Overlay Component */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";
import { useStore } from "@/store/useStore";

interface ProductCardProps {
  product: Product;
  className?: string;
  large?: boolean;
}

export function ProductCard({ product, className, large = false }: ProductCardProps) {
  const { toggleFavorite, favoriteItems } = useStore();
  const isFavorite = favoriteItems.some((f) => f.id === product.id);

  const priceFormatted = product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const href = `/produto/${product.slug}`;

  // Image references
  const mainImg = product.cardImage || product.images[0];
  const hoverImg = product.images[1] || mainImg; // Fallback to main if no 2nd image

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden bg-neutral-900 rounded-[4px] cursor-pointer block",
        large ? "aspect-square md:aspect-[3/4]" : "aspect-[4/5]",
        className
      )}
    >
      {/* Background Image Wrapper (Crossfade Effect) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0A0A]">
        {/* Main Image */}
        <Image
          src={mainImg}
          alt={product.name}
          fill
          className="object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-[1.8s] ease-[var(--ease-fluid)] opacity-100 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Hover Scenario Image */}
        <Image
          src={hoverImg}
          alt={`${product.name} hover`}
          fill
          className="object-cover transform scale-[1.05] group-hover:scale-100 transition-all duration-[1.8s] ease-[var(--ease-fluid)] opacity-0 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000"></div>
      </div>

      {/* Badges / Tags Top */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.discountInfo && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-black text-[#60E861]">
            <span className="ball-spin inline-block">⚽</span> -20% Sócio
          </span>
        )}
      </div>

      {/* Action Button: Favorite */}
      <button 
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
      >
        <Heart size={18} className={cn(
          "transition-colors duration-300", 
          isFavorite ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "text-white group-hover:text-[var(--color-primary)]"
        )} />
      </button>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 opacity-100 pointer-events-none">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[var(--ease-spring)] flex items-end justify-between">
          
          <div className="flex flex-col gap-1 w-full relative">
            <p className="text-[var(--color-primary)] uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">{product.gender}</p>
            <h3 className="text-white font-heading text-xl md:text-3xl uppercase tracking-widest leading-none mt-1 line-clamp-2 pr-12">{product.name}</h3>
            
            <div className="flex items-center justify-between mt-2">
              <p className="text-white/60 text-sm tracking-wide">{priceFormatted}</p>
              
              {/* Sizes Display (Adidas style on hover) */}
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex-wrap justify-end">
                {product.sizes.map(size => (
                  <span key={size} className="text-[10px] uppercase font-bold text-white/70 bg-white/10 px-1.5 py-0.5 rounded-[2px] border border-white/20">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

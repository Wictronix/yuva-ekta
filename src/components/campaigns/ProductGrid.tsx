"use client";

import Image from "next/image";
import { type ProductItem } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingBag } from "lucide-react";

interface ProductGridProps {
  products: ProductItem[];
  cart: Record<number, number>;
  onCartChange: (cart: Record<number, number>) => void;
}

export default function ProductGrid({ products, cart, onCartChange }: ProductGridProps) {
  if (!products || products.length === 0) return null;

  const updateQuantity = (index: number, delta: number) => {
    const current = cart[index] || 0;
    const next = Math.max(0, current + delta);
    const newCart = { ...cart };
    if (next === 0) {
      delete newCart[index];
    } else {
      newCart[index] = next;
    }
    onCartChange(newCart);
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {products.map((product, index) => {
          const qty = cart[index] || 0;
          const isSelected = qty > 0;

          return (
            <div
              key={index}
              onClick={() => {
                if (qty === 0) updateQuantity(index, 1);
              }}
              className={`relative rounded-2xl border-2 transition-all duration-300 bg-white overflow-hidden group ${
                isSelected
                  ? "border-brand-pink shadow-lg shadow-brand-pink/10"
                  : "border-brand-brown/8 hover:border-brand-pink/30 hover:shadow-md cursor-pointer"
              }`}
            >
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 bg-brand-pink text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ShoppingBag size={12} />
                  {qty}
                </div>
              )}

              {product.image_url && (
                <div className="relative h-36 w-full overflow-hidden bg-brand-offwhite">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-brand-pink/10" />
                  )}
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h4 className="font-black text-brand-brown text-base leading-snug">{product.name}</h4>
                  <div className="bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full whitespace-nowrap font-bold text-sm flex-shrink-0">
                    {formatCurrency(product.price)}
                  </div>
                </div>

                <p className="text-brand-brown/60 text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.impact}
                </p>

                {/* Amazon-style counter */}
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  {isSelected ? (
                    <div className="flex items-center border-2 border-brand-pink/20 rounded-xl overflow-hidden bg-brand-offwhite/50">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="w-10 h-10 flex items-center justify-center text-brand-pink hover:bg-brand-pink/10 transition-colors active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center font-black text-brand-brown text-base border-x-2 border-brand-pink/10 bg-white">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="w-10 h-10 flex items-center justify-center text-brand-pink hover:bg-brand-pink/10 transition-colors active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(index, 1);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-offwhite text-brand-brown rounded-xl font-bold text-sm hover:bg-brand-pink hover:text-white transition-all border border-brand-brown/10 hover:border-brand-pink active:scale-95"
                    >
                      <Plus size={14} strokeWidth={3} />
                      Add to Donation
                    </button>
                  )}

                  {isSelected && (
                    <span className="text-sm font-bold text-brand-pink ml-auto">
                      {formatCurrency(product.price * qty)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import Image from "next/image";
import { type ProductItem } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils";

interface ProductGridProps {
  products: ProductItem[];
  onDonateClick?: (amount: number) => void;
}

export default function ProductGrid({ products, onDonateClick }: ProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div key={index} className="desi-card border border-brand-brown/5 flex flex-col h-full bg-white p-6 md:p-8">
            {product.image_url && (
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-6 bg-brand-offwhite">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="flex-grow">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h4 className="font-black text-brand-brown text-lg">{product.name}</h4>
                <div className="bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full whitespace-nowrap font-bold text-sm">
                  {formatCurrency(product.price)}
                </div>
              </div>
              <p className="text-brand-brown/70 text-sm leading-relaxed mb-6">
                {product.impact}
              </p>
            </div>
            
            <button 
              onClick={() => onDonateClick?.(product.price)}
              className="w-full py-3 mt-auto bg-brand-offwhite text-brand-brown rounded-xl font-bold text-sm hover:bg-brand-pink hover:text-white transition-colors border border-brand-brown/10 hover:border-brand-pink"
            >
              Donate This
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-sm text-brand-brown/60 mb-3">Or donate any amount — every rupee helps.</p>
        <button 
          onClick={() => onDonateClick?.(0)}
          className="text-brand-pink font-bold text-sm hover:underline decoration-brand-pink/30 underline-offset-4"
        >
          Donate a Custom Amount →
        </button>
      </div>
    </div>
  );
}

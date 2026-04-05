import Image from "next/image";
import { type UpdateItem } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

export default function CampaignUpdates({ updates }: { updates: UpdateItem[] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="bg-brand-offwhite p-8 rounded-2xl text-center border border-brand-brown/5">
        <p className="text-brand-brown/70">
          Updates will be posted here as the campaign progresses. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {updates.map((update, index) => (
        <div key={index} className="relative pl-8 md:pl-0">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-brand-brown/10 translate-x-[9.5px]"></div>
          
          <div className="desi-card relative z-10 md:ml-8 mb-8 last:mb-0">
            <div className="absolute -left-12 md:-left-[2.75rem] top-8 w-4 h-4 rounded-full bg-brand-pink border-4 border-white shadow-sm"></div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-brown/40 mb-3">
              <span className="text-brand-pink">📅</span>
              {formatDate(update.date)}
            </div>
            
            <h4 className="text-xl font-black font-playfair text-brand-brown mb-4">
              {update.title}
            </h4>
            
            <p className="text-brand-brown/70 leading-relaxed whitespace-pre-line mb-6">
              {update.body}
            </p>
            
            {update.image_url && (
              <div className="relative h-64 w-full rounded-xl overflow-hidden mt-6">
                <Image
                  src={update.image_url}
                  alt={update.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

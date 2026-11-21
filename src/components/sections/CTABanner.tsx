"use client";

import { m } from "framer-motion";
import { Heart } from "lucide-react";
import { useDonation } from "@/components/providers/DonationProvider";

export default function CTABanner() {
    const { openDonationModal } = useDonation();

    return (
        <section className="relative py-24 bg-brand-green overflow-hidden">
            {/* Abstract decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-playfair"
                    >
                        Together, We Can Reach More Families.
                    </m.h2>
                    <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/90 mb-12 font-inter font-light"
                    >
                        Every rupee you give goes directly to children, women, and families
                        in Gurugram&apos;s villages. Donations are tax-deductible under Section 80G.
                    </m.p>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center w-full"
                    >
                        <button
                            onClick={() => openDonationModal()}
                            className="px-8 md:px-12 py-4 md:py-5 bg-white text-brand-green-dark rounded-full font-bold text-base md:text-lg hover:bg-brand-offwhite hover:scale-105 transition-all inline-flex items-center gap-2.5 whitespace-nowrap shadow-xl group"
                        >
                            <Heart size={20} className="text-brand-pink fill-brand-pink group-hover:scale-110 transition-transform flex-shrink-0" />
                            <span>Donate Now · 80G Tax Exemption</span>
                        </button>
                    </m.div>
                </div>
            </div>
        </section>
    );
}

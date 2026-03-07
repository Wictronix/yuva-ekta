"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
    return (
        <section className="relative py-24 bg-brand-green overflow-hidden">
            {/* Abstract decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-playfair"
                    >
                        Together, We Can Reach More Families.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/80 mb-12 font-inter font-light"
                    >
                        Every rupee you give goes directly to children, women, and families
                        in Gurugram's villages. Donations are tax-deductible under Section 80G.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center w-full"
                    >
                        <Link
                            href="/donate"
                            className="px-12 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all inline-block whitespace-nowrap shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                        >
                            Make a Donation Today
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

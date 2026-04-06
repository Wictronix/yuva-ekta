"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/projects";

export default function Partners() {
    return (
        <section className="py-20 bg-white border-y border-gray-100">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-10">
                    <span className="text-brand-brown/60 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
                        Our Generous Supporters
                    </span>
                    <h3 className="text-lg font-bold text-brand-brown/60 uppercase tracking-widest font-inter">
                        Projects made possible by
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {PARTNERS.map((partner, i) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, filter: "grayscale(1)" }}
                            whileInView={{ opacity: 1, filter: "grayscale(0)" }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                            className="px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center hover:bg-white hover:border-brand-pink/20 hover:shadow-lg transition-all cursor-default"
                        >
                            <span className="text-brand-brown/70 font-bold text-sm tracking-tight text-center">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
